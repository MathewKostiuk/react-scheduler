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
    [SET_SPOTS]: (state, { id }) => {
      const days = state.days.map((day) => {
        if (day.appointments.indexOf(id) > -1) {
          let spotsRemaining = 0;
          day.appointments.forEach((appointment) => {
            if (state.appointments[appointment].interview === null) {
              spotsRemaining++;
            }
          });
          day.spots = spotsRemaining;
          return day;
        } else {
          return day;
        }
      });

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
    }).catch((error) => {
      return;
    })

    const wss = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    wss.onopen = () => {
      wss.send(JSON.stringify('ping'));
    }

    wss.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'SET_INTERVIEW') {
        dispatch({ type: SET_INTERVIEW, id: data.id, interview: data.interview });
        dispatch({ type: SET_SPOTS, id: data.id });
      }
    }
  }, []);

  async function bookInterview(id, interview) {

    try {
      await axios.put(`/api/appointments/${id}`, { interview });
      dispatch({ type: SET_INTERVIEW, id, interview });
      dispatch({ type: SET_SPOTS, id });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteInterview(id) {

    try {
      await axios.delete(`/api/appointments/${id}`);
      dispatch({ type: SET_INTERVIEW, id, interview: null });
      dispatch({ type: SET_SPOTS, id });
    } catch (error) {
      console.log(error);
    }
  }

  return { state, setDay, bookInterview, deleteInterview };
}
