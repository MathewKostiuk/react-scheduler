import React, { useEffect } from "react";
import "./style.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

import useVisualMode from '../../hooks/useVisualMode';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const EDIT = 'EDIT';
const CONFIRM = 'CONFIRM';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

// comment

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
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true))
  }

  function onEdit() {
    transition(EDIT);
  }

  function onDelete() {
    transition(SAVING, true);
    deleteInterview(id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true))
  }

  function onConfirm() {
    transition(CONFIRM);
  }

  useEffect(() => {
    if (interview && mode === EMPTY) {
      transition(SHOW);
    }
    if (interview === null && mode === SHOW) {
      transition(EMPTY);
    }
  }, [interview, transition, mode]);

  return (
    <article id={id} className="appointment">
      <Header time={time}/>
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && interview && (
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
      {mode === EDIT && (
        <Form
          interviewers={interviewers}
          onCancel={onCancel}
          onSave={onSave}
          name={interview.student}
          interviewer={interview.interviewer.id}
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
      {mode === ERROR_SAVE && (
        <Error
          message="Oops!"
          onClose={onCancel}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Oops!"
          onClose={onCancel}
        />
      )}
    </article>
  )
}
