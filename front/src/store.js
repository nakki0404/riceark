// src/store.js
import { createStore } from 'redux';
import rootReducer from './reducers';


const store = createStore(rootReducer);

export default store;

//store reducer 각각 콤바인 하던게 문제였음