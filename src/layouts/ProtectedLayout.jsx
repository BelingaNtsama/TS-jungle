import { Suspense, lazy } from 'react';
import { Toaster } from 'sonner';

const NavBar = lazy(() => import('@components/Home/NavBar'));
const Chatbot = lazy(() => import('@layouts/Chatbot'));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="relative">
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-200"></div>
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-green-600 border-t-transparent absolute top-0 left-0"></div>
    </div>
  </div>
);

const ProtectedLayout = ({ children }) => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Toaster richColors position="top-center" />
      <NavBar />
      <Chatbot />
      {children}
    </Suspense>
  );
};

export default ProtectedLayout;
