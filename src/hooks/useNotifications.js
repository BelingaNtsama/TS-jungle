import { toast } from 'sonner';

export function useNotifications() {
  const notifySuccess = (title, description) => {
    toast.success(description, { 
      description: title,
      position: 'top-right',
      duration: 3000
    });
  };

  const notifyError = (title, description) => {
    toast.error(description, { 
      description: title,
      position: 'top-right',
      duration: 4000
    });
  };

  const notifyWarning = (title, description) => {
    toast.warning(description, { 
      description: title,
      position: 'top-right',
      duration: 4000
    });
  };

  const notifyInfo = (title, description) => {
    toast.info(description, { 
      description: title,
      position: 'top-right',
      duration: 3000
    });
  };

  return { 
    notifySuccess, 
    notifyError,
    notifyWarning,
    notifyInfo
  };
}

export default useNotifications;
