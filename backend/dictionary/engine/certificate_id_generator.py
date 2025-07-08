
def generate_certificate_id(user_id, year=None):
    from datetime import datetime
    if not year:
        year = datetime.now().year
    return f"CERT-{year}-{str(user_id).zfill(5)}"
