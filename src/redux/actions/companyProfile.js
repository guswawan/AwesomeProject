import axios from 'axios';

export const getCompanyProfile = token => dispatch => {
  axios
    .get('https://hiringchannel-api.herokuapp.com/v1/company/profile', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `.concat(token),
      },
    })
    .then(res => {
      console.log('res ACTION PAYLOAD ', res.data.data[0]);
      dispatch({
        type: 'GET_COMPANY_PROFILE_FULFILLED',
        payload: res.data.data[0],
      });
    })
    .catch(err => {
      console.log(err);
    });
};
