import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const LOG_API_URL = "http://20.244.56.144/evaluation-service/logs";

export async function Log({ stack, level, package: pkg, message }) {
  try {
    await axios.post(
      LOG_API_URL,
      { stack, level, package: pkg, message },
      {
        headers: { Authorization: `Bearer${process.env.LOGGER_ACCESS_TOKEN}`},
      }
    );
  } catch (error) {
    console.error("Error sending log to remote log service",error.message)
  }
}
