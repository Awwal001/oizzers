import React, { useEffect, Fragment } from 'react'
import { Link } from "react-router-dom";
import SideBar from "./Sidebar";
import { DataGrid } from "@material-ui/data-grid";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import "./Assets/css/productList.css";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listAdminProducts, deleteProduct, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

function ProductListScreen({ history, match }) {

    const dispatch = useDispatch()

    const adminProducts = useSelector(state => state.adminProducts)
    const { loading, error, products } = adminProducts

    const productDelete = useSelector(state => state.productDelete)
    const { success: successDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { success: successCreate, product: createdProduct } = productCreate


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    let keyword = history.location.search
    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if (!userInfo.isAdmin) {
            history.push('/login')
        }

        if (successCreate) {
            history.push(`/admin/product/${createdProduct.id}/edit`)
        } else {
            dispatch(listAdminProducts(keyword))
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, keyword])


    const deleteHandler = (id) => {

        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
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
          minWidth: 150,
          flex: 0.3,
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
          field: "stock",
          type: "number",
          minWidth: 100,
          flex: 0.2,
          renderHeader: () => (
            <strong  style={{ color: '#040404'}}>
              <i className='p-2'>COUNT IN STOCK</i>
            </strong>
          
        ),
        },
        {
          field: "price",
          type: "number",
          minWidth: 70,
          flex: 0.3,
          renderHeader: () => (
            <strong  style={{ color: '#040404'}}>
              <i className='p-2'> PRICE</i>
            </strong>
          
        ),
        },
    
        {
          field: "actions",
          flex: 0.2,
          headerName: "Actions",
          minWidth: 100,
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <Fragment>
                <Link to={`/admin/product/${params.getValue(params.id, "id")}/edit`}>
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
    
    const rows = products.map((item) => ({
      id: item.id,
      stock: item.countInStock,
      price: item.price,
      name: item.name,
    }));
      

    return (
        <Fragment>
            <MetaData title={`ALL PRODUCTS - Admin`} />
    
            <div className="dashboard">
            <SideBar />
            <div className="productListContainer container">
                <h1 id="productListHeading">ALL PRODUCTS</h1>
                <div className='my-3' >
                    <button className='Link' onClick={createProductHandler} >
                        <i className='fas fa-plus'></i>Create Product
                    </button>
                </div>
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

export default ProductListScreen