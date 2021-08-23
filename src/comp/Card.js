import React, {useEffect, useState} from 'react';
import Modal from "react-modal";
import axios from "axios";
import dateFormat from 'dateformat';

function Card ( { helperId, firstName, lastName, description, image, language, dateTime, price } ){ 

    const customStyles = {
        content : {
          background: "white",
          height        :   "auto",
          width         :   "50vw",
          top           :   '50%',
          left          :   '50%',
          right         :   'auto',
          bottom        :   'auto',
          marginRight   :   '-50%',
          transform     :   'translate(-50%, -50%)',
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
    const [token, setToken] = useState(localStorage.getItem("jwt"));
    const [modalStatus, setModalStatus] = useState(false);
    const [deleteStatus, setDeleteStatus] = useState(false); //deleteisopen
    const [editStatus, setEditStatus] = useState(false); //editisopen
    const [disableStatus, setDisableStatus] = useState(false);
    const [confirmText, setConfirmText] = useState("Confirm");

    useEffect( ()=> { //Efter render
        const userId = localStorage.getItem("userId") //redan bland states?
        setUserId(userId)
  
    }, []) //[] empty dependency array, kör funktionen 1 render


    function openBookModal(){
        setModalStatus(true)
    }

    function closeBookModal(){
        setModalStatus(false)
    }

    function openDeleteModal(e){
        setDeleteStatus(true)
    }
    
    function closeDeleteModal(){
        setDeleteStatus(false);
    }


    const [editInfo, setEditInfo] = useState({});
    
    const onEditChange = ({ target }) => {
        const {name, value} = target;
        
        setEditInfo({...editInfo, [name]:value})
    
    }


    async function openEditModal(e) {
        await axios.get(`http://localhost:1337/helpers/${ helperId }`).then(res => setEditInfo(res.data))
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
        
        axios.post("http://localhost:1337/bookings/", { //Lägger ut information i user-booking
            user_id:userId,
            helper_id:helperId

            }).then ( ()=> {
            openBookModal(); //ändra state så confirmed blir disabled
            setDisableStatus(true);
            // deklarera en state som kan ha true eller falsk value
            // ändra state till true här 
            // i jsx du skulle ändra disable= {statenamn}
            setConfirmText("Confirmed!");
            }).catch ( () => {
                // error-meddelande
            })
    }


    async function editCard() { //om isHelper && isRegularUser, kan man ändra sin info
    await axios.put(`http://localhost:1337/helpers/${helperId}`, editInfo
    
    )
    .then(
        closeEditModal(),
        window.location.reload()
    ).catch(err => console.log("err", err))
    }





    async function deleteCard() { //om isHelper && isRegularUser, kan man ta bort en card
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
            
            {/* : */}
            
            <button onClick = { openBookModal }> 
                Book
            </button>

            <button onClick = { openEditModal }> 
                Update
            </button>
                                            
            <button className ="delete-button" onClick = { openDeleteModal }> 
                Delete
            </button>
            
        </div>

        
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
        <form  method="post" className="" onSubmit={editCard}>

          <input type="text" 
                placeholder = "Update description"
                value = {editInfo.description}
                name = "description"
                onChange = { onEditChange }
                />
                
                <input type="text"
                placeholder="Update languages"
                name = "language"
                value = {editInfo.language}
                onChange = { onEditChange }
                />

                <input type="datetime-local" 
                name="date_time" 
                value = {editInfo.date_time}
                onChange = { onEditChange }
                />

                <input type="number"
                placeholder = "Update price for the favor (SEK)"
                value = {editInfo.price}
                name = "price"
                onChange = { onEditChange }
                />
                
          <button type ="submit" className="">Yes, save new info!</button>
          <button className="" onClick={closeEditModal}>No, I'm good!</button>
          </form>
        </Modal>

        
        <Modal 
        isOpen = { modalStatus }
        onRequestClose = { closeBookModal }
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
            {<button type="submit" disabled ={disableStatus}>
            {confirmText}
            </button> }
            
            <button onClick = { closeBookModal }>
            Close
            </button>
        </form>
        </Modal>
        {/* : <div></div> */}

    </>
    )
}
 
export default Card;