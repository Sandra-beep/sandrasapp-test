import React from 'react';

function Footer() {

    return (
        <>
            <div className="footer-wrap">
                <div className='f-column'>
                    <p className='footer-title'>About Us</p>
                    <p className='footer-txtrow'>Text</p>
                    <p className='footer-txtrow'>Text</p>
                    <p className='footer-txtrow'>Text</p>
                </div>
                <div className='f-column'>
                    <p className='footer-title'>Contact Us</p>
                    <p className='footer-txtrow'>Text</p>
                    <p className='footer-txtrow'>Text</p>
                    <p className='footer-txtrow'>Text</p>
                </div>
                <div className='f-column'>
                    <p className='footer-title'>FAQ</p>
                    <p className='footer-txtrow'>Text</p>
                    <p className='footer-txtrow'>Text</p>
                    <p className='footer-txtrow'>Text</p>
                </div>
                <div className='f-column'>
                    <p className='footer-title'>Social media</p>
                    <p className='footer-txtrow'>Instagram</p>
                    <p className='footer-txtrow'>Facebook</p>
                    <p className='footer-txtrow'>Discord</p>
                </div>
            </div>
            <div className='footer-copyright'>
                    <h6>&copy; Sandra Rivas, Webbutveckling e-handel, Medieintitutet {new Date().getUTCFullYear()}</h6>
            </div>
        </>
    );
}

export default Footer;