import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import './PageTicker.css'


export default function PageTicker({handlePageSelect, length,currentPage}) {

function handlePageNumbers(){
    let returnArray = []
    for (let index = 1; index <= length/50; index++) {
        returnArray.push(
                
                <Button id={"bootstrap-button-overrides-pages"} key={`pageIndex${index}`} className={index === currentPage ? 'active': '' } onClick={() => handlePageSelect(index)}>{index}</Button>
          
        )        
    }
    return(returnArray)
}


  return (
    <div>
        <Row>
            <h4>Page(s)</h4>
        </Row>
        <Row xs={"auto"}>
            <Col xs={{span:11,offset:0}} sm={{span:10,offset:1}} md={{span:8,offset:2}}>
                <div className='page-numbers-box'>
                    {handlePageNumbers()}
                </div>
            </Col>
        </Row>
    </div>
  )
}
