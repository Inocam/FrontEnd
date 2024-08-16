import { createSlice } from "@reduxjs/toolkit";
import { Client } from "@stomp/stompjs";

const websocketSlice = createSlice({
  name: "websocket",
  initialState: {
    stompClient: null,
    subscriptions: {},
    isConnected: false,
  },
  reducers: {
    initializeWebSocket: (state, action) => {
      const { brokerURL, token } = action.payload;
      if (!state.stompClient) {
        state.stompClient = new Client({
          brokerURL,
          connectHeaders: {
            Authorization: `Bearer ${token}`,
          },
          debug: function (str) {},
          reconnectDelay: 5000,
          heartbeatIncoming: 4000,
          heartbeatOutgoing: 4000,
        });

        state.stompClient.onConnect = () => {
          state.isConnected = true;
        };

        state.stompClient.onStompError = (frame) => {
          console.error("STOMP error: ", frame.headers.message);
        };

        state.stompClient.activate();
      }
    },
    addSubscription: (state, action) => {
      const { name, destination, callback } = action.payload;
      if (
        state.stompClient &&
        state.isConnected &&
        !state.subscriptions[name]
      ) {
        const subscription = state.stompClient.subscribe(destination, callback);
        state.subscriptions[name] = subscription;
      }
    },
    removeSubscription: (state, action) => {
      const { name } = action.payload;
      if (state.subscriptions[name]) {
        state.subscriptions[name].unsubscribe();
        delete state.subscriptions[name];
      }
    },
    disconnectWebSocket: (state) => {
      if (state.stompClient) {
        Object.values(state.subscriptions).forEach((subscription) => {
          subscription.unsubscribe();
        });
        state.stompClient.deactivate();
        state.stompClient = null;
        state.isConnected = false;
        state.subscriptions = {};
      }
    },
  },
});

export const {
  initializeWebSocket,
  addSubscription,
  removeSubscription,
  disconnectWebSocket,
} = websocketSlice.actions;
export default websocketSlice.reducer;
