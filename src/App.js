import React from 'react';
import './App.css';
import { connect } from "react-redux";
import { useEffect } from 'react';
import logo from './logo.svg'; 
import { getEmployees, updateId, getEmployee, addEmployee
  , login, regist, logout} from './redux/actions';
import Detail from './detail.js'
// import Popup from 'reactjs-popup';


let list = [];
let token = "";
let status; //0:login   1:regist

const App = React.memo(({ getEmployees, getEmployee, deleteEmployee, loading, employees, updateId, id, regist, login, logout, token, addEmployee }) => {

  useEffect(() => {
    getEmployees();
    // login();
  }, []);

  list = employees ? employees : list;

  var regist_click = ()=>{
    status=1;
    document.getElementById("loginForm").style.display = "block";
  }

  var login_click = ()=>{
    status=0;
    document.getElementById("loginForm").style.display = "block";
  }

  var logout_click = ()=>{
    logout();
  }


  function closeLoginForm() {
    document.getElementById("loginForm").style.display = "none";
  }

  var regist_btn_click = ()=>{
    let data = {
      "fullName": document.getElementById('fullName').value,
      "email": document.getElementById('email').value,
      "description": "",
      "username": document.getElementById('username').value,
      "password": document.getElementById('password').value
    }
    console.log(data);
    console.log(typeof(data));
    if(!data.fullName || !data.email || !data.username || !data.password){
      alert("please fill all information");
    }
    else {
      document.getElementById("loginForm").style.display = "none";
      regist(data);
    };
  }

  var login_btn_click = ()=>{
    let data = {
      "username": document.getElementById('username').value,
      "password": document.getElementById('password').value
    }
    console.log(data);
    if(!data.username || !data.password){
      alert("please fill all information");
    }
    else {
      document.getElementById("loginForm").style.display = "none";
      login(data);
    }
  }

  function openAddForm() {
    document.getElementById("addForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("addForm").style.display = "none";
  }


  var create_click = ()=>{
    let data = {
      "fullName": document.getElementById('newfullname').value,
      "username": document.getElementById('newusername').value,
      "password": document.getElementById('newpassword').value
    }
    if(!data.fullName || !data.username || !data.password){
      alert("please fill all information");
    }
    else addEmployee(token, data);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img className="logo-app"src={require("./icon/120017990_329072801636807_1813089441055996983_n.png")}/>
        <div className="status">
          {!token && <span id="login" className="st-click" onClick={login_click}>login</span>}
          {!token && <span id="regist" className="st-click" onClick={regist_click}>regist</span>}
          {token && <span id="logout" className="st-click" onClick={logout_click}>logout</span>}
        </div>
      </header>

      {loading &&
      <div>
        <img src={logo} className="App-logo" alt="logo" />
        <h2>loading</h2>
      </div>
        ||
      <div className="content">
        <button onClick={openAddForm} id="create"> Create employee </button>
        <div className="div_blur displayNone" id="addForm">
          <div className="popup">
            <form className="form-container">
              {!token && <p style={{"color": "red"}}>please login before add new users</p>||
                <div>
                  <label htmlFor="fullname"><b>Fullname</b></label>
                  <input type="text" id="newfullname" placeholder="Enter fullname" name="fullname" required/>

                  <label htmlFor="username"><b>Username</b></label>
                  <input type="text" id="newusername" placeholder="Enter username" name="username" required/>

                  <label htmlFor="password"><b>Password</b></label>
                  <input type="password" id="newpassword" placeholder="Enter Password" name="password" required/>

                  <button type="button" className="btn" onClick={create_click}>Create</button>
                </div>
              }
              <button type="button" className="btn cancel" onClick={closeForm}>Close</button>
            </form>
          </div>
        </div>

        <div className="div_blur displayNone" id="loginForm">
          <div className="popup">
            <form className="form-container" action="">
              {status && <label htmlFor="fullName"><b>FullName</b></label>}
              {status && <input type="text" id="fullName" placeholder="FullName" name="fullName" />}

              {status && <label htmlFor="email"><b>Email</b></label>}
              {status && <input type="text" id="email" placeholder="Email" name="email" />}

              <label htmlFor="username"><b>Username</b></label>
              <input type="text" id="username" placeholder="Enter username" name="username" />

              <label htmlFor="password"><b>Password</b></label>
              <input type="password" id="password" placeholder="Enter Password" name="password" />

              {!status && <button id="btn_login" type="button" className="btn" onClick={login_btn_click}>login</button>}
              {status && <button id="btn_regist" type="button" className="btn" onClick={regist_btn_click}>regist</button>}
              <button type="button" className="btn cancel" onClick={closeLoginForm}>Close</button>
            </form>
          </div>
        </div>
        
        {<Detail/>}
      
        <div className="list-users">
        <h2>List Employees</h2>
          {
          list.map(employee => (
            <div className="item column"  key={employee.id}>
              <div className='card' onClick={()=>{updateId(employee.id);}}>
                <div className='avata' > <img src={employee.avatar} alt="avatar of user here :(" /></div>
                <div className='name'>
                  {employee.username}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>}
    </div>
  );
})


const mapStateToProps = state => ({
  employees: state.employees,
  loading: state.loading,
  id: state.id,
  token: state.token
})

const mapDispatchToProps = dispatch => ({
  getEmployees: () => dispatch(getEmployees()),
  updateId: (id) => dispatch(updateId(id)),
  getEmployee: () => dispatch(getEmployee()),
  addEmployee:(token, data)=>dispatch(addEmployee(token, data)),
  login: (data) => dispatch(login(data)),
  regist: (data) => dispatch(regist(data)),
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
