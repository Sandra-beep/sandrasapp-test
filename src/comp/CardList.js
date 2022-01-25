import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Card from "./Card";
import { server } from "./config";

function CardList() {

    const [helpers, setHelpers] = useState([]);
    const [loadPage, setLoadPage] = useState(4); //(4) default-värde, börjar med 4 st cards
    const [isHelper, setIsHelper] = useState(false);

    useEffect(() => {
        async function fetch() {
            const response = await axios.get(`${server}helpers?_limit=${loadPage}`)
            // `${server}helpers`                       original utan paginering
            // `${server}helpers?_limit=${loadpage}`    med paginering
            console.log(response.data);
            setHelpers(response.data)
        }

        fetch();

    }, [loadPage])

    //utöver de 2 som är default så laddas det 2 till.
    function loadMore() {
        let dynamicPage = loadPage + 2;
        setLoadPage(dynamicPage);
    }

    function showLess() {
        setLoadPage(2)
    }


    return ( //här loopas varje card
        <div className="">

            {helpers.map((helper) => { //Här mappar jag ut från API/Strapi
               console.log(helper);
               return ( // ex email, är det vi skickar på props sen upp i funktionen. {helper.email} är det som hämtas från API  //undersök här !!!
                    <Card key={helper.id}
                        helperId={helper.id}
                        image={helper.profile_image.formats.thumbnail.url}
                        email={helper.email}
                        firstName={helper.first_name}
                        lastName={helper.last_name}
                        description={helper.description}
                        language={helper.language}
                        dateTime={helper.date_time}
                        price={helper.price}
                        userID={helper.userID}
                    />
                )
            })
            }

            {(helpers.length > loadPage || helpers.length === loadPage) ?
                <button onClick={loadMore} className='showmore-button'>Load more Helpers!</button>
                :
                <button onClick={showLess} className='showmore-button'>Show less Helpers!</button>
                }
        </div>
    );
}

export default CardList;