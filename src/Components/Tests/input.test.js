import {render, screen, cleanup} from '@testing-library/react'
import { Input } from '../Input/Input';
import renderer from 'react-test-renderer'


afterEach(()=>{
    cleanup();
})

test('Should Render the Input Component',()=>{
    const props ={searchtype:"InputTest",display:"This is a display field: ", updateSearchField: jest.fn()};
    render( <Input searchType={props.searchtype} display={props.display} updateSearchField={props.updateSearchField}/>)
    const inputElement = screen.getByTestId('input-element-1');
    expect (inputElement).toBeInTheDocument();
})

test('Should Render the correct display for the searchtype',()=>{
    const props ={searchtype:"InputTest",display:"This is a display field: ", updateSearchField: jest.fn()};
    render( <Input searchType={props.searchtype} display={props.display} updateSearchField={props.updateSearchField}/>)
    const inputElement = screen.getByTestId('input-element-2');
    expect (inputElement).toHaveTextContent('This is a display field');
})

test('Match the snapshot',()=>{
    const props = {searchtype:"InputTest",display:"This is a display field: ", updateSearchField: jest.fn()};
    const inputTree = renderer.create(<Input searchType={props.searchtype} display={props.display} updateSearchField={props.updateSearchField}/>).toJSON();
    expect(inputTree).toMatchSnapshot();
})


