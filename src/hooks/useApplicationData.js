import { useEffect, useReducer } from "react";
import axios from "axios";

export default function useApplicationData() {

  const initialState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  }

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_SPOTS = "SET_SPOTS";

  const reducers = {
    [SET_DAY]: (state, { day }) => {
      return { ...state, day }
    },
    [SET_APPLICATION_DATA]: (state, {days, appointments, interviewers}) => {
      return { ...state, days, appointments, interviewers }
    },
    [SET_INTERVIEW]: (state, { id, interview }) => {
      const appointment = {
        ...state.appointments[id],
        interview: interview
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      return { ...state, appointments }
    },
    [SET_SPOTS]: (state, { modifier }) => {
      const days = state.days.map((item) => {
        if (item.name !== state.day) {
          return item;
        } else {
          item.spots += modifier;
          return item;
        }
      })
      return { ...state, days }
    }
  }

  function reducer(state, action) {
    return reducers[action.type](state, action) || state;
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const setDay = day => dispatch({ type: SET_DAY, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(([days, appointments, interviewers]) => {
      dispatch({ type: SET_APPLICATION_DATA, days: days.data, appointments: appointments.data, interviewers: interviewers.data });
    })
  }, []);

  async function bookInterview(id, interview) {

    await axios.put(`/api/appointments/${id}`, { interview });
    dispatch({ type: SET_INTERVIEW, id, interview });
    dispatch({ type: SET_SPOTS, modifier: -1 });
  }

  async function deleteInterview(id) {

    await axios.delete(`/api/appointments/${id}`);
    dispatch({ type: SET_INTERVIEW, id, interview: null });
    dispatch({ type: SET_SPOTS, modifier: 1 });
  }

  return { state, setDay, bookInterview, deleteInterview };
}
