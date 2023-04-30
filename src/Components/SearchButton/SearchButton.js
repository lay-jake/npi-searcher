import React from 'react'
import './SearchButton.css'
import { Button } from 'react-bootstrap'
import Popup from 'reactjs-popup';

export default function SearchButton({fetchResults,searchFields,clearResults}) {
    const [isTriggered,setIsTriggered] = React.useState(false); 
    const hasText = searchFields.city.value || searchFields.state.value || searchFields.zip.value ||
                    searchFields.npiNumber.value || searchFields.firstName.value || searchFields.lastName.value ||
                    searchFields.taxonomyDescription.value

    function handleSubmit(){
        if(hasText){
            clearResults();
            fetchResults(searchFields);
        } else {
            setIsTriggered(true)
        }
    }
    
  return (
    <>
    <Button id={"bootstrap-button-overrides"} onClick={() => handleSubmit()}>
         Search Records
    </Button>
    <Popup open={isTriggered}
                onClose={()=>setIsTriggered(false)}>
                <div>Must complete at least one search criteria before submitting for search</div>
                <button className="search-warning-button" onClick={()=>setIsTriggered(false)}>Understood</button>
    </Popup>
    </>
  )
}
