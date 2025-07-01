// src/components/address/AddressList.jsx
import AddressCard from "./AddressCard"
import { motion } from "framer-motion"
import { ANIMATION_VARIANTS } from "@utils/animations"

export default function AddressList({
  addresses,
  onEdit,
  onDelete,
  onSetDefault,
}) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      variants={ANIMATION_VARIANTS.container}
    >
      {addresses.map((address) => (
        <AddressCard
          key={address.id}
          address={address}
          onEdit={onEdit}
          onDelete={onDelete}
          onSetDefault={onSetDefault}
        />
      ))}
    </motion.div>
  )
}