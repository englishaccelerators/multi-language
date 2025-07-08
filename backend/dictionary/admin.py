from django.contrib import admin
from django.http import HttpResponse
import csv

from .models import (
    DictionaryEntry,
    PrefixGroup, PrefixWord,
    SuffixGroup, SuffixExample,
    AdvancedRootGroup, AdvancedRootWord,
    VocabularyGroup, VocabularyWord,
    PronunciationGroup, PronunciationWord,
    SpellingGroup, SpellingWord,
    RhythmRootGroup, RhythmWord,
    QuizFormat, GroupQuizAssignment, AdminAuthority,
    FinalExamConfig, SectionQuestionCount, FinalExamResult
)

# ----------------------
# 🔄 Export to CSV Mixin
# ----------------------
class ExportCsvMixin:
    def export_as_csv(self, request, queryset):
        meta = self.model._meta
        field_names = [field.name for field in meta.fields]

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = f'attachment; filename={meta.model_name}.csv'
        writer = csv.writer(response)

        writer.writerow(field_names)
        for obj in queryset:
            writer.writerow([getattr(obj, field) for field in field_names])

        return response

    export_as_csv.short_description = "Export Selected to CSV"

# ----------------------
# Dictionary Entry
# ----------------------
@admin.register(DictionaryEntry)
class DictionaryEntryAdmin(admin.ModelAdmin, ExportCsvMixin):
    list_display = ("identifiercode", "output_value", "audio_uk", "audio_us", "ipa_uk", "ipa_us", "pos_code")
    search_fields = ("identifiercode", "output_value")
    list_editable = ("audio_uk", "audio_us", "ipa_uk", "ipa_us")
    actions = ["export_as_csv"]

# ----------------------
# Prefixes
# ----------------------
class PrefixWordInline(admin.TabularInline):
    model = PrefixWord
    extra = 1

@admin.register(PrefixGroup)
class PrefixGroupAdmin(admin.ModelAdmin, ExportCsvMixin):
    list_display = ('prefix_code_order', 'prefix', 'meaning', 'is_free')
    inlines = [PrefixWordInline]
    list_filter = ('is_free',)
    search_fields = ('prefix', 'prefix_code_order')
    actions = ["export_as_csv"]

@admin.register(PrefixWord)
class PrefixWordAdmin(admin.ModelAdmin, ExportCsvMixin):
    list_display = ('word', 'group')
    search_fields = ('word',)
    list_filter = ('group',)
    actions = ["export_as_csv"]

# ----------------------
# Suffixes
# ----------------------
class SuffixExampleInline(admin.TabularInline):
    model = SuffixExample
    extra = 1

@admin.register(SuffixGroup)
class SuffixGroupAdmin(admin.ModelAdmin, ExportCsvMixin):
    list_display = ('group_code', 'suffix', 'meaning', 'is_free')
    inlines = [SuffixExampleInline]
    list_filter = ('is_free',)
    search_fields = ('group_code', 'suffix')
    actions = ["export_as_csv"]

@admin.register(SuffixExample)
class SuffixExampleAdmin(admin.ModelAdmin, ExportCsvMixin):
    list_display = ('word', 'group')
    search_fields = ('word',)
    list_filter = ('group',)
    actions = ["export_as_csv"]

# ----------------------
# Advanced Roots
# ----------------------
class AdvancedRootWordInline(admin.TabularInline):
    model = AdvancedRootWord
    extra = 1

@admin.register(AdvancedRootGroup)
class AdvancedRootGroupAdmin(admin.ModelAdmin, ExportCsvMixin):
    list_display = ('code', 'root_meaning', 'is_free')
    inlines = [AdvancedRootWordInline]
    list_filter = ('is_free',)
    search_fields = ('code',)
    actions = ["export_as_csv"]

@admin.register(AdvancedRootWord)
class AdvancedRootWordAdmin(admin.ModelAdmin, ExportCsvMixin):
    list_display = ('word', 'group', 'definition', 'related')
    search_fields = ('word', 'definition', 'related')
    list_filter = ('group',)
    actions = ["export_as_csv"]

# ----------------------
# Vocabulary
# ----------------------
class VocabularyWordInline(admin.TabularInline):
    model = VocabularyWord
    extra = 1

@admin.register(VocabularyGroup)
class VocabularyGroupAdmin(admin.ModelAdmin, ExportCsvMixin):
    list_display = ('level', 'title', 'is_free')
    list_filter = ('level', 'is_free')
    inlines = [VocabularyWordInline]
    search_fields = ('title',)
    actions = ["export_as_csv"]

@admin.register(VocabularyWord)
class VocabularyWordAdmin(admin.ModelAdmin, ExportCsvMixin):
    list_display = ('word', 'group', 'example_sentence')
    list_filter = ('group',)
    search_fields = ('word', 'example_sentence')
    actions = ["export_as_csv"]

# ----------------------
# Pronunciation
# ----------------------
class PronunciationWordInline(admin.TabularInline):
    model = PronunciationWord
    extra = 1

@admin.register(PronunciationGroup)
class PronunciationGroupAdmin(admin.ModelAdmin, ExportCsvMixin):
    list_display = ('code', 'ipa', 'title', 'is_free')
    search_fields = ('code', 'ipa', 'title')
    list_filter = ('is_free',)
    inlines = [PronunciationWordInline]
    actions = ["export_as_csv"]

@admin.register(PronunciationWord)
class PronunciationWordAdmin(admin.ModelAdmin, ExportCsvMixin):
    list_display = ('word', 'group', 'audio_key')
    list_filter = ('group',)
    search_fields = ('word',)
    list_editable = ('audio_key',)
    actions = ["export_as_csv"]

# ----------------------
# Spelling
# ----------------------
class SpellingWordInline(admin.TabularInline):
    model = SpellingWord
    extra = 1

@admin.register(SpellingGroup)
class SpellingGroupAdmin(admin.ModelAdmin, ExportCsvMixin):
    list_display = ('code', 'title', 'pattern', 'is_free')
    list_filter = ('is_free',)
    inlines = [SpellingWordInline]
    search_fields = ('code', 'title', 'pattern')
    actions = ["export_as_csv"]

@admin.register(SpellingWord)
class SpellingWordAdmin(admin.ModelAdmin, ExportCsvMixin):
    list_display = ('word', 'group')
    list_filter = ('group',)
    search_fields = ('word', 'example_sentence')
    actions = ["export_as_csv"]

# ----------------------
# Rhythm
# ----------------------
class RhythmWordInline(admin.TabularInline):
    model = RhythmWord
    extra = 1

@admin.register(RhythmRootGroup)
class RhythmRootGroupAdmin(admin.ModelAdmin, ExportCsvMixin):
    list_display = ('root', 'meaning', 'is_free')
    list_filter = ('is_free',)
    inlines = [RhythmWordInline]
    search_fields = ('root',)
    actions = ["export_as_csv"]

@admin.register(RhythmWord)
class RhythmWordAdmin(admin.ModelAdmin, ExportCsvMixin):
    list_display = ('word', 'group')
    list_filter = ('group',)
    search_fields = ('word',)
    actions = ["export_as_csv"]

# ----------------------
# Quiz Format
# ----------------------
@admin.register(QuizFormat)
class QuizFormatAdmin(admin.ModelAdmin, ExportCsvMixin):
    list_display = ('code', 'label', 'description')
    search_fields = ('code', 'label')
    actions = ["export_as_csv"]

# ----------------------
# Group Quiz Assignment
# ----------------------
@admin.register(GroupQuizAssignment)
class GroupQuizAssignmentAdmin(admin.ModelAdmin, ExportCsvMixin):
    list_display = ('group_type', 'group_code', 'quiz_format', 'is_enabled')
    list_filter = ('group_type', 'quiz_format')
    search_fields = ('group_type', 'group_code')
    actions = ["export_as_csv"]

# ----------------------
# Admin Authority
# ----------------------
@admin.register(AdminAuthority)
class AdminAuthorityAdmin(admin.ModelAdmin):
    list_display = ('user',)
    search_fields = ('user__username',)

# ----------------------
# Final Exam Config
# ----------------------
class SectionQuestionCountInline(admin.TabularInline):
    model = SectionQuestionCount
    extra = 1

@admin.register(FinalExamConfig)
class FinalExamConfigAdmin(admin.ModelAdmin):
    list_display = ('title', 'total_questions', 'created_at')
    inlines = [SectionQuestionCountInline]

# ----------------------
# Final Exam Result
# ----------------------
@admin.register(FinalExamResult)
class FinalExamResultAdmin(admin.ModelAdmin):
    list_display = ('user', 'score', 'submitted_at')
    search_fields = ('user__username',)
    readonly_fields = ('submitted_at', 'score', 'breakdown')
