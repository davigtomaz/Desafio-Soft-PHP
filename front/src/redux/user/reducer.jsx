import UserActionTypes from "./actionTypes";

const initialState = {
    currentUser: null,
    Logged: false
};

const userReducer = (state = initialState, action) =>  {

    switch(action.type){
        case UserActionTypes.Login:
            return {...state, currentUser: action.payload, Logged: true}
        case UserActionTypes.Logout:
            return { ...state, currentUser: {code: 0}, Logged: false}
        default:
            return state
        }

    }
export default userReducer