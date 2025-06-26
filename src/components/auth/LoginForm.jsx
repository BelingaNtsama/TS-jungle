import InputField from "./InputField";

const SignInForm = ({ formData, setFormData, authMethod }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col gap-4">
      <InputField
        id="email"
        name="email"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      {authMethod === 'password' && (
        <InputField
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formData.password || ''}
          onChange={handleChange}
          required
        />
      )}
    </div>
  );
};

export default SignInForm;