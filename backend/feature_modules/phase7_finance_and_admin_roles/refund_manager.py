# Refund logic for admin panel
class RefundManager:
    def __init__(self, stripe_api):
        self.stripe = stripe_api
    def issue_refund(self, payment_id, amount=None):
        return self.stripe.Refund.create(payment_intent=payment_id, amount=amount)