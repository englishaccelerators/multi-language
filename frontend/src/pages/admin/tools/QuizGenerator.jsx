// 📍 File: frontend/src/pages/admin/tools/QuizGenerator.jsx

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

export default function QuizGenerator() {
  const [sectionPrefix, setSectionPrefix] = useState('');
  const [quizTypes, setQuizTypes] = useState({
    match: true,
    mcq: false,
    dictation: false,
    grammar: false
  });
  const [generatedQuizzes, setGeneratedQuizzes] = useState([]);

  const handleGenerate = () => {
    const result = [];
    const types = Object.entries(quizTypes).filter(([_, v]) => v).map(([k]) => k);

    types.forEach((type, i) => {
      result.push({
        code: `${sectionPrefix}-quiz-${type.toUpperCase()}`,
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} quiz for ${sectionPrefix}`
      });
    });

    setGeneratedQuizzes(result);
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">🧪 Quiz Generator</h2>
      <p className="text-muted-foreground">Select a section prefix and quiz types to auto-generate identifiers for quizzes.</p>

      <Input
        placeholder="Section Identifier Prefix (e.g. g3v-a)"
        value={sectionPrefix}
        onChange={(e) => setSectionPrefix(e.target.value)}
      />

      <div className="space-y-2 mt-4">
        {Object.entries(quizTypes).map(([type, checked]) => (
          <label key={type} className="flex items-center space-x-2">
            <Checkbox
              checked={checked}
              onCheckedChange={() =>
                setQuizTypes((prev) => ({ ...prev, [type]: !prev[type] }))
              }
            />
            <span className="capitalize">{type}</span>
          </label>
        ))}
      </div>

      <Button className="mt-4" onClick={handleGenerate}>🚀 Generate Quiz Codes</Button>

      {generatedQuizzes.length > 0 && (
        <Card className="mt-6">
          <CardContent className="space-y-2">
            <h3 className="text-lg font-bold">📦 Generated Quizzes</h3>
            {generatedQuizzes.map((quiz, idx) => (
              <div key={idx} className="text-sm font-mono">
                {quiz.code} → {quiz.description}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
