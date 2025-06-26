import { motion } from "framer-motion"
import { Camera, Edit } from "lucide-react"

export default function AvatarSection({ profileImage, onEditClick }) {
  return (
    <motion.div
      className="flex flex-col items-center md:items-start"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative">
        <motion.div className="avatar" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
          <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
            <img src={profileImage || "/placeholder.svg"} alt="Photo de profil" />
          </div>
        </motion.div>
        <motion.button
          className="btn btn-circle btn-sm absolute -bottom-2 -right-2 bg-primary text-primary-content border-2 border-base-100"
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEditClick}
        >
          <Camera className="w-4 h-4" />
        </motion.button>
      </div>
      <motion.button
        className="btn btn-outline btn-primary btn-sm mt-4 gap-2"
        onClick={onEditClick}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <Edit className="w-4 h-4" />
        Modifier le profil
      </motion.button>
    </motion.div>
  )
}