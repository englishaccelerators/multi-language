
# Quiz templates mapped by grammar tag
QUIZ_TEMPLATES = {
    "Passive Voice": [
        {"type": "multiple_choice", "question": "Which of these is passive voice?", "options": ["He eats lunch", "Lunch is eaten", "They play", "She goes"], "answer": "Lunch is eaten"},
        {"type": "rewrite", "prompt": "Rewrite this in passive voice: 'The chef cooked the meal.'", "answer": "The meal was cooked by the chef."}
    ],
    "Modal Verbs": [
        {"type": "fill_in_blank", "sentence": "You ___ study harder.", "answer": "should"},
        {"type": "choose_modal", "prompt": "Which modal verb best fits: 'I ___ help you.'", "options": ["can", "does", "are"], "answer": "can"}
    ],
    "Past Continuous": [
        {"type": "identify_tense", "question": "Which sentence is past continuous?", "options": ["She eats", "He was walking", "They go", "We study"], "answer": "He was walking"}
    ],
    "Perfect Tense": [
        {"type": "fill_in_blank", "sentence": "They ___ finished the work.", "answer": "have"},
        {"type": "multiple_choice", "question": "Which uses the present perfect?", "options": ["She eats", "He will eat", "They have eaten", "It is eating"], "answer": "They have eaten"}
    ]
}
