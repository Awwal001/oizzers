import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./Assets/css/productList.css";
import { DataGrid } from "@material-ui/data-grid";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listUsers, deleteUser } from '../actions/userActions'

function UserListScreen({ history }) {

    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete


    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            history.push('/login')
        }

    }, [dispatch, history, successDelete, userInfo])


    const deleteHandler = (id) => {

        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(id))
        }
    }
    
    const columns = [
        {
            field: "id",
            type: "number",
            minWidth: 50,
            flex: 0.1,
            renderHeader: () => (
                <strong  style={{ color: '#040404'}}>
                  <i className='p-2'> ID</i>
                </strong>
              
            ),
        },
    
        {
          field: "name",
          minWidth: 100,
          flex: 0.2,
          renderHeader: () => (
            <strong  style={{ color: '#040404'}}>
              <i className='p-2'> NAME</i>
              <span >
                <i className="fas fa-user"></i>
              </span>
            </strong>
          ),
        },

        {
          field: "email",
          minWidth: 150,
          flex: 0.3,
          renderHeader: () => (
            <strong  style={{ color: '#040404'}}>
              <i className='p-2'>E-MAIL</i>
            </strong>
          
        ),
        },
    
        {
          field: "admin",
          minWidth: 50,
          flex: 0.1,
          renderCell:  ({ row }) => {
            if (row.admin) {
              return <i className="fas fa-check" style={{color: 'green'}}></i>;
            } else {
              return <i className="fas fa-times" style={{color: 'red'}}></i>;
            }
          },
          renderHeader: () => (
            <strong  style={{ color: '#040404'}}>
              <i className='p-2'> ADMIN</i>
            </strong>
          
        ),
        },
    
        {
          field: "actions",
          flex: 0.1,
          headerName: "Actions",
          minWidth: 50,
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <Fragment>
                <Link to={`/admin/user/${params.getValue(params.id, "id")}/edit`}>
                  <EditIcon />
                </Link>
    
                <button
                  onClick={() =>
                    deleteHandler(params.getValue(params.id, "id"))
                  }
                >
                  <DeleteIcon />
                </button>
              </Fragment>
            );
          },
        },
      ];
    
    const rows = users.map((item) => ({
      id: item.id,
      email: item.email,
      admin: item.isAdmin,
      name: item.name,
    }));
   
    return (
        <Fragment>
            <MetaData title={`ALL USERS - Admin`} />
    
            <div className="dashboard">
            <SideBar />
            <div className="productListContainer container">
                <h1 id="productListHeading">ALL USERS</h1>
    
                {loading ?
                <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                        />
                    )
                  }
            </div>
            </div>
        </Fragment>
    );
}

export default UserListScreen
