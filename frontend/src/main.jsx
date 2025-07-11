// ✅ main.jsx — FINAL UPDATED 
import DataEntry from './pages/admin/tools/DataEntry';
import TopBar from './components/TopBar';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// ✅ Pages
import Home from './pages/Home';
import Dictionary from './pages/Dictionary';
import Prefixes from './pages/Prefixes';
import Suffixes from './pages/Suffixes';
import RhythmGroups from './pages/RhythmGroups';
import SpellingDictation from './pages/SpellingDictation';
import PronunciationGroups from './pages/PronunciationGroups';
import VocabularyBeginner from './pages/VocabularyBeginner';
import VocabularyIntermediate from './pages/VocabularyIntermediate';
import VocabularyAdvanced from './pages/VocabularyAdvanced';

// ✅ Admin Panel
import AdminDashboard from './pages/AdminDashboard';
import AdminQuizManager from './pages/AdminQuizManager';
import AdminMistakeAnalytics from './pages/AdminMistakeAnalytics';
import AdminTopCertificates from './pages/AdminTopCertificates';
import AdminToolManager from './pages/admin/AdminToolManager';
import AdminMistakeReview from './pages/admin/AdminMistakeReview';

// ✅ Teacher
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherAssignQuiz from './pages/TeacherAssignQuiz';
import TeacherMistakeDashboard from './pages/TeacherMistakeDashboard';

// ✅ Student
import StudentDashboard from './pages/StudentDashboard';
import StudentHomework from './pages/StudentHomework';

// ✅ Quiz & Review
import FinalExam from './pages/FinalExam';
import QuizReviewPage from './pages/QuizReviewPage';
import MatchQuiz from './pages/MatchQuiz';
import MCQQuiz from './pages/MCQQuiz';
import DictationQuiz from './pages/DictationQuiz';
import GrammarQuiz from './pages/GrammarQuiz';

// ✅ Other
import CertificateEarned from './pages/CertificateEarned';
import CertificatePreview from './pages/CertificatePreview';
import Leaderboard from './pages/Leaderboard';

// ✅ Auth
import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/RegisterForm';
import PasswordResetConfirm from './pages/PasswordResetConfirm';

// ✅ Global Context / Protection
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from '../auth/ProtectedRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* ✅ Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route path="/prefixes" element={<Prefixes />} />
          <Route path="/suffixes" element={<Suffixes />} />
          <Route path="/rhythm" element={<RhythmGroups />} />
          <Route path="/spelling" element={<SpellingDictation />} />
          <Route path="/pronunciation" element={<PronunciationGroups />} />
          <Route path="/vocabulary/beginner" element={<VocabularyBeginner />} />
          <Route path="/vocabulary/intermediate" element={<VocabularyIntermediate />} />
          <Route path="/vocabulary/advanced" element={<VocabularyAdvanced />} />
          <Route path="/certificate" element={<CertificateEarned />} />
          <Route path="/certificate/preview" element={<CertificatePreview />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/reset-password-confirm" element={<PasswordResetConfirm />} />

          {/* ✅ Student */}
          <Route path="/student/dashboard" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/homework" element={<ProtectedRoute role="student"><StudentHomework /></ProtectedRoute>} />
          <Route path="/student/review" element={<ProtectedRoute role="student"><QuizReviewPage /></ProtectedRoute>} />

          {/* ✅ Final Exam */}
          <Route path="/final-exam" element={<ProtectedRoute><FinalExam /></ProtectedRoute>} />

          {/* ✅ Teacher */}
          <Route path="/teacher/dashboard" element={<ProtectedRoute role="teacher"><TeacherDashboard /></ProtectedRoute>} />
          <Route path="/teacher/assign" element={<ProtectedRoute role="teacher"><TeacherAssignQuiz /></ProtectedRoute>} />
          <Route path="/teacher/mistakes" element={<ProtectedRoute role="teacher"><TeacherMistakeDashboard /></ProtectedRoute>} />

          {/* ✅ Admin */}
          <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/quizzes" element={<ProtectedRoute role="admin"><AdminQuizManager /></ProtectedRoute>} />
          <Route path="/admin/mistakes" element={<ProtectedRoute role="admin"><AdminMistakeAnalytics /></ProtectedRoute>} />
          <Route path="/admin/top-certificates" element={<ProtectedRoute role="admin"><AdminTopCertificates /></ProtectedRoute>} />
          <Route path="/admin/tools" element={<ProtectedRoute role="admin"><AdminToolManager /></ProtectedRoute>} />
          <Route path="/admin/mistake-review" element={<ProtectedRoute role="admin"><AdminMistakeReview /></ProtectedRoute>} />
          <Route path="/admin/tools/data-entry" element={<ProtectedRoute role="admin"><DataEntry /></ProtectedRoute>} /> {/* ✅ Added */}

          {/* ✅ Quiz Variants (shared) */}
          <Route path="/quiz/match" element={<MatchQuiz />} />
          <Route path="/quiz/mcq" element={<MCQQuiz />} />
          <Route path="/quiz/dictation" element={<DictationQuiz />} />
          <Route path="/quiz/grammar" element={<GrammarQuiz />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
