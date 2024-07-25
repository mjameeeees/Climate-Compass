import './App.css';
import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Screen from './components/ui';
import CityInput from './components/search';
import Forecast from './components/forecast';
import axios from 'axios';

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const fetchRandomImage = async () => {
    try {
      const response = await axios.get('https://api.unsplash.com/photos/random', {
        params: {
          client_id: 'yEWeFAdoJ6ZtMwKv14EhgRV_IUFM_Fc3Jul479ENaYM',
          query: 'weather', // You can change this keyword
        },
      });
  
      const imageUrl = response.data.urls.regular;
      return imageUrl;
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  };

  
  useEffect(() => {
    const getRandomImage = async () => {
      const url = await fetchRandomImage();
      if (url) {
        setImageUrl(url);
      }
    };

    getRandomImage();
  }, []);

  const containerStyle = {
    position: 'absolute',
    height: '100vh',
    width: '100%',
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    
    
  };

  const [city, setCity] = useState("");

  return (
    <div style={containerStyle} className="App">
      <Dashboard city={city}/>
      <CityInput city={city} setCity={setCity} />
      <Screen city={city}/>
    </div>
  );
}

export default App;
