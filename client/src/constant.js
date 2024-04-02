export const INIT_STATE = {
  auth: {
    message: null,
    register: false,
    isLogin: false,
    userName: null,
    data: [],
  },
  post: {
    isLoading: false,
    lastName: null,
    firstName: null,
    data: [],
    currentPost: [],
  },
  comment: {
    isLoading: false,
    voteList: [],
    data: [],
    noti: [],
  },
  vote: {
    data: [],
  },
};
