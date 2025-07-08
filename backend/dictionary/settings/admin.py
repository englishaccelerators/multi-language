
from .ai_models import AIToggleSuggestion
from django.contrib import admin
from .models import FeatureToggle
from .admin import export_feature_toggles, export_ai_suggestions

@admin.register(FeatureToggle)
class FeatureToggleAdmin(admin.ModelAdmin):
    list_display = ('feature_name', 'is_enabled')
    list_editable = ('is_enabled',)
    search_fields = ('feature_name',)
    actions = [export_feature_toggles]

@admin.register(AIToggleSuggestion)
class AIToggleSuggestionAdmin(admin.ModelAdmin):
    list_display = ('feature_name', 'suggested_state', 'confidence', 'status', 'created_at')
    list_filter = ('status',)
    actions = [export_ai_suggestions]


from django.contrib import admin
from .billing_models import ClassBillingPlan

@admin.register(ClassBillingPlan)
class ClassBillingPlanAdmin(admin.ModelAdmin):
    list_display = ('class_name', 'plan_name', 'price_per_month', 'currency', 'is_active')
    list_editable = ('is_active',)
    search_fields = ('class_name', 'plan_name')


from .invoice_models import ClassInvoice
from django.contrib import admin

@admin.register(ClassInvoice)
class ClassInvoiceAdmin(admin.ModelAdmin):
    list_display = ('class_name', 'billing_month', 'amount_due', 'currency', 'paid')
    list_filter = ('paid',)
    search_fields = ('class_name',)


from .feature_toggle_models import AdminFeatureToggle
from .leaderboard_models import StudentXP
from django.contrib import admin

@admin.register(AdminFeatureToggle)
class AdminFeatureToggleAdmin(admin.ModelAdmin):
    list_display = ('feature_name', 'is_enabled', 'category')
    list_editable = ('is_enabled',)
    search_fields = ('feature_name',)

@admin.register(StudentXP)
class StudentXPAdmin(admin.ModelAdmin):
    list_display = ('user', 'xp', 'streak', 'updated_at')
    search_fields = ('user__username',)
