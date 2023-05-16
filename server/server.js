// WebSocket Server
import { Server, OPEN } from "ws";
// get PORT environment variable
const PORT = process.env.PORT || 3000;
const wss = new Server({ port: PORT });

wss.on("connection", (ws) => {
  console.log("New client connected");

  // When a message is received from a client (Raspberry Pi)
  ws.on("message", (message) => {
    console.log("Received: %s", message);

    // Broadcast the message to all connected clients (React Apps)
    wss.clients.forEach((client) => {
      if (client.readyState === OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
