import React, { useState, useRef, useEffect } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({ src, alt, style, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { rootMargin: '200px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={imgRef} style={{ position: 'relative', ...style }}>
      {inView && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          style={{
            ...style,
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
          {...props}
        />
      )}
    </div>
  );
};
