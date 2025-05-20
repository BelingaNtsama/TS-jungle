import { ChevronRight } from "lucide-react";
import background_accueil from '../../assets/images/background_accueil.jpeg';

export default function Accueil() {
  return (
    <div className="relative top-16 bg-green-900 text-white">
      <div className="absolute inset-0">
        <img
          src={background_accueil}
          className="w-full h-full object-cover opacity-30"
          alt="background"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold mb-6">
            La plus moderne des maisons a besoin d&apos;une touche ecologique.
          </h1>
          <p className="text-xl mb-8">
            Transformez votre espace en un havre de bien-être.
          </p>
          <button
            className="btn bg-white text-gray-700 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-300 flex items-center"
          >
            Explore Collection
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}