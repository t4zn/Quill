import { useEffect } from 'react';

interface GoogleAdsenseProps {
  adSlot: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function GoogleAdsense({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  style = { display: 'block' },
  className = ''
}: GoogleAdsenseProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  // Don't render ads in development
  if (process.env.NODE_ENV === 'development') {
    return (
      <div className={`bg-gray-100 border-2 border-dashed border-gray-300 p-4 text-center text-gray-500 ${className}`}>
        <p>AdSense Ad Placeholder</p>
        <p className="text-sm">Slot: {adSlot}</p>
      </div>
    );
  }

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={style}
      data-ad-client={process.env.REACT_APP_GOOGLE_ADSENSE_CLIENT_ID}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive}
    />
  );
}

// AdSense Script Component
export function GoogleAdsenseScript() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && process.env.REACT_APP_GOOGLE_ADSENSE_CLIENT_ID) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.REACT_APP_GOOGLE_ADSENSE_CLIENT_ID}`;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, []);

  return null;
}