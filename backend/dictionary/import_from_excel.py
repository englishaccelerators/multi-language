# ✅ import_from_excel.py — Converts Excel data into Django models

import os
import django
import pandas as pd

# ✅ Set up Django environment correctly
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "dictionary.settings")
from dictionary.models import (
    VocabularyGroup, VocabularyWord,
    PrefixGroup, PrefixWord,
    SuffixGroup, SuffixExample,
    PronunciationGroup, PronunciationWord,
    SpellingGroup, SpellingWord,
    RhythmRootGroup, RhythmWord,
    AdvancedRootGroup, AdvancedRootWord
)

# ----------------------------
# 📘 1. BEGINNING & INTERMEDIATE VOCABULARY
# ----------------------------
def import_vocabulary(filename, level):
    df = pd.read_excel(filename)
    for column in df.columns:
        group = VocabularyGroup.objects.create(level=level, title=column)
        words = df[column].dropna()
        for word in words:
            VocabularyWord.objects.create(group=group, word=word.strip())
    print(f"✅ Imported {level} vocabulary groups from {filename}")

# ----------------------------
# 🔠 2. PREFIX SECTION
# ----------------------------
def import_prefixes(filename):
    df = pd.read_excel(filename)
    for i, row in df.iterrows():
        group = PrefixGroup.objects.create(
            prefix_code_order=row['prefix code order'],
            prefix=row['prefix'],
            meaning=row['prefix meaning'],
            spelling_rule=row.get('Spelling Rules', ''),
        )
        for col in df.columns:
            if col.startswith('word') and pd.notna(row[col]):
                PrefixWord.objects.create(group=group, word=row[col].strip())
    print(f"✅ Imported Prefix groups from {filename}")

# ----------------------------
# 🔚 3. SUFFIX SECTION
# ----------------------------
def import_suffixes(filename):
    df = pd.read_excel(filename)
    for i, row in df.iterrows():
        group = SuffixGroup.objects.create(
            group_code=row['group code'],
            suffix=row['suffix'],
            meaning=row['meaning']
        )
        for col in df.columns:
            if col.startswith('word') and pd.notna(row[col]):
                SuffixExample.objects.create(group=group, word=row[col].strip())
    print(f"✅ Imported Suffix groups from {filename}")

# ----------------------------
# 🎧 4. PRONUNCIATION SECTION
# ----------------------------
def import_pronunciation(filename):
    df = pd.read_excel(filename)
    for i, row in df.iterrows():
        code = str(row['IPA']).strip()
        title = row.get('title', code)
        group = PronunciationGroup.objects.create(code=code, ipa=code, title=title)
        for col in df.columns:
            if col.startswith('word') and pd.notna(row[col]):
                PronunciationWord.objects.create(group=group, word=row[col].strip())
    print(f"✅ Imported Pronunciation groups from {filename}")

# ----------------------------
# ✍️ 5. SPELLING SECTION
# ----------------------------
def import_spelling(filename):
    df = pd.read_excel(filename)
    for i, row in df.iterrows():
        group = SpellingGroup.objects.create(
            code=row['code'],
            pattern=row['pattern'],
            title=row['title']
        )
        for col in df.columns:
            if col.startswith('word') and pd.notna(row[col]):
                SpellingWord.objects.create(group=group, word=row[col].strip())
    print(f"✅ Imported Spelling groups from {filename}")

# ----------------------------
# 🌀 6. RHYTHM SECTION
# ----------------------------
def import_rhythm(filename):
    df = pd.read_excel(filename)
    for i, row in df.iterrows():
        root = row['root']
        meaning = row['meaning']
        group = RhythmRootGroup.objects.create(root=root.strip(), meaning=meaning.strip())
        for col in df.columns:
            if col.startswith('form-') or col.startswith('word'):
                if pd.notna(row[col]):
                    RhythmWord.objects.create(group=group, word=row[col].strip())
    print(f"✅ Imported Rhythm groups from {filename}")

# ----------------------------
# 📕 7. ADVANCED ROOT SECTION
# ----------------------------
def import_advanced_roots(filename):
    df = pd.read_excel(filename)
    for i, row in df.iterrows():
        root = row['root']
        meaning = row['root meaning']
        group, _ = AdvancedRootGroup.objects.get_or_create(code=root, root_meaning=meaning)
        word = row['word']
        def1 = row.get('definition1', '')
        def2 = row.get('definition2', '')
        combined_def = f"{def1.strip()} || {def2.strip()}"
        AdvancedRootWord.objects.create(group=group, word=word.strip(), definition=combined_def, related=root)
    print(f"✅ Imported Advanced Roots from {filename}")

# ----------------------------
# ✅ RUN ALL (with paths fixed)
# ----------------------------
if __name__ == "__main__":
    base_path = ""

    import_vocabulary(base_path + "beginning vocabulary.XLSX", "beginning")
    import_vocabulary(base_path + "Intermediate vocabulary.XLSX", "intermediate")
    import_prefixes(base_path + "prefix section.XLSX")
    import_suffixes(base_path + "suffix section.XLSX")
    import_pronunciation(base_path + "Pronunciation section.XLSX")
    import_spelling(base_path + "spelling section.XLSX")
    import_rhythm(base_path + "Rhythm.XLSX")
    import_advanced_roots(base_path + "Advanced English Words.XLSX")

