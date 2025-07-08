# Admin Preview Mode toggle check
class FeatureApproval:
    def __init__(self):
        self.preview_flags = {}
        self.approvals = {}
    def set_preview(self, feature, enabled):
        self.preview_flags[feature] = enabled
    def approve(self, feature, approver):
        self.approvals[feature] = approver
    def is_live(self, feature):
        return self.preview_flags.get(feature, False) and feature in self.approvals