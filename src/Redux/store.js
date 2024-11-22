import {legacy_createStore} from 'redux';
import { userReducer } from './reducer';

export const initialState={
    users:[],
    isLoading:false,
    isError:false
}
export const store= legacy_createStore(userReducer,initialState)