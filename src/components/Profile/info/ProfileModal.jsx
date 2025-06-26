import { motion } from "framer-motion"
import { Edit, Camera, Upload, User, Mail, Phone, Bell, Award, X, Check } from "lucide-react"

export default function ProfileModal({
  isOpen,
  onClose,
  formData,
  formErrors,
  onInputChange,
  onSubmit,
  onImageUpload,
  fileInputRef,
  isUploading,
}) {
  if (!isOpen) return null

  return (
    <div className="modal modal-open backdrop-blur-sm">
      <motion.div
        className="modal-box w-11/12 max-w-2xl shadow-2xl border border-base-300"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        <ModalHeader onClose={onClose} />

        <form onSubmit={onSubmit} className="space-y-6">
          <PhotoUploadSection 
            formData={formData}
            onImageUpload={onImageUpload}
            fileInputRef={fileInputRef}
            isUploading={isUploading}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              name="firstName"
              label="Prénom"
              value={formData.firstName}
              error={formErrors.firstName}
              onChange={onInputChange}
              icon={<User className="w-4 h-4 text-primary" />}
              required
            />
            <FormInput
              name="lastName"
              label="Nom"
              value={formData.lastName}
              error={formErrors.lastName}
              onChange={onInputChange}
              icon={<User className="w-4 h-4 text-primary" />}
              required
            />
          </div>

          <FormInput
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            error={formErrors.email}
            onChange={onInputChange}
            icon={<Mail className="w-4 h-4 text-primary" />}
            required
          />

          <FormInput
            name="phone"
            label="Téléphone"
            type="tel"
            value={formData.phone}
            error={formErrors.phone}
            onChange={onInputChange}
            icon={<Phone className="w-4 h-4 text-primary" />}
          />

          <CommunicationPreferences 
            formData={formData}
            onInputChange={onInputChange}
          />

          <ModalActions onClose={onClose} />
        </form>
      </motion.div>
    </div>
  )
}

function ModalHeader({ onClose }) {
  return (
    <>
      <form method="dialog">
        <motion.button
          className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-error hover:bg-error/10"
          onClick={onClose}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <X className="w-4 h-4" />
        </motion.button>
      </form>
      <motion.h3 
        className="font-bold text-2xl mb-6 flex items-center gap-3 text-primary"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <motion.div
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 3
          }}
        >
          <Edit className="w-6 h-6" />
        </motion.div>
        <span>Modifier mes informations</span>
      </motion.h3>
    </>
  )
}

function PhotoUploadSection({ formData, onImageUpload, fileInputRef, isUploading }) {
  return (
    <motion.div
      className="form-control"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <label className="label">
        <span className="label-text font-medium flex items-center gap-2">
          <Camera className="w-4 h-4 text-primary" />
          <span>Photo de profil</span>
        </span>
      </label>
      <div className="flex items-center gap-4">
        <div className="avatar">
          <motion.div 
            className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src={formData.profileImage || "/placeholder.svg"} 
              alt="Aperçu" 
              className="object-cover"
            />
          </motion.div>
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={onImageUpload}
            accept="image/jpeg, image/png"
            className="hidden"
          />
          <motion.button
            type="button"
            className="btn btn-outline btn-primary btn-sm gap-2"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {isUploading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Changer la photo
              </>
            )}
          </motion.button>
          <p className="text-xs opacity-70">JPEG/PNG - Max 2MB</p>
        </div>
      </div>
    </motion.div>
  )
}

function FormInput({ name, label, type = "text", value, error, onChange, icon, required = false }) {
  return (
    <motion.div
      className="form-control"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <label className="label">
        <span className="label-text font-medium flex items-center gap-2">
          {icon}
          {label}
          {required && <span className="text-error">*</span>}
        </span>
      </label>
      <input
        type={type}
        name={name}
        value={value || ''}
        onChange={onChange}
        className={`input input-bordered w-full ${error ? 'input-error' : 'focus:border-primary focus:ring-1 focus:ring-primary'}`}
        required={required}
      />
      {error && (
        <motion.label 
          className="label"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="label-text-alt text-error flex items-center gap-1">
            <X className="w-3 h-3" />
            {error}
          </span>
        </motion.label>
      )}
    </motion.div>
  )
}

function CommunicationPreferences({ formData, onInputChange }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="divider before:bg-base-300 after:bg-base-300 flex items-center gap-2">
        <Bell className="w-4 h-4 text-primary" />
        <span className="text-primary">Préférences de communication</span>
      </div>

      <div className="space-y-4">
        <CheckboxInput
          name="newsletter"
          label="Newsletter"
          description="Recevoir les conseils et nouveautés"
          checked={formData.newsletter}
          onChange={onInputChange}
          icon={<Mail className="w-4 h-4 text-primary" />}
        />
        <CheckboxInput
          name="offers"
          label="Offres spéciales"
          description="Recevoir les promotions exclusives"
          checked={formData.offers}
          onChange={onInputChange}
          icon={<Award className="w-4 h-4 text-primary" />}
        />
      </div>
    </motion.div>
  )
}

function CheckboxInput({ name, label, description, checked, onChange, icon }) {
  return (
    <motion.label 
      className="label cursor-pointer justify-start gap-3 p-3 hover:bg-base-200 rounded-box transition-colors"
      whileHover={{ x: 2 }}
    >
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="checkbox checkbox-primary"
      />
      <div className="flex items-center gap-2">
        {icon}
        <div>
          <span className="font-medium">{label}</span>
          <p className="text-sm opacity-70">{description}</p>
        </div>
      </div>
    </motion.label>
  )
}

function ModalActions({ onClose }) {
  return (
    <motion.div 
      className="modal-action"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <motion.button
        type="button"
        className="btn btn-ghost"
        onClick={onClose}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Annuler
      </motion.button>
      <motion.button
        type="submit"
        className="btn btn-primary"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Check className="w-4 h-4 mr-1" />
        Enregistrer
      </motion.button>
    </motion.div>
  )
}