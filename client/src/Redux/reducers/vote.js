// import {INIT_STATE} from '../../constant';
// import {ADD_VOTE_SUCCESS} from '../actions/type';

// export default function voteReducer(state = INIT_STATE.comment, action) {
//   switch (action.type) {
//     case ADD_VOTE_SUCCESS:
//       return {
//         ...state,
//         data: state.data.map(comment =>
//           comment.id === action.payload.cmt_id
//             ? {...comment, upvote: action.payload.upvote}
//             : comment,
//         ),
//       };
//     //   console.log(action.payload.upvote);

//     default:
//       return state;
//   }
// }
