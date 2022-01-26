//Funktioner för att kunna lägga upp en bild till Strapi
import axios from 'axios';
import React, { useState } from 'react';
import { server } from "./config";


function UploadFile() {

    const [fileData, setFileData] = useState();

    function handleOnChange(event) {
        setFileData(event.target.files[0]);
    }

    function FileUpload(event) {
        
        event.preventDefault();

        const data = new FormData();

        data.append("files", fileData);

        axios.post(`${server}upload`, {
            img: fileData
        })
    }

    return (

        <div>
            <form onSubmit={FileUpload}>
                <input type="file" name="file" onChange={handleOnChange} />
                <button>Submit</button>
            </form>
        </div>

    )

}



export default UploadFile