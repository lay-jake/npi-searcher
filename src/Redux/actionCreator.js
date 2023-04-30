import * as ActionTypes from './actionTypes'
import instance from '../Shared/api'
/**
 * 
 * @param {*} update - Object - contains an value for Text input and a searchfield name.
 * @returns  Calls store to update state for searchvalues
 */

export const updateSearchField = (update) => ({
    type: ActionTypes.UPDATE_SEARCH,
    payload: update
})
/**
 * 
 * @returns - Nothing - Sendings information to Store to clear State for search results
 */
export const clearResults = () =>({
    type: ActionTypes.CLEAR_RESULTS
   }
)

/**
 * 
 * @returns - Nothing - Sendings information to Store to alter Loading State
 */
export const resultsLoading = () =>({
    type: ActionTypes.LOADING_RESULTS
   }
)
/**
 * 
 * @param {*} results - Array of search results - adds to state in Redux Store.
 * @returns Nothing - Sends information to store
 */
export const addResults = (results) =>({
    type: ActionTypes.ADD_RESULTS,
    payload:results
   }
)

export const fetchResults = (searchField,dispatch) =>{
    
    return dispatch => {
        //Alter isloading in state ; usable for generating loading patterns/icons while getting information
        dispatch(resultsLoading());
    
    //NPI Version - REQUIRED    
    let apiVersion =  '/?version=2.1';
    //we start count at 0 so that the first call gets results 0-200
    let count = 0;
    //Has to stay on one line - if indent it adds numerous %20%20 lines to parse respenting the indents/spaces since its a string literal  
    let apiCall =  `${apiVersion}${searchField.npiNumber.value && `&number=${searchField.npiNumber.value}*`}${searchField.taxonomyDescription.value && `&taxonomy_description=${searchField.taxonomyDescription.value}*`}${searchField.firstName.value && `&first_name=${searchField.firstName.value}*`}${searchField.lastName.value && `&last_name=${searchField.lastName.value}*`}${searchField.city.value && `&city=${searchField.city.value}*`}${searchField.state.value && `&state=${searchField.state.value}`}${searchField.zip.value && `&postal_code=${searchField.zip.value}*`}${`&limit=200`}`    
    //While we haven't called 6 times (under 1200 results which is max) - and our set is stil returning the max (200)
    while( count < 6){
        instance.get(`${apiCall}&skip=${200*count}`)
        .then( res => {
            dispatch(addResults(res.data))
        })
        .then(count++)
        //TO DO - More indepth error handling.
        .catch( error => console.log(error.message))
        //increment and set results to count
        
    }
    }
}