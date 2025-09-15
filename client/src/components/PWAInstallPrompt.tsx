import { useState } from 'react';
import { Download, Bell, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePWA } from '@/hooks/usePWA';
import { useToast } from '@/hooks/use-toast';

export function PWAInstallPrompt() {
  const { canInstall, installApp, subscribeToPush, isOnline, pushSubscription } = usePWA();
  const [showPrompt, setShowPrompt] = useState(true);
  const [isInstalling, setIsInstalling] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  if (!showPrompt || (!canInstall && !pushSubscription === null)) {
    return null;
  }

  const handleInstall = async () => {
    setIsInstalling(true);
    try {
      const success = await installApp();
      if (success) {
        toast({
          title: "App Installed!",
          description: "You can now access the portfolio from your home screen.",
        });
        setShowPrompt(false);
      } else {
        toast({
          title: "Installation cancelled",
          description: "You can install the app later from your browser menu.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Installation failed",
        description: "Please try again or install from your browser menu.",
        variant: "destructive",
      });
    } finally {
      setIsInstalling(false);
    }
  };

  const handleNotificationSubscribe = async () => {
    setIsSubscribing(true);
    try {
      const success = await subscribeToPush();
      if (success) {
        toast({
          title: "Notifications enabled!",
          description: "You'll receive updates about new projects and portfolio changes.",
        });
      } else {
        toast({
          title: "Notifications blocked",
          description: "You can enable notifications later in your browser settings.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Notification setup failed",
        description: "Please try again or check your browser settings.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <Card 
      className="fixed bottom-4 right-4 w-96 max-w-[calc(100vw-2rem)] z-50 bg-background/95 backdrop-blur-sm border shadow-lg"
      data-testid="pwa-install-prompt"
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Download className="h-5 w-5" />
            Install Portfolio App
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowPrompt(false)}
            data-testid="button-close-prompt"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary">
            {isOnline ? 'Online' : 'Offline'}
          </Badge>
          <Badge variant="outline">PWA Ready</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Install this portfolio as an app for quick access and offline viewing.
        </p>
        
        <div className="space-y-2">
          {canInstall && (
            <Button
              onClick={handleInstall}
              disabled={isInstalling}
              className="w-full"
              data-testid="button-install-app"
            >
              <Download className="h-4 w-4 mr-2" />
              {isInstalling ? 'Installing...' : 'Install App'}
            </Button>
          )}
          
          {!pushSubscription && (
            <Button
              onClick={handleNotificationSubscribe}
              disabled={isSubscribing}
              variant="outline"
              className="w-full"
              data-testid="button-enable-notifications"
            >
              <Bell className="h-4 w-4 mr-2" />
              {isSubscribing ? 'Setting up...' : 'Enable Notifications'}
            </Button>
          )}
          
          {pushSubscription && (
            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
              <Check className="h-4 w-4" />
              <span>Notifications enabled</span>
            </div>
          )}
        </div>
        
        <div className="text-xs text-muted-foreground">
          • Works offline
          • Faster loading
          • Native app experience
          • Push notifications for updates
        </div>
      </CardContent>
    </Card>
  );
}