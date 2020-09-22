import React from 'react';
import './App.css';
import { connect } from "react-redux";
import { useEffect } from 'react';
import logo from './logo.svg'; 
import { getEmployees, updateId, getEmployee, addEmployee, deleteEmployee, deleteEmployees, editEmployee, login, error} from './redux/actions';
import Detail from './detail.js';
import Popup from 'reactjs-popup';


let list = [];
let token = "";

const App = React.memo(({ getEmployees, getEmployee, deleteEmployee, loading, employees, updateId, id, login, token, addEmployee, error }) => {

  useEffect(() => {
    getEmployees();
    login();
  }, []);

  list = employees ? employees : list;

  function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

  var create_click = ()=>{
    let data = {
      "fullName": document.getElementById('fullname').value,
      "username": document.getElementById('username').value,
      "password": document.getElementById('password').value
    }
    addEmployee(token, data);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3> Employees </h3>
      </header>
      {loading &&
        <div>
          <img src={logo} className="App-logo" alt="logo" />
          <h2>loading</h2>
        </div>
        ||
        <div className="content">
          <div className="list-users">
            <h2>List Employees</h2>
            <div className="div_popup">
              <button onClick={openForm} id="create"> Create employee </button>
              <div class="form-popup" id="myForm">
                <form class="form-container">
                  <label for="fullname"><b>Fullname</b></label>
                  <input type="text" id="fullname" placeholder="Enter fullname" name="fullname" required/>

                  <label for="username"><b>Username</b></label>
                  <input type="text" id="username" placeholder="Enter username" name="username" required/>

                  <label for="password"><b>Password</b></label>
                  <input type="password" id="password" placeholder="Enter Password" name="password" required/>

                  <button type="submit" class="btn" onClick={create_click}>Create</button>
                  <button type="submit" class="btn cancel" onClick={closeForm}>Close</button>
                </form>
              </div>
            </div>

      {error && <Popup open={true} >{error}</Popup>}

            {list.map(employee => (
              <div className="item" key={employee.id}>
                <div className='card' onClick={()=>{updateId(employee.id)}}>
                  <div className='avata' > <img src={employee.avatar} alt="avatar of user here :(" /></div>
                  <div className='name'>
                    {employee.username}
                  </div>
                  {(employee.id == id) && <Detail />}
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
  token: state.token,
  error: state.error
})

const mapDispatchToProps = dispatch => ({
  getEmployees: () => dispatch(getEmployees()),
  updateId: (id) => dispatch(updateId(id)),
  getEmployee: () => dispatch(getEmployee()),
  addEmployee:(token, data)=>dispatch(addEmployee(token, data)),
  login: () => dispatch(login())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
