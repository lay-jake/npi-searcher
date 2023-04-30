import * as ActionTypes from './actionTypes'

export const SearchFields = (state = {
    firstName:{value:'', display:"Provider First Name: "},
    lastName:{value:'', display:"Provider Last Name: "},
    npiNumber:{value:'', display:"NPI Number: "},
    taxonomyDescription:{value:'', display:"Taxonomy Description: "}, 
    city:{value:'', display:"City: "}, 
    state:{value:'', display:"State: "},
    zip:{value:'', display:"Zip: "},
    searchResults:[],
    isLoading:false,
    searchedOnce:false
}, action) => {
    switch(action.type){
            /**
             * Adding to array of searchResults - concating so to keep results up to 1200.
             */
          case ActionTypes.ADD_RESULTS:
              return {...state,searchedOnce:true, isLoading:false, searchResults:[...state.searchResults.concat(action.payload.results)]}
          
            //Reset search results to empty array - used when search is clicked again to remove possible old results 
          case ActionTypes.CLEAR_RESULTS:
              return {...state, isLoading:true, searchResults:[]}    

          case ActionTypes.LOADING_RESULTS:
              return {...state, isLoading:true}
          
          //Updating the Store state based on the type of input received (which box was typed in)    
          case ActionTypes.UPDATE_SEARCH:
            switch(action.payload.type){
                case "firstName":
                    return {...state, isLoading: false, firstName:{...state.firstName, value:action.payload.value}}   
                case "lastName":
                    return {...state, isLoading: false, lastName:{...state.lastName, value:action.payload.value}}     
                case "npiNumber":
                    return {...state, isLoading: false, npiNumber:{...state.npiNumber, value:action.payload.value}}   
                case "taxonomyDescription":
                    return {...state, isLoading: false, taxonomyDescription:{...state.taxonomyDescription, value:action.payload.value}}   
                case "city":
                    return {...state, isLoading: false, city:{...state.city, value:action.payload.value}}   
                case "state":
                    return {...state, isLoading: false, state:{...state.state, value:action.payload.value}}   
                case "zip":
                    return {...state, isLoading: false, zip:{...state.zip, value:action.payload.value}}   
                default:
                    return state  
            }
          default:
              return state        
      }    
    }
