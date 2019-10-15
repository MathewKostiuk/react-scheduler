import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from './InterviewerListItem';


export default function InterviewerList({
  interviewers,
  value,
  onChange
}) {

  function isSelected(value, id) {
    return value === id ? true : false;
  }
  const mappedInterviewers = interviewers.map((singleInterviewer) => {
    return <InterviewerListItem
      key={singleInterviewer.id}
      name={singleInterviewer.name}
      avatar={singleInterviewer.avatar}
      selected={value && value.id === singleInterviewer.id}
      setInterviewer={(event) => onChange(singleInterviewer.id)}
    />
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {mappedInterviewers}
      </ul>
    </section>
  )
}