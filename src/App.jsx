import { Routes, Route } from 'react-router';
import { Suspense, lazy } from 'react';
import './App.css';
import Footer from '@components/shared/Footer';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="relative">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent absolute top-0 left-0"></div>
    </div>
  </div>
);

// Layouts
const ProtectedLayout = lazy(() => import('@layouts/ProtectedLayout'));

// Pages
const Home = lazy(() => import('@pages/Home'));
const LogIn = lazy(() => import('@pages/LogIn'));
const NotFound = lazy(() => import('@pages/NotFound'));
const SignUp = lazy(() => import('@pages/SignUp')); 
const Profile = lazy(() => import('@components/Profile/Profile'));
const PageAdmin = lazy(() => import('@admin/PageAdmin'));

// Utils & Services
const RedirectPage = lazy(() => import('@services/RedirectPage'));
const ProtectedRoute = lazy(() => import('@utils/ProtectedRoute'));

const App = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={
            <ProtectedLayout>
              <Home />
            </ProtectedLayout>
          } />
          <Route path='/Profile' element={
            <ProtectedLayout>
              <Profile />
            </ProtectedLayout>
          } />
        </Route>

        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/redirect' element={<RedirectPage />} />
        <Route path='/admin/*' element={<PageAdmin />} />

      
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </Suspense>
  );
}

export default App;
