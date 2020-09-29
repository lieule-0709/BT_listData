import React from 'react'
import { connect } from "react-redux";
import { getEmployee, editEmployee, deleteEmployee } from './redux/actions';

let user = {}

const Detail = ({ getEmployee, detail, id, loadingDetail, editEmployee, deleteEmployee, token }) => {

  user = detail;

  const closeDetailForm = ()=>{
    document.getElementById("detail").style.display = "none";
  }

  const openEditform=()=>{
    document.getElementById("editForm").style.display = "block";
  }

  const closeEditForm = ()=>{
    document.getElementById("editForm").style.display = "none";
  }


  const openDeleteform=()=>{
    document.getElementById("deleteForm").style.display = "block";
  }

  const closeDeleteForm = ()=>{
    document.getElementById("deleteForm").style.display = "none";
  }

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
    <div className="detail-view ">
      {id != 0 && (loadingDetail && <h3 id='loading-detail'>loading</h3> )||
        <div id='detail' className="div_blur displayNone">
          <div id='user-detail' className="popup">
            <form className="form-container">
              {(user.id) && 
                <div  ><label htmlFor="id"><b>Id</b></label>
                <input type="text" id="id" value={user.id} name="id" readOnly/>
                </div>
              }
              {(user.fullName) && 
                <div><label htmlFor="fullName"><b>FullName</b></label>
                <input type="text" id="fullName" value={user.fullName} name="fullName" readOnly/>
                </div>
              }
              {(user.email) && 
              <div>
                <label htmlFor="email"><b>Email</b></label>
                <input type="text" id="email" value={user.email} name="email" readOnly/>
              </div>
              }
              {(user.username) && <div>
              <label htmlFor="username"><b>Username</b></label>
              <input type="text" id="username" value={user.username} name="username" readOnly/>
              </div>}
              <i className="fa fa-pencil-square-o" id='edit' onClick={openEditform} alt="edit"/>
              <i className="fa fa-trash-o" id='delete' onClick={openDeleteform} alt="delete" />
                  
              <button type="button" className="btn cancel" onClick={closeDetailForm}>Close</button>
            </form>
          </div>
        </div>
      }

      <div id='editForm' className="div_blur displayNone">
          <div className="popup">
            <form className="form-container">
            {!token && <p style={{"color": "red"}}>please login before edit a user</p>||
              <div>
                {(user.id) && 
                  <div  ><label htmlFor="id"><b>Id</b></label>
                  <input type="text" id="id" value={user.id} name="id" readOnly/>
                  </div>
                }
                {(user.fullName) && 
                  <div><label htmlFor="fullName"><b>FullName</b></label>
                  <input type="text" id="fullName" defaultValue={user.fullName} name="fullName" />
                  </div>
                }
                {(user.email) && 
                <div>
                  <label htmlFor="email"><b>Email</b></label>
                  <input type="text" id="email" defaultValue={user.email} name="email" />
                </div>
                }
                {(user.username) && <div>
                <label htmlFor="username"><b>Username</b></label>
                <input type="text" id="username" defaultValue={user.username} name="username" />
                </div>}
                <button type="button" className="btn" onClick={edit}>Edit</button>
              </div>}
              <button type="button" className="btn cancel" onClick={closeEditForm}>Close</button>
            </form>
          </div>
        </div>

        
      <div id='deleteForm' className="div_blur displayNone">
          <div className="popup">
            <form className="form-container">
            {!token && <p style={{"color": "red"}}>please login before delete a user</p>||
              <div>
                <p style={{"color": "red"}}>Are you sure to delete user has name={user.username} and id={user.id} </p>
                <button type="button" className="btn" onClick={()=>deleteEmployee(user.id, token)}>Yes, delete!</button>
              </div>}
              <button type="button" className="btn cancel" onClick={closeDeleteForm}>Close</button>
            </form>
          </div>
        </div>



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
