import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from "react";
import './DetailsModal.css'


export default function DetailsModal({selectedResult,isModalOpen,closeModal}){

  function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = (match[1] ? '+1 ' : '');
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return '';
}




  if(selectedResult)
    return(
      <>        
      <Modal  id='test'
              show={isModalOpen}
              onHide={closeModal}
              backdrop="static"
              keyboard={false}
              >
                  <Modal.Header >
                      <Modal.Title>
                          {selectedResult.basic.organization_name && <h1>{`${selectedResult.basic.organization_name}`}</h1>}
                          {selectedResult.basic.first_name && <h1>{`${selectedResult.basic.first_name} ${selectedResult.basic.middle_name ? selectedResult.basic.middle_name : "" } ${selectedResult.basic.last_name}`}</h1>}
                          <p>NPI Number: {selectedResult.number}</p>
                      </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  
                    {selectedResult.addresses && <p>Locations:</p>} {selectedResult.addresses && selectedResult.addresses.map( (location) => {
                      return (
                      <div key={location.address_1 + location.address_purpose}>
                        <span>
                          {`${location.address_1}, ${location.address_2 ? location.address_2+"," : ""} ${location.city}, ${location.state}, ${location.postal_code.slice(0,5)} - (${location.address_purpose})`}
                        </span>
                        {location.telephone_number && <p>{`Phone Number: ${location.telephone_number}`}</p>}
                        </div>
                      )})}
                    {selectedResult.basic.credential && `Credientials: ${selectedResult.basic.credential}`}<br/>
                    {selectedResult.taxonomies && `Taxonomy: ${selectedResult.taxonomies.map((taxonomy)=>{return(`${taxonomy.desc} - (${taxonomy.primary? "Primary" : "Secondary"})`)})}`}<br/><br/>
                    {selectedResult.basic.authorized_official_first_name && `${selectedResult.basic.authorized_official_first_name.slice(0,1)}${selectedResult.basic.authorized_official_first_name.slice(1).toLowerCase()} `}
                    {selectedResult.basic.authorized_official_middle_name && `${selectedResult.basic.authorized_official_middle_name.slice(0,1)}${selectedResult.basic.authorized_official_middle_name.slice(1).toLowerCase()} `}
                    {selectedResult.basic.authorized_official_last_name && `${selectedResult.basic.authorized_official_last_name.slice(0,1)}${selectedResult.basic.authorized_official_last_name.slice(1).toLowerCase()} - (${selectedResult.basic.authorized_official_title_or_position})`}
                    <p>{formatPhoneNumber(selectedResult.basic.authorized_official_telephone_number)}</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button id="bootstrap-button-overrides" variant="primary" onClick={closeModal}>
                      Close
                    </Button>
                  </Modal.Footer>
        </Modal>
            </>

    )
    else
    return(<></>)
}
