# client.py
import asyncio
import websockets
import json
import random


async def send_data():
    uri = "wss://test-production-6637.up.railway.app/ws"
    async with websockets.connect(uri) as websocket:
        while True:
            sensor_data = {
                "temperature": random.uniform(20.0, 25.0),
                "humidity": random.uniform(30.0, 40.0),
            }
            await websocket.send(json.dumps(sensor_data))

asyncio.get_event_loop().run_until_complete(send_data())
