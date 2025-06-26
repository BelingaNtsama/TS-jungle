import { useState } from "react";
import { Link } from "react-router";
import {  Key, Wand2 } from "lucide-react";
import { Toaster, toast } from "sonner";

import axiosInstance from "@/services/axiosInstance";
import AuthMethodTabs from "@/components/auth/login/AuthMethodTabs";
import AuthFormInput from "@/components/auth/login/AuthFormInput";
import AuthSubmitButton from "@/components/auth/login/AuthSubmitButton";
import AuthToggleMethod from "@/components/auth/login/AuthToggleMethod";
import GoogleAuthButton from "@/components/shared/GoogleOauthButon";
import SuccessStep from "@/components/auth/register/SuccessStep";


const LogIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [authMethod, setAuthMethod] = useState("password");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "L'email est requis";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Email invalide";
    
    if (authMethod === "password" && !formData.password)
      newErrors.password = "Le mot de passe est requis";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      
      if (authMethod === "password") {
        let { data } = await axiosInstance.post("/auth/login", formData);
        data = JSON.stringify(data)
        localStorage.setItem("user", data);
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
  
      } else if (authMethod === "magiclink") {
        await axiosInstance.post("/auth/magiclink", { email: formData.email });
        toast.success("Lien magique envoyé à votre email !");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  if(loading){
    return <SuccessStep message="Connexion en cours..." />;
  }
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-lg">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Connectez-vous
          </h1>
          <p className="text-sm text-center text-base-content/70 mb-6">
            Accédez à votre compte en utilisant votre méthode préférée
          </p>

          <AuthMethodTabs 
            activeMethod={authMethod}
            onChangeMethod={setAuthMethod}
          />

          {authMethod !== "google" ? (
            <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
              <AuthFormInput
                label="Email"
                name="email"
                type="email"
                placeholder="votre@email.com"
                value={formData.email}
                error={errors.email}
                onChange={handleInputChange}
                icon={<Key className="w-4 h-4" />}
              />

              {authMethod === "password" && (
                <AuthFormInput
                  label="Mot de passe"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  error={errors.password}
                  onChange={handleInputChange}
                  icon={<Wand2 className="w-4 h-4" />}
                />
              )}

              <AuthSubmitButton
                loading={loading}
                label={authMethod === "password" ? "Se connecter" : "Envoyer Magic Link"}
              />

              <AuthToggleMethod
                currentMethod={authMethod}
                onChangeMethod={setAuthMethod}
              />
            </form>
          ) : (
            <div className="mt-6 space-y-4">
              <GoogleAuthButton  
                loading={loading}
                className="w-full"
              />
              <AuthToggleMethod
                currentMethod={authMethod}
                onChangeMethod={setAuthMethod}
              />
            </div>
          )}

          <div className="divider text-sm">Pas encore de compte ?</div>
          
          <Link 
            to="/signup" 
            className="btn btn-outline btn-primary w-full mt-2"
          >
            Créer un compte
          </Link>
        </div>
      </div>
      <Toaster position="top-center" richColors closeButton />
    </div>
  );
};

export default LogIn;