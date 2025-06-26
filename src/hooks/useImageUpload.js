import { useState, useEffect } from 'react';

export default function useImageUpload() {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleImageUpload = (file) => {
    if (!file) return null;

    const newPreviewUrl = URL.createObjectURL(file);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    
    setPreviewUrl(newPreviewUrl);
    return newPreviewUrl;
  };

  return {
    previewUrl,
    setPreviewUrl,
    handleImageUpload
  };
}
