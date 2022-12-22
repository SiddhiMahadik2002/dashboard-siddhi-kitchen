import logo from './logo.svg';
import './App.css';
import { Navigation } from './navigation/navigation';
import { AuthProvider } from "./Context/authContext";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        {
          console.log(2+2)
        }
        <Navigation />
      </AuthProvider>
    </div>
  );
}

export default App;
