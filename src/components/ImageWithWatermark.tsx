import React, { memo } from 'react';

interface ImageWithWatermarkProps {
  src: string;
  alt: string;
  watermarkText?: string;
  className?: string;
}

const ImageWithWatermark: React.FC<ImageWithWatermarkProps> = memo(({
  src,
  alt,
  watermarkText = 'Design Pulse',
  className = '',
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
      />

      {/* Single CSS-based watermark overlay - replaces 9-element grid */}
      <div
        className="absolute inset-0 pointer-events-none select-none flex items-center justify-center"
        aria-hidden="true"
      >
        <span
          className="text-white/25 text-3xl font-bold tracking-wider"
          style={{
            textShadow: '2px 2px 6px rgba(0,0,0,0.3)',
          }}
        >
          © {watermarkText}
        </span>
      </div>

      {/* Invisible overlay to prevent easy inspection */}
      <div
        className="absolute inset-0 bg-transparent"
        aria-hidden="true"
      />
    </div>
  );
});

ImageWithWatermark.displayName = 'ImageWithWatermark';

export default ImageWithWatermark;
