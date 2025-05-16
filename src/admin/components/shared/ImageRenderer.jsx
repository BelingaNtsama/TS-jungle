import { Eye } from "lucide-react"
const ImageRenderer = ({ value, data }) => (
  <div className="flex items-center justify-center h-full">
    <div className="relative group">
      <img 
        src={value} 
        alt={data.name}
        className="w-16 h-16 rounded-2xl object-cover shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-gray-100"
        onError={(e) => {
          e.target.src = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=400';
        }}
      />
      <div className="absolute inset-0 group-hover:bg-opacity-20 rounded-2xl transition-all duration-300 flex items-center justify-center">
        <Eye className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  </div>
);

export default ImageRenderer;