export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(stateDay => stateDay.name === day)[0];

  return filteredDays ? filteredDays.appointments.map(appointmentID => state.appointments[appointmentID]) : [];
}