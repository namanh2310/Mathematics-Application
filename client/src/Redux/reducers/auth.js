import {INIT_STATE} from '../../constant';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
} from '../actions/type';

export default function authReducer(state = INIT_STATE.auth, action) {
  switch (action.type) {
    // case REGISTER_REQUEST:
    //   return {
    //     ...state,
    //     isLogin: false,
    //   };

    case REGISTER_SUCCESS:
      return {
        ...state,
        register: action.payload.register,
      };

    // case REGISTER_FAILURE:
    //   return {
    //     ...state,
    //   };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: action.payload.status,
        userName: `${action.payload.firstName} ${action.payload.lastName}`,
        email: action.payload.email,
        id: action.payload.id,
        role: action.payload.role,
        data: [...state.data, action.payload],
      };

    case LOGOUT:
      return {
        message: null,
        register: false,
        isLogin: false,
        userName: null,
        data: [],
      };
    default:
      return state;
  }
}
