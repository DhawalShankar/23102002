import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const LOG_API_URL = process.env.LOG_API_URL;

class Logger {
  constructor(token) {
    this.token = token;
  }

  async log(stack, level, packageName, message) {
    try {
      const response = await axios.post(
        LOG_API_URL,
        {
          stack,
          level,
          package: packageName,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);

    } catch (error) {
      console.log(
        error.response?.data || error.message
      );
    }
  }
}

export default Logger;