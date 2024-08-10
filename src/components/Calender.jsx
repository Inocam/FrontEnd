import { useEffect } from "react";
import { useState } from "react";
import * as S from "../styles/index.style";
import { setDate } from "../store/module/Date";
import { useDispatch } from "react-redux";
const Calendarcom = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const Tdate = {
    Year: currentDate.getFullYear(),
    Month: currentDate.getMonth() + 1,
  };
  const dispatch = useDispatch();

  const onDayClick = (year, month, day, lastday) => {
    dispatch(setDate({ Date: { year, month, day, lastday } }));
  };
  useEffect(() => {
    onDayClick(null);
  }, [currentDate]);

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const startDay = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
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
        {allDays.map((day, index) => (
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
          </S.calender.Day>
        ))}
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
