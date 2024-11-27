// src/App.jsx

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Usamos Routes en lugar de Switch
import LoginPage from "./pages/LoginPage";
import PantryPage from "./pages/PantryPage";
import RegisterPage from "./pages/RegisterPage"; // Importamos la nueva página de registro
import RecipesPage from "./pages/RecipesPage.JSX";
import Main from "./pages/MainPage";
const App = () => {
  return (
    <Router>
      <Routes> {/* Usamos Routes en lugar de Switch */}
      <Route path="/" element={<Main />} />
        <Route path="/login" element={<LoginPage />} /> {/* Ruta para Login */}
        <Route path="/pantry" element={<PantryPage />} /> {/* Ruta para la despensa */}
        <Route path="/register" element={<RegisterPage />} /> {/* Ruta para el registro */}
        <Route path="/recipes" element={<RecipesPage />} />  
      </Routes>
    </Router>
  );
};

export default App;
