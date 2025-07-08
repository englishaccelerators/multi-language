# Celery task config
from celery import Celery
app = Celery('tasks', broker='redis://localhost:6379/0')
@app.task
def generate_report(user_id):
    return f'Report generated for {user_id}'