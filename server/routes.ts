import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import webPush from "web-push";

// Store push subscriptions in memory (in production, use a database)
const pushSubscriptions = new Set<any>();

// Configure web-push with VAPID keys (in production, use environment variables)
const vapidKeys = {
  publicKey: 'BEl62iUYgUivxIkv69yViEuiBIa40HI80CRcYbCcQzI8rlOC3Y4lXhF9U5t6Qs4_n9DZKPCf7z7Y_wR2e3TsQ6g',
  privateKey: 'YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoxMjM0NTY3' // Demo key - in production, use proper VAPID private key
};

// Only configure web-push if we have valid keys
try {
  webPush.setVapidDetails(
    'mailto:demo@example.com', // Contact email
    vapidKeys.publicKey,
    vapidKeys.privateKey
  );
} catch (error) {
  console.warn('VAPID keys not properly configured, push notifications will not work:', error);
}

export async function registerRoutes(app: Express): Promise<Server> {
  // PWA Push notification subscription endpoint
  app.post("/api/subscribe-push", async (req, res) => {
    try {
      const subscription = req.body;
      
      if (!subscription || !subscription.endpoint) {
        return res.status(400).json({ error: "Invalid subscription" });
      }
      
      // Store the subscription (in production, save to database)
      pushSubscriptions.add(subscription);
      
      console.log("New push subscription:", subscription.endpoint);
      
      res.json({ success: true, message: "Subscription saved successfully" });
    } catch (error) {
      console.error("Push subscription error:", error);
      res.status(500).json({ error: "Failed to save subscription" });
    }
  });

  // Send push notification endpoint (for testing/admin use)
  app.post("/api/send-notification", async (req, res) => {
    try {
      const { title, body, url } = req.body;
      
      if (pushSubscriptions.size === 0) {
        return res.json({ message: "No subscribers found" });
      }
      
      const notification = {
        title: title || "Portfolio Update",
        body: body || "Check out the latest updates to Abd-ur-Raffae's portfolio!",
        data: { url: url || "/" }
      };
      
      const results = [];
      
      // Send to all subscribers
      for (const subscription of Array.from(pushSubscriptions)) {
        try {
          await webPush.sendNotification(subscription, JSON.stringify(notification));
          results.push({ success: true, endpoint: subscription.endpoint });
        } catch (error: any) {
          console.error('Failed to send notification to:', subscription.endpoint, error);
          
          // Remove invalid subscriptions (410 Gone = subscription expired)
          if (error.statusCode === 410) {
            pushSubscriptions.delete(subscription);
          }
          
          results.push({ 
            success: false, 
            endpoint: subscription.endpoint, 
            error: error.message 
          });
        }
      }
      
      const successCount = results.filter(r => r.success).length;
      
      res.json({ 
        success: true, 
        message: `Notification sent to ${successCount}/${pushSubscriptions.size} subscribers`,
        notification,
        results 
      });
    } catch (error) {
      console.error("Send notification error:", error);
      res.status(500).json({ error: "Failed to send notification" });
    }
  });

  // Get VAPID public key
  app.get("/api/vapid-public-key", (req, res) => {
    res.json({ publicKey: vapidKeys.publicKey });
  });

  // Get PWA manifest (backup endpoint)
  app.get("/api/manifest", (req, res) => {
    const manifest = {
      name: "Abd-ur-Raffae Masood - Portfolio",
      short_name: "Portfolio",
      description: "Full Stack Engineer Portfolio - Abd-ur-Raffae Masood",
      start_url: "/",
      display: "standalone",
      theme_color: "#0a0a0a",
      background_color: "#0a0a0a",
      icons: [
        {
          src: "/icons/icon-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/icons/icon-512x512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ]
    };
    
    res.json(manifest);
  });

  const httpServer = createServer(app);

  return httpServer;
}
