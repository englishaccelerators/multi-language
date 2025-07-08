
from celery.schedules import crontab

CELERY_BEAT_SCHEDULE = {
    'send-weekly-grammar-reports': {
        'task': 'dictionary.tasks.send_grammar_reports.send_grammar_report_emails',
        'schedule': crontab(hour=7, minute=0, day_of_week='monday'),
    },
}
