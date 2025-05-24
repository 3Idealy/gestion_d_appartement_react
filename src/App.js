import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ApartmentForm from './components/ApartmentForm';
import ApartmentList from './components/ApartmentList';
import ApartmentChart from './components/ApartmentChart';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-custom-background text-custom-neutral">
        <header className="bg-custom-primary text-white p-4 shadow-md">
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-4">Gestion des Appartements</h1>
            <nav className="flex space-x-4">
              <Link
                to="/form"
                className="px-4 py-2 rounded-md bg-custom-secondary text-white font-medium hover:bg-green-700 transition-all duration-300"
              >
                Ajout
              </Link>
              <Link
                to="/list"
                className="px-4 py-2 rounded-md bg-custom-accent text-white font-medium hover:bg-red-800 transition-all duration-300"
              >
                Listage et Mise à jour
              </Link>
              <Link
                to="/chart"
                className="px-4 py-2 rounded-md bg-custom-primary text-white font-medium hover:bg-blue-900 transition-all duration-300"
              >
                Bilan et Graphe
              </Link>
            </nav>
          </div>
        </header>
        <main className="max-w-7xl mx-auto p-6">
          <Routes>
            <Route path="/" element={<ApartmentForm />} />
            <Route path="/form" element={<ApartmentForm />} />
            <Route path="/list" element={<ApartmentList />} />
            <Route path="/chart" element={<ApartmentChart />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;