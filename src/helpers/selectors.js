export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(stateDay => stateDay.name === day)[0];

  return filteredDays ? filteredDays.appointments.map(appointmentID => state.appointments[appointmentID]) : [];
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewer = state.interviewers[interview.interviewer];
  const retrievedInterview = {...interview, interviewer: interviewer}
  return retrievedInterview;
}

export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter(stateDay => stateDay.name === day)[0];

  return filteredDays ? filteredDays.interviewers.map(interviewerID => state.interviewers[interviewerID]) : [];
}