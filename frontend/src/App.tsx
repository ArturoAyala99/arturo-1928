import { Routes, Route, Navigate } from 'react-router';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';

function App() {

  return (
    
    <Routes>
      {/* Rutas públicas (sin Protected) */}
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/register" element={<RegisterPage />}/>

      {/* Rutas públicas (con Protected) */}
      <Route element={<ProtectedRoute></ProtectedRoute>}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>

      {/* Rutas no definidas redirigir a login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
    
  )
}

export default App
