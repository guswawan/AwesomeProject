import axios from 'axios';

export const getEngineerProfile = token => dispatch => {
  axios
    .get('https://hiringchannel-api.herokuapp.com/v1/engineer/profile', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `.concat(token),
      },
    })
    .then(res => {
      console.log('res ACTION PAYLOAD ', res.data.data[0]);
      dispatch({
        type: 'GET_ENG_PROFILE_FULFILLED',
        payload: res.data.data[0],
      });
    })
    .catch(err => {
      console.log(err);
    });
};
