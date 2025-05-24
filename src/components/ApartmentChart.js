import { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function ApartmentChart() {
  const [apartments, setApartments] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Loyer des Appartements (€)',
        backgroundColor: 'rgba(30, 58, 138, 0.7)', // custom-primary
        borderColor: '#1E3A8A',
        borderWidth: 2,
        data: [],
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { font: { size: 14 } } },
      title: { display: true, text: 'Répartition des Loyers', font: { size: 16 } },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Loyer (€)', font: { size: 12 } } },
      x: { title: { display: true, text: 'Appartements', font: { size: 12 } } },
    },
  };

  const fetchApartments = async () => {
    try {
      const response = await axios.get('http://localhost/api/apartements.php');
      const data = response.data;
      setApartments(data);
      setChartData({
        labels: data.map(apt => apt.design),
        datasets: [
          {
            label: 'Loyer des Appartements (€)',
            backgroundColor: 'rgba(30, 58, 138, 0.7)', // custom-primary
            borderColor: '#1E3A8A',
            borderWidth: 2,
            data: data.map(apt => apt.loyer),
          },
        ],
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des appartements :', error);
    }
  };

  const totalLoyer = apartments.reduce((sum, apt) => sum + apt.loyer, 0);
  const minLoyer = apartments.length ? Math.min(...apartments.map(apt => apt.loyer)) : 0;
  const maxLoyer = apartments.length ? Math.max(...apartments.map(apt => apt.loyer)) : 0;

  useEffect(() => {
    fetchApartments();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md animate-slide-in">
      <h2 className="text-2xl font-semibold text-custom-primary mb-6">Bilan et Graphe</h2>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="p-4 bg-custom-background rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-custom-primary mb-4">Bilan</h3>
          <div className="space-y-2">
            <p className="text-sm text-custom-neutral">
              Loyer Total: <span className="font-semibold text-custom-secondary">{totalLoyer} €</span>
            </p>
            <p className="text-sm text-custom-neutral">
              Loyer Min: <span className="font-semibold text-custom-accent">{minLoyer} €</span>
            </p>
            <p className="text-sm text-custom-neutral">
              Loyer Max: <span className="font-semibold text-custom-primary">{maxLoyer} €</span>
            </p>
          </div>
        </div>
        <div className="chart-container h-80 p-4 bg-custom-background rounded-lg border border-gray-200">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

export default ApartmentChart;