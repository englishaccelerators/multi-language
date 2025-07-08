# Streak logic
def update_streak(user_id, logged_in_today):
    return 'Streak +1' if logged_in_today else 'Streak reset'