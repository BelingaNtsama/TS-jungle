const AuthToggleMethod = ({ currentMethod, onChangeMethod }) => (
  <div className="text-center">
    <button
      type="button"
      className="link link-hover text-sm"
      onClick={() => onChangeMethod(
        currentMethod === "password" ? "magiclink" : "password"
      )}
    >
      {currentMethod === "password"
        ? "Utiliser un Magic Link à la place ?"
        : "Utiliser email/mot de passe à la place ?"}
    </button>
  </div>
);

export default AuthToggleMethod;