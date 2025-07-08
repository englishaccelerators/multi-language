
from rest_framework import serializers
from .models import FeatureToggle

class FeatureToggleSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeatureToggle
        fields = ['id', 'feature_name', 'is_enabled', 'description']


from rest_framework import serializers
from .ai_models import AIToggleSuggestion

class AIToggleSuggestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AIToggleSuggestion
        fields = '__all__'


from .ai_models import AIToggleSuggestion
from rest_framework import serializers

class AIToggleSuggestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AIToggleSuggestion
        fields = '__all__'
        read_only_fields = ['created_at']


from rest_framework import serializers
from .analytics_models import FeatureUsage

class FeatureUsageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeatureUsage
        fields = '__all__'


from rest_framework import serializers
from .billing_models import ClassBillingPlan

class ClassBillingPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassBillingPlan
        fields = '__all__'


from .invoice_models import ClassInvoice
from rest_framework import serializers

class ClassInvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassInvoice
        fields = '__all__'
