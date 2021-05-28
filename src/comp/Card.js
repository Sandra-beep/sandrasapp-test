import React, {useEffect, useState} from 'react';
import Modal from "react-modal";
import axios from "axios";

function Card ( { helperId, firstName, lastName, description, image, language, dateTime } ){ 

    const customStyles = {
        content : {
          background: "lightgrey",
          height        :   "300px",
          width         :   "250px",
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

    //Mina states
    const [modalStatus, setModalStatus] = useState(false);
    const [formValues, setFormValues] = useState(intialValues);
    const [userId, setUserId] = useState(localStorage.getItem("userId"))
    const [token, setToken]= useState(localStorage.getItem("jwt"));
    
    const email_ls = localStorage.getItem("email");


    useEffect( ()=> { //läser från localstorage
        const userId = localStorage.getItem("userId") //redan på rad 28??
        setUserId(userId)
    }, []) //[] empty dependency array, ser till att hooken bara kör funktionen efter första render


    function openModal(){
        setModalStatus(true)
    }

    function closeModal(){
        setModalStatus(false)
    }

    function onHandleChange(event){
        setFormValues({...formValues, [event.target.name] :  event.target.value})
    }

    async function onHandleSubmit(event){
        event.preventDefault(); //förhindrar uppdatering av sidan
        
        axios.post("http://localhost:1337/bookings", { //Fixa så att man kan hämta en user-booking
            user_id:{userId},
            helper_id:{helperId}

            }).then ( (res)=> {
            console.log(res.data)
            openModal();

            }).catch ( (err) => {
            console.log(err) //Vad är det för error den ska visa och vart?

            })
}

function deleteCard() {
    axios.delete("http://localhost:1337/helpers/{helperId}", //behöver vara dynamiskt 
    { headers: {
        Authorization: `Bearer ${token}`,
      } }
    )
}

return (
        <>
        <div className = "card" key = { helperId } >
            <div><img src={`http://localhost:1337${image}`} alt=""/></div>
            <h3>{ firstName } { lastName }</h3>
            <p>{ description }</p>
            <p><b> Languages/framework </b></p>
            <p>{ language }</p>

            <p><b> Time available</b></p>
            <p>{dateTime}</p>
            {/* dateTime.toString funkade inte */}

            <button onClick = { openModal }> 
                Book
            </button>

            <button                     > 
                Update
            </button>
                                            
            <button onClick = { deleteCard }> 
                Delete
            </button>

        </div>

        <Modal 
        isOpen = {modalStatus}
        onRequestClose = {closeModal}
        style = {customStyles}
        contentLabel = "Bekräftelse"
        >
       
        <h3>Tack för din bokning!</h3>
        <form onSubmit = { onHandleSubmit}>
            <p>Det kommer en bekräftelse i mail:</p>
            {/* email ska komma auto från API*/}
            <input type="text" name="email" value={ email_ls } />
            
            {/* Behöver en useState som ändrar läge confirm till confirmed! i modalen */}
            {<button type="submit">
            Confirm
            </button> }
            
            <button onClick = {closeModal}>
            Close
            </button>
        </form>
        </Modal>
        </>
    )
}
 
export default Card;