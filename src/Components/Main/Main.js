import { Component } from "react";
import { connect } from 'react-redux'
import { Input } from "../Input/Input";
import { clearResults, fetchResults, updateSearchField } from "../../Redux/actionCreator"
import { Col} from "react-bootstrap";
import './main.css'
import Results from "../Results/Results";
import SearchButton from "../SearchButton/SearchButton";


const mapStateToProps = state => {
    return{
        searchFields:state.searchFields,
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateSearchField: (searchField,input) => {dispatch(updateSearchField(searchField,input))},
    fetchResults: (state) => {dispatch(fetchResults(state))},
    clearResults:() => {dispatch(clearResults())}
})

class Main extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
          
            <div>
                <div className="main-body" >
                    <div className="search-boxes-main">
                        <div className="search-heading">
                            <Col>
                            <h1>Search fields</h1>
                            </Col>
                            <Col>
                            <p>Enter information to search by</p>
                            </Col>
                        </div>
                        {/**
                         * 
                         * Iterate over the searchFields REDUX store, if it has a display property it is a searchable field
                         * Create a input box for the field 
                         *                  * 
                         */
                        }
                        <div className="searchfields">
                        {Object.keys(this.props.searchFields).map( (field) => {
                                            if (field !== "searchResults" && this.props.searchFields[field].display){
                                                return(    
                                                    <Input key={field} searchType={field} display={this.props.searchFields[field].display} updateSearchField={this.props.updateSearchField}/>
                                                )
                                            }
                                        })}
                        
                        </div>
                    </div>
                    <div>
                    
                        <SearchButton fetchResults={this.props.fetchResults} searchFields={this.props.searchFields} clearResults={this.props.clearResults}/>
                    </div>
                    {/** Conditional rendering - check if we have searched once already, if we have, check if we have results
                     *   if there is no results, display <p>
                     *   Else show results
                     *   if both evaluate as FALSE then we send an empty fragment
                     */}
                    {this.props.searchFields.searchedOnce ? this.props.searchFields.searchResults ? <Results results={this.props.searchFields.searchResults}/> : <p>No Results</p> : <></>}
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);