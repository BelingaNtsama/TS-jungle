const InputField = ({ id, name, type, placeholder, value, onChange, required }) => {
    return (
      <div className="form-control w-full">
        <label htmlFor={id} className="label">
          <span className="label-text">{placeholder}</span>
        </label>
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="input input-bordered w-full validator"
          required={required}
        />
        <div className="validator-hint">{`Enter the valid ${name}`}</div>
      </div>
    );
  };
  
  export default InputField;