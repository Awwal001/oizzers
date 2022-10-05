import React, { useState, useEffect, Fragment } from 'react'
import "./Assets/css/newProduct.css";
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listCategoryDetails, updateCategory } from '../actions/categoryActions'
import { CATEGORY_UPDATE_RESET } from '../constants/categoryConstants'
import { Button } from "@material-ui/core";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import SideBar from "./Sidebar";

function ProductEditScreen({ match, history }) {
    const dispatch = useDispatch()
    const categoryId = match.params.id

    const [name, setName] = useState('')

    const categoryDetails = useSelector(state => state.categoryDetails)
    const { error, loading, category } = categoryDetails

    const categoryUpdate = useSelector(state => state.categoryUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = categoryUpdate
    
    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: CATEGORY_UPDATE_RESET })
            history.push('/admin/categorylist')
        } else {
            if (!category.name || category.id !== Number(categoryId)) {
                dispatch(listCategoryDetails(categoryId))
            } else {
                setName(category.name)
            }
        }
    }, [dispatch, category, categoryId, history, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateCategory({
            id: categoryId,
            name
        }))
    }

    return (
        <div>
            <Fragment>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

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
                                <h2 className="headings">Edit Product</h2>
                    
                                <div>
                                <SpellcheckIcon />
                                <input
                                    type="text"
                                    placeholder="Product Name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                </div>
                    
                                <Button
                                id="createProductBtn"
                                type="submit"
                                disabled={loading ? true : false}
                                >
                                SAVE
                                </Button>
                            </form>
                            </div>
                      </div>
                    )}
            </Fragment >
        </div>
    )
}

export default ProductEditScreen