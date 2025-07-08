# Mistake Feedback logic

def compare_answers(user_input, correct):
    return [(u, c, u == c) for u, c in zip(user_input.split(), correct.split())]