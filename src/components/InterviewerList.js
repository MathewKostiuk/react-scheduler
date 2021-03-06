import React from "react";
import PropTypes from 'prop-types';

import "components/InterviewerList.scss";
import InterviewerListItem from './InterviewerListItem';


export default function InterviewerList({
  interviewers,
  value,
  onChange
}) {

  const mappedInterviewers = interviewers.map((singleInterviewer) => {
    return <InterviewerListItem
      key={singleInterviewer.id}
      name={singleInterviewer.name}
      avatar={singleInterviewer.avatar}
      selected={value && value === singleInterviewer.id}
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

InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
}
