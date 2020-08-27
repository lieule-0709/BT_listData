import {GET_EMPLOYEES, GET_EMPLOYEES_SS, GET_EMPLOYEES_F,
    GET_EMPLOYEE_SS, EDIT_EMPLOYEE_SS, DELETE_EMPLOYEE_SS,
    FETCH_PENDING, FETCH_F, UPDATE_ID} from './constants.js';

const initialState = {
    employees: [],
    id: 0,
    detail: {},
    loading: false,
    loadingDetail: false
};

export default function rootReducers(state=initialState, action){
    switch(action.type){
        case GET_EMPLOYEES: 
            return{
                ...state,
                loading : true
            }
        case GET_EMPLOYEES_SS:
            return{
                ...state,
                employees : action.payload.data,
                loading : false
            }
        case GET_EMPLOYEES_F:
            console.log(action.payload);
            return{
                ...state,
                loading : false
            }

        case FETCH_PENDING: 
            return{
                ...state,
                loadingDetail: true
            }
            
        case FETCH_F:
            console.log(action.payload);
            return{
                ...state,
                loadingDetail: true
            }
            
        case GET_EMPLOYEE_SS:
            return{
                ...state,
                loadingDetail: false,
                detail : action.payload.data
            }

        case EDIT_EMPLOYEE_SS:
            state.detail = action.payload;
            state.loadingDetail = false;
            return {
                ...state,
                detail: action.payload
            }
            
        case DELETE_EMPLOYEE_SS:
            return {
                ...state,
                employees:[]
            }
            
        case UPDATE_ID:
        return {
            ...state,
            id: action.payload
        }

        default: {
            return state
        }
    }
};
