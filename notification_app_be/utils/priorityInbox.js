// priorityInbox.js

import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_URL =
  "http://4.224.186.213/evaluation-service/notifications";

const getPriority = (
  type,
  timestamp
) => {
  let weight = 0;

  if (type === "Placement") {
    weight = 3;
  } else if (type === "Result") {
    weight = 2;
  } else {
    weight = 1;
  }

  const recency =
    new Date(timestamp).getTime();

  return weight * 1000000000000 + recency;
};

const fetchNotifications =
  async () => {
    try {
      const response =
        await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${process.env.TOKEN}`,
          },
        });

      return response.data.notifications;

    } catch (error) {
      console.log(error.message);
      return [];
    }
  };

const getTop10Notifications =
  async () => {
    const notifications =
      await fetchNotifications();

    const sorted =
      notifications.sort((a, b) => {
        return (
          getPriority(
            b.Type,
            b.Timestamp
          ) -
          getPriority(
            a.Type,
            a.Timestamp
          )
        );
      });

    const top10 =
      sorted.slice(0, 10);

    console.log(
      "Top 10 Notifications:"
    );

    console.log(top10);
  };

getTop10Notifications();