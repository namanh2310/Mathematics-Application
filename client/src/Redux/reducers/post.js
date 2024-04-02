import {INIT_STATE} from '../../constant';
import {
  ADD_VOTE_SUCCESS,
  CREATE_POST_SUCCESS,
  DELETE_POST_SUCCESS,
  GET_POST_BY_ID_FAILURE,
  GET_POST_BY_ID_REQUEST,
  GET_POST_BY_ID_SUCCESS,
  GET_POST_FAILURE,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  UPDATE_POST_SUCCESS,
} from '../actions/type';

export default function postReducer(state = INIT_STATE.post, action) {
  switch (action.type) {
    case GET_POST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };

    case GET_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case GET_POST_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_POST_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentPost: action.payload,
      };

    case GET_POST_BY_ID_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case CREATE_POST_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.payload],
      };

    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        data: state.data.map(post =>
          post.id === action.payload.id ? action.payload : post,
        ),
      };

    // console.log(action.payload);

    case DELETE_POST_SUCCESS:
      return {
        ...state,
        data: state.data.filter(item => item.id !== action.payload),
      };

    default:
      return state;
  }
}
