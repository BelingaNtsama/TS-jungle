import { useMemo } from 'react';
import defaultAvatar from '@assets/images/default-avatar';

const useUserProfile = () => {
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || {};
    } catch (error) {
      console.error('Error parsing user data:', error);
      return {};
    }
  }, []); // Le memo ne sera recalculé que si la dépendance change

  const getProfileImage = () => {
    return user.picture || defaultAvatar;
  };

  return {
    user,
    getProfileImage,
  };
};

export default useUserProfile;
