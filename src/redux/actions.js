import {GET_EMPLOYEES, GET_EMPLOYEES_SS, GET_EMPLOYEES_F, GET_EMPLOYEE_SS,
     FETCH_PENDING, FETCH_F,
     UPDATE_ID, LOGIN_SS, LOGOUT
     } from './constants.js';


export function updateIdSS(id){
    if(document.getElementById("goDown")) document.getElementById("goDown").style.display = "block";
    return {
        type: UPDATE_ID,
        payload: id
    }
}


export const updateId=(id)=>{
    return dispatch =>{
        try{
            return fetch(`http://ec2-54-169-237-154.ap-southeast-1.compute.amazonaws.com/api/v1/users/${id}`)
            .then(data=>{
                if(data.ok){
                    return data.json()
                }
                else throw new Error("something went wrong");
            })
            .then(res => {
                return dispatch(getEmployeeSuccess(res))})
            .then(() => {return dispatch(updateIdSS(id))})
            .catch(error => {alert(error)});
        }
        catch(error){
            alert(error);
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
                console.log(res)
                return dispatch(getEmployeesSuccess(res))})
            .catch(error => {alert(error)});
        }
        catch(error){
            alert(error)
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

export const getEmployee=(id)=>{
    return dispatch =>{
        try{
            dispatch(fetchPending());
            return fetch(`http://ec2-54-169-237-154.ap-southeast-1.compute.amazonaws.com/api/v1/users/${id}`)
            .then(data=>{
                if(data.ok){
                    return data.json()
                }
                else throw new Error("something went wrong");
            })
            .then(res => {
                return dispatch(getEmployeeSuccess(res))})
            .catch(error => {alert(error)});
        }
        catch(error){
            alert(error);
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
            .then(data=>{
                if(data.ok){
                    return data.json()
                }
                else throw new Error("something went wrong");})
            .then(res => {
                console.log(res);
                return dispatch(getEmployees())});
        }
        catch(error){
            alert(error);
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
            .then(data=>{
                if(data.ok){
                    return data.json();
                }
                else throw new Error("something went wrong");})
            .then(res => {
                // window.alert("deleted user has id = "+res.id);
                return dispatch(getEmployees())})
            .catch(error => {alert(error)});
        }
        catch(error){
            alert(error);
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
                throw new Error('Something went wrong');
            })
            .then(res => {
                dispatch(loginSS(res.token));
                console.log(res);
            })
            .catch(err => {
                alert(err);
            });
        }
        catch(error){
            alert(error)
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
                    return data.json()
                }
                else throw new Error("something went wrong");})
            .then(data=>dispatch(loginSS(data.token)))
            .catch(error => {alert(error)});
        }
        catch(error){
            alert(error);
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
                    //alert ss
                    return data.json();
                }
                else throw new Error("something went wrong");})
            .then(res => {
                console.log(res);
                return dispatch(getEmployees())})
            .catch(er => {
                alert(er);
            })
        }
        catch(error){
            alert(error);
            dispatch(fetchFail());
        };
    }
}
