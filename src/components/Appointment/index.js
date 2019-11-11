import React from "react";
import "./style.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from './Status';
import Confirm from './Confirm';

import useVisualMode from '../../hooks/useVisualMode';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const EDIT = 'EDIT';
const CONFIRM = 'CONFIRM';



export default function Appointment ({
  time,
  id,
  interview,
  interviewers,
  bookInterview,
  deleteInterview
}) {

  const { mode, transition, back} = useVisualMode(
    interview ? SHOW : EMPTY
  );

  function onAdd() {
    transition(CREATE);
  }

  function onCancel() {
    back();
  }

  function onSave (name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    }

    bookInterview(id, interview)
      .then(() => {
        transition(SHOW);
      })
  }

  function onEdit() {
    transition(EDIT);
  }

  function onDelete() {
    transition(SAVING);
    deleteInterview(id)
      .then(() => {
        transition(EMPTY);
      })
  }

  function onConfirm() {
    transition(CONFIRM);
  }

  return (
    <article id={id} className="appointment">
      <Header time={time}/>
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onEdit={onEdit}
          onDelete={onConfirm}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={onCancel}
          onSave={onSave}
        />
      )}
      {mode === SAVING && (
        <Status
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          onCancel={onCancel}
          onConfirm={onDelete}
        />
      )}
    </article>
  )
}