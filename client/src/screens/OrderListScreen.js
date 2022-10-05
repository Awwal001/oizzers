import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listOrders } from '../actions/orderActions'
import "./Assets/css/productList.css";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";

function OrderListScreen({ history }) {
  const dispatch = useDispatch()

  const orderList = useSelector(state => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

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
      field: "createdAt",
      type: "number",
      minWidth: 100,
      flex: 0.2,
      renderHeader: () => (
        <strong  style={{ color: '#040404'}}>
          <i className='p-2'>TIME CREATED</i>
        </strong>
      ),
    },
    {
      field: "user",
      minWidth: 100,
      flex: 0.2,
      renderHeader: () => (
        <strong  style={{ color: '#040404'}}>
          <i className='p-2'> USER'S NAME</i>
          <span >
            <i className="fas fa-user"></i>
          </span>
        </strong>
      ),
    },
    {
      field: "totalPrice",
      type: "number",
      minWidth: 100,
      flex: 0.2,
      renderHeader: () => (
        <strong  style={{ color: '#040404'}}>
          <i className='p-2'>TOTAL AMOUNT(NGN) </i>
        </strong>
      
      ),
    },
    {
      field: "pay",
      minWidth: 50,
      flex: 0.1,
      renderCell:  ({ row }) => {
        if (row.pay) {
          return <i className="fas fa-check" style={{color: 'green'}}></i>;
        } else {
          return <i className="fas fa-times" style={{color: 'red'}}></i>;
        }
      },
      renderHeader: () => (
        <strong style={{ color: '#040404'}}>
          <i className='p-2'>PAID? </i>
        </strong>
      
      ),
    },
    {
      field: "deliver",
      headerName: "deliver",
      minWidth: 50,
      flex: 0.1,
      renderCell:  ({ row }) => {
        if (row.deliver) {
          return <i className="fas fa-check" style={{color: 'green'}}></i>;
        } else {
          return <i className="fas fa-times" style={{color: 'red'}}></i>;
        }
      },
      renderHeader: () => (
        <strong  style={{ color: '#040404'}}>
          <i className='p-2'>DELIVERED? </i>
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
            <Link to={`/order/${params.getValue(params.id, "id")}`}>
                <button>Details</button>
            </Link>
          </Fragment>
        );
      },
    },
  ];

  const rows = orders.map((item) => ({
    id: item.id,
    createdAt: item.createdAt,
    totalPrice: item.totalPrice,
    user: item.user.name,
    pay: item.isPaid,
    deliver: item.isDelivered
  }));

  return (
      <Fragment>
          <MetaData title={`ALL PRODUCTS - Admin`} />
  
          <div className="dashboard">
            <SideBar />
            <div className="productListContainer container">
                <h1 id="productListHeading">ALL Orders</h1>
                
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

export default OrderListScreen
