# Admin control logic
TOGGLES = {
    'enable_ai_tutor': True,
    'enable_coupon_codes': False,
    'enable_weekly_missions': True,
    'enable_xp_system': True,
    'enable_stripe_logs': True,
    'enable_push_alerts': True,
    'enable_export_tools': True,
    'enable_school_control': True,
    'enable_partner_referrals': True
}
def set_toggle(key, status):
    TOGGLES[key] = status