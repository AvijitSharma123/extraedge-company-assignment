// import logo from './logo.svg';
import './App.css';
import Product from './Components/Product';
import { Provider } from 'react-redux';
import { store } from './Redux/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
     <Product/>
     </Provider>
    </div>
  );
}

export default App;
