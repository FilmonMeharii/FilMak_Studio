import React from 'react';

// Ultra-lightweight image component for maximum performance
const FastImage = ({ src, alt, loading = "lazy", priority = false, onLoad, ...props }) => {
  return (
    <img 
      src={src} 
      alt={alt}
      loading={priority ? "eager" : loading}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      onLoad={onLoad}
      style={{ 
        width: '100%', 
        height: '100%', 
        objectFit: 'cover',
        ...props.style
      }}
      {...props}
    />
  );
};

export default FastImage; 