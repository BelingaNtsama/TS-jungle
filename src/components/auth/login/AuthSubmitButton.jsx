import { Loader2 } from "lucide-react";

const AuthSubmitButton = ({ loading, label }) => (
  <button
    type="submit"
    className="btn btn-primary w-full"
    disabled={loading}
  >
    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : label}
  </button>
);

export default AuthSubmitButton