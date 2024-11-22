import { DELETE_USER, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, NEW_DATA } from "./actionTypes"

export const getUserRequest=()=>{
    return {type:GET_USER_REQUEST}
}

export const getUserSuccess=(payload)=>{
    return {type:GET_USER_SUCCESS, payload:payload}
}

export const getUserFailure=()=>{
    return {type:GET_USER_FAILURE}
}


export const deleteUser=(payload)=>{
    return {type:DELETE_USER,payload:payload}
}


export const sendNewData=(payload)=>{
    return { type:NEW_DATA,payload:payload}
}