import React, { useState, useEffect, Fragment } from 'react'
import "./Assets/css/newProduct.css";
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { createCategory } from '../actions/categoryActions'
import { CATEGORY_CREATE_RESET } from '../constants/categoryConstants'
import { Button } from "@material-ui/core";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import SideBar from "./Sidebar";



function CategoryCreateScreen({ match, history }) {
    const dispatch = useDispatch()

    const categoryCreate = useSelector(state => state.categoryCreate)
    const { error, loading, success } = categoryCreate

    const [name, setName] = useState('')

    useEffect(() => {
    
        if (success) {
          history.push("/admin/categorylist");
          dispatch({ type: CATEGORY_CREATE_RESET });
        }
      }, [dispatch, error, history, success]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createCategory(name));
    }

    return (
        <div>

            <Fragment>
                {loading && <Loader />}
                {error && <Message variant='danger'>{error}</Message>}

                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <div className="dashboard">
                            <SideBar />
                            <div className="newProductContainer">
                            <form
                                className="createProductForm"
                                encType="multipart/form-data"
                                onSubmit={submitHandler}
                            >
                                <h2 className="headings">Create Category</h2>
                    
                                <div>
                                <SpellcheckIcon />
                                <input
                                    type="text"
                                    placeholder="Product Name"
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                />
                                </div>
        
                                <Button
                                id="createProductBtn"
                                type="submit"
                                disabled={loading ? true : false}
                                >
                                Create
                                </Button>
                            </form>
                            </div>
                      </div>
                    )}
            </Fragment >
        </div>
    )
}

export default CategoryCreateScreen