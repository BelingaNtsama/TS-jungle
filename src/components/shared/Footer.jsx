const Footer = () => (
  <footer className="footer footer-center p-6 bg-base-200 text-base-content rounded mt-8">
    <div>
      <p className="font-semibold text-lg">TS Jungle &copy; {new Date().getFullYear()}</p>
      <p className="text-sm">Production &mdash; Tous droits réservés</p>
    </div>
    <nav className="grid grid-flow-col gap-4 mt-2">
      <a href="/" className="link link-hover">Accueil</a>
      <a href="/profile" className="link link-hover">Profil</a>
      <a href="/admin" className="link link-hover">Admin</a>
      <a href="/login" className="link link-hover">Connexion</a>
    </nav>
    <div className="mt-2">
      <span className="text-xs text-base-content/60">Conçu avec <span className="text-primary">DaisyUI</span> &amp; React</span>
    </div>
  </footer>
);

export default Footer;
