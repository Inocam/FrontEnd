useEffect(() => {
  if (!stompClient.current) {
    stompClient.current = new Client({
      brokerURL: "wss://footapi.o-r.kr/foot/chat",
      connectHeaders: {
        Authorization: `Bearer ${Actoken}`,
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });


    stompClient.current.onConnect = () => {
      console.log("Connected to WebSocket");

      // 현재 대화방 구독
      subscriptions.current.room = stompClient.current.subscribe(
        `/topic/room/${userId}`,
        (message) => {
          const receivedMessage = JSON.parse(message.body);
          console.log("Room message:", receivedMessage);
          queryClient.setQueryData(["getMmuser"], (oldData) => {
            if (!oldData) return oldData;

            if (receivedMessage.type === "create") {
              return {
                ...oldData,
                content: [
                  ...oldData.content,
                  { ...receivedMessage, lastMessage: {} },
                ],
              };
            }

            if (receivedMessage.type === "newChat") {
              const updatedContent = oldData.content.map((room) =>
                room.roomId === receivedMessage.roomId
                  ? { ...room, lastMessage: receivedMessage }
                  : room
              );
              updatedContent.sort((a, b) => {
                const dateA = a.lastMessage?.sendDate || a.sendDate || "";
                const dateB = b.lastMessage?.sendDate || b.sendDate || "";
                return new Date(dateB) - new Date(dateA);
              });
              return {
                ...oldData,
                content: updatedContent,
              };
            }

            return oldData; // 변경 사항이 없을 경우
          });
        }
      );

      // 특정 팀의 채팅 구독
      subscriptions.current.team = stompClient.current.subscribe(
        `/topic/chat/${isTeam}`,
        (message) => {
          const receivedMessage = JSON.parse(message.body);
          console.log("Team message:", receivedMessage);
          console.log(messageData);
          queryClient.setQueryData(["getMessage", isTeam], (oldData) => {
            return {
              ...oldData,
              content: [...oldData.content, receivedMessage],
            };
          });
        }
      );
    };

  return () => {
    Object.values(subscriptions.current).forEach((subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
    if (stompClient.current) {
      stompClient.current.deactivate();
    }
  };
}, [Actoken, userId]); // isTeam 의존성 제거

// 새로운 useEffect를 추가하여 isTeam 변경 시 구독 변경
useEffect(() => {
  if (stompClient.current && stompClient.current.connected) {
    // 기존 팀 구독 해제
    if (subscriptions.current.team) {
      subscriptions.current.team.unsubscribe();
    }

    // 새로운 팀 구독
    subscriptions.current.team = stompClient.current.subscribe(
      `/topic/chat/${isTeam}`,
      (message) => {
        const receivedMessage = JSON.parse(message.body);
        console.log("Team message:", receivedMessage);
        queryClient.setQueryData(["getMessage", isTeam], (oldData) => {
          return {
            ...oldData,
            content: [...(oldData?.content || []), receivedMessage],
          };
        });
      }
    );
  }
}, [isTeam, queryClient]);