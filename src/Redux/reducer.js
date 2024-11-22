
import { DELETE_USER, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, NEW_DATA } from "./actionTypes"
import { initialState } from "./store"


export const userReducer=(state=initialState,action)=>{
  switch(action.type){
    case GET_USER_REQUEST: {
        return {
            ...state,
            isLoading:true,
            users:[],
            isError:false
        }
    }
    case GET_USER_SUCCESS: {
        return {
            ...state,
            isLoading:false,
            users:action.payload,
            isError:false
        }
    }
    case GET_USER_FAILURE: {
        return {
            ...state,
            isLoading:false,
            users:[],
            isError:true
        }
    }

    case DELETE_USER:{
        return {
            ...state,
            isLoading:false,
            users:action.payload,
            isError:false
        }
    }

    case NEW_DATA:{
        return {
            ...state,
            isLoading:false,
            users:action.payload,
            isError:false
        }
    }
    default:{
        return state
    }
  }

}