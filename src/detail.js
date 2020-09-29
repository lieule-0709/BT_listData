import React from 'react'
import { connect } from "react-redux";
import { getEmployee, editEmployee, deleteEmployee } from './redux/actions';

let user = {}

const Detail = ({ getEmployee, detail, id, loadingDetail, editEmployee, deleteEmployee, token }) => {

  user = detail;

  const closeDetailForm = ()=>{
    document.getElementById("goDown").style.display = "none";
  }

 const edit= (e)=>{
    console.log('presss');
    if(e.keyCode  === 13){
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
      {id !== 0 && (loadingDetail && <h3 id='loading-detail'>loading</h3>) ||
        <div id='goDown'>
          <div id='user-detail'>
            <form class="form-container">
              {(user.id) && 
                <div  ><label for="id"><b>FullName</b></label>
                <input type="text" id="id" value={user.id} name="id" />
                </div>
              }
              {(user.fullName) && 
                <div><label for="fullName"><b>FullName</b></label>
                <input type="text" id="fullName" value={user.fullName} name="fullName" />
                </div>
              }
              {(user.email) && 
              <div>
                <label for="email"><b>Email</b></label>
                <input type="text" id="email" value={user.email} name="email" />
              </div>
              }
              {(user.username) && <div>
              <label for="username"><b>Username</b></label>
              <input type="text" id="username" value={user.username} name="username" />
              </div>}
              <i className="fa fa-pencil-square-o" id='edit' onClick={() => {
                    document.getElementById('direct').innerText = 'fill new name and pass then click enter to edit';
                    document.getElementById('tr_name').style={'display': 'block'};
                    document.getElementById('tr_pass').style={'display': 'block'};
                    document.getElementsByClassName('user-detail')[0].style={'height': '170px'};
                    }} alt="edit" 
              />
              <i className="fa fa-trash-o" id='delete' onClick={()=>deleteEmployee(user.id, token)} alt="delete" />
                  
              <button type="button" class="btn cancel" onClick={closeDetailForm}>Close</button>
            </form>
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
