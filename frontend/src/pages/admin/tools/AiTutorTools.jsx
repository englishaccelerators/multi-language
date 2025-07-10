// 📍 File: frontend/src/pages/admin/AiTutorTools.jsx

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function AiTutorTools() {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleAIRecommend = () => {
    // Simulated AI response (replace with real backend call)
    const fakeOutput = [
      'Suggested Word: analyze — good for Grade 6',
      'Add quiz for: He analyzed the chart carefully.',
      'Suggest synonym: evaluate, inspect',
      'Flag: Common misuse between analyze vs. interpret'
    ];
    setSuggestions(fakeOutput);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">🤖 AI Tutor Assistant</h1>
      <p className="text-muted-foreground">Recommend entries, review student data, and detect common mistakes.</p>

      <Textarea
        placeholder="Paste student writing or dictionary entry here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button className="mt-2" onClick={handleAIRecommend}>💡 Get AI Suggestions</Button>

      {suggestions.length > 0 && (
        <Card className="mt-6">
          <CardContent className="space-y-2">
            <h3 className="text-lg font-semibold">📋 AI Suggestions</h3>
            {suggestions.map((s, i) => (
              <div key={i} className="text-sm font-mono">{s}</div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
