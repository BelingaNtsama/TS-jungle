import { useEffect, useState, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { themeChange } from 'theme-change';
import PanierStore from '@stores/panierStore';
import ShoppingCart from '@layouts/Panier';
import { ANIMATION_VARIANTS } from '@utils/animations';
import useUserProfile from '@hooks/useUserProfile';

// Composants
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import CartDropdown from './CartDropdown';
import ProfileButton from './ProfileButton';

const NavBar = memo(() => {
  const [theme, setTheme] = useState('light');
  const { openCart, cartItems } = PanierStore();
  const { getProfileImage } = useUserProfile();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.plant.price * item.quantity,
    0
  );

  useEffect(() => {
    themeChange(false);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }, [theme]);

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={ANIMATION_VARIANTS.container}
      className="relative"
    >
      <motion.div 
        className="navbar shadow-lg bg-base-100/80 top-0 fixed w-full z-20 backdrop-blur-md transition-all duration-300"
        variants={ANIMATION_VARIANTS.item}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Logo />
          
          <div className="flex items-center gap-3">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            
            <CartDropdown 
              itemCount={Math.max(0, cartItems.length - 1)}
              subtotal={subtotal}
              onOpenCart={openCart}
            />
            
            <ProfileButton profileImage={getProfileImage()} />
          </div>
        </div>
      </motion.div>
      
      <ShoppingCart />
    </motion.nav>
  );
});

NavBar.displayName = 'NavBar';

export default NavBar;
}
