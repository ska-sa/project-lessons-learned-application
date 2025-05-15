from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from typing import Dict, List
from sqlalchemy.orm import Session
from uuid import UUID
from datetime import datetime

from app.message.messageModel import Message
from app.user.userModel import User
from app.database import SessionLocal  # Only import SessionLocal, not get_db

router = APIRouter()

# --- Local DB Dependency ---
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- Connection Manager ---
class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, user_id: str):
        await websocket.accept()
        if user_id not in self.active_connections:
            self.active_connections[user_id] = []
        self.active_connections[user_id].append(websocket)

    def disconnect(self, websocket: WebSocket, user_id: str):
        if user_id in self.active_connections:
            self.active_connections[user_id].remove(websocket)
            if not self.active_connections[user_id]:
                del self.active_connections[user_id]

    async def send_to_user(self, receiver_id: str, message: str):
        if receiver_id in self.active_connections:
            for connection in self.active_connections[receiver_id]:
                await connection.send_text(message)
            return True
        return False

manager = ConnectionManager()

# --- WebSocket Endpoint ---
@router.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str, db: Session = Depends(get_db)):
    await manager.connect(websocket, user_id)
    try:
        while True:
            data = await websocket.receive_json()
            to = data.get("to")
            content = data.get("message")

            # Save to DB
            message_db = Message(
                sender_id=UUID(user_id),
                receiver_id=UUID(to),
                content=content,
                timestamp=datetime.utcnow(),
                is_read=False
            )
            db.add(message_db)
            db.commit()

            # Send to receiver
            sent = await manager.send_to_user(to, f"[From {user_id}] {content}")
            if not sent:
                pass  # Optional: fallback email
    except WebSocketDisconnect:
        manager.disconnect(websocket, user_id)
