import './App.css';
import LandingPage from './Containers/LandingPage/LandingPage';
import {CatagoriesProvider} from './Store/CatagoriesReducer'
import {ToastContainer} from 'react-toastify'
import {AuthProvider} from './Store/AuthReducer'

function App() {
  return (
    <div>
      <AuthProvider>
        <CatagoriesProvider>
          <LandingPage/>
        </CatagoriesProvider>
      </AuthProvider>
      <ToastContainer/>
    </div>
  );
}

export default App;
