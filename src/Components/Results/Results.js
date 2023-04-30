import React from 'react'
import {Row, Col} from "react-bootstrap";
import DetailsModal from '../Modal/DetailsModal';
import PageTicker from '../PageTicker/PageTicker';
import './Results.css'

export default function Results({results}) {

const [isModalOpen, setIsOpen] = React.useState(false);
const [selectedResult, setSelectedResult] = React.useState(false);
const [currentPage, setCurrentPage] = React.useState(1);

function handlePageSelect(page){
    setCurrentPage(page);
}

function handleSelect(selected){
    setSelectedResult(selected);
    setIsOpen(true);
}


function closeModal() {
    setSelectedResult(false)
    setIsOpen(false);
}    

const RESULTS_PER_PAGE = 50;


  return (
    <>
    <div className="resultsfields">
        <Col xs={12}>
                <h1>Search Results</h1>      
        </Col>
        <Col xs={12}>
            <PageTicker handlePageSelect={handlePageSelect} length={results.length} currentPage={currentPage}/>
        </Col>               
        <Row xs={2}>
            {results.length > 0 && results.slice(((currentPage-1)*RESULTS_PER_PAGE),currentPage*RESULTS_PER_PAGE).map((result) =>{
            return(
                <Col key={result.number} xs={12} sm={6} >
                    <div key={result.number} className="result-ind" onClick={()=>handleSelect(result)}>
                        {result.basic.first_name && <h1>{`${result.basic.first_name} ${result.basic.middle_name ? result.basic.middle_name : "" } ${result.basic.last_name}`}</h1>}
                        {result.basic.organization_name && <h1>{`${result.basic.organization_name}`}</h1>}
                        <h4>{`NPI Number: ${result.number}`}</h4>
                    </div>
                </Col>
                ) 
            })}
        </Row>
       
    </div>
    {selectedResult && <DetailsModal selectedResult={selectedResult} isModalOpen={isModalOpen} closeModal={closeModal}/>}
    </>
  )
}
