import React from 'react'
import { connect } from "react-redux";
import {getEmployee, editEmployee, deleteEmployee } from './redux/actions';
import {useEffect} from 'react';

let user = {}

const Detail = ({getEmployee, detail, id, loadingDetail, editEmployee, deleteEmployee}) => {
  
  useEffect(() => {
    getEmployee(id);
    return ()=> {if(id !=0)  getEmployee(id);}
  }, [id]);
  
  user = detail?detail: user;

    return (
            <div className="detail-view">
              <h2 className='title-detail'>Emloyee detail</h2>
              {loadingDetail && <h3>loading</h3>}
              {!id && <h1> CLICK CARD TO KNOW USER DETAIL </h1>}
              {id!=0 &&
                <div className='user-detail'>
                  <img id='avatar' src={user.avatar} alt='avater-user'></img>
                  <table>
                    <tr> <th>ID:</th> <th>{user.id}</th></tr>
              <tr> <th>NAME:</th> <th>{user.first_name} {user.last_name} {user.name}</th></tr>
                    <tr> <th>EMAIL:</th> <th>{user.email}</th></tr>
                    <tr> 
                      <th>
                        <img id='edit' src= {require('./icon/icons8-edit-64.png')} onClick={()=>editEmployee(user.id)} alt="edit"/>
                      </th> 
                      <th>
                        <img id='delete' src= {require('./icon/icons8-delete-bin-64.png')}  onClick={deleteEmployee}   alt="delete"/>            
                      </th></tr>
                  </table>
                  
              {/* <button onClick={()=>editEmployee(user.id)}>edit</button> */}

              {/* <div className='icon'>
                  <img classname='edit' src= {require('./icon/icons8-edit-64.png')} onclick={()=>editEmployee(user.id)} alt="edit"/>
                  <img clasename='delete' src= {require('./icon/icons8-delete-bin-64.png')}   alt="delete"/>
              </div> */}

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
    editEmployee: (id) => dispatch(editEmployee()),
    deleteEmployee: ()=> dispatch(deleteEmployee())
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Detail);
  