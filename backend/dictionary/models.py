from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# ------------------------
# DICTIONARY CORE
# ------------------------
class DictionaryEntry(models.Model):
    identifiercode = models.CharField(max_length=255)
    output_value = models.TextField()

    def __str__(self):
        return self.identifiercode

# ------------------------
# PREFIX SECTION
# ------------------------
class PrefixGroup(models.Model):
    prefix_code_order = models.CharField(max_length=50)
    prefix = models.CharField(max_length=20)
    meaning = models.TextField()
    spelling_rule = models.TextField(blank=True, null=True)
    is_free = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.prefix_code_order} - {self.prefix}"

class PrefixWord(models.Model):
    group = models.ForeignKey(PrefixGroup, on_delete=models.CASCADE, related_name="words")
    word = models.CharField(max_length=100)
    audio_key = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.word

# ------------------------
# SUFFIX SECTION
# ------------------------
class SuffixGroup(models.Model):
    group_code = models.CharField(max_length=50)
    suffix = models.CharField(max_length=20)
    meaning = models.TextField()
    is_free = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.group_code} - {self.suffix}"

class SuffixExample(models.Model):
    group = models.ForeignKey(SuffixGroup, on_delete=models.CASCADE, related_name="examples")
    word = models.CharField(max_length=100)
    audio_key = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.word

# ------------------------
# ADVANCED ROOT SECTION
# ------------------------
class AdvancedRootGroup(models.Model):
    code = models.CharField(max_length=50, unique=True)
    root_meaning = models.CharField(max_length=255)
    is_free = models.BooleanField(default=False)

    def __str__(self):
        return self.code

class AdvancedRootWord(models.Model):
    group = models.ForeignKey(AdvancedRootGroup, on_delete=models.CASCADE, related_name="words")
    word = models.CharField(max_length=100)
    morpheme_break = models.TextField(blank=True)
    definition = models.TextField()
    related = models.CharField(max_length=100)
    audio_key = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.word

# ------------------------
# VOCABULARY SECTION
# ------------------------
class VocabularyGroup(models.Model):
    LEVEL_CHOICES = (
        ("beginning", "Beginning"),
        ("intermediate", "Intermediate"),
    )
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES)
    title = models.CharField(max_length=100)
    is_free = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.level}: {self.title}"

class VocabularyWord(models.Model):
    group = models.ForeignKey(VocabularyGroup, on_delete=models.CASCADE, related_name="words")
    word = models.CharField(max_length=100)
    example_sentence = models.TextField(blank=True)
    audio_key = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.word

# ------------------------
# PRONUNCIATION SECTION
# ------------------------
class PronunciationGroup(models.Model):
    code = models.CharField(max_length=50, unique=True)
    ipa = models.CharField(max_length=10)
    title = models.CharField(max_length=100)
    is_free = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.ipa} — {self.title}"

class PronunciationWord(models.Model):
    group = models.ForeignKey(PronunciationGroup, on_delete=models.CASCADE, related_name="words")
    word = models.CharField(max_length=100)
    audio_key = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.word

# ------------------------
# SPELLING SECTION
# ------------------------
class SpellingGroup(models.Model):
    code = models.CharField(max_length=50, unique=True)
    pattern = models.CharField(max_length=50)
    title = models.CharField(max_length=100)
    is_free = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.code} — {self.title}"

class SpellingWord(models.Model):
    group = models.ForeignKey(SpellingGroup, on_delete=models.CASCADE, related_name="words")
    word = models.CharField(max_length=100)
    example_sentence = models.TextField(blank=True)
    audio_key = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.word

# ------------------------
# RHYTHM SECTION
# ------------------------
class RhythmRootGroup(models.Model):
    root = models.CharField(max_length=100, unique=True)
    meaning = models.CharField(max_length=255)
    is_free = models.BooleanField(default=False)

    def __str__(self):
        return self.root

class RhythmWord(models.Model):
    group = models.ForeignKey(RhythmRootGroup, on_delete=models.CASCADE, related_name="words")
    word = models.CharField(max_length=100)
    audio_key = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.word

# ------------------------
# QUIZZES + FINAL EXAMS
# ------------------------
class QuizFormat(models.Model):
    code = models.CharField(max_length=50, unique=True)
    label = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.label

class GroupQuizAssignment(models.Model):
    group_type = models.CharField(max_length=50)
    group_code = models.CharField(max_length=100)
    quiz_format = models.ForeignKey(QuizFormat, on_delete=models.CASCADE)
    is_enabled = models.BooleanField(default=False)

    class Meta:
        unique_together = ("group_type", "group_code", "quiz_format")

class FinalExamConfig(models.Model):
    title = models.CharField(max_length=100, default="Comprehensive Exam")
    total_questions = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class SectionQuestionCount(models.Model):
    exam = models.ForeignKey(FinalExamConfig, on_delete=models.CASCADE, related_name="section_counts")
    section = models.CharField(max_length=50)
    count = models.PositiveIntegerField()

class FinalExamResult(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.FloatField()
    total_questions = models.IntegerField()
    correct_answers = models.IntegerField()
    breakdown = models.JSONField()
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.score}%"

# ------------------------
# ADMIN + ROLES
# ------------------------
class AdminAuthority(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    allowed_sections = models.JSONField(default=list)
    allowed_quiz_formats = models.JSONField(default=list)

    def has_section_access(self, section):
        return section in self.allowed_sections

    def has_format_access(self, quiz_code):
        return quiz_code in self.allowed_quiz_formats

class UserProfile(models.Model):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('teacher', 'Teacher'),
        ('admin', 'Admin'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='student')

    def __str__(self):
        return f"{self.user.username} ({self.role})"

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


# Teacher Dashboard Models

class Classroom(models.Model):
    name = models.CharField(max_length=100)
    teacher = models.ForeignKey(User, on_delete=models.CASCADE)

class AssignedQuiz(models.Model):
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE)
    word = models.CharField(max_length=100)
    identifiercode = models.CharField(max_length=100)
    date_assigned = models.DateTimeField(auto_now_add=True)

class StudentProgress(models.Model):
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE)
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    identifiercode = models.CharField(max_length=100)
    correct = models.BooleanField()
    timestamp = models.DateTimeField(auto_now_add=True)


# Leaderboard Entry Model
class LeaderboardEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    xp = models.IntegerField(default=0)
    badge = models.CharField(max_length=20, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-xp']
