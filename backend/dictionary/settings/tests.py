
from django.test import TestCase
from .models import FeatureToggle

class FeatureToggleTest(TestCase):
    def test_feature_toggle_creation(self):
        ft = FeatureToggle.objects.create(feature_name="Dictionary", is_enabled=True)
        self.assertEqual(ft.feature_name, "Dictionary")
        self.assertTrue(ft.is_enabled)
