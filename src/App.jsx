import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import EncuestaPage from './pages/EncuestaPage';

function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <Link to="/encuesta">Encuesta</Link> | <Link to="/dashboard">Dashboard</Link>
                </nav>

                <Routes>
                    <Route path="/encuesta" element={<EncuestaPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<EncuestaPage />} /> {/* ruta por defecto */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;