import { motion } from "framer-motion";

const AuthFormInput = ({ label, name, type, placeholder, value, error, onChange, icon }) => {
  return (
    <motion.div
      className="form-control"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <label className={`input-group ${error ? "input-error" : ""}`}>
        <span className="bg-base-200">{icon}</span>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className={`input input-bordered w-full ${error ? "input-error" : ""}`}
          value={value}
          onChange={onChange}
        />
      </label>
      {error && <span className="text-error text-xs mt-1">{error}</span>}
    </motion.div>
  );
};

export default AuthFormInput;