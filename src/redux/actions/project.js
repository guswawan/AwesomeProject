import axios from 'axios';

export const getProject = token => dispatch => {
  axios
    .get('https://hiringchannel-api.herokuapp.com/v1/project', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `.concat(token),
      },
    })
    .then(res => {
      console.log('res ACTION PAYLOAD ', res.data.data[0]);
      dispatch({
        type: 'GET_PROJECT_FULFILLED',
        payload: res.data.data[0],
      });
    })
    .catch(err => {
      console.log(err);
    });
};
