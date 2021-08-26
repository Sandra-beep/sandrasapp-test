import React, {useState} from 'react';
import axios from 'axios';
import Modal from "react-modal";
import dateFormat from 'dateformat';
import { loadStripe } from '@stripe/stripe-js';
import {server} from "./config";


function Booking( {helperId, firstName, lastName, dateTime, price} ) {

  const customStyles = {
    content : {
      background: "lightgrey",
      height        :   "auto",
      width         :   "50vw",
      top           :   '50%',
      left          :   '50%',
      right         :   'auto',
      bottom        :   'auto',
      marginRight   :   '-50%',
      transform     :   'translate(-50%, -50%)'
    }
  };
  const token = localStorage.getItem("jwt");
  const [deleteStatus, setDeleteStatus] = useState(false);

  function openDeleteModal(e) {
    setDeleteStatus(true)
  }

  function closeDeleteModal(){
    setDeleteStatus(false);
  }

  async function deleteSession() { //om isHelper && isRegularUser, kan man ta bort en card
    await axios.delete(`${server}bookings/${helperId}`,
    
    { headers: {
        Authorization: `Bearer ${token}`,
      } }
    )
    .then(
      closeDeleteModal(),
      window.location.reload()
    )
    }



  const stripePromise = loadStripe('pk_test_51Ix6McCzY61MZmcNxfvhcuoFfyjdYviQibCbVB6h7TG5smVSFev43rB9Bhwrp8YzPoM4HqzG8SVJxnSCDAwHURvL00pYmIulO1');

  const handleClick = async (event) => { //vart ska event ta vägen?
        
      
  // ------------- Get Stripe.js instance -------------
        const stripe = await stripePromise;
    
        // Call your backend to create the Checkout Session
        const response = await axios.post(`${server}create-checkout-session`, {firstName:firstName, price:price})
        // ('/create-checkout-session', { method: 'POST' });
    
        // console.log(response)
    
        const sessionId = response.data.id
  
        // console.log(sessionId)
        
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
      <>
        <div className = "card" key = { helperId } >
            <p><b>Student:</b> {firstName} {lastName}</p>
            <p><b>Time booked:</b> {dateFormat(dateTime, "DDDD, dd mmm yyyy, HH.MM")}</p>
            <p><b>Price:</b> {price} SEK</p>

            
            <button role="link" onClick = { handleClick }>
            <p>Checkout</p>
            </button>

            <button className = "delete-button" onClick = { openDeleteModal }> 
                Cancel booking
            </button>

        </div>

        <Modal
          isOpen= { deleteStatus }
          onRequestClose={closeDeleteModal}
          style={customStyles}
          ariaHideApp={false}
          contentLabel="Delete session"
        >
        
        <h2>Delete session</h2>
          <h3>Do you want delete this session?</h3>
          <button className="" onClick={deleteSession}>Yes</button>
          <button className="" onClick={closeDeleteModal}>No</button>
        </Modal>
    </>
    );
}

export default Booking;