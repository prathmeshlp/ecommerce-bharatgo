import React from 'react';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, className = '', onClick, ariaLabel }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
      loading="lazy"
    />
  );
};

export default React.memo(Image);