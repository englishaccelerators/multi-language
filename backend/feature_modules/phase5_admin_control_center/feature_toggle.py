# Feature toggle model
class FeatureToggle:
    def __init__(self, key, enabled=True):
        self.key = key
        self.enabled = enabled
    def toggle(self):
        self.enabled = not self.enabled