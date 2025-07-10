// File: frontend/src/pages/admin/tools/ExportManager.jsx

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const mockSections = [
  { name: "Grade 3 Vocabulary", code: "vocab-grade3", groups: 5 },
  { name: "Grammar Basic", code: "grammar-basic", groups: 3 },
  { name: "Dictation", code: "dictation-core", groups: 2 }
];

export default function ExportManager() {
  const [selected, setSelected] = useState([]);

  const handleToggle = (code) => {
    setSelected(prev =>
      prev.includes(code)
        ? prev.filter(item => item !== code)
        : [...prev, code]
    );
  };

  const handleExport = () => {
    alert("Exporting the following sections: " + selected.join(", "));
    // Logic to build and zip site by identifiercode
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">🚀 Export Manager</h1>
      <p className="text-muted-foreground">Select blocks, sections, or groups to export. Admins can download or deploy directly.</p>

      <Card>
        <CardContent className="space-y-4 mt-4">
          {mockSections.map(section => (
            <div key={section.code} className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">{section.name}</h3>
                <p className="text-muted-foreground text-sm">{section.groups} groups</p>
              </div>
              <Button
                variant={selected.includes(section.code) ? "destructive" : "outline"}
                onClick={() => handleToggle(section.code)}>
                {selected.includes(section.code) ? "Remove" : "Add"}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Button disabled={selected.length === 0} onClick={handleExport}>
        📦 Export Selected
      </Button>
    </div>
  );
}
