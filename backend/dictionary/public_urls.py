from django.urls import path
from .views import (
    search_entries,
    search_direct,
    DictionarySearchAPIView,

    get_prefix_groups,
    get_suffix_groups,
    get_advanced_root_groups,

    get_vocabulary_groups,
    get_pronunciation_groups,
    get_spelling_groups,
    get_rhythm_groups,
)

urlpatterns = [
    # 📘 Dictionary
    path('search/', search_entries, name='search_entries'),
    path('search/<str:word>/', search_direct, name='search_direct'),
    path('search-api/', DictionarySearchAPIView.as_view(), name='dictionary_search'),

    # 🔠 Prefix / Suffix / Root
    path('prefix-groups/', get_prefix_groups),
    path('suffix-groups/', get_suffix_groups),
    path('advanced-root-groups/', get_advanced_root_groups),

    # 📚 Vocabulary + IPA + Spelling + Rhythm
    path('vocabulary-groups/', get_vocabulary_groups),
    path('pronunciation-groups/', get_pronunciation_groups),
    path('spelling-groups/', get_spelling_groups),
    path('rhythm-groups/', get_rhythm_groups),
]
path('tools/all/', AdminAllToolsView.as_view()),
path('tools/section/<str:section_code>/', ToolsBySectionAssignment.as_view()),

path('exam/generate/', generate_final_exam),
path('exam/submit/', submit_final_exam),

from dictionary.views.views_search import (
    DictionarySearchAPIView, search_direct
)

urlpatterns += [
    path('search-api/', DictionarySearchAPIView.as_view(), name='dictionary_search'),
    path('search/<str:word>/', search_direct, name='search_direct'),
]
