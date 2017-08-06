import { combineReducers } from 'redux';
import resultReducer from './resultReducer';

const rootReducer = combineReducers({
  results: resultReducer
});


export default rootReducer;
