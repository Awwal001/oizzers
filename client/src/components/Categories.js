import React, { Fragment } from "react";
import { Link } from 'react-router-dom'
import "./CheckoutSteps.css";
import "./styles.css";

const Categories = () => {

  return (
    <Fragment>
        <section id="services" className="services section-bg">
            <div className="container" data-aos="fade-up">
            <div className="section-title">  
                <p>Check out our products by different categories </p>
            </div>

            <div className="row gy-4 mt-5">
                <div className="col-xl-3 col-md-6" data-aos="fade-up" data-aos-delay="100">
                 <div className="icon-box">
                     <Link to={`/category/${1}`}><div className="icon"><i className="fas fa-shoe-prints"></i> </div>
                    <h4 className="title"> Sneakers</h4></Link>
                </div>
                </div>

                <div className="col-md-6 col-lg-3 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="200">
                <div className="icon-box">
                    <Link to={`/category/${2}`}><div className="icon"> <i className="fas fa-shopping-bag"></i> </div>
                    <h4 className="title"> Bags </h4></Link>
                </div>
                </div>

                <div className="col-md-6 col-lg-3 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="300">
                <div className="icon-box">
                    <Link to={`/category/${3}`}><div className="icon"> <i className="far fa-gem"></i> </div>
                    <h4 className="title"> Jewellery</h4></Link>
                </div>
                </div>

                <div className="col-md-6 col-lg-3 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="400">
                <div className="icon-box">
                    <Link to={`/category/${4}`}><div className="icon"> <i className="fas fa-glasses"></i> </div>
                    <h4 className="title">Glasses </h4></Link>
                </div>
                </div>
            </div>
            </div>
        </section>
    </Fragment>
  );
};

export default Categories;
