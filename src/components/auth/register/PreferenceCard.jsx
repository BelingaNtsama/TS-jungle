import { motion } from "framer-motion";

const PreferenceCard = ({ icon, title, description, name, control, color }) => {
  return (
    <motion.div
      className="card bg-base-100 shadow-md border border-base-200"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="card-body p-4">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full bg-${color}/20 flex items-center justify-center`}>
            {icon}
          </div>
          <h3 className="font-medium text-lg">{title}</h3>
        </div>
        <p className="text-sm text-base-content/70">{description}</p>
        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-3">
            <input
              type="checkbox"
              name={name}
              checked={control[name] || false}
              onChange={(e) => control.onChange(e)}
              className={`checkbox checkbox-${color}`}
            />
            <span className="label-text font-medium">Activer</span>
          </label>
        </div>
      </div>
    </motion.div>
  );
};

export default PreferenceCard;