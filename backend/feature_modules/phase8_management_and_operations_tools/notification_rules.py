# Event-based alert rules
def should_alert(event_type, value):
    if event_type == 'refund_spike' and value > 5:
        return True
    return False