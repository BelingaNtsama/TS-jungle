import { useState, useEffect, useRef } from 'react';

const Caroussel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const intervalRef = useRef(null);

  const houses = [
    {
      decorated: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80',
      plain: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=600&q=80',
      title: 'Façade Moderne'
    },
    {
      decorated: 'https://images.pexels.com/photos/584399/living-room-couch-interior-room-584399.jpeg',
      plain: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      title: 'Intérieur Contemporain'
    },
    {
      decorated: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92',
      plain: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg',
      title: 'Cuisine Élégante'
    }
  ];

  useEffect(() => {
    startAutoRotate();
    return () => clearInterval(intervalRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startAutoRotate = () => {
    intervalRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev < houses.length - 1 ? prev + 1 : 0));
    }, 4000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 max-lg:w-full">
      <h1 className="bg-linear-90 to-green-700 from-gray-700
        text-transparent bg-clip-text text-3xl font-semibold text-center">
        Comparaison Décorations Végétales
      </h1>
      <div className="diff-resizer" />
      <div className="diff-label z-40">
        <span className="badge badge-success text-white font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24">
            <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
          Version Végétalisée
        </span>
      </div>

      {/* Carrousel DaisyUI */}
      <div
        className="carousel w-full rounded-box shadow-xl relative"
        onMouseEnter={() => clearInterval(intervalRef.current)}
        onMouseLeave={() => startAutoRotate()}
      >
        {houses.map((house, index) => (
          <div
            key={index}
            id={`slide${index}`}
            className={`carousel-item relative w-full ${index === activeSlide ? 'block' : 'hidden'}`}
          >
            <div className="w-full text-center p-4">
              <figure className="diff aspect-18/9 max-lg:aspect-10/9" tabIndex={0}>
                <div className="diff-item-1" role="img">
                  <img className="object-cover rounded-lg" alt={house.title} src={house.decorated} />
                </div>
                <div className="diff-item-2" role="img" tabIndex={0}>
                  <img className="object-cover rounded-lg" alt={house.title} src={house.plain} />
                </div>
                <div className="diff-resizer"></div>
              </figure>

              {/* Légende améliorée */}
              <figcaption className="mt-4">
                <h2 className="text-2xl font-semibold text-green-700">{house.title}</h2>
                <div className="divider divider-success w-1/4 mx-auto my-2"></div>
                <p className="text-gray-700 text-sm">Glissez pour comparer les versions</p>
              </figcaption>
            </div>
          </div>
        ))}

        {/* Contrôles de navigation */}
        <div className="flex justify-center gap-4 mt-6">
          {houses.map((_, index) => (
            <button
              key={index}
              className={`btn btn-circle btn-xs ${index === activeSlide ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>

        {/* Flèches de navigation */}
        <div className="absolute flex justify-between transform -translate-y-1/2 top-1/2 left-5 right-5 z-10">
          <button
            className="btn btn-circle btn-sm hover:btn-success"
            onClick={() => setActiveSlide((prev) => (prev > 0 ? prev - 1 : houses.length - 1))}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="btn btn-circle btn-sm hover:btn-success"
            onClick={() => setActiveSlide((prev) => (prev < houses.length - 1 ? prev + 1 : 0))}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Caroussel;