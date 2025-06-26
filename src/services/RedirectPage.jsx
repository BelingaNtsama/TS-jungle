import { useEffect, useState } from 'react';
import useUserStore from '@/stores/userStore';
import Home from '@/pages/Home';
import { Leaf } from 'lucide-react';

const RedirectPage = () => {
  const { checkAuth } = useUserStore();
  const [countdown, setCountdown] = useState(5); // État pour le compte à rebours
  const [showContent, setShowContent] = useState(false); // État pour afficher le contenu

  useEffect(() => {
    checkAuth();

    // Décrémenter le compte à rebours chaque seconde
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Afficher le contenu après 5 secondes
    const timeout = setTimeout(() => {
      setShowContent(true);
    }, 6000);

    // Nettoyer les timers
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [checkAuth]);

  if (!showContent) {
    return (
      <div className="modal modal-open">
        <div className="modal-box text-center">
          <Leaf className="w-16 h-16 mx-auto animate-spin text-green-500" />
          <h2 className="font-bold text-2xl">Bienvenue sur TS_Jungle!</h2>
          <h3 className="font-bold text-lg">Redirection en cours...</h3>
          <p className="py-4">Veuillez patienter, redirection dans {countdown} secondes.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Home />
    </div>
  );
};

export default RedirectPage;