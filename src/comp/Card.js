import React, {useEffect, useState} from 'react';
import Modal from "react-modal";
import axios from "axios";
import dateFormat from 'dateformat';

function Card ( { helperId, firstName, lastName, description, image, language, dateTime, price } ){ 

    const customStyles = {
        content : {
          background: "lightblue",
          height        :   "300px",
          width         :   "auto",
          top           :   '50%',
          left          :   '50%',
          right         :   'auto',
          bottom        :   'auto',
          marginRight   :   '-50%',
          transform     :   'translate(-50%, -50%)'
        }
      };

    const intialValues = {
       email:""
    }
    const email_ls = localStorage.getItem("email");


    //Mina states
    
    const [isAdmin, setIsAdmin] = useState(false)
    const [formValues, setFormValues] = useState(intialValues);
    const [userId, setUserId] = useState(localStorage.getItem("userId"))
    const [token, setToken]= useState(localStorage.getItem("jwt"));
    const [modalStatus, setModalStatus] = useState(false);
    const [deleteStatus, setDeleteStatus] = useState(false); //deleteisopen
    const [editStatus, setEditStatus] = useState(false); //editisopen



    useEffect( ()=> { //läser från localstorage
        const userId = localStorage.getItem("userId") //redan på rad 28??
        setUserId(userId)
    }, []) //[] empty dependency array, hook som kör funktionen 1 render


    function openModal(){
        setModalStatus(true)
    }

    function closeModal(){
        setModalStatus(false)
    }

    function openDeleteModal(e) {
        setUserId(e.target.parentNode.previousSibling.previousSibling.previousSibling.innerHTML)
        setDeleteStatus(true)
    }
    
    function closeDeleteModal(){
        setDeleteStatus(false);
    }

    function openEditModal(e) {
        setUserId(e.target.parentNode.previousSibling.previousSibling.previousSibling.innerHTML)
        setEditStatus(true)
    }
    
    function closeEditModal(){
        setEditStatus(false);
    }

    function onHandleChange(event){
        setFormValues({...formValues, [event.target.name] :  event.target.value})
    }

    async function onHandleSubmit(event){
        event.preventDefault(); //förhindrar uppdatering av sidan
        
        axios.post("http://localhost:1337/bookings", { //Fixar så att man kan hämta en user-booking
            user_id:userId,
            helper_id:helperId

            }).then ( (res)=> {
            console.log(res.data)
            openModal();

            }).catch ( (err) => {
            console.log(err) 
            })
    }

function deleteCard() { //om man är inloggad så man genom sitt id på localstorage ta bort sig själv
    axios.delete(`http://localhost:1337/helpers/${helperId}`,
    
    { headers: {
        Authorization: `Bearer ${token}`,
      } }
    )
}

function editCard() { //om man är inloggad så man genom sitt id på localstorage ta bort sig själv
    axios.put(`http://localhost:1337/helpers/${helperId}`,
    
    { headers: {
        Authorization: `Bearer ${token}`,
      } }
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

            
            <p><b> Price: </b>{ price } SEK</p>
        
            <button onClick = { openModal }> 
                Book
            </button>

            {/* isAdmin || userId == true ? */}
            <button onClick = { openEditModal }> 
                Update
            </button>
                                            
            <button onClick = { openDeleteModal }> 
                Delete
            </button>
        

        </div>

        
        {/* : */}
        {/* <Modal
          isOpen= { openDeleteModal }
          onRequestClose={closeDeleteModal}
          style={customStyles}
          ariaHideApp={false}
          contentLabel="Cancel Session"
        >
        
        <h2>Cancel Session</h2>
          <h3>Do you want cancel booked study session? </h3>
          <button className="" onClick={deleteCard}>Yes</button>
          <button className="" onClick={closeDeleteModal}>No</button>
        </Modal> */}


        {/* <Modal
          isOpen = { openEditModal }
          onRequestClose = { closeEditModal }
          style={customStyles}
          ariaHideApp={false}
          contentLabel="Edit Session"
        >
        
        <h2>Edit Session</h2>
          <h3>Do you want to edit booked study session? </h3>
          <button className="" onClick={editCard}>Yes</button>
          <button className="" onClick={closeEditModal}>No</button>
        </Modal> */}

        
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
            {/* email ska komma auto från API*/}
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