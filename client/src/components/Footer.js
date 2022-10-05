import React from 'react';
import SearchBox from './SearchBox';

function Footer() {
    return (
        <footer id="footer">

            <div className="footer-newsletter">
            <div className="container">
                <div className="row justify-content-center">
                <div className="col-lg-6">
                    <h4>Search products here</h4>
                    <p>You can search products' name here </p>
                    <SearchBox/>
                </div>
                </div>
            </div>
            </div>

            <div className="footer-top">
            <div className="container">
                <div className="row">

                <div className="col-lg-3 col-md-6 footer-contact">
                    <h3>Oizzers</h3>
                    
                </div>

                <div className="col-lg-3 col-md-6 footer-links">
                    <h4>Useful Links</h4>
                    <ul>
                    <li><i className="bx bx-chevron-right"></i> <a href="/">Home</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="/">About us</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="/">Services</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="/">Terms of service</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="/">Privacy policy</a></li>
                    </ul>
                </div>

                <div className="col-lg-3 col-md-6 footer-links">
                    <h4>Our Services</h4>
                    <ul>
                    <li><i className="bx bx-chevron-right"></i> <a href="/">Web Design</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="/">Web Development</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="/">Product Management</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="/">Marketing</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="/">Graphic Design</a></li>
                    </ul>
                </div>

                <div className="col-lg-3 col-md-6 footer-links">
                    <h4>Our Social Networks</h4>
                    <p>Cras fermentum odio eu feugiat lide par naso tierra videa magna derita valies</p>
                    <div className="social-links mt-3">
                    <a href="/" className="twitter"><i className="bx bxl-twitter"></i></a>
                    <a href="/" className="facebook"><i className="bx bxl-facebook"></i></a>
                    <a href="/" className="instagram"><i className="bx bxl-instagram"></i></a>
                    <a href="/" className="google-plus"><i className="bx bxl-skype"></i></a>
                    <a href="/" className="linkedin"><i className="bx bxl-linkedin"></i></a>
                    </div>
                </div>
                </div>
            </div>
            </div>

            <div className="container py-4">
            <div className="copyright">
                &copy; Copyright <strong><span>Oizzers</span></strong>. All Rights Reserved
            </div>
            </div>
        </footer>
    )
}

export default Footer
