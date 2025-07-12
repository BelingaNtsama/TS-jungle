import { memo } from 'react';
import { Link } from 'react-router-dom';

const ProfileButton = memo(({ profileImage }) => {
  return (
    <div className="relative group">
      <div role="button" className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-primary transition-all">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Link to="/profile">
            <img 
              className="w-full h-full object-cover transition-transform group-hover:scale-110" 
              alt="Profile" 
              src={profileImage}
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop
                e.target.src = '/assets/images/default-avatar.png';
              }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
});

ProfileButton.displayName = 'ProfileButton';

export default ProfileButton;
