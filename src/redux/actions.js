import {GET_EMPLOYEES, GET_EMPLOYEES_SS, GET_EMPLOYEES_F,
     EDIT_EMPLOYEE_SS, GET_EMPLOYEE_SS,
     FETCH_PENDING, FETCH_F, DELETE_EMPLOYEE_SS,
     UPDATE_ID, LOGIN_SS, LOGIN_F, ADD_EMPLOYEE
     } from './constants.js';


export function updateIdSS(id){
    return {
        type: UPDATE_ID,
        payload: id
    }
}


export const updateId=(id)=>{
    return dispatch =>{
        try{
            return fetch(`http://ec2-54-169-237-154.ap-southeast-1.compute.amazonaws.com/api/v1/users/${id}`)
            .then(data=>data.json())
            .then(res => {
                return dispatch(getEmployeeSuccess(res))})
            .then(() => {return dispatch(updateIdSS(id))});
        }
        catch(error){
            dispatch(fetchFail(error));
        };
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

//https://reqres.in/api/users?page=2
export const getEmployees=()=>{
    return dispatch =>{
        try{
            dispatch(getEmployeesPending());
            return fetch('http://ec2-54-169-237-154.ap-southeast-1.compute.amazonaws.com/api/v1/users?limit=10&offset=0')
            .then(data=>data.json())
            .then(data=>data.results)
            .then(res => {
                console.log(res)
                return dispatch(getEmployeesSuccess(res))});
        }
        catch(error){
            // dispatch(getEmployeesFail(error));
            console.log(error);
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

export function loginFail(error){
    return {
        type: LOGIN_F,
        payload: error
    }
}

export function loginSS(data){
    return {
        type: LOGIN_SS,
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
            return fetch(`http://ec2-54-169-237-154.ap-southeast-1.compute.amazonaws.com/api/v1/users/${id}`)
            .then(data=>data.json())
            .then(res => {
                return dispatch(getEmployeeSuccess(res))});
        }
        catch(error){
            // dispatch(fetchFail(error));
            console.log(error)
        };
    }
}

export const editEmployee=(id, data, token)=>{
    return dispatch =>{
        try{
            return fetch(`http://ec2-54-169-237-154.ap-southeast-1.compute.amazonaws.com/api/v1/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json', 'Accept': 'application/json',
                  'Authorization': `${token}`
                },
                body: JSON.stringify(data)
              })
            .then(data=>data.json())
            .then(res => {
                console.log(res);
                return dispatch(getEmployees())});
        }
        catch(error){
            console.log('sdiuhvknsbgi');
            dispatch(fetchFail(error));
        };
    }
}

export const deleteEmployee=(id, token)=>{
    return dispatch =>{
        try{
            dispatch(fetchPending());
            return fetch(`http://ec2-54-169-237-154.ap-southeast-1.compute.amazonaws.com/api/v1/users/${id}`, {
                method: 'DELETE',
                headers: {'Accept': 'application/json' , 
                'Authorization': `${token}`},
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

export const login=()=>{
    return dispatch =>{
        try{
            return fetch('http://ec2-54-169-237-154.ap-southeast-1.compute.amazonaws.com/api/v1/auth/login',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({"username": "admin",
                "password": "123456"})
            })
            .then(data=>data.json())
            .then(data=>data.token)
            .then(res => {
                console.log(res)
                return dispatch(loginSS(res))});
        }
        catch(error){
            dispatch(loginFail(error));
        };
    }
}


export const addEmployee=(token, data)=>{
    return dispatch =>{
        try{
            return fetch(`http://ec2-54-169-237-154.ap-southeast-1.compute.amazonaws.com/api/v1/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 'Accept': 'application/json',
                  'Authorization': `${token}`
                },
                body: JSON.stringify(data)})
            .then(data=>data.json())
            .then(res => {
                console.log(res);
                return dispatch(getEmployees())})
            .catch(er => {
                // dispatch(fetchFail(er));
                console.log(er);
            })
        }
        catch(error){
            // dispatch(fetchFail(error));
            console.log(error);
        };
    }
}
