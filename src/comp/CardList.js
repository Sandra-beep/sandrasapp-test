import axios from 'axios';
import React , {useState, useEffect} from 'react';
import Card from "./Card";

function CardList() {

    const [helpers, setHelpers] = useState([])
    // const [loadPage, setLoadpage] = useState(2); //(2) typ av default-värde

    useEffect(  ()=> {
        async function fetch(){
           const response = await axios.get(`http://localhost:1337/helpers?_limit=2`)
        // ("http://localhost:1337/helpers") original utan paginering

        // `http://localhost:1337/helpers?_limit=${loadpage}`

           setHelpers(response.data)
        }

        fetch()
  }, [])

    // function loadMore() { //utöver de 2 som är default så laddas det 2 till.
    //     let dynamicPage = loadMore + 2;
    //     setLoadpage(dynamicPage);
    // }


    return ( //här loopas varje card
        <div className="">

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