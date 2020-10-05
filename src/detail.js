import React from 'react'
import { connect } from "react-redux";
import { editEmployee, deleteEmployee } from './redux/actions';
import alertMessage from "./libs/AlertBox/alert"

let user = {}

const Detail = ({ detail, editEmployee, deleteEmployee, token }) => {

  user = detail;

  const closeDetailForm = () => {
    document.getElementById("detail").style.display = "none";
  }

  const openEditform = () => {
    document.getElementById("editForm").style.display = "block";
  }

  const closeEditForm = () => {
    document.getElementById("editForm").style.display = "none";
  }


  const openDeleteform = () => {
    document.getElementById("deleteForm").style.display = "block";
  }

  const closeDeleteForm = () => {
    document.getElementById("deleteForm").style.display = "none";
  }

  const edit = () => {

    let data = {
      "fullName": document.getElementById('editFullName').value,
      "password": document.getElementById('editPassword').value
    }
    if (!data.fullName || !data.password) {
      if (!data.fullName) document.getElementById('editFullName').focus();
      else document.getElementById("editPassword").focus();
      alertMessage("please fill all information", 3, 1300);
    }
    else {
      editEmployee(user.id, data, token);
    }
  };


  return (
    <div className="detail-view ">

      {/* div show infor if user */}
      <div id='detail' className="div_blur displayNone">
        <div id='user-detail' className="popup">
          <form className="form-container">
            {(user.id) &&
              <div  ><label htmlFor="id"><b>Id</b></label>
                <input type="text" id="id" value={user.id} name="id" readOnly />
              </div>
            }
            {(user.fullName) &&
              <div><label htmlFor="fullName"><b>FullName</b></label>
                <input type="text" id="fullName" value={user.fullName} name="fullName" readOnly />
              </div>
            }
            {(user.email) &&
              <div>
                <label htmlFor="email"><b>Email</b></label>
                <input type="text" id="email" value={user.email} name="email" readOnly />
              </div>
            }
            {(user.username) && <div>
              <label htmlFor="username"><b>Username</b></label>
              <input type="text" id="username" value={user.username} name="username" readOnly />
            </div>}
            <i className="fa fa-pencil-square-o" id='edit' onClick={openEditform} alt="edit" />
            <i className="fa fa-trash-o" id='delete' onClick={openDeleteform} alt="delete" />

            <button type="button" className="btn cancel" onClick={closeDetailForm}>Close</button>
          </form>
        </div>
      </div>

      {/* div show popup edit */}
      <div id='editForm' className="div_blur displayNone">
        <div className="popup">
          <form className="form-container">
            {!token ? <p style={{ "color": "red" }}>please login before edit a user</p> :
              <div>
                {(user.id) &&
                  <div  ><label htmlFor="id"><b>Id</b></label>
                    <input type="text" value={user.id} name="id" readOnly />
                  </div>
                }
                {(user.email) &&
                  <div>
                    <label htmlFor="email"><b>Email</b></label>
                    <input type="text" defaultValue={user.email} name="email" readOnly />
                  </div>
                }
                {(user.username) &&
                  <div>
                    <label htmlFor="username"><b>Username</b></label>
                    <input type="text" defaultValue={user.username} name="username" readOnly />
                  </div>}

                <label htmlFor="fullName"><b>FullName</b></label>
                <input type="text" id="editFullName" defaultValue={user.fullName?user.fullName:"Enter fulName"} name="fullName" />

                <label htmlFor="password"><b>Password</b></label>
                <input type="password" id="editPassword" name="password" />

                <button type="button" className="btn" onClick={edit}>Edit</button>
              </div>}
            <button type="button" className="btn cancel" onClick={closeEditForm}>Close</button>
          </form>
        </div>
      </div>

      {/* div show popup delete */}
      <div id='deleteForm' className="div_blur displayNone">
        <div className="popup">
          <form className="form-container">
            {!token ? <p style={{ "color": "red" }}>please login before delete a user</p> :
              <div>
                <p style={{ "color": "red" }}>Are you sure to delete user has name={user.username} and id={user.id} </p>
                <button type="button" className="btn" onClick={() => deleteEmployee(user.id, token)}>Yes, delete!</button>
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
  token: state.token
});

const mapDispatchToProps = dispatch => ({
  editEmployee: (id, data, token) => dispatch(editEmployee(id, data, token)),
  deleteEmployee: (i, token) => dispatch(deleteEmployee(i, token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);
