
# ERP-style Admin User & Role Cascade Logic

class AdminUser:
    def __init__(self, name, role, assigned_by, permissions):
        self.name = name
        self.role = role  # 'owner', 'manager', 'employee'
        self.assigned_by = assigned_by  # reference to another AdminUser or 'system'
        self.permissions = permissions  # list of strings

    def can_assign(self, permission):
        # Only assign what this user already has
        return self.role == 'owner' or permission in self.permissions

    def can_manage(self, target_admin):
        # Owner can manage all. Manager can manage their own employees.
        if self.role == 'owner':
            return True
        if self.role == 'manager' and target_admin.assigned_by == self.name:
            return True
        return False
