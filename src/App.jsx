import { Routes, Route } from 'react-router';
import { Suspense, lazy, useState } from 'react';
import './App.css';
import Chatbot from '@layouts/Chatbot';

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
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {/* Bouton flottant pour ouvrir le chat */}
      {!isChatOpen && (
        <button
          className="fixed z-50 bottom-4 right-4 w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-2xl shadow-2xl flex items-center justify-center group"
          onClick={() => setIsChatOpen(true)}
        >
          <span className="sr-only">Ouvrir le chatbot</span>
          <svg className="h-7 w-7 text-green-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        </button>
      )}
      {/* Chatbot rendu uniquement si ouvert */}
      {isChatOpen && <Chatbot onClose={() => setIsChatOpen(false)} />}
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
      </Suspense>
    </>
  );
}

export default App;
