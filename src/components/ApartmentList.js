import { useState, useEffect } from 'react';
import axios from 'axios';

function ApartmentList() {
  const [apartments, setApartments] = useState([]);
  const [message, setMessage] = useState('');

  const fetchApartments = async () => {
    try {
      const response = await axios.get('http://localhost/api/apartements.php');
      console.log('Données récupérées :', response.data); // Ajout pour déboguer
      if (response.data.error) {
        setMessage('Erreur lors de la récupération : ' + response.data.error);
      } else {
        setApartments(response.data.map(apt => ({ ...apt, isEditing: false })));
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des appartements :', error);
      setMessage('Erreur lors de la récupération des données');
    }
  };

  const getObservation = (loyer) => {
    if (loyer < 1000) return 'bas';
    if (loyer <= 5000) return 'moyen';
    return 'élevé';
  };

  const handleEdit = (numApp) => {
    setApartments(apartments.map(apt =>
      apt.numApp === numApp ? { ...apt, isEditing: true } : { ...apt, isEditing: false }
    ));
  };

  const handleChange = (numApp, field, value) => {
    setApartments(apartments.map(apt =>
      apt.numApp === numApp ? { ...apt, [field]: value } : apt
    ));
  };

  const updateApartment = async (apartment) => {
    try {
      const response = await axios.put('http://localhost/api/apartements.php', {
        numApp: Number(apartment.numApp),
        design: apartment.design,
        loyer: Number(apartment.loyer),
      });
      setMessage(response.data.message);
      fetchApartments();
    } catch (error) {
      setMessage('Échoué');
    }
  };

  const deleteApartment = async (numApp) => {
    try {
      const response = await axios.delete(`http://localhost/api/apartements.php?numApp=${numApp}`);
      setMessage(response.data.message);
      fetchApartments();
    } catch (error) {
      setMessage('Échoué');
    }
  };

  useEffect(() => {
    fetchApartments();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md animate-slide-in">
      <h2 className="text-2xl font-semibold text-custom-primary mb-6">Listage et Mise à jour</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-custom-primary text-white">
            <tr>
              <th className="py-2 px-4 text-left text-sm font-medium">Numéro Appartement</th>
              <th className="py-2 px-4 text-left text-sm font-medium">Design</th>
              <th className="py-2 px-4 text-left text-sm font-medium">Loyer</th>
              <th className="py-2 px-4 text-left text-sm font-medium">Observation</th>
              <th className="py-2 px-4 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {apartments.map(apartment => (
              <tr
                key={apartment.numApp}
                className="border-b border-gray-200 hover:bg-gray-50 transition-all duration-200"
              >
                <td className="py-2 px-4">
                  <span className="text-sm">{apartment.numApp}</span>
                </td>
                <td className="py-2 px-4">
                  {apartment.isEditing ? (
                    <input
                      type="text"
                      value={apartment.design}
                      onChange={(e) => handleChange(apartment.numApp, 'design', e.target.value)}
                      className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-primary"
                    />
                  ) : (
                    <span className="text-sm">{apartment.design}</span>
                  )}
                </td>
                <td className="py-2 px-4">
                  {apartment.isEditing ? (
                    <input
                      type="number"
                      value={apartment.loyer}
                      onChange={(e) => handleChange(apartment.numApp, 'loyer', Number(e.target.value))}
                      className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-primary"
                    />
                  ) : (
                    <span className="text-sm">{apartment.loyer} €</span>
                  )}
                </td>
                <td className="py-2 px-4">
                  <span
                    className={
                      `text-sm font-medium ${
                        getObservation(apartment.loyer) === 'bas' ? 'text-custom-secondary' :
                        getObservation(apartment.loyer) === 'moyen' ? 'text-custom-accent' :
                        'text-custom-primary'
                      }`
                    }
                  >
                    {getObservation(apartment.loyer)}
                  </span>
                </td>
                <td className="py-2 px-4 flex space-x-2">
                  {apartment.isEditing ? (
                    <button
                      onClick={() => updateApartment(apartment)}
                      className="bg-custom-secondary text-white px-3 py-1 rounded-md hover:bg-green-700 transition-all duration-300"
                    >
                      Enregistrer
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(apartment.numApp)}
                      className="bg-custom-primary text-white px-3 py-1 rounded-md hover:bg-blue-900 transition-all duration-300"
                    >
                      Modifier
                    </button>
                  )}
                  <button
                    onClick={() => deleteApartment(apartment.numApp)}
                    className="bg-custom-accent text-white px-3 py-1 rounded-md hover:bg-red-800 transition-all duration-300"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {message && (
        <p className={`mt-4 text-center text-sm font-medium ${message.includes('réussie') ? 'text-custom-secondary' : 'text-custom-accent'}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default ApartmentList;