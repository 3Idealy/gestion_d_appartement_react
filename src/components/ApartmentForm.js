import { useState } from 'react';
import axios from 'axios';

function ApartmentForm() {
  const [apartment, setApartment] = useState({ numApp: '', design: '', loyer: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setApartment({ ...apartment, [e.target.name]: e.target.value });
  };

  const addApartment = async () => {
    try {
      const response = await axios.post('http://localhost/api/apartements.php', {
        numApp: Number(apartment.numApp),
        design: apartment.design,
        loyer: Number(apartment.loyer),
      });
      setMessage(response.data.message);
      if (response.data.message.includes('réussie')) {
        setApartment({ numApp: '', design: '', loyer: '' });
      }
    } catch (error) {
      setMessage('Échoué');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto animate-slide-in">
      <h2 className="text-2xl font-semibold text-custom-primary mb-6">Ajouter un Appartement</h2>
      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium text-custom-neutral mb-1">Numéro Appartement</label>
          <input
            type="number"
            name="numApp"
            value={apartment.numApp}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-custom-neutral mb-1">Design</label>
          <input
            type="text"
            name="design"
            value={apartment.design}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-custom-neutral mb-1">Loyer</label>
          <input
            type="number"
            name="loyer"
            value={apartment.loyer}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-primary"
          />
        </div>
        <button
          onClick={addApartment}
          className="w-full bg-custom-secondary text-white p-2 rounded-md hover:bg-green-700 transition-all duration-300"
        >
          Ajouter
        </button>
      </div>
      {message && (
        <p className={`mt-4 text-center text-sm font-medium ${message.includes('réussie') ? 'text-custom-secondary' : 'text-custom-accent'}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default ApartmentForm;