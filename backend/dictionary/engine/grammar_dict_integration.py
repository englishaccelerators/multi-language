
from .grammar_tag_engine import tag_grammar

def suggest_grammar_tags_from_sentence(sentence):
    return tag_grammar(sentence)

def suggest_grammar_for_word_entry(entry_sentences):
    suggestions = set()
    for sentence in entry_sentences:
        tag = tag_grammar(sentence)
        if tag != "Uncategorized":
            suggestions.add(tag)
    return list(suggestions)
