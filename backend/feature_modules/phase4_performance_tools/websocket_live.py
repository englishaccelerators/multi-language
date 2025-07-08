# WebSocket broadcast stub for live quiz
class LiveQuiz:
    def send_update(self, room, data):
        return f'Message to {room}: {data}'