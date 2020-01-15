import axios from 'axios';

export const getEngineer = token => dispatch => {
  axios
    .get(`https://hiringchannel-api.herokuapp.com/v1/engineer`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `.concat(token),
      },
    })
    .then(res => {
      console.log('res engineer list ', res);
      dispatch({
        type: 'GET_ENGINEER_FULFILLED',
        payload: res.data.result,
      });
    })

    .catch(err => {
      console.log(err);
    });
};
