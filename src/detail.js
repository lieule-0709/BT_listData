import React from 'react'
import { connect } from "react-redux";
import { getEmployee, editEmployee, deleteEmployee } from './redux/actions';
import { useEffect } from 'react';

let user = {}

const Detail = ({ getEmployee, detail, id, loadingDetail, editEmployee, deleteEmployee }) => {

  useEffect(() => {
    getEmployee(id);
    return () => {
      if (id != 0) {
        getEmployee(id);
      }
    }
  }, [id]);

  user = detail ? detail : user;

 const edit= (e)=>{
    console.log('presss');
    if(e.keyCode  == 13){
      let data = {
        name: document.getElementById('input_name').value,
        job: document.getElementById('input_job').value
      }
      console.log("13");
      if(!document.getElementById('input_name').value){
        document.getElementById('input_name').focus();
      }
      else if(!document.getElementById('input_job').value){
        document.getElementById('input_job').focus();
      }
      else editEmployee(user.id, data);
    }
  };

  
  return (
    <div className="detail-view">
      {id != 0 && (loadingDetail && <h3 id='loading-detail'>loading</h3> )||
        <div id='goDown'>
          <div className='user-detail'>
            <table>
              <tr ><td className='td-title'>Id:</td><td>{user.id}</td></tr>
              {(user.name || user.first_name) && <tr><td className='td-title'>Name:</td><td>{user.first_name} {user.last_name} {user.name}</td></tr>}
              { user.email && <tr><td className='td-title'>Email:</td><td>{user.email}</td></tr>}
              { user.job && <tr><td className='td-title'>Job:</td><td>{user.job}</td></tr>}
              <tr id='tr_name' style={{"display": "none"}} onKeyUp={edit}><td className='td-title'>New name:</td><td ><input type="text" id="input_name"/></td></tr>
              <tr id='tr_job'  style={{"display": "none"}} onKeyUp={edit}><td className='td-title'>Job:</td><td><input type="text" id="input_job"/></td></tr>
              <tr>
                <td className='td-title'>
                  <i className="fa fa-pencil-square-o" id='edit' onClick={() => {
                    document.getElementById('tr_name').style={'display': 'block', 'transform': '1s'};
                    document.getElementById('tr_job').style={'display': 'block', 'transform': '1s'};
                      let data = {
                        name: document.getElementById('input_name').value,
                        job: document.getElementById('input_job').value
                      }
                      // editEmployee(user.id, data);
                    }} alt="edit" />
                </td>
                <td className='td-title'>
                  <i className="fa fa-trash-o" id='delete' onClick={deleteEmployee} alt="delete" />
                </td></tr>
            </table>
          </div>
        </div>
      }
    </div>
  )
}

const mapStateToProps = state => ({
  detail: state.detail,
  loadingDetail: state.loadingDetail,
  id: state.id
});

const mapDispatchToProps = dispatch => ({
  getEmployee: (id) => dispatch(getEmployee(id)),
  editEmployee: (id, data) => dispatch(editEmployee(id, data)),
  deleteEmployee: () => dispatch(deleteEmployee())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);
