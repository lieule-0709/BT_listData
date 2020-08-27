import React from 'react';
import './App.css';
import { connect } from "react-redux";
import { useEffect } from 'react';
import logo from './logo.svg';
import { getEmployees, updateId, getEmployee, addEmployee, deleteEmployee, deleteEmployees, editEmployee } from './redux/actions';
import Detail from './detail.js';

let list = [];

const App = React.memo(({ getEmployees, getEmployee, deleteEmployee, loading, employees, updateId, id }) => {

  useEffect(() => {
    getEmployees();
  }, []);

  list = employees ? employees : list;

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
            {list.map(employee => (
              <div className="item" id={employee.id}>
                <div className='card' onClick={()=>{updateId(employee.id)}}>
                  <div className='avata'> <img src={employee.avatar} alt="avatar of user here :(" /></div>
                  <div className='name'>
                    {employee.first_name} {employee.last_name}
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
  id: state.id
})

const mapDispatchToProps = dispatch => ({
  getEmployees: () => dispatch(getEmployees()),
  updateId: (id) => dispatch(updateId(id)),
  getEmployee: () => dispatch(getEmployee())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
