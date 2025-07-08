// ✅ logMistake.js — Production Mistake Logging (used in quizzes, exercises, etc.) 
import axios from '@/auth/axiosWithAuth';

/**
 * Logs a mistake to the Django backend (via /mistakes/log/).
 *
 * @param {Object} data - Mistake log fields:
 * @param {string} data.section - Section name (e.g., "vocabulary", "grammar")
 * @param {string} data.tool_code - Tool identifier (e.g., "spelling", "prefix-match")
 * @param {string} data.input_given - What the student typed
 * @param {string} data.correct_text - The correct answer expected
 * @param {string} data.mistake_type - Category of mistake (e.g., "spelling", "grammar")
 * @param {string} data.word_or_phrase - The target word or phrase attempted
 */
export async function logMistake(data) {
  try {
    await axios.post('/mistakes/log/', data);
    console.log('✅ Mistake successfully logged to backend:', data);
  } catch (error) {
    console.error('❌ Failed to log mistake:', error.response?.data || error.message);
  }
}
