import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-content">
        <div className="contact-image">
          <img src="/contactimg.png" alt="Contact Illustration" />
        </div>
        
        <div className="contact-form">
          <h1 className="contact-title">Contact <br/> <span className='contact-badge'>Our Team</span></h1>
          <p className="contact-description">We respond in up to 3 business days.</p>
          
          <form>
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Enter your first name" />
            </div>
            
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="Enter your email address" />
            </div>
            
            <div className="form-group">
              <label>Message</label>
              <textarea placeholder="Write your message" rows="4"></textarea>
            </div>
            
            <div className="form-terms">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms"> Terms & Conditions</label>
            </div>
            
            <button type="submit" className="contact-button">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
