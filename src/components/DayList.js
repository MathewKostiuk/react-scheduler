import React from "react";
import DayListItem from './DayListItem';

export default function DayList({
  days,
  day,
  setDay
}) {

  const mappedDays = days.map((singleDay) => {
    return <DayListItem
      key={singleDay.id}
      spots={singleDay.spots}
      name={singleDay.name}
      setDay={(event) => setDay(singleDay.name)}
      selected={singleDay.name === day}
    />
  });

  return(
    <ul>
      {mappedDays}
    </ul>
  )
}