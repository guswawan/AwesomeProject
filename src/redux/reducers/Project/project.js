const initialState = {
  project: [],
  isPending: false,
  isRejected: false,
  isFulfilled: false,
};

const getProject = (State = initialState, action) => {
  switch (action.type) {
    case 'GET_PROJECT_PENDING':
      return {
        ...State,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'GET_PROJECT_REJECTED':
      return {
        ...State,
        isPending: false,
        isRejected: true,
      };
    case 'GET_PROJECT_FULFILLED':
      console.log('ACTION PAYLOAD ', action.payload);
      return {
        ...State,
        isPending: false,
        isFulfilled: true,
        project: action.payload,
      };
    default:
      return State;
  }
};

export default getProject;
