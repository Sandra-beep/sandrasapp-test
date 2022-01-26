//Här kan inloggad student ändra sina uppgifter
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from "react-modal";
import { useNavigate } from 'react-router-dom';
import { server } from "./config";

function MyInfo(props) {

    const customStyles = { //Stilen för modulen/popupen
        content: {
            background: "lightgrey",
            height: "auto",
            width: "50vw",
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    };


    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [editStatus, setEditStatus] = useState(false); //editisopen
    const email = localStorage.getItem("email");
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("jwt");
    const navigate = useNavigate()

    //Börjar med tidigare satta värden
    const intialValues = {
        firstname: firstName,
        lastname: lastName,
        email: email

    }

    useEffect(() => {//Hämtar specifik user

        const fetchUser = async () => { //async-funktionen
            const response = await axios.get(`${server}users?id=${userId}`)
            setFirstName(response.data[0].first_name);
            setLastName(response.data[0].last_name);

            // console.log(response.data[0]);
        }

        fetchUser(); //Hämtningen av funktionen

    }, [])




    function openEditModal() {
        setEditStatus(true);
    }

    function closeEditModal() {
        setEditStatus(false);
    }

    function editProfile(event) {
        event.preventDefault();

        // console.log(editInfo.firstname);

        const editProfileCard = () => { //Updaterar i Strapi
            axios.put(`http://localhost:1337/users/${userId}`, {
                first_name: editInfo.firstname,
                last_name: editInfo.lastname,
                email: editInfo.email
            }

            )
                .then((res) => {
                    // console.log(res);
                    localStorage.setItem("email", editInfo.email)
                    closeEditModal()
                    window.location.reload()
                }

                ).catch(err => console.log("err", err))

        }

        editProfileCard();

    }

    const [editInfo, setEditInfo] = useState(intialValues);


    const onEditChange = ({ target }) => {
        const { name, value } = target;
        setEditInfo({ ...editInfo, [name]: value })

        // console.log(editInfo);
    }


    const [deleteStatus, setDeleteStatus] = useState(false);


    function openDeleteModal(e) {
        setDeleteStatus(true)
    }

    function closeDeleteModal() {
        setDeleteStatus(false);
    }

    //Funktion som tar bort en card
    async function deleteProfile() {
        await axios.delete(`http://localhost:1337/users/${userId}`,

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )
            .then(
                closeDeleteModal(),
                localStorage.clear(),
                navigate("/signup")
            )
    }


    return ( //Form
        <>
            <div className="create-form">
                <h2>Hello {firstName}, here you can update your info!</h2>
                <p>My name: {firstName} </p>
                <p>My lastname: {lastName} </p>
                <p>My email: {email} </p>

                <button onClick={openEditModal}>
                    Change
                </button>

                <button className="delete-button" onClick={openDeleteModal}>
                    Delete Account
                </button>
            </div>

            <Modal //Öppnar Change modul
                isOpen={editStatus}
                onRequestClose={closeEditModal}
                style={customStyles}
                ariaHideApp={false}
                contentLabel="Edit profile"
            >

                <h2>Edit Profile</h2>
                <h3>{firstName}, do you want to update your profile? </h3>
                <form method="post" className="" onSubmit={editProfile}>

                    <input type="text"
                        placeholder="Update firstname"
                        value={editInfo.firstname}
                        name="firstname"
                        onChange={onEditChange}
                    />

                    <input type="text"
                        placeholder="Update lastname"
                        value={editInfo.lastname}
                        name="lastname"
                        onChange={onEditChange}
                    />

                    <input type="text"
                        placeholder="Update email"
                        value={editInfo.email}
                        name="email"
                        onChange={onEditChange}
                    />

                    <button type="submit" className="">Yes, save new info!</button>
                    <button className="" onClick={closeEditModal}>No, I'm good!</button>
                </form>
            </Modal>

            <Modal //Öppnar Delete modul
                isOpen={deleteStatus}
                onRequestClose={closeDeleteModal}
                style={customStyles}
                ariaHideApp={false}
                contentLabel="Delete Profile"
            >

                <h2>Delete Account</h2>
                <h3>Do you want delete your account?</h3>
                <button className="" onClick={deleteProfile}>Yes</button>
                <button className="" onClick={closeDeleteModal}>No</button>
            </Modal>

        </>

    );
}

export default MyInfo;