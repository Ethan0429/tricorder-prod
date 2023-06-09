// WebSocket Server
const WebSocket = require("ws");
const Server = WebSocket.Server;
const OPEN = WebSocket.OPEN;
// get PORT environment variable
const PORT = process.env.PORT || 3000;
const wss = new Server({ port: PORT });

wss.on("connection", (ws) => {
  console.log("New client connected");

  // When a message is received from a client (Raspberry Pi)
  ws.on("message", (message) => {
    const relay = message.toString();
    console.log("Received: %s", relay);

    // Broadcast the message to all connected clients (React Apps)
    wss.clients.forEach((client) => {
      if (client.readyState === OPEN) {
        console.log("Relay: %s", relay);
        client.send(relay);
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
