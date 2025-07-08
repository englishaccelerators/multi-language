from django.db.models import Count
from backend.models import PrefixGroup, SuffixGroup, AdvancedRootGroup

# Flag top 2% of prefix groups by number of words
prefix_groups = PrefixGroup.objects.annotate(word_count=Count("words")).order_by("-word_count")
top_prefix = int(max(1, len(prefix_groups) * 0.02))
for group in prefix_groups[:top_prefix]:
    group.is_free = True
    group.save()

# Flag top 2% of suffix groups by number of examples
suffix_groups = SuffixGroup.objects.annotate(example_count=Count("examples")).order_by("-example_count")
top_suffix = int(max(1, len(suffix_groups) * 0.02))
for group in suffix_groups[:top_suffix]:
    group.is_free = True
    group.save()

# Flag top 2% of root groups by number of words
root_groups = AdvancedRootGroup.objects.annotate(word_count=Count("words")).order_by("-word_count")
top_root = int(max(1, len(root_groups) * 0.02))
for group in root_groups[:top_root]:
    group.is_free = True
    group.save()

print("✅ Top 2% of Prefix, Suffix, and Root groups have been marked as free.")
