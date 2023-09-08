import { combineReducers } from "redux";

import { ADD_ITEM, UPDATE_ITEM, DELETE_ITEM } from "./actions";
import { ADD_LIST, UPDATE_LIST, DELETE_LIST } from "./actions";
import { ADD_REPORT, UPDATE_REPORT, DELETE_REPORT } from "./actions";
import { SET_TOKEN } from "./actions";

import { ADD_TRADE_DATA } from "./actions";

import { LOGIN_STATE, LOGOUT_STATE } from "./actions";

const initialsLoginstate = {
  isLogin: localStorage.getItem("token") !== null,
};

const isLoginReducer = (state = initialsLoginstate, action) => {
  switch (action.type) {
    case LOGIN_STATE:
      return { ...state, isLogin: action.payload };
    case LOGOUT_STATE:
      return { ...state, isLogin: action.payload };
    default:
      return state;
  }
};

const initialTrade_dataState = {
  trade_datas: [],
};

const trade_datasReducer = (state = initialTrade_dataState, action) => {
  switch (action.type) {
    case ADD_TRADE_DATA:
      return { ...state, trade_datas: [...state.trade_datas, action.payload] };
    default:
      return state;
  }
};

const initialtokenState = {
  token: null,
};

const tokenReducer = (state = initialtokenState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

const initialItemsState = {
  items: [],
};

const itemsReducer = (state = initialItemsState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return { ...state, items: [...state.items, ...action.payload] };
    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

const initialListsState = {
  lists: [],
};

const listsReducer = (state = initialListsState, action) => {
  switch (action.type) {
    case ADD_LIST:
      //중복방지 필요 제목 중복 빈 리스트 0개 항목
      if (
        state.lists.some((item) => item.Title === action.payload.Title) ||
        action.payload.List.some((item) => item.Quantity === 0) ||
        action.payload.List.length === 0
      ) {
        return { ...state };
        //이프 엘쓰 마다 리턴안해서 개지ㅏㄹ남
        //빈배열 확인은 배열 렝쓰로 확인하는게 맞다 ===[] 개질ㄹ이다
        // 배열 내의 어떤 객체의 Title이 action.payload.Title과 일치하는 경우
        // 여기에 수행할 작업을 작성합니다.
      } else return { ...state, lists: [...state.lists, action.payload] };
    case UPDATE_LIST:
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.Title === action.payload.Title ? action.payload : list
        ),
      };
    case DELETE_LIST:
      return {
        ...state,
        lists: state.lists.filter((list) => list.Title !== action.payload),
      };
    default:
      return state;
  }
  //좋아요 싫어요 문제 파라미터 수정으로 해결 _ㅑㅇ > 샤싣
};

const initialReportsState = {
  reports: [],
};

const reportsReducer = (state = initialReportsState, action) => {
  switch (action.type) {
    case ADD_REPORT:
      if (
        state.reports.find(
          (item) =>
            item.Title === action.payload.Title &&
            item.Body === action.payload.Body
        )
      )
        return { ...state };
      return { ...state, reports: [...state.reports, action.payload] };
    case UPDATE_REPORT:
      return {
        ...state,
        reports: state.reports.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case DELETE_REPORT:
      return {
        ...state,
        reports: state.reports.filter(
          (item) => item.Title !== action.payload.Title
        ),
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  items: itemsReducer,
  lists: listsReducer,
  reports: reportsReducer,
  token: tokenReducer,
  trade_datas: trade_datasReducer,
  isLogin: isLoginReducer,
});

export default rootReducer;
