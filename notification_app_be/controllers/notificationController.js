// notification_app_be/controllers/notificationController.js

import Logger from "../../logging_middleware/logger.js";

const logger = new Logger(process.env.TOKEN);

export const getNotifications = async (req, res) => {
  await logger.log(
    "backend",
    "info",
    "controller",
    "Fetched notifications"
  );

  res.status(200).json({
    success: true,
    message: "Notifications fetched",
  });
};

export const getNotificationById = async (req, res) => {
  await logger.log(
    "backend",
    "info",
    "controller",
    `Fetched notification ${req.params.id}`
  );

  res.status(200).json({
    success: true,
    id: req.params.id,
  });
};

export const createNotification = async (req, res) => {
  await logger.log(
    "backend",
    "info",
    "controller",
    "Notification created"
  );

  res.status(201).json({
    success: true,
    message: "Notification created",
  });
};

export const markAsRead = async (req, res) => {
  await logger.log(
    "backend",
    "info",
    "controller",
    "Notification marked as read"
  );

  res.status(200).json({
    success: true,
    message: "Marked as read",
  });
};

export const markAllAsRead = async (req, res) => {
  await logger.log(
    "backend",
    "info",
    "controller",
    "All notifications marked as read"
  );

  res.status(200).json({
    success: true,
    message: "All notifications marked as read",
  });
};

export const deleteNotification = async (req, res) => {
  await logger.log(
    "backend",
    "warn",
    "controller",
    "Notification deleted"
  );

  res.status(200).json({
    success: true,
    message: "Notification deleted",
  });
};