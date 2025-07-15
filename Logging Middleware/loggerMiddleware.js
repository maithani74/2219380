import { Log } from "./logService"; // Your file with the Logger() function

/**

An Express middleware that logs each incoming request.
*/
export function loggerMiddleware(req, res,next){
const { method, originalUrl } = req;
const startTime = Date.now();
// res.on("finish") fires when the response is completely sent.
res.on("finish", async () => {
const durationMs = Date.now() - startTime;
const { statusCode } = res;

text
// Build a message describing this request/response cycle
const message = `Method=${method} URL=${originalUrl} Status=${statusCode} Duration=${durationMs}ms`;

try {
  // Call your Logger function to POST the log data to the remote server
  await Log({
    stack: "backend",
    level: "info", // or "debug", "warn", ...
    package: "middleware", 
    message,
  });
} catch (err) {
  // If logging fails, just avoid crashing your app
  console.error("Failed to send log:", err);
}
});

next();
}