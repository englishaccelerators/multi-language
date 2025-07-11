// File: frontend/src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';

import DataEntry from './pages/admin/tools/DataEntry'; // ✅

export default function App() {
  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/admin/tools/data-entry" element={<DataEntry />} />
      </Routes>
    </>
  );
}
