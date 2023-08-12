import {createStore} from 'redux';
import reducer from './TaskReducer';

// Create a Redux store by passing the reducer function to createStore
const store = createStore(reducer);

// Export the created Redux store to be used in other parts of the application
export default store;
