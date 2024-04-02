import {takeLatest, call, put} from 'redux-saga/effects';
import * as actions from '../actions';
import * as api from '../../apis';
import {
  REGISTER_REQUEST,
  LOGIN_REQUEST,
  CREATE_POST_REQUEST,
  GET_POST_REQUEST,
  DELETE_POST_REQUEST,
  CREATE_COMMENT_REQUEST,
  GET_RES_COMMENT_REQUEST,
  GET_COMMENT_REQUEST,
  DELETE_COMMENT_REQUEST,
  GET_POST_BY_ID_REQUEST,
  UPDATE_POST_REQUEST,
  ADD_VOTE_REQUEST,
  GET_VOTE_BY_USER_ID_REQUEST,
} from '../actions/type';

function* registerSaga(action) {
  try {
    const register = yield call(api.register, action.payload);
    yield put(actions.registerSuccess(register.data));
  } catch (error) {
    console.error(error);
    yield put(actions.registerFailure(error));
  }
}

function* loginSaga(action) {
  try {
    const login = yield call(api.login, action.payload);
    yield put(actions.loginSuccess(login.data));
  } catch (error) {
    console.error(error);
    yield put(actions.loginFailure(error));
  }
}

function* getPostSaga() {
  try {
    const getPost = yield call(api.getPost);
    yield put(actions.getPostSuccess(getPost.data));
  } catch (error) {
    console.error(error);
    yield put(actions.getPostFailure(error));
  }
}

function* getPostByIdSaga(action) {
  try {
    const getPostById = yield call(api.getPostbyID, action.payload);
    yield put(actions.getPostByIdSuccess(getPostById.data));
  } catch (error) {
    console.error(error);
    yield put(actions.getPostByIdFailure(error));
  }
}

function* createPostSaga(action) {
  try {
    const createPost = yield call(api.creatPost, action.payload);
    yield put(actions.createPostSuccess(createPost.data));
  } catch (error) {
    console.error(error);
    yield put(actions.createPostFailure(error));
  }
}

function* deletePostSaga(action) {
  try {
    const deletePost = yield call(api.deletePost, action.payload);
    yield put(actions.deletePostSuccess(deletePost.data));
  } catch (error) {
    console.error(error);
    yield put(actions.deletePostFailure(error));
  }
}

function* updatePostSaga(action) {
  try {
    const updatePost = yield call(api.updatePost, action.payload);
    yield put(actions.updatePostSuccess(updatePost.data));
  } catch (error) {
    console.error(error);
    yield put(actions.updatePostFailure(error));
  }
}

function* createCommentSaga(action) {
  try {
    const createComment = yield call(api.createComment, action.payload);
    yield put(actions.createCommentSuccess(createComment.data));
  } catch (error) {
    console.error(error);
    yield put(actions.createCommentFailure(error));
  }
}

function* getCommentsSaga(action) {
  try {
    const getComments = yield call(api.getComments, action.payload);
    yield put(actions.getCommentsSuccess(getComments.data));
  } catch (error) {
    console.error(error);
    yield put(actions.getCommentsFailure(error));
  }
}

function* getResCmtSaga(action) {
  try {
    const getResCmt = yield call(api.getResComment, action.payload);
    yield put(actions.getResCmtSuccess(getResCmt.data));
  } catch (error) {
    console.error(error);
    yield put(actions.getResCmtFailure(error));
  }
}

function* deleteCommentSaga(action) {
  try {
    const deleteComment = yield call(api.deleteComment, action.payload);
    yield put(actions.deleteCommentSuccess(deleteComment.data));
  } catch (error) {
    console.error(error);
    yield put(actions.deleteCommentFailure(error));
  }
}

function* addVoteSaga(action) {
  try {
    const addVote = yield call(api.addVote, action.payload);
    yield put(actions.addVoteSuccess(addVote.data));
  } catch (error) {
    console.error(error);
    yield put(actions.addVoteFailure(error));
  }
}

function* getVoteByUserIdSaga(action) {
  try {
    const getVoteByUserId = yield call(api.getVoteByUserID, action.payload);
    yield put(actions.getVoteByUserIdSuccess(getVoteByUserId.data));
  } catch (error) {
    console.error(error);
    yield put(actions.getVoteByUserIdFailure(error));
  }
}

function* mySaga() {
  yield takeLatest(REGISTER_REQUEST, registerSaga);
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(GET_POST_REQUEST, getPostSaga);
  yield takeLatest(GET_POST_BY_ID_REQUEST, getPostByIdSaga);
  yield takeLatest(CREATE_POST_REQUEST, createPostSaga);
  yield takeLatest(DELETE_POST_REQUEST, deletePostSaga);
  yield takeLatest(UPDATE_POST_REQUEST, updatePostSaga);
  yield takeLatest(CREATE_COMMENT_REQUEST, createCommentSaga);
  yield takeLatest(DELETE_COMMENT_REQUEST, deleteCommentSaga);
  yield takeLatest(GET_COMMENT_REQUEST, getCommentsSaga);
  yield takeLatest(GET_RES_COMMENT_REQUEST, getResCmtSaga);
  yield takeLatest(ADD_VOTE_REQUEST, addVoteSaga);
  yield takeLatest(GET_VOTE_BY_USER_ID_REQUEST, getVoteByUserIdSaga);
}

export default mySaga;
