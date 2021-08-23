import React, { useState, useEffect } from 'react';
import axios from 'axios';

const isAdmin = true;
const isHelper = true;
const isRegularUser = true;

//isAdmin && isHelper && isRegularUser


const Create = ()=> {

    const initialValues = {
        first_name:"", // hämtas auto från databasen
        last_name:"", // hämtas auto från databasen
        email:"", // hämtas auto från localstorage
        description:"",
        language:"",
        profile_image:"",
        date_time: "",
        price: null

    }

    const [formValues, setFormValues] = useState(initialValues);
    //const [error, setError] = useState (" ");
    const [fileData, setFileData] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [userId, setUserId] = useState();
    const email = localStorage.getItem("email");


    useEffect( ()=> { //läser från localstorage
        const email = localStorage.getItem("email");
        const fetchData = async ()=> {
            const response = await axios.get(`http://localhost:1337/users?email=${email}`)
            setUserId(response.data[0].id);
            setFirstName(response.data[0].first_name);
            setLastName(response.data[0].last_name);
            console.log(response.data[0].id);
        }

        fetchData();
        
                
    }, []) //[] för engångsrendering i array


    function onHandleChange(event){
        setFormValues( { ...formValues, [event.target.name]: event.target.value } )
    }

    function handleOnChangePic(event){ 
        setFileData(event.target.files[0])
    }

    function onHandleSubmit(event) {
        event.preventDefault(); //förhindrar att sidan laddar om
        console.log(userId)
        axios.post("http://localhost:1337/helpers", {
            user_id:userId,
            first_name:firstName, //från state
            last_name:lastName, //från state
            email: formValues.email, 
            description:formValues.description,
            language:formValues.language,
            profile_image:formValues.profile_image,
            date_time:formValues.date_time,
            price:formValues.price
        })
        
        .then ( (response) => { //kod för att hantera bilden
            const data = new FormData();
            data.append("files", fileData)
            data.append("ref", "helpers") //vilken collection bilden tillhör
            data.append("refId", response.data.id) 
            data.append("field", "profile_image") //vilken field?
            
            // axios för att ladda upp bilden/bilddatan i media library i strapi
            axios.post("http://localhost:1337/upload", data)
            

            .then( e=> console.log(e) )
            // .catch() (error)=> { console.log(error) }
            
        } )
        


    }


    return (

        <>

        { isAdmin &&         ( // isLoggedIn funkade inte

            <form className="create-form" onSubmit = { onHandleSubmit } >
            
                <div className="">
                    <h2>I want to help out!</h2>
                    <p>Want to sign up as one of Santas Little Web Helpers?</p>
                    <p>Write your info below! (All fields are mandatory)</p>
                </div>
            
                <input type="text" 
                placeholder = "Type your firstname here"
                value = {firstName}
                name = "first_name"
                onChange = { onHandleChange }
                required
                />
            
                <input type="text" 
                placeholder = "Type your lastname here"
                value = {lastName}
                name = "last_name"
                onChange = { onHandleChange }
                required
                /> 

                <input type="email" 
                placeholder = "Type your email"
                value = {email}
                name = "email"
                onChange = { onHandleChange }
                required
                /> 
                
                <input type="text" 
                placeholder = "Type description, ex: A student who is very effective."
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
                placeholder = "Write languages, ex. Javascript, PHP, CSS2, HTML5"
                value = {formValues.language}
                name = "language"
                onChange = { onHandleChange }
                required
                />

                <input type="number"
                placeholder = "Price for the favor (SEK)"
                value = {formValues.price}
                name = "price"
                onChange = { onHandleChange }
                required
                />

                <input type="file" 
                name="profile_image" //istället för file
                onChange = { handleOnChangePic } 
                />

                    {/* Error meddelande */}
                    {/* <h5> { error } </h5> */}

                <button type = "submit" 
                onClick = { onHandleSubmit }>Add me as a Helper!</button>
            </form>
        
        )}

        </>
     );
}
 
export default Create;