import { Routes, Route } from 'react-router';
import { Suspense, lazy } from 'react';
import { Toaster } from 'sonner';
import LoadingSpinner from '@components/shared/LoadingSpinner';
import './App.css';

// Lazy imports avec regroupement logique
const AuthPages = {
  LogIn: lazy(() => import('@pages/auth/LogIn')),
  SignUp: lazy(() => import('@pages/auth/SignUp')),
};

const MainPages = {
  Home: lazy(() => import('@pages/Home')),
  Profile: lazy(() => import('@pages/Profile')),
  NotFound: lazy(() => import('@pages/NotFound')),
  RedirectPage: lazy(() => import('@services/RedirectPage')),
};

const LayoutComponents = {
  NavBar: lazy(() => import('@layouts/NavBar')),
  Chatbot: lazy(() => import('@layouts/Chatbot')),
};

const AdminPage = lazy(() => import('@admin/PageAdmin'));
const ProtectedRoute = lazy(() => import('@routing/ProtectedRoute'));

// Layout composant séparé pour plus de clarté
const ProtectedLayout = ({ children }) => (
  <>
    <Toaster richColors position="top-center" />
    <LayoutComponents.NavBar />
    <LayoutComponents.Chatbot />
    <main className="main-content">{children}</main>
  </>
);

const App = () => {
  return (
    <Suspense fallback={<LoadingSpinner fullScreen />}>
      <Routes>
        {/* Routes protégées */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={
            <ProtectedLayout>
              <MainPages.Home />
            </ProtectedLayout>
          } />
          <Route path="/profile" element={
            <ProtectedLayout>
              <MainPages.Profile />
            </ProtectedLayout>
          } />
        </Route>

        {/* Routes publiques */}
        <Route path="/login" element={<AuthPages.LogIn />} />
        <Route path="/signup" element={<AuthPages.SignUp />} />
        <Route path="/redirect" element={<MainPages.RedirectPage />} />

        {/* Admin routes */}
        <Route path="/admin/*" element={<AdminPage />} />

        {/* 404 */}
        <Route path="*" element={<MainPages.NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;