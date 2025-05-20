import { Truck, Shield, Clock } from 'lucide-react';
import Feature from "../components/shared/Feature"

export default function Description() {
  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over $100"
    },
    {
      icon: Shield,
      title: "Plant Guarantee",
      description: "30-day guarantee"
    },
    {
      icon: Clock,
      title: "Expert Support",
      description: "24/7 plant care help"
    }
  ];

  return (
    <div className="bg-white relative top-16 flex flex-col justify-center items-center gap-12">
      <div className="w-9/12 card shadow-2xl p-8 card-actions items-center max-lg:w-full">
        <h1 className='bg-linear-90 to-green-700 from-black/60 
        text-transparent bg-clip-text text-3xl font-semibold card-title'>
          Bienvenu chez TS-jungle !
        </h1>
        <h2 className='text-lg text-gray-700 text-center'>
          Votre destination privilégiée pour des plantes de décoration d&apos;exception. Nous sélectionnons 
          avec soin chaque plante auprès de producteurs passionnés, privilégiant la 
          qualité, la fraîcheur et la provenance durable. Offrez une touche de nature authentique 
          à votre intérieur avec notre collection unique.
        </h2>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature
              key={index}
              Icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}