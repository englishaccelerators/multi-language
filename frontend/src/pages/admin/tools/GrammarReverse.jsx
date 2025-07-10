// 📍 File: frontend/src/pages/admin/tools/GrammarReverse.jsx

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function GrammarReverse() {
  const [example, setExample] = useState('');
  const [identifierPrefix, setIdentifierPrefix] = useState('');
  const [reverseLogic, setReverseLogic] = useState([]);

  const generateGrammarTags = () => {
    if (!example || !identifierPrefix) return;

    const logic = [];

    // Example rules (can expand or AI-powered)
    if (example.includes('she') && example.includes('walks')) {
      logic.push({ code: `${identifierPrefix}-v-1-G-1`, rule: '3rd Person Singular' });
      logic.push({ code: `${identifierPrefix}-v-1-T`, rule: 'Present Simple' });
    } else if (example.includes('will')) {
      logic.push({ code: `${identifierPrefix}-v-1-T`, rule: 'Future Tense' });
    } else if (example.includes('is') || example.includes('are')) {
      logic.push({ code: `${identifierPrefix}-v-1-T`, rule: 'Present Continuous' });
    }

    logic.push({ code: `${identifierPrefix}-v-1-D-E-1`, value: example });
    setReverseLogic(logic);
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">🧠 Reverse Grammar Generator</h2>
      <p className="text-muted-foreground">Enter an example sentence and auto-generate grammar tags and identifiercodes.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="Identifier Prefix (e.g., walk)"
          value={identifierPrefix}
          onChange={(e) => setIdentifierPrefix(e.target.value)}
        />
        <Textarea
          placeholder="Example Sentence"
          value={example}
          onChange={(e) => setExample(e.target.value)}
        />
      </div>

      <Button className="mt-4" onClick={generateGrammarTags}>🧠 Run Reverse Grammar</Button>

      {reverseLogic.length > 0 && (
        <Card className="mt-6">
          <CardContent className="space-y-2">
            <h3 className="text-lg font-bold">📘 Generated Grammar Codes</h3>
            {reverseLogic.map((item, i) => (
              <div key={i} className="text-sm font-mono">
                {item.code} → {item.rule || item.value}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
