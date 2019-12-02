import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  function reset() {
    setName("");
    setInterviewer(null);
  }

  function cancel() {
    reset();
    props.onCancel();
  }

  function submitHandler(event) {
    event.preventDefault();
  }

  function onSave() {
    validate();
  }

  function validate() {
    if (name === '') {
      setError("Student name cannot be blank");
      return;
    }
    props.onSave(name, interviewer);
  }

  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => submitHandler(event)}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={event => setName(event.target.value)}
            value={name}
            data-testid="student-name-input"
          /*
            This must be a controlled component
          */
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={onSave}>Save</Button>
        </section>
      </section>
    </main>
  )
}
