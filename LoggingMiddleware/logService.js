import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const LOG_API_URL = "http://20.244.56.144/evaluation-service/logs";

export async function Log({ stack, level, package: pkg, message }) {
  try {
    const LOGGER_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtYWl0aGFuaXI3NEBnbWFpbC5jb20iLCJleHAiOjE3NTI1NjIyNzIsImlhdCI6MTc1MjU2MTM3MiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjVkZmI2YzY4LWE2MTYtNDIxMy1hNGI4LWMxOWRjZjlhMTY5NyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InJhaHVsIG1haXRoYW5pIiwic3ViIjoiOWIyNjI4NTUtN2RiNC00ZjBiLWIwNmMtZmFkZmRiM2E2NmZmIn0sImVtYWlsIjoibWFpdGhhbmlyNzRAZ21haWwuY29tIiwibmFtZSI6InJhaHVsIG1haXRoYW5pIiwicm9sbE5vIjoiMjIxOTM4MCIsImFjY2Vzc0NvZGUiOiJRQWhEVXIiLCJjbGllbnRJRCI6IjliMjYyODU1LTdkYjQtNGYwYi1iMDZjLWZhZGZkYjNhNjZmZiIsImNsaWVudFNlY3JldCI6ImRVakZUdm1oUnBqY3pRSnUifQ.CW0ROZw3Z2m_5B8KxUnz4eGsryQWuc9j3j8qk8rDJLI"
    // console.log(LOGGER_ACCESS_TOKEN)
    await axios.post(
      LOG_API_URL,
      { stack, level, package: pkg, message },
      {
        headers: { Authorization: `Bearer ${LOGGER_ACCESS_TOKEN}` },
      }
    );
    console.log("logs suceess")
  } catch (error) {
    console.error("Error sending log to remote log service:", error.message);
  }
}