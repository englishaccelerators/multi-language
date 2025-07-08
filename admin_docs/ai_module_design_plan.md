
# 🤖 AI Modules: Mistake Detection, Word Recommender, Smart Tutor

## 1. AI Mistake Detection Engine
- Input: User's quiz answer (spelling, grammar, dictation)
- Output: Visual diff of correct vs wrong sentence
- Feedback Features:
  - Red: Wrong words
  - Blue: Correct words
  - Green: Corrected sentence below
  - Tag punctuation mistakes
  - Use OpenAI or custom NLP model for corrections

## 2. Smart Word Recommender
- Input: Word being searched / practiced
- Output: Next 3 best words to study
- Logic:
  - Word family (prefix/root)
  - CEFR level
  - Mistake history
- Use: Precomputed graph or GPT-based suggestion

## 3. AI Tutor Assistant
- Prompts:
  - "Why is this wrong?"
  - "Give a simpler word for..."
  - "What’s the difference between ___ and ___?"
- Available in:
  - Quiz review screens
  - Dictionary entries
  - Conversation practice (future)
- Backed by: OpenAI (GPT-4-turbo or GPT-4o)
- Future upgrade: fine-tuned version on user mistakes

---

📌 All AI features must respect Admin Panel toggles and privacy rules.
