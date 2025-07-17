const Footer = () => (
  <footer className="footer footer-center p-6 rounded mt-8"
    style={{
      background: 'linear-gradient(90deg, #0f0c29 0%, #2ecc40 100%)',
      color: 'white',
    }}
  >
    <div>
      <p className="font-semibold text-lg">TS Jungle &copy; {new Date().getFullYear()}</p>
      <p className="text-sm">Production &mdash; Tous droits réservés</p>
    </div>
    <nav className="grid grid-flow-col gap-4 mt-2">
      <a href="/" className="link link-hover text-white">Accueil</a>
      <a href="/profile" className="link link-hover text-white">Profil</a>
      <a href="/admin" className="link link-hover text-white">Admin</a>
      <a href="/login" className="link link-hover text-white">Connexion</a>
    </nav>
    <div className="mt-2">
      <span className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>
        Conçu avec <span style={{ color: '#2ecc40', fontWeight: 'bold' }}>DaisyUI</span> &amp; React
      </span>
    </div>
  </footer>
);

export default Footer;
