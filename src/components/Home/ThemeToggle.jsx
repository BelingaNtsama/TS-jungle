import { memo } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = memo(({ theme, onToggle }) => {
  return (
    <button 
      onClick={onToggle} 
      className="btn btn-ghost btn-circle hover:bg-secondary focus:outline-none"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 transition-transform hover:rotate-12" />
      ) : (
        <Sun className="h-5 w-5 transition-transform hover:scale-110" />
      )}
    </button>
  );
});

ThemeToggle.displayName = 'ThemeToggle';

export default ThemeToggle;
