import {GET_EMPLOYEES, GET_EMPLOYEES_SS, GET_EMPLOYEES_F,
    GET_EMPLOYEE_SS, FETCH_PENDING, FETCH_F, LOGIN_SS, LOGOUT} from './constants.js';

const initialState = {
    employees: [],
    detail: {},
    loading: false,
    token: localStorage.getItem("token")
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
                employees : action.payload,
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
                loading: true
            }
            
        case FETCH_F:
            return{
                ...state,
                loading: false
            }
            
        case GET_EMPLOYEE_SS:
            return{
                ...state,
                loading: false,
                detail : action.payload
            }
            
        case LOGIN_SS:
            localStorage.setItem("token", action.payload);
            return{
                ...state,
                token : action.payload
            }
        case LOGOUT:
            localStorage.setItem("token", "");
            return{
                ...state,
                token : ""
            }
        default: {
            return state
        }
    }
};
