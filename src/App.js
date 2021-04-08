import './App.css';
import LandingPage from './Containers/LandingPage/LandingPage';
import {CatagoriesProvider} from './Store/Catagories-context-reducer'

function App() {
  return (
    <div>
      <CatagoriesProvider>
        <LandingPage/>
      </CatagoriesProvider>
    </div>
  );
}

export default App;
