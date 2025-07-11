// ✅ main.jsx — FIXED DEPLOYABLE VERSION
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import TopBar from './components/TopBar';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from '../auth/ProtectedRoute';

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

import AdminDashboard from './pages/AdminDashboard';
import AdminQuizManager from './pages/AdminQuizManager';
import AdminMistakeAnalytics from './pages/AdminMistakeAnalytics';
import AdminTopCertificates from './pages/AdminTopCertificates';
import AdminToolManager from './pages/admin/AdminToolManager';
import AdminMistakeReview from './pages/admin/AdminMistakeReview';
import DataEntry from './pages/admin/tools/DataEntry';

import TeacherDashboard from './pages/TeacherDashboard';
import TeacherAssignQuiz from './pages/TeacherAssignQuiz';
import TeacherMistakeDashboard from './pages/TeacherMistakeDashboard';

import StudentDashboard from './pages/StudentDashboard';
import StudentHomework from './pages/StudentHomework';

import FinalExam from './pages/FinalExam';
import QuizReviewPage from './pages/QuizReviewPage';
import MatchQuiz from './pages/MatchQuiz';
import MCQQuiz from './pages/MCQQuiz';
import DictationQuiz from './pages/DictationQuiz';
import GrammarQuiz from './pages/GrammarQuiz';

import CertificateEarned from './pages/CertificateEarned';
import CertificatePreview from './pages/CertificatePreview';
import Leaderboard from './pages/Leaderboard';

import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/RegisterForm';
import PasswordResetConfirm from './pages/PasswordResetConfirm';

// ✅ Layout component
const Layout = ({ children }) => (
  <>
    <TopBar />
    <main>{children}</main>
  </>
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* ✅ Public Routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/dictionary" element={<Layout><Dictionary /></Layout>} />
          <Route path="/prefixes" element={<Layout><Prefixes /></Layout>} />
          <Route path="/suffixes" element={<Layout><Suffixes /></Layout>} />
          <Route path="/rhythm" element={<Layout><RhythmGroups /></Layout>} />
          <Route path="/spelling" element={<Layout><SpellingDictation /></Layout>} />
          <Route path="/pronunciation" element={<Layout><PronunciationGroups /></Layout>} />
          <Route path="/vocabulary/beginner" element={<Layout><VocabularyBeginner /></Layout>} />
          <Route path="/vocabulary/intermediate" element={<Layout><VocabularyIntermediate /></Layout>} />
          <Route path="/vocabulary/advanced" element={<Layout><VocabularyAdvanced /></Layout>} />
          <Route path="/certificate" element={<Layout><CertificateEarned /></Layout>} />
          <Route path="/certificate/preview" element={<Layout><CertificatePreview /></Layout>} />
          <Route path="/leaderboard" element={<Layout><Leaderboard /></Layout>} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/reset-password-confirm" element={<PasswordResetConfirm />} />

          {/* ✅ Student */}
          <Route path="/student/dashboard" element={<ProtectedRoute role="student"><Layout><StudentDashboard /></Layout></ProtectedRoute>} />
          <Route path="/student/homework" element={<ProtectedRoute role="student"><Layout><StudentHomework /></Layout></ProtectedRoute>} />
          <Route path="/student/review" element={<ProtectedRoute role="student"><Layout><QuizReviewPage /></Layout></ProtectedRoute>} />

          {/* ✅ Final Exam */}
          <Route path="/final-exam" element={<ProtectedRoute><Layout><FinalExam /></Layout></ProtectedRoute>} />

          {/* ✅ Teacher */}
          <Route path="/teacher/dashboard" element={<ProtectedRoute role="teacher"><Layout><TeacherDashboard /></Layout></ProtectedRoute>} />
          <Route path="/teacher/assign" element={<ProtectedRoute role="teacher"><Layout><TeacherAssignQuiz /></Layout></ProtectedRoute>} />
          <Route path="/teacher/mistakes" element={<ProtectedRoute role="teacher"><Layout><TeacherMistakeDashboard /></Layout></ProtectedRoute>} />

          {/* ✅ Admin */}
          <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><Layout><AdminDashboard /></Layout></ProtectedRoute>} />
          <Route path="/admin/quizzes" element={<ProtectedRoute role="admin"><Layout><AdminQuizManager /></Layout></ProtectedRoute>} />
          <Route path="/admin/mistakes" element={<ProtectedRoute role="admin"><Layout><AdminMistakeAnalytics /></Layout></ProtectedRoute>} />
          <Route path="/admin/top-certificates" element={<ProtectedRoute role="admin"><Layout><AdminTopCertificates /></Layout></ProtectedRoute>} />
          <Route path="/admin/tools" element={<ProtectedRoute role="admin"><Layout><AdminToolManager /></Layout></ProtectedRoute>} />
          <Route path="/admin/mistake-review" element={<ProtectedRoute role="admin"><Layout><AdminMistakeReview /></Layout></ProtectedRoute>} />
          <Route path="/admin/tools/data-entry" element={<ProtectedRoute role="admin"><Layout><DataEntry /></Layout></ProtectedRoute>} />

          {/* ✅ Quiz Variants */}
          <Route path="/quiz/match" element={<Layout><MatchQuiz /></Layout>} />
          <Route path="/quiz/mcq" element={<Layout><MCQQuiz /></Layout>} />
          <Route path="/quiz/dictation" element={<Layout><DictationQuiz /></Layout>} />
          <Route path="/quiz/grammar" element={<Layout><GrammarQuiz /></Layout>} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
