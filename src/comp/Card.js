import React, {useEffect, useState} from 'react';
import Modal from "react-modal";
import axios from "axios";
import dateFormat from 'dateformat';

function Card ( { helperId, firstName, lastName, description, image, language, dateTime, price } ){ 

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

    const intialValues = {
        description:"",
        language:"",
        profile_image:"",
        date_time: "",
        price: null
    }
    const email_ls = localStorage.getItem("email");


    //Mina states
    
    // const [isLoggedIn, setIsLoggedIn] = useState(false) //flytta till navbar?
    // const [isAdmin, setIsAdmin] = useState(false)
    const [formValues, setFormValues] = useState(intialValues);
    const [userId, setUserId] = useState(localStorage.getItem("userId"))
    const [token, setToken]= useState(localStorage.getItem("jwt"));
    const [modalStatus, setModalStatus] = useState(false);
    const [deleteStatus, setDeleteStatus] = useState(false); //deleteisopen
    const [editStatus, setEditStatus] = useState(false); //editisopen



    useEffect( ()=> { //läser från localstorage
        const userId = localStorage.getItem("userId") //redan bland states?
        setUserId(userId)
  
    }, []) //[] empty dependency array, hook som kör funktionen 1 render


    function openModal(){
        setModalStatus(true)
    }

    function closeModal(){
        setModalStatus(false)
    }

    function openDeleteModal(e) {
        setDeleteStatus(true)
    }
    
    function closeDeleteModal(){
        setDeleteStatus(false);
    }

    function openEditModal(e) {
        setEditStatus(true)
    }
    
    function closeEditModal(){
        setEditStatus(false);
    }



    function onHandleChange(event){
        setFormValues({...formValues, [event.target.name] :  event.target.value})
    }

    function onHandleSubmit(event){
        event.preventDefault(); //förhindrar uppdatering av sidan
        
        axios.post("http://localhost:1337/bookings", { //Fixar så att man kan hämta en user-booking
            user_id:userId,
            helper_id:helperId

            }).then ( ()=> {
            openModal();

            }).catch ( () => {
                // error-meddelande
            })
    }

async function deleteCard() { //om man är inloggad så man genom sitt id på localstorage ta bort sig själv
    await axios.delete(`http://localhost:1337/helpers/${helperId}`,
    
    { headers: {
        Authorization: `Bearer ${token}`,
      } }
    )
    .then(
        closeDeleteModal(),
        window.location.reload()
    )
}

async function editCard() { //om man är inloggad så man genom sitt id på localstorage ta bort sig själv
    await axios.put(`http://localhost:1337/helpers/${helperId}`,
    
    { headers: {
        Authorization: `Bearer ${token}`,
      } }
    )
    .then(
        closeEditModal(),
        window.location.reload()
    )
}

return (
    <>
        <div className = "card" key = { helperId } >
            
            <div className = "profile">
                <div className = "profile-image">
                    <img src={`http://localhost:1337${image}`} alt=""/>
                </div>
                <div className = "profile-desc">
                    <h3>{ firstName } { lastName }</h3>
                    <p>{ description }</p>
                    <p><b> Languages/framework: </b></p>
                    <p>{ language }</p>
                </div>
            </div>
            <hr />

            <p><b> Date & time available: </b></p>
            <p>{dateFormat(dateTime, "DDDD, dd mmm yyyy, HH.MM")} o'clock</p>

            
            <p><b> Price: </b> { price } SEK</p>
        
            <button onClick = { openModal }> 
                Book
            </button>

            {/* isLoggedIn || userId == true ? */}
            <button onClick = { openEditModal }> 
                Update
            </button>
                                            
            <button onClick = { openDeleteModal }> 
                Delete
            </button>
        

        </div>

        
        {/* : */}
        <Modal
          isOpen= { deleteStatus }
          onRequestClose={closeDeleteModal}
          style={customStyles}
          ariaHideApp={false}
          contentLabel="Delete Card"
        >
        
        <h2>Delete Card</h2>
          <h3>Do you want delete this card?</h3>
          <button className="" onClick={deleteCard}>Yes</button>
          <button className="" onClick={closeDeleteModal}>No</button>
        </Modal>


        <Modal
          isOpen = { editStatus }
          onRequestClose = { closeEditModal }
          style={customStyles}
          ariaHideApp={false}
          contentLabel="Edit Session"
        >

        <h2>Edit information</h2>
          <h3>Do you want to update info? </h3>
          <input type="text" 
                placeholder = "Update description"
                value = {formValues.description}
                name = "description"
                onChange = { onHandleChange }
                required
                />
                
                <input type="datetime-local" 
                name="date_time" 
                value = {formValues.date_time}
                onChange = { onHandleChange }
                required
                />

                <input type="text"
                placeholder = "Update languages"
                value = {formValues.language}
                name = "language"
                onChange = { onHandleChange }
                required
                />

                <input type="number"
                placeholder = "Update price for the favor (SEK)"
                value = {formValues.price}
                name = "price"
                onChange = { onHandleChange }
                required
                />
                
          <button className="" onClick={editCard}>Yes, save new info!</button>
          <button className="" onClick={closeEditModal}>No, I'm good!</button>
        </Modal>

        
        <Modal 
        isOpen = { modalStatus }
        onRequestClose = { closeModal }
        style = {customStyles}
        ariaHideApp={false}
        contentLabel = "Confirmation"
        >
            
        <h3>Thanks for your booking!</h3>
        <form onSubmit = { onHandleSubmit }>
            <p>Confirmation to email:</p>
            {/* email ska komma auto från API */}
            <input type="text" name="email" value={ email_ls } />
            
            {/* Behöver en useState som ändrar läge confirm till confirmed! i modalen */}
            {<button type="submit" >
            Confirm
            </button> }
            
            <button onClick = { closeModal }>
            Close
            </button>
        </form>
        
        </Modal>
    </>
    )
}
 
export default Card;