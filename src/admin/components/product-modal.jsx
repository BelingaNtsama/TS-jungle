"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Upload, Loader2 } from "lucide-react"

const initialFormState = {
  id: "",
  name: "",
  category: "",
  price: "",
  stock: "",
  description: "",
  sku: "",
  image: null,
}

const categories = ["Électronique", "Vêtements", "Maison", "Sport", "Livres", "Beauté", "Automobile", "Jardin"]

export function ProductModal({ isOpen, onClose, product, onSave }) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState(initialFormState)
  const [imagePreview, setImagePreview] = useState(null)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        price: product.price.toString(),
        stock: product.stock.toString(),
      })
      setImagePreview(product.image || null)
    } else {
      setFormData(initialFormState)
      setImagePreview(null)
    }
    setErrors({})
  }, [product, isOpen])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Le nom est requis"
    if (!formData.category) newErrors.category = "La catégorie est requise"
    if (!formData.price || Number.parseFloat(formData.price) <= 0) newErrors.price = "Le prix doit être supérieur à 0"
    if (!formData.stock || Number.parseInt(formData.stock) < 0) newErrors.stock = "Le stock ne peut pas être négatif"
    if (!formData.sku.trim()) newErrors.sku = "Le SKU est requis"
    if (!formData.description.trim()) newErrors.description = "La description est requise"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      // Simulation d'une API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const productData = {
        ...formData,
        id: product?.id || `PROD-${Date.now()}`,
        price: Number.parseFloat(formData.price),
        stock: Number.parseInt(formData.stock),
        status: Number.parseInt(formData.stock) === 0 ? "Rupture" : "Actif",
        image: imagePreview,
      }

      onSave(productData)
      onClose()

      // Reset form
      setFormData(initialFormState)
      setImagePreview(null)
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"]
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({ ...prev, image: "Format non supporté (JPG, PNG, WEBP uniquement)" }))
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        // 5MB
        setErrors((prev) => ({ ...prev, image: "L'image ne doit pas dépasser 5MB" }))
        return
      }

      const imageUrl = URL.createObjectURL(file)
      setImagePreview(imageUrl)
      setFormData((prev) => ({ ...prev, image: file }))

      if (errors.image) {
        setErrors((prev) => ({ ...prev, image: "" }))
      }
    }
  }

  const clearImage = () => {
    setImagePreview(null)
    setFormData((prev) => ({ ...prev, image: null }))
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="modal modal-open">
        <motion.div
          className="modal-box max-w-4xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">{product ? "Modifier le produit" : "Nouveau produit"}</h3>
            <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost" disabled={loading}>
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Colonne gauche */}
              <div className="space-y-4">
                <FormField
                  label="Nom du produit"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={errors.name}
                  required
                />

                <FormField
                  label="Catégorie"
                  name="category"
                  type="select"
                  value={formData.category}
                  onChange={handleInputChange}
                  options={categories}
                  error={errors.category}
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="Prix (€)"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={handleInputChange}
                    error={errors.price}
                    required
                  />

                  <FormField
                    label="Stock"
                    name="stock"
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={handleInputChange}
                    error={errors.stock}
                    required
                  />
                </div>

                <FormField
                  label="SKU"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  error={errors.sku}
                  placeholder="Ex: PROD-001"
                  required
                />
              </div>

              {/* Colonne droite */}
              <div className="space-y-4">
                <FormField
                  label="Description"
                  name="description"
                  type="textarea"
                  value={formData.description}
                  onChange={handleInputChange}
                  error={errors.description}
                  required
                />

                <ImageUploader
                  image={imagePreview}
                  onImageChange={handleImageChange}
                  onClearImage={clearImage}
                  error={errors.image}
                />
              </div>
            </div>

            <div className="modal-action">
              <button type="button" onClick={onClose} className="btn btn-outline" disabled={loading}>
                Annuler
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {product ? "Modification..." : "Ajout..."}
                  </>
                ) : product ? (
                  "Modifier"
                ) : (
                  "Ajouter"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

const FormField = ({ label, name, type = "text", options, error, required, ...props }) => {
  if (type === "select") {
    return (
      <div className="form-control">
        <label className="label">
          <span className="label-text">
            {label} {required && <span className="text-error">*</span>}
          </span>
        </label>
        <select className={`select select-bordered ${error ? "select-error" : ""}`} name={name} {...props}>
          <option value="">Sélectionner une catégorie</option>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {error && (
          <label className="label">
            <span className="label-text-alt text-error">{error}</span>
          </label>
        )}
      </div>
    )
  }

  if (type === "textarea") {
    return (
      <div className="form-control">
        <label className="label">
          <span className="label-text">
            {label} {required && <span className="text-error">*</span>}
          </span>
        </label>
        <textarea
          className={`textarea textarea-bordered h-32 resize-none ${error ? "textarea-error" : ""}`}
          name={name}
          {...props}
        />
        {error && (
          <label className="label">
            <span className="label-text-alt text-error">{error}</span>
          </label>
        )}
      </div>
    )
  }

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">
          {label} {required && <span className="text-error">*</span>}
        </span>
      </label>
      <input className={`input input-bordered ${error ? "input-error" : ""}`} name={name} type={type} {...props} />
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  )
}

const ImageUploader = ({ image, onImageChange, onClearImage, error }) => (
  <div className="form-control">
    <label className="label">
      <span className="label-text">Image du produit</span>
    </label>
    <div className={`border-2 border-dashed rounded-lg p-4 ${error ? "border-error" : "border-base-300"}`}>
      {image ? (
        <ImagePreview image={image} onClearImage={onClearImage} />
      ) : (
        <UploadInput onImageChange={onImageChange} />
      )}
    </div>
    {error && (
      <label className="label">
        <span className="label-text-alt text-error">{error}</span>
      </label>
    )}
  </div>
)

const ImagePreview = ({ image, onClearImage }) => (
  <div className="relative">
    <img src={image || "/placeholder.svg"} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
    <button type="button" onClick={onClearImage} className="absolute top-2 right-2 btn btn-circle btn-sm btn-error">
      <X className="w-4 h-4" />
    </button>
  </div>
)

const UploadInput = ({ onImageChange }) => (
  <label className="cursor-pointer flex flex-col items-center py-8 hover:bg-base-200 rounded-lg transition-colors">
    <Upload className="w-12 h-12 text-base-content/50 mb-2" />
    <span className="text-base-content/70 font-medium">Cliquer pour télécharger</span>
    <span className="text-sm text-base-content/50 mt-1">PNG, JPG, WEBP (max 5MB)</span>
    <input type="file" className="hidden" accept="image/jpeg,image/png,image/webp" onChange={onImageChange} />
  </label>
)
