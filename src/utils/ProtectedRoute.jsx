import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
    const storedUser = localStorage.getItem('user');
    const auth = storedUser ? JSON.parse(storedUser).auth : null;
    
    return auth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;