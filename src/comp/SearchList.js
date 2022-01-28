//Sök komponent som visar en lista av sökningen
import React from 'react';

const SearchList = ({SearchList=[]}) => {
  return (
    <>
    { SearchList.map((data,index) => {
        if (data) {
          return (
            <div key={data.name}>
              <p>{data.name}</p>
	    </div>	
    	   )	
    	 }
    	 return null
    }) }
    </>
  );
}

export default SearchList