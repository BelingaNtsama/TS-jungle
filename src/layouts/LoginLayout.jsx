import InputField from "../components/shared/InputField";
const SignIn = ({ formData, handleInputChange }) => {
    const fields = [
        { id: 'email', name: 'email', type: 'email', placeholder: 'Enter your email' },
    ];

    return (
        <div className="flex flex-col gap-4">
            {fields.map(field => (
                <InputField
                    key={field.id}
                    {...field}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                />
            ))}
        </div>
    );
};
export default  SignIn;