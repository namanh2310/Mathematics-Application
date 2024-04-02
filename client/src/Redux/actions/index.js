import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  LOGOUT,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAILURE,
  GET_RES_COMMENT_REQUEST,
  GET_RES_COMMENT_SUCCESS,
  GET_RES_COMMENT_FAILURE,
  GET_COMMENT_REQUEST,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  GET_POST_BY_ID_REQUEST,
  GET_POST_BY_ID_SUCCESS,
  GET_POST_BY_ID_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  ADD_VOTE_REQUEST,
  ADD_VOTE_SUCCESS,
  ADD_VOTE_FAILURE,
  GET_VOTE_BY_USER_ID_REQUEST,
  GET_VOTE_BY_USER_ID_SUCCESS,
  GET_VOTE_BY_USER_ID_FAILURE,
} from './type';

export const registerRequest = payload => ({
  type: REGISTER_REQUEST,
  payload: payload,
});

export const registerSuccess = payload => ({
  type: REGISTER_SUCCESS,
  payload: payload,
});

export const registerFailure = error => ({
  type: REGISTER_FAILURE,
  payload: error,
});

// ===== LOGIN

export const loginRequest = payload => ({
  type: LOGIN_REQUEST,
  payload: payload,
});

export const loginSuccess = payload => ({
  type: LOGIN_SUCCESS,
  payload: payload,
});

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: error,
});

//=== LOG OUT

export const logout = () => ({
  type: LOGOUT,
});

//==== GET POST

export const getPostRequest = () => ({
  type: GET_POST_REQUEST,
});

export const getPostSuccess = payload => ({
  type: GET_POST_SUCCESS,
  payload: payload,
});

export const getPostFailure = error => ({
  type: GET_POST_FAILURE,
  payload: error,
});

//==== GET POST BY ID

export const getPostByIdRequest = payload => ({
  type: GET_POST_BY_ID_REQUEST,
  payload: payload,
});

export const getPostByIdSuccess = payload => ({
  type: GET_POST_BY_ID_SUCCESS,
  payload: payload,
});

export const getPostByIdFailure = error => ({
  type: GET_POST_BY_ID_FAILURE,
  payload: error,
});

//==== CREATE POST

export const createPostRequest = payload => ({
  type: CREATE_POST_REQUEST,
  payload: payload,
});

export const createPostSuccess = payload => ({
  type: CREATE_POST_SUCCESS,
  payload: payload,
});

export const createPostFailure = error => ({
  type: CREATE_POST_FAILURE,
  payload: error,
});

//==== DELETE POST

export const deletePostRequest = payload => ({
  type: DELETE_POST_REQUEST,
  payload: payload,
});

export const deletePostSuccess = payload => ({
  type: DELETE_POST_SUCCESS,
  payload: payload,
});

export const deletePostFailure = error => ({
  type: DELETE_POST_FAILURE,
  payload: error,
});

//==== UPDATE POST

export const updatePostRequest = (postId, input) => ({
  type: UPDATE_POST_REQUEST,
  payload: {postId, input},
});

export const updatePostSuccess = payload => ({
  type: UPDATE_POST_SUCCESS,
  payload: payload,
});

export const updatePostFailure = error => ({
  type: UPDATE_POST_FAILURE,
  payload: error,
});

// ==== CREATE CMT

export const createCommentRequest = (postId, input) => ({
  type: CREATE_COMMENT_REQUEST,
  payload: {postId, input},
});

export const createCommentSuccess = payload => ({
  type: CREATE_COMMENT_SUCCESS,
  payload: payload,
});

export const createCommentFailure = error => ({
  type: CREATE_COMMENT_FAILURE,
  payload: error,
});

//==== GET CMT

export const getCommentsRequest = payload => ({
  type: GET_COMMENT_REQUEST,
  payload: payload,
});

export const getCommentsSuccess = payload => ({
  type: GET_COMMENT_SUCCESS,
  payload: payload,
});

export const getCommentsFailure = error => ({
  type: GET_COMMENT_FAILURE,
  payload: error,
});

//==== GET RES CMT

export const getResCmtRequest = payload => ({
  type: GET_RES_COMMENT_REQUEST,
  payload: payload,
});

export const getResCmtSuccess = payload => ({
  type: GET_RES_COMMENT_SUCCESS,
  payload: payload,
});

export const getResCmtFailure = error => ({
  type: GET_RES_COMMENT_FAILURE,
  payload: error,
});

//==== DEL CMT

export const deleteCommentRequest = payload => ({
  type: DELETE_COMMENT_REQUEST,
  payload: payload,
});

export const deleteCommentSuccess = payload => ({
  type: DELETE_COMMENT_SUCCESS,
  payload: payload,
});

export const deleteCommentFailure = error => ({
  type: DELETE_COMMENT_FAILURE,
  payload: error,
});

// ==== ADD VOTE

export const addVoteRequest = payload => ({
  type: ADD_VOTE_REQUEST,
  payload: payload,
});

export const addVoteSuccess = payload => ({
  type: ADD_VOTE_SUCCESS,
  payload: payload,
});

export const addVoteFailure = error => ({
  type: ADD_VOTE_FAILURE,
  payload: error,
});

//==== GET VOTE BY USER ID

export const getVoteByUserIdRequest = payload => ({
  type: GET_VOTE_BY_USER_ID_REQUEST,
  payload: payload,
});

export const getVoteByUserIdSuccess = payload => ({
  type: GET_VOTE_BY_USER_ID_SUCCESS,
  payload: payload,
});

export const getVoteByUserIdFailure = error => ({
  type: GET_VOTE_BY_USER_ID_FAILURE,
  payload: error,
});
