import React from "react";
import "components/InterviewerListItem.scss";

const classNames = require('classnames');

export default function InterviewerListItem({
  id,
  name,
  avatar,
  selected,
  setInterviewer
}) {

  const interviewerListItemClass = classNames({
    'interviewers__item': true,
    'interviewers__item--selected': selected
  })

  return(
    <li className={interviewerListItemClass}
        key={id}
        selected={selected}
        onClick={setInterviewer}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
</li>
  );
};