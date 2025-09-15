import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

// Store push subscriptions in memory (in production, use a database)
const pushSubscriptions = new Set<any>();

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
      
      // Note: In production, you would use a proper push service like web-push
      // This is a placeholder for demonstration
      const notification = {
        title: title || "Portfolio Update",
        body: body || "Check out the latest updates to Abd-ur-Raffae's portfolio!",
        data: { url: url || "/" }
      };
      
      console.log(`Would send notification to ${pushSubscriptions.size} subscribers:`, notification);
      
      res.json({ 
        success: true, 
        message: `Notification sent to ${pushSubscriptions.size} subscribers`,
        notification 
      });
    } catch (error) {
      console.error("Send notification error:", error);
      res.status(500).json({ error: "Failed to send notification" });
    }
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
