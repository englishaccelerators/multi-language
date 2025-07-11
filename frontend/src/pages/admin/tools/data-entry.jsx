// File: frontend/src/pages/admin/tools/DataEntry.jsx

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function DataEntry() {
  const [language, setLanguage] = useState('English');
  const [identifierPrefix, setIdentifierPrefix] = useState('');
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [examples, setExamples] = useState(['']);
  const [output, setOutput] = useState([]);

  const handleGenerate = () => {
    if (!word || !identifierPrefix) return;

    const block = [];
    block.push({ code: `${identifierPrefix}-v-1`, value: word });
    block.push({ code: `${identifierPrefix}-v-1-D`, value: definition });
    examples.forEach((ex, i) => {
      if (ex.trim()) {
        block.push({ code: `${identifierPrefix}-v-1-D-E-${i + 1}`, value: ex });

        // Reverse grammar tags
        if (ex.includes('she') && ex.includes('walks')) {
          block.push({ code: `${identifierPrefix}-v-1-G-1`, value: '3rd Person Singular' });
          block.push({ code: `${identifierPrefix}-v-1-T`, value: 'Present Simple' });
        } else if (ex.includes('will')) {
          block.push({ code: `${identifierPrefix}-v-1-T`, value: 'Future Tense' });
        } else if (ex.includes('is') || ex.includes('are')) {
          block.push({ code: `${identifierPrefix}-v-1-T`, value: 'Present Continuous' });
        }
      }
    });
    setOutput(block);
  };

  const handleExampleChange = (index, value) => {
    const updated = [...examples];
    updated[index] = value;
    setExamples(updated);
  };

  const addExampleField = () => {
    setExamples([...examples, '']);
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">📘 Data Entry Tool</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input placeholder="Language (e.g., English)" value={language} onChange={e => setLanguage(e.target.value)} />
        <Input placeholder="Identifier Prefix (e.g., aardvark)" value={identifierPrefix} onChange={e => setIdentifierPrefix(e.target.value)} />
        <Input placeholder="Word" value={word} onChange={e => setWord(e.target.value)} />
        <Input placeholder="Definition" value={definition} onChange={e => setDefinition(e.target.value)} />
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Examples</h4>
        {examples.map((ex, i) => (
          <Input
            key={i}
            placeholder={`Example ${i + 1}`}
            value={ex}
            onChange={e => handleExampleChange(i, e.target.value)}
          />
        ))}
        <Button onClick={addExampleField}>➕ Add More</Button>
      </div>

      <Button className="mt-4" onClick={handleGenerate}>🚀 Generate Identifiercodes</Button>

      {output.length > 0 && (
        <Card className="mt-6">
          <CardContent className="space-y-2">
            <h3 className="text-lg font-bold">🧠 Output Identifier Block</h3>
            {output.map((item, index) => (
              <div key={index} className="text-sm font-mono">
                {item.code} → {item.value}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
