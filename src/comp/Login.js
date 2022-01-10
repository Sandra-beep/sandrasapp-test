import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { server } from "./config";

function Login() {

    const initialValues = {
        email: "",
        password: ""
    }

    const [formValues, setFormValues] = useState(initialValues)     //variabel som tar in de tomma värderna först
    // const [username, setUsername] = useState ("")     //variabel med en state som ändrar username
    const [jwt, setJwt] = useState(localStorage.getItem("jwt")) //varibel med state som ändrar token(jwt=javascript web token)
    const [error, setError] = useState(" ")
    const history = useHistory();     //varibel som innehåller funktionen useHistory()


    function handleOnChange(event) {
        setFormValues({ ...formValues, [event.target.name]: event.target.value })
    }

    useEffect(() => {
        // const JWT = localStorage.getItem("jwt") //samma som rad 15?
        setJwt(jwt);

    }, [])

    //en axios request för login sidan
    function handleOnSubmit(event) {
        event.preventDefault();
        axios.post(`${server}auth/local`, {
            identifier: formValues.email,
            password: formValues.password,
        })

            // Hantering om inloggningen gick igenom
            .then(response => { //Sparar allt i localstorage
                console.log("response", response)
                localStorage.setItem("jwt", response.data.jwt);
                localStorage.setItem("firstname", response.data.user.first_name);
                localStorage.setItem("userId", response.data.user.id); //userId, benämning i localstorage. data.user.id, hämtning i API
                localStorage.setItem("email", response.data.user.email);

                if (response.data.user.helper_id.id !== undefined) {
                    localStorage.setItem("helperId", response.data.user.helper_id.id)
                }
                else {

                    // Om inloggningen fungerar, ska man skickas vidare till Home

                    history.push("/home")
                    window.location.reload();

                }
            })

            .catch(
                (error) => {
                    setError("Ops! Something went wrong, try again!", error)
                })

    }

    return ( //Login form med tailwind tillägg
        <>

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

                        {/* Error meddelande */}
                        <h5> {error} </h5>

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

        </>
    )

}



export default Login;