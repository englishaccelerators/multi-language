# Admin action logger
class AuditLogger:
    def __init__(self):
        self.logs = []
    def log_action(self, admin, action):
        self.logs.append((admin, action))
    def get_logs(self):
        return self.logs