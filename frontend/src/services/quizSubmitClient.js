import axios from '../auth/axiosWithAuth';

export async function submitQuizAttempt({ quizType, section, referenceCode, score, duration, trophy }, token) {
  try {
    const res = await axios.post(
      'http://localhost:8000/api/quiz/submit/',
      {
        quiz_type: quizType,
        section,
        reference_code: referenceCode,
        score,
        duration_seconds: duration,
        trophy_earned: trophy
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return res.data;
  } catch (err) {
    console.error("Quiz submit error:", err);
    return null;
  }
}

export async function logMistake({ section, referenceCode, word, mistakeType, attemptText, correctText }, token) {
  try {
    await axios.post(
      'http://localhost:8000/api/mistake/log/',
      {
        section,
        reference_code: referenceCode,
        word,
        mistake_type: mistakeType,
        attempt_text: attemptText,
        correct_text: correctText
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  } catch (err) {
    console.error("Mistake log failed:", err);
  }
}
