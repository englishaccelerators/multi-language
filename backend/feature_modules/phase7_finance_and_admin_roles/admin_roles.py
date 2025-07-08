# Admin role and permission system
class AdminRole:
    def __init__(self, name, permissions):
        self.name = name
        self.permissions = permissions
    def can_access(self, feature):
        return feature in self.permissions

# Example roles
FULL_ADMIN = AdminRole('Full', ['finance', 'refund', 'content', 'analytics'])
FINANCE_ADMIN = AdminRole('Finance', ['finance', 'refund'])
ACADEMIC_ADMIN = AdminRole('Academic', ['content'])