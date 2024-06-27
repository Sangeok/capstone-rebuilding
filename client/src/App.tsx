import Footer from './components/Footer';
import Home from './components/Home';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex-1">
        <Home />
      </div>
      <Footer />
    </div>
  );
}

export default App;
