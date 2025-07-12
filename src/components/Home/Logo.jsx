import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Logo = memo(() => {
  return (
    <div className="flex items-center gap-2 hover:opacity-90 transition-opacity">
      <Link 
        to="/"
        className="ml-2 text-3xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
      >
        TsJungle
      </Link>
      <Leaf className="h-8 w-8 text-primary animate-pulse" />
    </div>
  );
});

Logo.displayName = 'Logo';

export default Logo;
