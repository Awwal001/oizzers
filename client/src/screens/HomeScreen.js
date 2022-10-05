import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Container } from 'react-bootstrap'
import Product from '../components/Product'
import Categories from '../components/Categories'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import { listProducts } from '../actions/productActions'
import "./Assets/css/Shipping.css";

function HomeScreen({ history }) {
    const dispatch = useDispatch()
    
    const productList = useSelector(state => state.productList)
    const { error, loading, products, page, pages } = productList

    let keyword = history.location.search

    useEffect(() => {
        dispatch(listProducts(keyword))

    }, [dispatch, keyword])

    return (
        <div>
            <ProductCarousel />
            <Container>
                <h2 className="shippingHeading mb-5">Section</h2>
                <Categories/>
            </Container>
            <Container>
                <h2 className="shippingHeading my-5">Latest Products</h2>
                {loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                        :(
                            <div>
                                <div className="row gy-4 p-5">
                                    {products.map(product => (
                                        <div key={product.id}  className="col-xl-3 col-md-6" data-aos="fade-up" data-aos-delay="100">
                                            <div className="icon-box">
                                                <Product product={product} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Paginate page={page} pages={pages} keyword={keyword} />
                            </div>
                        )
                    }
            </Container>
        </div>
    )
}

export default HomeScreen
