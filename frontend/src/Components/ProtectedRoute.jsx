import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('authToken');
  const userJson = localStorage.getItem('user');
  
  console.log('ProtectedRoute - Token:', token ? 'Present' : 'Missing');
  console.log('ProtectedRoute - User JSON:', userJson);

  // Check if user is authenticated
  if (!token) {
    console.log('No token found - redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // Parse user data with error handling
  let user = {};
  try {
    user = JSON.parse(userJson || '{}');
    console.log('ProtectedRoute - Parsed User:', user);
  } catch (error) {
    console.error('Failed to parse user data:', error);
    localStorage.clear(); // Clear corrupted data
    return <Navigate to="/login" replace />;
  }

  // Check if user object has a role
  if (!user.role) {
    console.error('No user role found. User object:', user);
    // Don't redirect immediately - give localStorage time to sync
    setTimeout(() => {
      window.location.reload();
    }, 100);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a92b43] mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying credentials...</p>
        </div>
      </div>
    );
  }

  // Check if user has the required role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    console.log(`Role mismatch - User: ${user.role}, Allowed: ${allowedRoles.join(', ')}`);
    alert(`Access denied. Your role (${user.role}) cannot access this page.`);
    return <Navigate to="/" replace />;
  }

  console.log('Access granted for role:', user.role);
  return children;
};

export default ProtectedRoute;
