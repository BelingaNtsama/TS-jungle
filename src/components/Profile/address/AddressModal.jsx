// src/components/address/AddressModal.jsx
import { useForm } from "react-hook-form"
import { COUNTRIES } from "@/utils/constants"

export default function AddressModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  submitLabel,
  defaultValues = {
    name: "",
    street: "",
    postalCode: "",
    city: "",
    country: "France",
  },
}) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues })

  return (
    <dialog className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box relative">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
          {title}
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Nom */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nom de l'adresse</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="ex: Domicile, Bureau..."
              className={`input input-bordered ${errors.name ? "input-error" : ""}`}
            />
            {errors.name && <span className="text-error text-sm">Champ requis</span>}
          </div>

          {/* Adresse */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Adresse</span>
            </label>
            <input
              type="text"
              {...register("street", { required: true })}
              placeholder="123 Rue de la Paix"
              className={`input input-bordered ${errors.street ? "input-error" : ""}`}
            />
            {errors.street && <span className="text-error text-sm">Champ requis</span>}
          </div>

          {/* Code postal & Ville */}
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Code postal</span>
              </label>
              <input
                type="text"
                {...register("postalCode", { required: true })}
                placeholder="75001"
                className={`input input-bordered ${errors.postalCode ? "input-error" : ""}`}
              />
              {errors.postalCode && <span className="text-error text-sm">Champ requis</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Ville</span>
              </label>
              <input
                type="text"
                {...register("city", { required: true })}
                placeholder="Paris"
                className={`input input-bordered ${errors.city ? "input-error" : ""}`}
              />
              {errors.city && <span className="text-error text-sm">Champ requis</span>}
            </div>
          </div>

          {/* Pays */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Pays</span>
            </label>
            <select
              {...register("country")}
              className="select select-bordered"
            >
              {COUNTRIES.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-action">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="btn btn-primary">
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  )
}