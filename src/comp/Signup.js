import React, {useState} from 'react';
import axios from "axios"; // för att senare kunna hämta från databasen
import { useHistory } from 'react-router-dom'; //hämtar historia



function Signup() {

const intialValue = { //sätter tomma värden som default
    username:"",
    first_name:"",
    last_name:"",
    email:"",
    password:"" //Inga mellanslag i "", annars blir det en punkt på weeben
}

const [registerValues, setRegisterValues] = useState(intialValue)
// const [username, setUsername] = useState(" ");
const [loggedIn, SetLoggedIn] = useState(false); //kollar om redan är registrerad?
const [error, setError] = useState (" ");
const history = useHistory(); //en variabel innehållandes en funktion

//denna ändrar innehållet
function handleOnChange(event) {
    setRegisterValues( {...registerValues, [event.target.name]: event.target.value} ) 
    //... lägger till sådant som redan är tillagt sedan tidigare
}

//denna lägger till nytt innehåll i databasen
function handleOnSubmit(event) {
    event.preventDefault(); //stoppar uppdatering av sidan
    axios.post('http://localhost:1337/auth/local/register', {
        username:registerValues.username,
        first_name: registerValues.first_name,
        last_name: registerValues.last_name,
        email: registerValues.email,
        password: registerValues.password,
    })

    .then( (event)=> { 
        
        SetLoggedIn(true) 
        history.push("/login")//minns information från signup och skickar en vidare till login-sidan
        
        console.log(event)

        } )

    .catch( (error)=> {
            setError ("Ops! Something went wrong, try again!")
        })

}

//villkorssats ifelse, om man är registerad så kan man logga in
return (
    <> 
    
    { loggedIn ? (<div> </div>) : (
    
    <div>

    
    <form
    className="signup-card" 
    x-data="{password: '',password_confirm: ''}" 
    onSubmit = { handleOnSubmit }
    >
    
    <h2> Signup </h2>

    <span className ="text">Username</span>
        <input className=""
        placeholder="" 
        type="text" 
        name="username" 
        value = { registerValues.username } 
        onChange = { handleOnChange } 
        />

    <span className ="text">Firstname</span>
        <input className=""
        placeholder="" 
        type="text" 
        name="first_name" 
        value = { registerValues.first_name } 
        onChange = { handleOnChange } 
        />
    
    <span className ="text">Lastname</span>
        <input className=""
        placeholder="" 
        type="text" 
        name="last_name" 
        value = { registerValues.last_name } 
        onChange = { handleOnChange } 
        />
        
    <span className="text">Email</span>
        <input className=""
        placeholder="" 
        type="email" 
        name="email" 
        value = { registerValues.email } 
        onChange = { handleOnChange }
        />
    
    <span className="text">Password</span>
        <input className=""
        placeholder="" 
        type="password" 
        x-model="password" 
        name="password" 
        value = { registerValues.password } 
        onChange = { handleOnChange }
        />
    
    <span className="">Password confirmation</span>
        <input className=""
        placeholder="" 
        type="password" 
        x-model="password_confirm"
        />

        {/* <div className="">
            <input className="" type="checkbox"/>
                <span className="">Accept the
                    <a href="#" className=""> 
                    Terms and Conditions
                    </a> of the site and the 
                    <a href="#" className="">
                    information data policy.
                    </a>
                </span>
        </div>

        <div className="text-center text-sm text-grey-dark mt-4">
            <input className="" type="checkbox"/>
                By signing up, you agree to the     
                <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                Terms of Service
                </a> and 
                <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                Privacy Policy.
            </a>
        </div> */}
            
        {/* Error meddelande */}
        <h5> { error } </h5>

        <button className="">
            Signup!
        </button>
        
        

        <div className="">
            Already have an account? 
            <a className="" href="../login/">
                <p>Log in here</p>
            </a>
        </div>


    </form>
    </div>

    )}

    </>

    )

}

export default Signup;