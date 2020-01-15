const initialState = {
  companyProfile: [],
  isPending: false,
  isRejected: false,
  isFulfilled: false,
};

const getCompanyProfile = (State = initialState, action) => {
  switch (action.type) {
    case 'GET_COMPANY_PROFILE_PENDING':
      return {
        ...State,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'GET_COMPANY_PROFILE_REJECTED':
      return {
        ...State,
        isPending: false,
        isRejected: true,
      };
    case 'GET_COMPANY_PROFILE_FULFILLED':
      console.log('ACTION PAYLOAD ', action.payload);
      return {
        ...State,
        isPending: false,
        isFulfilled: true,
        companyProfile: action.payload,
      };
    default:
      return State;
  }
};

export default getCompanyProfile;
