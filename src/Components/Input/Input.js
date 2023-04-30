import React, { useEffect } from 'react'
import { useState } from 'react';
import { Col} from 'react-bootstrap';

export const Input = ({searchType,display,updateSearchField}) => {

  const handleDefault = () =>{
    switch(searchType){
         case "firstName":
          return "Exact or first two wildcards"
         case "lastName":
          return "Exact or first two wildcards"
         case "npiNumber":
          return "Exactly 10 digits"
         case "taxonomyDescription":
          return "Exact Description or Specialty"
         case "city":
          return "Exact or first two wildcards"
         case "state":
          return "Abrv. and Other Fields"
         case "zip":
          return "Exact Postal Code"
         default:
          return ""
    }
 }

const [inputText, setInputText] = useState("");
const [placeholder, setPlaceholder] = useState(handleDefault());
//UseEffect checks to see if inputText state has changed, if it does it sends the update to the store.

useEffect(()=>{
  updateSearchField({type:searchType,value:inputText})  
},[inputText])

const handleChange = e => {
    setInputText(e.target.value);
    };  

return (
      <Col xs={8} sm={"auto"} data-testid="input-element-1">
        <form data-testid="input-element-3">
            <label data-testid="input-element-2">
                {`${display}`}
                <input type='text' placeholder={placeholder} value={inputText} onChange = {handleChange}/>
            </label>
        </form>
      </Col>
   
  )
}
