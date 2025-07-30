import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";

const Footer = () => (
  <footer className="bg-dark text-light pt-4 pb-2" style={{fontSize: '15px'}}>
    <div className="container">
      <div className="row gy-4 align-items-top">
        {/* Left: Academy Info */}
        <div className="col-md-4">
          <div className="d-flex align-items-center mb-2">
            <div className="bg-info text-white fw-bold rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: 36, height: 36}}>VA</div>
            <strong style={{fontSize: '1.2rem'}}>Vedant Academy</strong>
          </div>
          <div>
            <span className="fw-bold">We </span>
            provide world-class badminton facilities and coaching programs to nurture talent and promote a healthy lifestyle.
          </div>
          <div className="mt-3">
            <a href="#" className="text-light me-3 fs-5"><FaFacebookF /></a>
            <a href="#" className="text-light me-3 fs-5"><FaTwitter /></a>
            <a href="#" className="text-light me-3 fs-5"><FaInstagram /></a>
          </div>
        </div>
        {/* Middle: Quick Links */}
        <div className="col-md-4">
          <div className="fw-bold mb-2">Quick Links</div>
          <ul className="list-unstyled">
            <li><a href="#" className="text-light text-decoration-none d-block mb-2">Home</a></li>
            <li><a href="#" className="text-light text-decoration-none d-block mb-2">About Us</a></li>
            <li><a href="#" className="text-light text-decoration-none d-block">Contact Us</a></li>
          </ul>
        </div>
        {/* Right: Contact Info */}
        <div className="col-md-4">
          <div className="fw-bold mb-2">Contact Info</div>
          <ul className="list-unstyled lh-lg">
            <li><MdLocationOn className="me-2 fs-5 text-info"/>123 Sports Avenue, Sporting City, SC 12345</li>
            <li><MdPhone className="me-2 fs-5 text-info"/>+91 98765 43210</li>
            <li><MdEmail className="me-2 fs-5 text-info"/>info@vedantacademy.com</li>
          </ul>
        </div>
      </div>
      <hr className="border-secondary my-3"/>
      <div className="row align-items-center">
        <div className="col-md-6 small">
          © 2025 Vedant Academy. All rights reserved.
        </div>
        <div className="col-md-6 text-md-end small">
          <a href="#" className="text-secondary me-3">Privacy Policy</a>
          <a href="#" className="text-secondary">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
