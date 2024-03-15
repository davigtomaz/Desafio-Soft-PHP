import UserActionTypes from "./actionTypes"

export const loginUser = (payload) => ({
    type: UserActionTypes.Login,
    payload

})

export const LogoutUser = () => ({
    type: UserActionTypes.Logout,
    
})