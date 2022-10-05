import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import "./Assets/css/ProductDetails.css";
import { Container } from 'react-bootstrap'
import { Typography } from "@material-ui/core";
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listCategoryDetails } from '../actions/categoryActions'
import Product from '../components/Product'

function CategoryScreen({ match, history }) {
    const dispatch = useDispatch()

    const categoryDetails = useSelector(state => state.categoryDetails)
    const { loading, error, category } = categoryDetails

    useEffect(() => {
        dispatch(listCategoryDetails(match.params.id))
    }, [dispatch, category,  match])

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            {loading ?
                <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <div className="dashboardContainer">
                            <Typography component="h1">{category.name}</Typography>
                            <Container>
                                <div className="row gy-4 mt-5">
                                    {category.products.map(product => (
                                        <div key={product.id}  className="col-xl-3 col-md-6" data-aos="fade-up" data-aos-delay="100">
                                            <div className="icon-box">
                                                <Product product={product} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Container>
                        </div>
                    )
            }
        </div >
    )
}

export default CategoryScreen
