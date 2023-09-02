// src/actions.js
export const ADD_ITEM = 'ADD_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

export const ADD_LIST = 'ADD_LIST';
export const UPDATE_LIST = 'UPDATE_LIST';
export const DELETE_LIST = 'DELETE_LIST';

export const ADD_REPORT = 'ADD_REPORT';
export const UPDATE_REPORT = 'UPDATE_REPORT';
export const DELETE_REPORT = 'DELETE_REPORT';

export const SET_TOKEN = 'SET_TOKEN';

export const ADD_TRADE_DATA = 'ADD_TRADE_DATA';

export const LOGIN_STATE = 'LOGIN_STATE';
export const LOGOUT_STATE = 'LOGOUT_STATE';
export const loginState = (isLogin) => ({
  type: LOGIN_STATE,
  payload: isLogin,
});
export const logoutState = (isLogin) => ({
  type: LOGOUT_STATE,
  payload: isLogin,
});

export const addTrade_data = (Trade_datas) => ({
  type: ADD_TRADE_DATA,
  payload: Trade_datas,
});

export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: token,
});

export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});

export const updateItem = (item) => ({
  type: UPDATE_ITEM,
  payload: item,
});

export const deleteItem = (itemId) => ({
  type: DELETE_ITEM,
  payload: itemId,
});

export const addList = (list) => ({
  type: ADD_LIST,
  payload: list,
});

export const updateList = (list) => ({
  type: UPDATE_LIST,
  payload: list,
});

export const deleteList = (_Id) => ({
  type: DELETE_LIST,
  payload: _Id,
});

export const addReport = (report) => ({
  type: ADD_REPORT,
  payload: report,
});

export const updateReport = (report) => ({
  type: UPDATE_REPORT,
  payload: report,
});

export const deleteReport = (report) => ({
  type: DELETE_REPORT,
  payload: report,
});