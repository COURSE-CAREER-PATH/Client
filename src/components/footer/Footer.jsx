import React from "react";
import Footerstyles from './Footerstyles.module.css'
import { Buttons } from "../Buttons";
import { Facebook, Linkedin, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="w-full text-white py-2  bottom-0 left-0 right-0 bg-neutral-900">
      <div className="container mx-auto flex flex-col md:flex-row md:flex-wrap md:justify-between space-y-4 md:space-y-0 md:space-x-4 text-center border-b-[0.02rem] border-neutral-600">
        
        <div className="flex-1">
          <h4 className="font-bold">Contact Information</h4>
          <p>CCP</p>
          {/* <p>1234 Street Address, City, State, ZIP</p> */}
          {/* <p>Email: info@company.com</p> */}
          {/* <p>Phone: (123) 456-7890</p> */}
        </div>
        
        <div className="flex-1">
          <h4 className="font-bold">Quick Links</h4>
          <ul>
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/jobs" className="hover:underline">Job Listings</a></li>
            <li><a href="/post-job" className="hover:underline">Post a Job</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/contact" className="hover:underline">Contact Us</a></li>
            <li><a href="/faq" className="hover:underline">FAQ</a></li>
          </ul>
        </div>
        
        <div className="flex-1">
          <h4 className="font-bold">Legal</h4>
          <ul>
            <li><a href="/privacy-policy" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/terms-of-service" className="hover:underline">Terms of Service</a></li>
            <li><a href="/cookie-policy" className="hover:underline">Cookie Policy</a></li>
          </ul>
        </div>
        
        <div className="flex-1">
          <h4 className="font-bold">Support</h4>
          <ul>
            <li><a href="/help-center" className="hover:underline">Help Center</a></li>
            <li><a href="/customer-support" className="hover:underline">Customer Support</a></li>
            <li><a href="/feedback" className="hover:underline">Feedback</a></li>
          </ul>
        </div>
        
        <div className="flex-1">
          <h4 className="font-bold">Newsletter</h4>
          <h2 className="text-sm py-4">Subscribe to our newsletter for the latest updates</h2>
          <form>
            <input type="email" placeholder="Enter your email" className="p-2 rounded-2xl outline-none px-3 mb-3"/>
           <Buttons value={'Subscribe'}/>
          </form>
        </div>
        
        <div className="flex-1">
          <h4 className="font-bold">Additional Information</h4>
          <ul>
            <li><a href="/blog" className="hover:underline">Blog</a></li>
            <li><a href="/career-advice" className="hover:underline">Career Advice</a></li>
            <li><a href="/press" className="hover:underline">Press</a></li>
          </ul>
        </div>
        
      </div>
      <div className="">
        
       
         <div className="flex py-2 px-5 justify-around">
          <div className="flex space-x-5">
            <a href="https://facebook.com" className="hover:text-gray-400"><i className=""><Facebook/></i></a>
            <a href="https://twitter.com" className="hover:text-gray-400"><i className=""><Twitter/></i></a>
            <a href="https://linkedin.com" className="hover:text-gray-400"><i className=""><Linkedin/></i></a>
            <a href="https://instagram.com" className="hover:text-gray-400"><i className=""><Instagram/></i></a>
          </div>
          <Link to={'/admin'}>
        <p className=" text-neutral-400 text-center ">
          {new Date().getFullYear()}. All rights reserved.
        </p>
          </Link>
        </div> 
      </div>
    </footer>
  );
}

export default Footer;
