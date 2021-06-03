import React from 'react';
import axios from 'axios';
import dateFormat from 'dateformat';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Ix6McCzY61MZmcNxfvhcuoFfyjdYviQibCbVB6h7TG5smVSFev43rB9Bhwrp8YzPoM4HqzG8SVJxnSCDAwHURvL00pYmIulO1');

function Booking( {helperId, firstName, lastName, dateTime, price} ) {

    const handleClick = async (event) => { //vart ska event ta vägen?
        // Get Stripe.js instance
        const stripe = await stripePromise;
    
        // Call your backend to create the Checkout Session
        const response = await axios.post("http://localhost:4242/create-checkout-session")
        // ('/create-checkout-session', { method: 'POST' });
    
        console.log(response)
    
        const sessionId = response.data.id
  
        console.log(sessionId)
        
        // When the customer clicks on the button, redirect them to Checkout.
        const result = await stripe.redirectToCheckout({
          sessionId: sessionId,
        });
    
        if (result.error) {
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer
          // using `result.error.message`.
        }
      };

    return (
        <div className = "card" key = { helperId } >
            <p><b>Student:</b> {firstName} {lastName}</p>
            <p><b>Time booked:</b> {dateFormat(dateTime, "DDDD, dd mmm yyyy, HH.MM")}</p>
            <p><b>Price:</b> {price} SEK</p>

            
            <button role="link" onClick = { handleClick }>
            <p>Checkout</p>
            </button>

            <button > 
                Cancel booking
            </button>

        </div>
    );
}

export default Booking;