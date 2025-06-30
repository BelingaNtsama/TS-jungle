import { useState, useRef, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Calendar, Award, Shield } from "lucide-react"
import { ANIMATION_VARIANTS } from "@/utils/constants"
import useUserStore from "@/stores/userStore"
import { validateForm, validateEmail, validatePhone } from "@/utils/validations"
import SkeletonLoader from "@/components/shared/SkeletonLoader"
import AvatarSection from "@/components/Profile/info/AvatarSection"
import StatCard from "@/components/Profile/info/StatCard"
import ContactInfoCard from "@/components/Profile/info/ContactInfoCard"
import NotificationCard from "@/components/Profile/info/NotificationCard"
import SecurityCard from "@/components/Profile/info/SecurityCard"
import ProfileModal from "@/components/Profile/info/ProfileModal"
import PasswordModal from "@/components/Profile/info/PasswordModal"
import TwoFAModal from "@/components/Profile/info/TwoFAModal"
import { toast } from "sonner"

export default function ProfileInfo() {
  // Utilisation du store Zustand
  const {
    userData,
    isLoading,
    error,
    loadUserData,
    updateUserData,
    updateProfileImage
  } = useUserStore()

  const [formData, setFormData] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  const fileInputRef = useRef(null)

  // Chargement initial des données
  useEffect(() => {
    if (!userData) {
      loadUserData()
    }
  }, [loadUserData, userData])

  // Cleanup des URL objets
  useEffect(() => {
    return () => {
      if (formData?.profileImage?.startsWith('blob:')) {
        URL.revokeObjectURL(formData.profileImage)
      }
    }
  }, [formData?.profileImage])

  // Initialisation du formData
  useEffect(() => {
    if (userData && !formData) {
      setFormData({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        newsletter: userData.newsletter,
        offers: userData.offers,
        memberSince: userData.memberSince,
        totalOrders: userData.totalOrders,
        profileImage: userData.profileImage
      })
    }
  }, [userData, formData])

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }))
    }
  }, [formErrors])

  const handleImageUpload = useCallback(async (e) => {
    const file = e.target.files?.[0]
    if (!file) return toast.error("Aucun fichier sélectionné")

    const maxSize = 2 * 1024 * 1024 // 2MB

    if (file.size > maxSize) {
     toast.error("Fichier trop volumineux")
      return
    }

    setIsUploading(true)
    
    try {
      // Création de l'URL de prévisualisation
      const previewUrl = URL.createObjectURL(file)
      
      // Mise à jour immédiate de l'UI
      setFormData(prev => ({
        ...prev,
        profileImage: previewUrl
      }))

      // Upload vers le serveur via le store
      await updateProfileImage(file)
      toast.success('Image telechargee avec succes')
    } catch (error) {
      // Rollback en cas d'erreur
      setFormData(prev => ({
        ...prev,
        profileImage: userData.profileImage
      }))
      
      toast.error("Une erreur est survenue lors du telechargement de l'image")
    } finally {
      setIsUploading(false)
    }
  }, [updateProfileImage, userData?.profileImage])

  const validateProfileForm = useCallback((data) => {
    const rules = {
      firstName: [{ required: true, message: "Le prénom est requis" }],
      lastName: [{ required: true, message: "Le nom est requis" }],
      email: [
        { required: true, message: "L'email est requis" },
        { validator: validateEmail, message: "Format d'email invalide" }
      ],
      phone: [{ validator: validatePhone, message: "Format de téléphone invalide" }]
    }
    return validateForm(data, rules)
  }, [])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    
    if (!formData) return

    const validation = validateProfileForm(formData)
    if (!validation.isValid) {
      setFormErrors(validation.errors)
      toast.error("Formulaire invalide")
      return
    }

    try {
      // Formatage des données pour l'API via le store
      await updateUserData({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        newsletter: formData.newsletter,
        offers: formData.offers
      })

      setIsModalOpen(false)
      toast.success("Vos informations ont ete enregistrees")
    } catch (error) {
      toast.error(`Une erreur ${error.message}`)
    }
  }, [formData, validateProfileForm, updateUserData])

  const handleCancel = useCallback(() => {
    setFormData({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      newsletter: userData.newsletter,
      offers: userData.offers,
      twoFA: userData.twoFA,
      memberSince: userData.memberSince,
      totalOrders: userData.totalOrders,
      profileImage: userData.profileImage
    })
    setFormErrors({})
    setIsModalOpen(false)
  }, [userData])

  const handlePasswordSubmit = useCallback(async (e) => {
    e.preventDefault()
    // Logique de changement de mot de passe...
    setIsPasswordModalOpen(false)
    toast.success("Mot de passe mis a jour.")
  }, [])

  const handleEnable2FA = useCallback(() => {
    setIs2FAModalOpen(userData.twoFA)
    toast.success('Authentification double facteur active.')
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <SkeletonLoader type="profile" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkeletonLoader type="card" />
          <SkeletonLoader type="card" />
        </div>
        <SkeletonLoader type="stats" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <span>{error}</span>
        <button onClick={window.location.href="/profile"} className="btn btn-sm">
          Réessayer
        </button>
      </div>
    )
  }

  if (!userData || !formData) return null

  return (
    <>
      <motion.div 
        className="space-y-6" 
        variants={ANIMATION_VARIANTS.container} 
        initial="hidden" 
        animate="visible"
      >
        {/* Section Profil */}
        <motion.div
          className="card bg-base-100 shadow-lg overflow-hidden"
          variants={ANIMATION_VARIANTS.item}
        >
          <div className="card-body">
            <div className="flex flex-col md:flex-row gap-6">
              <AvatarSection 
                profileImage={formData.profileImage} 
                onEditClick={() => setIsModalOpen(true)} 
              />
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold">
                  {formData.firstName} {formData.lastName}
                </h1>
                <p className="flex items-center gap-2 mt-2">
                  <Mail className="w-5 h-5" />
                  {formData.email}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                  <StatCard
                    icon={<Calendar />}
                    title="Membre depuis"
                    value={formData.memberSince}
                    color="primary"
                  />
                  <StatCard
                    icon={<Award />}
                    title="Commandes"
                    value={formData.totalOrders}
                    color="secondary"
                  />
                  <StatCard
                    icon={<Shield />}
                    title="Statut"
                    value="VIP"
                    color="accent"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sections secondaires */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ContactInfoCard 
            email={formData.email} 
            phone={formData.phone} 
            onEditClick={() => setIsModalOpen(true)} 
          />
          <NotificationCard 
            newsletter={formData.newsletter} 
            offers={formData.offers} 
          />
        </div>

        {/* Section Sécurité */}
        <SecurityCard 
          onPasswordChange={() => setIsPasswordModalOpen(true)}
          onEnable2FA={() => setIs2FAModalOpen(true)}
        />
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {isModalOpen && (
          <ProfileModal
            isOpen={isModalOpen}
            onClose={handleCancel}
            formData={formData}
            formErrors={formErrors}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            onImageUpload={handleImageUpload}
            fileInputRef={fileInputRef}
            isUploading={isUploading}
          />
        )}

        {isPasswordModalOpen && (
          <PasswordModal
            isOpen={isPasswordModalOpen}
            onClose={() => setIsPasswordModalOpen(false)}
            onSubmit={handlePasswordSubmit}
          />
        )}

        {is2FAModalOpen && (
          <TwoFAModal
            isOpen={is2FAModalOpen}
            onClose={() => setIs2FAModalOpen(false)}
            onEnable={handleEnable2FA}
          />
        )}
      </AnimatePresence>
    </>
  )
}