# Track system email logs
email_log = []
def log_email(user, template):
    email_log.append({'user': user, 'template': template})
def get_user_emails(user):
    return [e for e in email_log if e['user'] == user]