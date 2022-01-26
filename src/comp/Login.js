//Här är alla funktioner för inlogg
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { server } from "./config";

function Login() {

    const initialValues = {
        email: "",
        password: ""
    }

    const [formValues, setFormValues] = useState(initialValues)     //variabel som tar in de tomma värderna först
    const [jwt, setJwt] = useState(localStorage.getItem("jwt"))     //varibel med state som ändrar token(jwt=javascript web token)
    const [error, setError] = useState(" ")
    const navigate = useNavigate()


    function handleOnChange(event) {
        setFormValues({ ...formValues, [event.target.name]: event.target.value })
    }

    useEffect(() => {
        // const JWT = localStorage.getItem("jwt") //samma som rad 15
        setJwt(jwt);

    }, [])

    //en axios request för login sidan
    function handleOnSubmit(event) {
        event.preventDefault();
        axios.post(`${server}auth/local`, {
            identifier: formValues.email,
            password: formValues.password,
        })

            // Hantering om inloggningen gick igenom, här sätts items
            .then(response => { //Sparar allt i localstorage
                console.log("response", response)
                localStorage.setItem("jwt", response.data.jwt);
                localStorage.setItem("firstname", response.data.user.first_name);
                localStorage.setItem("userId", response.data.user.id); //userId, benämning i localstorage. data.user.id, hämtning i API
                localStorage.setItem("email", response.data.user.email);

                const userid = response.data.user.id;
                const getHelperId = async () => {
                    const helperinfo = await axios.get(`${server}helpers?userID=${userid}`)
                    console.log(helperinfo)
                    if (helperinfo.data.length !== 0) {

                        localStorage.setItem("helperId", helperinfo.data[0].id)
                    }
                    navigate("/home");
                    window.location.reload();
                }
                getHelperId();


                //Kod jag testat runt med: Om man inte har helperid är definerad så settar den helperId
                // if (response.data.user.helper_id.id !== undefined) {
                //     localStorage.setItem("helperId", response.data.user.helper_id.id)
                // }
                // else { // annars skickas vidare till Home, och laddar om sidan

                //     navigate("/home");
                //     window.location.reload();

                // }
            })

            .catch(
                (error) => {
                    setError("Ops! Something went wrong, try again!", error)
                })

    }

    return ( //Login form med tailwind tillägg test

        <div className="content">

            <div className="login-card">

                <h2>Login</h2>

                <form className="" onSubmit={handleOnSubmit} method="POST">

                    <input type="hidden" name="remember" value="true" />

                    <input className="block border border-grey-light w-full p-3 rounded mb-4"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formValues.email}
                        autocomplete="email"
                        required
                        onChange={handleOnChange} />

                    <input className="block border border-grey-light w-full p-3 rounded mb-4"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formValues.password}
                        autocomplete="password"
                        required
                        onChange={handleOnChange} />

                    <h5> {error} </h5> {/* Error meddelande */}

                    <button type="submit">Login in</button>
                    
                </form>

                <div className="login-links">

                    <div className="">
                        Don't have an account yet?
                        <a className="" href="../signup/">
                            <p>Sign up here</p>
                        </a>
                    </div>

                    <div className="">
                        Forgot your password?  We got you!
                        <a className="" href="../forgot-password/">
                            <p>Redirect here</p>
                        </a>
                    </div>

                </div>
            </div>
        </div>
    )

}



export default Login;