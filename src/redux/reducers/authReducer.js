import { INIT_FIREBASE, SET_USER } from '../actions/actionTypes'

const initialState = {
    userID: null,
    username: '',
    user: null,
    firebase: null,
}

export default function(state = initialState, action) {
    switch (action.type) {
        case INIT_FIREBASE: {
            const firebaseEntity = action.payload;
            return {
              ...state,
              firebase: firebaseEntity
            };
          }
          case SET_USER: {
            const { user, uid }  = action.payload;
            return {
              ...state,
              user: user,
              userID: uid
            };
          }
        default:
            return state
    }
}