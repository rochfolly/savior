import { INIT_FIREBASE, SET_USER } from '../actions/actionTypes'

const initialState = {
    userID: null,
    username: '',
    user: null,
    firebase: null,
    lastLogin: null
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
            const { user, uid, name }  = action.payload;
            return {
              ...state,
              user: user,
              userID: uid,
              username: name
            };
          }
        default:
            return state
    }
}