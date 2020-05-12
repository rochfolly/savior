import { INIT_FIREBASE, SET_USER } from '../actions/actionTypes'

const initialState = {
    username: '',
    user: {},
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
            const { user }  = action.payload;
            return {
              ...state,
              user: user
            };
          }
        default:
            return state
    }
}