import {INIT_STATE} from '../../constant';
import {
  ADD_VOTE_SUCCESS,
  CREATE_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  GET_COMMENT_FAILURE,
  GET_COMMENT_REQUEST,
  GET_COMMENT_SUCCESS,
  GET_RES_COMMENT_FAILURE,
  GET_RES_COMMENT_REQUEST,
  GET_RES_COMMENT_SUCCESS,
  GET_VOTE_BY_USER_ID_FAILURE,
  GET_VOTE_BY_USER_ID_REQUEST,
  GET_VOTE_BY_USER_ID_SUCCESS,
} from '../actions/type';

export default function commentReducer(state = INIT_STATE.comment, action) {
  switch (action.type) {
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.payload],
      };

    case GET_COMMENT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_COMMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        // voteList:
      };

    case GET_COMMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        data: state.data.filter(item => item.id !== action.payload),
      };

    case GET_RES_COMMENT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_RES_COMMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        noti: action.payload,
      };
    // console.log(action.payload);

    case GET_RES_COMMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case ADD_VOTE_SUCCESS:
      return {
        ...state,
        data: state.data.map(comment =>
          comment.id === action.payload.cmt_id
            ? {
                ...comment,
                upvote: action.payload.upvote,
                status: action.payload.status,
              }
            : comment,
        ),
        // voteList: state.voteList.includes(action.payload.user_id)
        //   ? state.voteList.splice(
        //       state.voteList.indexOf(action.payload.user_id),
        //       1,
        //     )
        //   : [...state.voteList, action.payload.user_id],
      };

    // ====
    case GET_VOTE_BY_USER_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_VOTE_BY_USER_ID_SUCCESS:
      return {
        ...state,
        voteList: action.payload,
      };
    // console.log(action.payload);

    case GET_VOTE_BY_USER_ID_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}
