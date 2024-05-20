import './App.css';
import { ToastContainer } from 'react-toastify';
import { Content } from './Content';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="App">
      <Content />
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default App;
