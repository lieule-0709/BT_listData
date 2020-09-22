import React from 'react'
import { connect } from "react-redux";
import { getEmployee, editEmployee, deleteEmployee } from './redux/actions';
import { useEffect } from 'react';

let user = {}

const Detail = ({ getEmployee, detail, id, loadingDetail, editEmployee, deleteEmployee, token }) => {

  user = detail;

 const edit= (e)=>{
    console.log('presss');
    if(e.keyCode  == 13){
      let data = {
        fullName: document.getElementById('input_name').value,
        password: document.getElementById('input_job').value
      }
      if(!document.getElementById('input_name').value){
        document.getElementById('input_name').focus();
      }
      else if(!document.getElementById('input_job').value){
        document.getElementById('input_job').focus();
      }
      else editEmployee(user.id, data, token);
    }
  };

  
  return (
    <div className="detail-view">
      {id != 0 && (loadingDetail && <h3 id='loading-detail'>loading</h3> )||
        <div id='goDown'>
          <div className='user-detail'>
            <table>
              <tr ><td className='td-title'>Id:</td><td>{user.id}</td></tr>
              {(user.fullName) && <tr ><td className='td-title'>Full name:</td><td>{user.fullName}</td></tr>}
              {(user.username) && <tr><td className='td-title'>User name:</td><td>{user.username}</td></tr>}
              {user.email && <tr><td className='td-title'>Email:</td><td>{user.email}</td></tr>}
              <tr id='tr_name' style={{"display": "none"}} onKeyUp={edit}><td className='td-title'>New name:</td><td ><input type="text" id="input_name"/></td></tr>
              <tr id='tr_pass'  style={{"display": "none"}} onKeyUp={edit}><td className='td-title'>Pass:</td><td><input type="text" id="input_job"/></td></tr>            
              <tr>
                <td className='td-title'>
                  <i className="fa fa-pencil-square-o" id='edit' onClick={() => {
                    document.getElementById('direct').innerText = 'fill new name and pass then click enter to edit';
                    document.getElementById('tr_name').style={'display': 'block'};
                    document.getElementById('tr_pass').style={'display': 'block'};
                    document.getElementsByClassName('user-detail')[0].style={'height': '170px'};
                    }} alt="edit" />
                </td>
                <td className='td-title'>
                  <i className="fa fa-trash-o" id='delete' onClick={()=>deleteEmployee(user.id, token)} alt="delete" />
                </td></tr>
            </table>
            <span id='direct'></span>
          </div>
        </div>
      }
    </div>
  )
}

const mapStateToProps = state => ({
  detail: state.detail,
  loadingDetail: state.loadingDetail,
  id: state.id,
  token: state.token
});

const mapDispatchToProps = dispatch => ({
  getEmployee: (id) => dispatch(getEmployee(id)),
  editEmployee: (id, data, token) => dispatch(editEmployee(id, data, token)),
  deleteEmployee: (i, token) => dispatch(deleteEmployee(i, token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);
