# Simulate admin viewing as another user
def impersonate_user(admin, user_id):
    if admin.role in ['owner', 'support']:
        return f'Now viewing as user {user_id}'
    return 'Access denied'