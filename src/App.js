
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './Components/Main/Main';
import { Provider } from 'react-redux';
import { store } from './Redux/configureStore';


function App() {
  return (
      //Wrapping Main in REDUX Store
      <Provider store={store}>
          <Main/>
      </Provider>
  );
}

export default App;
