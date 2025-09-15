import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const usePWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pushSubscription, setPushSubscription] = useState<PushSubscription | null>(null);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js');
          console.log('Service Worker registered successfully:', registration);
          
          // Check for push notification support and get subscription
          if ('PushManager' in window) {
            const subscription = await registration.pushManager.getSubscription();
            setPushSubscription(subscription);
          }
        } catch (error) {
          console.error('Service Worker registration failed:', error);
        }
      });
    }

    // Handle install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    // Handle app installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    // Handle online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Check if app is already installed
    const checkIfInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true);
      }
    };

    // Add event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check install status
    checkIfInstalled();

    // Cleanup
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return false;

    try {
      await deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      
      if (result.outcome === 'accepted') {
        setDeferredPrompt(null);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Installation failed:', error);
      return false;
    }
  };

  const subscribeToPush = async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.warn('Push messaging is not supported');
      return false;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      
      // Request notification permission
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        console.warn('Notification permission denied');
        return false;
      }

      // Subscribe to push notifications
      // Get VAPID public key from server or use environment variable
      const vapidKey = import.meta.env.VITE_VAPID_PUBLIC_KEY || 
        'BEl62iUYgUivxIkv69yViEuiBIa40HI80CRcYbCcQzI8rlOC3Y4lXhF9U5t6Qs4_n9DZKPCf7z7Y_wR2e3TsQ6g';
      
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey)
      });

      setPushSubscription(subscription);

      // Send subscription to your server
      await fetch('/api/subscribe-push', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription),
      });

      return true;
    } catch (error) {
      console.error('Push subscription failed:', error);
      return false;
    }
  };

  return {
    deferredPrompt,
    isInstalled,
    isOnline,
    pushSubscription,
    installApp,
    subscribeToPush,
    canInstall: !!deferredPrompt && !isInstalled,
  };
};

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}