import axios from 'axios';
import React , {useState, useEffect} from 'react';
import Card from "./Card";

// const CardList = (props) => {
//     const students = props.students; } samma som :
const CardList = ()=> {

    const [helpers, setHelpers] = useState([])

    useEffect(  ()=> {
        async function fetch(){
           const response = await axios.get("http://localhost:1337/helpers")

           setHelpers(response.data)
        
           console.log(response.data);
        }

        fetch()
  }, [])

    return ( //här loopas varje card
        <div className="list">

        { helpers.map( (helper)=> { //Här mappar jag ut från API/Strapi
                 return ( // ex email, är det vi skickar på props sen upp i funktionen. {helper.email} är det som hämtas från API
                     <Card key  =   { helper.id } 
                     helperId   =   { helper.id } 
                     image      =   { helper.profile_image.formats.thumbnail.url }
                     email      =   { helper.email }  
                     firstName  =   { helper.first_name }
                     lastName   =   { helper.last_name }  
                     description=   { helper.description }
                     language   =   { helper.language } 
                     dateTime   =   { helper.date_time }
                     price      =   { helper.price }

                     />
                 )
            }) 
        }

        </div>
     );
}
 
export default CardList;