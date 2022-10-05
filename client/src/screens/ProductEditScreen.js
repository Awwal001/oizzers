import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import "./Assets/css/newProduct.css";
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import { Button } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { listCategories } from '../actions/categoryActions'


function ProductEditScreen({ match, history }) {
    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate

    const categoryList = useSelector(state => state.categoryList)
    const {  categories } = categoryList

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productlist')
        } else {
            if (!product.name || product.id !== Number(productId)) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
        dispatch(listCategories());
    }, [dispatch, product, productId, history, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            id: productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('productid', productId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post('/api/products/upload/', formData, config)

            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
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
                                <h2 className="headings">Product</h2>
                    
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
                                <div>
                                <AttachMoneyIcon />
                                <input
                                    type="number"
                                    placeholder="Price"
                                    required
                                    onChange={(e) => setPrice(e.target.value)}
                                    value={price}
                                />
                                </div>
                    
                                <div>
                                <DescriptionIcon />
                    
                                <textarea
                                    placeholder="Product Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    cols="30"
                                    rows="1"
                                ></textarea>
                                </div>
                    
                                <div>
                                    <AccountTreeIcon />
                                    <select onChange={(e) => setCategory(e.target.value)}>
                                        <option value="">Choose Category</option>
                                        {categories.map((cate) => (
                                        <option key={cate.id} value={cate.id}>
                                            {cate.name}
                                        </option>
                                        ))}
                                    </select>
                                </div>
                    
                                <div>
                                <SpellcheckIcon />
                                <input
                                    type="text"
                                    placeholder="Brand"
                                    required
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                />
                                </div>
                    
                                <div>
                                <StorageIcon />
                                <input
                                    type="number"
                                    placeholder="Stock"
                                    required
                                    onChange={(e) => setCountInStock(e.target.value)}
                                    value={countInStock}
                                />
                                </div>
                    
                                <div id="createProductFormFile">
                                <input
                                    type='text'
                                    placeholder='Enter image'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                />
                                
                                </div>

                                <div>
                                <input 
                                    type="file"
                                    id='image-file'
                                    label='Choose File'
                                    custom
                                    onChange={uploadFileHandler}>

                                </input>
                                {uploading && <Loader />}
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