import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './components/Home';
import NavBar from './components/NavBar';
import { useEffect } from 'react';
import { getGeoLocation } from './utils/getGeolocation';
import { getKoreanAddress } from './utils/getKoreanAddress';
import { userStore } from './store/user-store';

function App() {
  const { setMyLocation, userInfo } = userStore();

  const getMyLocation = async () => {
    try {
      const latAndLong = await getGeoLocation();
      const myLocation = await getKoreanAddress(latAndLong.latitude, latAndLong.longitude);
      setMyLocation(myLocation);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getMyLocation();
  }, [])

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
