import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EncuestaPage from './pages/EncuestaPage';
import EstadisticasDashboard from './pages/EstadisticasDashboard'; // <- CAMBIO

function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <Link to="/encuesta">Encuesta</Link> | <Link to="/dashboard">Dashboard</Link>
                </nav>

                <Routes>
                    <Route path="/encuesta" element={<EncuestaPage />} />
                    <Route path="/dashboard" element={<EstadisticasDashboard />} /> {/* <- CAMBIO */}
                    <Route path="*" element={<EncuestaPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;