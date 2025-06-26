import { Key, Wand2 } from "lucide-react";

const AuthMethodTabs = ({ activeMethod, onChangeMethod }) => (
  <div className="tabs tabs-boxed bg-base-200 p-1">
    {[
      { id: "password", label: "Mot de passe", icon: <Key className="w-4 h-4 mr-2" /> },
      { id: "magiclink", label: "Magic Link", icon: <Wand2 className="w-4 h-4 mr-2" /> },
      { id: "google", label: "Google", icon: <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4 mr-2" /> }
    ].map((method) => (
      <button
        key={method.id}
        className={`tab flex-1 ${activeMethod === method.id ? "tab-active" : ""}`}
        onClick={() => onChangeMethod(method.id)}
      >
        {method.icon}
        {method.label}
      </button>
    ))}
  </div>
);

export default AuthMethodTabs