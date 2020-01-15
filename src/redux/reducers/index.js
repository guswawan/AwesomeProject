import {combineReducers} from 'redux';
import engineerProfile from './Engineer/engineerProfile';
import engineerList from './Engineer/engineerList';
import companyProfile from './Company/companyProfile';
import project from './Project/project';

const rootReducer = combineReducers({
  engineerProfile,
  engineerList,
  companyProfile,
  project,
});

export default rootReducer;
