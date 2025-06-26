import { motion } from 'framer-motion';
import { Camera, Upload } from 'lucide-react';

const ProfileImageUploader = ({ 
  profileImage, 
  onImageUpload,
  className = ''
}) => (
  <motion.div 
    className={`form-control items-center ${className}`}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.3 }}
  >
    <label className="label">
      <span className="label-text font-medium text-base md:text-lg">Photo de profil</span>
    </label>
    <div className="relative group">
      <div className="avatar">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl md:rounded-3xl border-4 border-primary/20 bg-gradient-to-br from-primary/10 to-secondary/10 hover:border-primary/40 transition-all duration-300">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="rounded-2xl md:rounded-3xl object-cover w-full h-full" />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Camera className="w-8 h-8 md:w-12 md:h-12 text-base-content/30" />
            </div>
          )}
        </div>
      </div>
      <label className="absolute -bottom-2 -right-2 btn btn-circle btn-primary btn-sm cursor-pointer group-hover:scale-110 transition-transform">
        <Upload className="w-3 h-3 md:w-4 md:h-4" />
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={onImageUpload}
        />
      </label>
    </div>
  </motion.div>
);

export default ProfileImageUploader;