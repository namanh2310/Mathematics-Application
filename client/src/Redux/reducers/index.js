import {combineReducers} from 'redux';
import auth from './auth';
import post from './post';
import comment from './comment';
// import vote from './vote';

export default combineReducers({
  auth,
  post,
  comment,
});
