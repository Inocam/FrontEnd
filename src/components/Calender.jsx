import { useEffect } from "react";
import { useState } from "react";
import * as S from "../styles/index.style";
import { setDate } from "../store/module/Date";
import { useDispatch } from "react-redux";
import { useGetTaskcount } from "../api/task/useTask";
import { useQueryClient } from "@tanstack/react-query";
const Calendarcom = () => {
  const { Taskcount = {}, isLoading, isError } = useGetTaskcount();
  console.log(Taskcount);
  const dispatch = useDispatch();

  const [currentDate, setCurrentDate] = useState(new Date());

  const Tdate = {
    Year: currentDate.getFullYear(),
    Month: currentDate.getMonth() + 1,
  };

  const onDayClick = (year, month, day, lastday) => {
    dispatch(setDate({ Date: { year, month, day, lastday } }));
  };

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const startDay = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const prevMonth = () => {
    const prevDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    onDayClick(prevDate.getFullYear(), prevDate.getMonth() + 1, 1, 31); // month에 +1 추가
    setCurrentDate(prevDate);
  };

  const nextMonth = () => {
    const nextDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    onDayClick(nextDate.getFullYear(), nextDate.getMonth() + 1, 1, 31); // month에 +1 추가
    setCurrentDate(nextDate);
  };
  const renderCalendar = () => {
    const totalDays = daysInMonth(currentDate);
    const startingDay = startDay(currentDate);
    const blanks = Array(startingDay).fill(null);
    const back = 7 - ((totalDays + startingDay) % 7);
    const backBlanks = Array(back == 7 ? 0 : back).fill(null);
    const days = Array.from({ length: totalDays }, (_, i) => i + 1);
    const allDays = [...blanks, ...days, ...backBlanks];
    console.log(Math.max(...allDays));
    return (
      <S.calender.CalendarGrid>
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <S.calender.DayHeader key={day}>{day}</S.calender.DayHeader>
        ))}
        {allDays.map((day, index) => {
          return (
            <S.calender.Day
              key={index}
              onClick={
                day
                  ? () =>
                      onDayClick(
                        Tdate.Year,
                        Tdate.Month,
                        day,
                        Math.max(...allDays)
                      )
                  : () => {}
              }
            >
              {<p>{day}</p>}
              {
                <div>
                  {day &&
                    Taskcount[
                      `${Tdate.Year}-${Tdate.Month.toString().padStart(
                        2,
                        "0"
                      )}-${day?.toString().padStart(2, "0")}`
                    ]}
                </div>
              }
            </S.calender.Day>
          );
        })}
      </S.calender.CalendarGrid>
    );
  };
  return (
    <S.calender.CalendarWrapper>
      <S.calender.Fdiv>
        <S.calender.Title>
          <S.calender.Button onClick={() => prevMonth()}>
            {"<"}
          </S.calender.Button>
          {Tdate.Year}년 {Tdate.Month}월
          <S.calender.Button onClick={() => nextMonth()}>
            {">"}
          </S.calender.Button>
        </S.calender.Title>
      </S.calender.Fdiv>
      {renderCalendar()}
    </S.calender.CalendarWrapper>
  );
};

export default Calendarcom;
