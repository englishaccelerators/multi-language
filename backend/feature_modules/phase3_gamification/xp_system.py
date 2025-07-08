# XP System: award XP for actions
def award_xp(user_id, action):
    xp_map = {'login': 5, 'quiz_correct': 10, 'quiz_complete': 20}
    return xp_map.get(action, 0)