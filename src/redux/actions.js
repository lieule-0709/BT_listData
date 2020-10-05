import {GET_EMPLOYEES, GET_EMPLOYEES_SS, GET_EMPLOYEES_F, GET_EMPLOYEE_SS,
     FETCH_PENDING, FETCH_F, LOGIN_SS, LOGOUT
     } from './constants.js';
import alertMessage from '../libs/AlertBox/alert';


export const getEmployee=(id, typeForm)=>{
    return dispatch =>{
        try{
            // dispatch(fetchPending());
            return fetch(`http://ec2-54-169-237-154.ap-southeast-1.compute.amazonaws.com/api/v1/users/${id}`)
            .then(data=>{
                if(data.ok){
                    return data.json()
                }
                else throw new Error("something went wrong");
            })
            .then(res => {
                return dispatch(getEmployeeSuccess(res))
            })
            .then(res=>{
                if(document.getElementById(typeForm)) document.getElementById(typeForm).style.display = "block";
            })
            .catch(error => {
                alertMessage(error, 0, 1300);
                // return dispatch(fetchFail());
            });
        }
        catch(error){
            alertMessage(error, 0, 1300);
            // dispatch(fetchFail);
        };
    }
}


export function getEmployeesPending(){
    return {
        type: GET_EMPLOYEES
    }
}

export function getEmployeesSuccess(data){
    if(document.getElementById("detail")) document.getElementById("detail").style.display = "block";
    
    return {
        type: GET_EMPLOYEES_SS,
        payload: data
    }
}

export function getEmployeesFail(){
    return {
        type: GET_EMPLOYEES_F
    }
}

export const getEmployees=()=>{
    return dispatch =>{
        try{
            dispatch(getEmployeesPending());
            return fetch('http://ec2-54-169-237-154.ap-southeast-1.compute.amazonaws.com/api/v1/users?limit=10&offset=0')
            .then(data=>{
                if(data.ok){
                    return data.json()
                }
                else throw new Error("something went wrong");
            })
            .then(data=>data.results)
            .then(res => {
                return dispatch(getEmployeesSuccess(res))})
            .catch(error => {
                alertMessage(error, 0, 1300);
                return dispatch(getEmployeesFail());
            });
               
        }
        catch(error){
            alertMessage(error, 0, 1300);
            return dispatch(getEmployeesFail());
        };
    }
}

export function fetchPending(){
    return {
        type: FETCH_PENDING
    }
}

export function fetchFail(){
    return {
        type: FETCH_F
    }
}

export function getEmployeeSuccess(data){
    if(document.getElementById("detail")) document.getElementById("detail").style.display = "block";
    return {
        type: GET_EMPLOYEE_SS,
        payload: data
    }
}

export function loginSS(data){
    return {
        type: LOGIN_SS,
        payload: data
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
            .then(data=>{
                if(data.ok){
                    alertMessage("Edited!", 1, 1300);
                    return data.json();
                }
                else throw new Error("something went wrong");}
            )
            .then(data=>{
                return dispatch(getEmployee(id));
            })
            .catch(err=>{
                alertMessage(err, 0, 1300);
            })
        }
        catch(error){
            alertMessage(error, 0, 1300);
        };
    }
}

export const deleteEmployee=(id, token)=>{
    return dispatch =>{
        try{
            return fetch(`http://ec2-54-169-237-154.ap-southeast-1.compute.amazonaws.com/api/v1/users/${id}`, {
                method: 'DELETE',
                headers: {'Accept': 'application/json' , 
                'Authorization': `${token}`},
              })
            .then(data=>{
                if(data.ok){
                    if(document.getElementById("detail")) document.getElementById("detail").style.display = "none";
                    return data.json();
                }
                else throw new Error("something went wrong");})
            .then(res => {
                alertMessage("deleted user has id = "+res.id, 1, 1300)
                return dispatch(getEmployees())})
            .catch(error => {alertMessage(error, 0, 1300)});
        }
        catch(error){
            alertMessage(error, 0, 1300);
        };
    }
}

export const login=(dataUser)=>{
    return dispatch =>{
        try{
            return fetch('http://ec2-54-169-237-154.ap-southeast-1.compute.amazonaws.com/api/v1/auth/login',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(dataUser)
            })
            .then(data => {
                if (data.ok) {
                    return data.json();
                }
                throw new Error('Something went wrong. please try again!!!');
            })
            .then(data=>{
                alertMessage("welcome "+ data.username, 1, 1300);
                document.getElementById("loginForm").style.display = "none";
                return dispatch(loginSS(data.token));
            })
            .catch(err => {
                alertMessage(err, 0, 1300);
            });
        }
        catch(error){
            alertMessage(error, 0, 1300);
        };
    }
}

export const regist=(dataUser)=>{
    return dispatch =>{
        try{
            return fetch('http://ec2-54-169-237-154.ap-southeast-1.compute.amazonaws.com/api/v1/auth/register',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(dataUser)
            })
            .then(data=>{
                if(data.ok){
                    return data.json();
                }
                else throw new Error("something went wrong");})
            .then(data=>{
                alertMessage("welcome "+ data.username, 1, 1300);
                document.getElementById("registForm").style.display = "none";
                dispatch(loginSS(data.token));
            })
            .catch(error => {alertMessage(error, 0, 1300)});
        }
        catch(error){
            alertMessage(error, 0, 1300);
        };
    }
}


export function logout(){
    return {
        type: LOGOUT
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
            .then(data=>{
                if(data.ok){
                    document.getElementById("addForm").style.display = "none";
                    return data.json();
                }
                else throw new Error("something went wrong");})
            .then(res => {
                alertMessage("created "+ res.username, 1, 1300);
                return dispatch(getEmployees())})
            .catch(err => {
                alertMessage(err, 0, 1300);
            })
        }
        catch(error){
            alertMessage(error, 0, 1300);
            dispatch(fetchFail());
        };
    }
}
