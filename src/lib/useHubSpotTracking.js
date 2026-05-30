import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useHubSpotTracking() {
  const location = useLocation();

  useEffect(() => {
    const _hsq = (window._hsq = window._hsq || []);
    _hsq.push(['setPath', location.pathname + location.search]);
    _hsq.push(['trackPageView']);
  }, [location.pathname, location.search]);
}
