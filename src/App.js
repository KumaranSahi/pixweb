import './App.css';
import LandingPage from './Containers/LandingPage/LandingPage';
import {CatagoriesProvider} from './Store/CatagoriesReducer'
import {ToastContainer} from 'react-toastify'

function App() {
  return (
    <div>
      <CatagoriesProvider>
        <LandingPage/>
      </CatagoriesProvider>
      <ToastContainer/>
    </div>
  );
}

export default App;
