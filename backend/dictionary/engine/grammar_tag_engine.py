
import re

GRAMMAR_PATTERNS = {
    "Past Continuous": re.compile(r'\b(was|were)\s+\w+ing\b'),
    "Present Simple": re.compile(r'\b(i|you|we|they|he|she|it)\s+\w+s\b'),
    "Passive Voice": re.compile(r'\b(is|are|was|were|be|been|being)\s+\w+ed\b'),
    "Perfect Tense": re.compile(r'\b(has|have|had)\s+\w+ed\b'),
    "Modal Verbs": re.compile(r'\b(can|could|should|would|might|must|may|shall)\b'),
    "Conditional (if)": re.compile(r'\bif\b'),
}

def tag_grammar(sentence):
    sentence = sentence.lower()
    for label, pattern in GRAMMAR_PATTERNS.items():
        if pattern.search(sentence):
            return label
    return "Uncategorized"
