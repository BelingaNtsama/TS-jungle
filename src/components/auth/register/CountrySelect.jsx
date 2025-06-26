import { motion } from "framer-motion";

const CountrySelect = ({ name, control, errors, countryOptions }) => {
  return (
    <motion.div
      className="form-control"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
    >
      <label className="label">
        <span className="label-text">Pays *</span>
      </label>
      <select
        name={name}
        className={`select select-bordered w-full ${errors[name] ? "select-error" : ""}`}
        value={control[name]}
        onChange={(e) => control.onChange(e)}
      >
        <option value="">Sélectionnez un pays</option>
        {countryOptions.map((country) => (
          <option key={country.value} value={country.value}>
            {country.label}
          </option>
        ))}
      </select>
      {errors[name] && <span className="text-error text-xs mt-1">{errors[name].message}</span>}
    </motion.div>
  );
};

export default CountrySelect;