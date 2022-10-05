import React from 'react'
import { Carousel, Image } from 'react-bootstrap'
import Home from '../images/newhome.jpeg'
import Home3 from '../images/ss4.jpeg'

function ProductCarousel() {

    return (
        <Carousel pause='hover' style={{ backgroundColor: '#030303', marginBottom: 50}}>
            <Carousel.Item >
                <Image src={Home3} alt='home-image' fluid />
            </Carousel.Item>
            <Carousel.Item >
                <Image src={Home} alt='home-image' fluid />     
            </Carousel.Item>
        </Carousel>
    )
}

export default ProductCarousel
