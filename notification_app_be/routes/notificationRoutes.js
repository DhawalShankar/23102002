// notification_app_be/routes/notificationRoutes.js

import express from "express";

import {
  getNotifications,
  getNotificationById,
  markAsRead,
  markAllAsRead,
  createNotification,
  deleteNotification,
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", getNotifications);

router.get("/:id", getNotificationById);

router.post("/", createNotification);

router.patch("/:id/read", markAsRead);

router.patch("/mark-all-read", markAllAsRead);

router.delete("/:id", deleteNotification);

export default router;