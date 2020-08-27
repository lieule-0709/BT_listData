import {GET_EMPLOYEES, GET_EMPLOYEES_SS, GET_EMPLOYEES_F,
     EDIT_EMPLOYEE_SS, GET_EMPLOYEE_SS,
     FETCH_PENDING, FETCH_F, DELETE_EMPLOYEE_SS,
     UPDATE_ID
     } from './constants.js';


export function updateId(id){
    return {
        type: UPDATE_ID,
        payload: id
    }
}

export function getEmployeesPending(){
    return {
        type: GET_EMPLOYEES
    }
}

export function getEmployeesSuccess(data){
    return {
        type: GET_EMPLOYEES_SS,
        payload: data
    }
}

export function getEmployeesFail(error){
    return {
        type: GET_EMPLOYEES_F,
        payload: error
    }
}

export const getEmployees=()=>{
    return dispatch =>{
        try{
            dispatch(getEmployeesPending());
            return fetch('https://reqres.in/api/users?delay=1')
            .then(data=>data.json())
            .then(res => {
                return dispatch(getEmployeesSuccess(res))});
        }
        catch(error){
            dispatch(getEmployeesFail(error));
        };
    }
}

export function fetchPending(){
    return {
        type: FETCH_PENDING
    }
}

export function fetchFail(error){
    return {
        type: FETCH_F,
        payload: error
    }
}

export function getEmployeeSuccess(data){
    return {
        type: GET_EMPLOYEE_SS,
        payload: data
    }
}

export function editEmployeeSuccess(data){
    return {
        type: EDIT_EMPLOYEE_SS,
        payload: data
    }
}


export const getEmployee=(id)=>{
    return dispatch =>{
        try{
            dispatch(fetchPending());
            return fetch(`https://reqres.in/api/users/${id}`)
            .then(data=>data.json())
            .then(res => {
                return dispatch(getEmployeeSuccess(res))});
        }
        catch(error){
            dispatch(fetchFail(error));
        };
    }
}

export const editEmployee=(id)=>{
    return dispatch =>{
        try{
            dispatch(fetchPending());
            return fetch(`https://reqres.in/api/users/2`, {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "name": "LIEU Lê",
                    "job": "zion resident"
                })
                
              })
            .then(data=>data.json())
            .then(res => {
                console.log(res);
                return dispatch(editEmployeeSuccess(res))});
        }
        catch(error){
            console.log('sdiuhvknsbgi');
            dispatch(fetchFail(error));
        };
    }
}


export const deleteEmployee=()=>{
    return dispatch =>{
        try{
            dispatch(fetchPending());
            return fetch(`https://reqres.in/api/users/2`, {
                method: 'POST'
              })
            .then(data=>data.json())
            .then(res => {
                console.log(res);
                return dispatch(editEmployeeSuccess(res))});
        }
        catch(error){
            console.log('error');
            dispatch(fetchFail(error));
        };
    }
}

