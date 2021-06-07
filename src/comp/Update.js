import React, { useState, useEffect } from 'react';
import axios from 'axios';


const isAdmin = true;

const Update = ()=> {
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

    const [formValues, setFormValules] = useState(initialValues);
    //const [error, setError] = useState (" ");
    const [fileData, setFileData] = useState();
    const [userId, setUserId] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const email = localStorage.getItem("email");
    const [helperId, setHelperId] = useState();
    const [description, setDescription] = useState();
    const [datetime, setDatetime] = useState();
    const [languages, setLanguages] = useState();
    const [price, setPrice] = useState();


    useEffect( ()=> { //läser från localstorage
        const email = localStorage.getItem("email") //redan på rad 26
        const fetchData = async ()=> {
            const response = await axios.get(`http://localhost:1337/users?email=${email}`)
            setUserId(response.data[0].id);
            setFirstName(response.data[0].first_name);
            setLastName(response.data[0].last_name);

            setHelperId(response.data[0].helperId);
            setDescription(response.data[0].description);
            setLanguages(response.data[0].language);
            setDatetime(response.data[0].date_time);
            setPrice(response.data[0].price);


            // console.log(response.data[0].last_name);
        }

        fetchData();
        
                
    }, []) //[] för engångsrendering i array


    function onHandleChange(event){
        setFormValules( { ...formValues, [event.target.name]: event.target.value } )
    }

    function handleOnChangePic(event){ 
        setFileData(event.target.files[0])
    }

    function onHandleSubmit(event) {
        event.preventDefault(); //förhindrar att sidan laddar om
        
        axios.post("http://localhost:1337/helpers", {
            user_id:userId,
            helper_id:helperId,
            first_name:firstName, //från state
            last_name:lastName, //från state
            email: email, 
            description:description,
            language:languages,
            profile_image:formValues.profile_image, //behålla tidigare bild
            date_time:datetime,
            price:price

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

        { isAdmin && ( 
        
            <form className="create-form" onSubmit = { onHandleSubmit } >
            
                <div className="">
                    <h2>Update helper-information!</h2>
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
                value = {description}
                name = "description"
                onChange = { onHandleChange }
                required
                />
                
                <input type="datetime-local" 
                value = {datetime}
                name="date_time"
                onChange = { onHandleChange }
                required
                />

                <input type="text"
                placeholder = "Write languages, ex. Javascript, PHP, CSS2, HTML5"
                value = {languages}
                name = "language"
                onChange = { onHandleChange }
                required
                />

                <input type="number"
                placeholder = "Choose price"
                value = {price}
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
                onClick = { onHandleSubmit }>Update info!</button>
            
            </form>
        
        )}

        </>
     );
}
 
export default Update;