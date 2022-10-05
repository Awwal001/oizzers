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
import { listCategories, deleteCategory } from '../actions/categoryActions'

function CategoryListScreen({ history }) {
    const dispatch = useDispatch()

    const categoryList = useSelector(state => state.categoryList)
    const { loading, error, categories } = categoryList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const categoryDelete = useSelector(state => state.categoryDelete)
    const { success: successDelete } = categoryDelete


    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listCategories())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete, userInfo])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            dispatch(deleteCategory(id))
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
            </strong>
          ),
        },
        {
          field: "productsCount",
          type: "number",
          minWidth: 100,
          flex: 0.2,
          renderHeader: () => (
            <strong  style={{ color: '#040404'}}>
              <i className='p-2'>PRODUCTS COUNT</i>
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
                <Link to={`/admin/category/${params.getValue(params.id, "id")}/edit`}>
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
    
    const rows = categories.map((item) => ({
      id: item.id,
      productsCount: item.products.length,
      name: item.name,
    }));
    
    return (
        <Fragment>
            <MetaData title={`ALL CATEGORIES - Admin`} />
            <div className="dashboard">
            <SideBar />
            <div className="productListContainer container">
                <h1 id="productListHeading">ALL CATEGORIES</h1>
                <Link to={`/admin/category/create`}>
                  <div className='my-3' >
                    <i className='fas fa-plus'></i> Create Category
                  </div>
                </Link>

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

export default CategoryListScreen
