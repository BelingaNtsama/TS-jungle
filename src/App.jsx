import { Routes, Route } from 'react-router';
import { Suspense, lazy } from 'react';
import { Toaster } from 'sonner';
import './App.css';

const Home = lazy(() => import('@/pages/Home'));
const LogIn = lazy(() => import('@/pages/LogIn'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const SignUp = lazy(() => import('@/pages/SignUp')); 
const RedirectPage = lazy(() => import('@/services/RedirectPage'));
const ProtectedRoute = lazy(() => import('@/utils/ProtectedRoute'));
const ProfileLayoutFake = lazy(() => import('@/components/Profile/ProfileLayout'));
const NavBar = lazy(() => import('@/components/Home/NavBar'));
const Chatbot = lazy(() => import('@/layouts/Chatbot'));


const PageAdmin = lazy(() => import('@/admin/PageAdmin'));

const ProtectedLayout = ({ children }) => {
  return (
    <>
    <Toaster richColors position="top-center" />
      <NavBar />
      <Chatbot />
      {children}
    </>
  );
};

function App() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
      </div>
    }>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={
            <ProtectedLayout>
              <Home />
            </ProtectedLayout>
          } />
          <Route path='/Profile' element={
            <ProtectedLayout>
              <ProfileLayoutFake />
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
  );
}

export default App;
