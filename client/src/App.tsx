import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './components/Home';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
