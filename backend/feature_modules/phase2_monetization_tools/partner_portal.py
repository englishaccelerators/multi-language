# Handles partner referral and tracking
class Partner:
    def __init__(self, code):
        self.code = code
    def track_referral(self, user):
        return f'Referred user {user} via {self.code}'