
from celery import shared_task

@shared_task
def send_test_log(msg):
    with open("celery_test.log", "a") as log:
        log.write(f"[CELERY TASK] {msg}\n")
    return "Log saved"
