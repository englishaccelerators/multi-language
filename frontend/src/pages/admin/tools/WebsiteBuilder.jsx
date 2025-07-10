// 📍 File: frontend/src/pages/admin/tools/WebsiteBuilder.jsx

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function WebsiteBuilder() {
  const [sections, setSections] = useState([]);
  const [sectionName, setSectionName] = useState("");
  const [prefix, setPrefix] = useState("");

  const handleAddSection = () => {
    if (!sectionName || !prefix) return;
    const newSection = {
      name: sectionName,
      prefix,
      groups: []
    };
    setSections([...sections, newSection]);
    setSectionName("");
    setPrefix("");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📦 Website Section Builder</h1>
      <p className="text-muted-foreground">Create sections (like Grade 3 Words) and group them with identifiercodes for future quiz and export tools.</p>

      <Card>
        <CardContent className="p-4 space-y-2">
          <h2 className="font-semibold">➕ Add New Section</h2>
          <Input
            placeholder="Section name (e.g. Grade 3 Verbs)"
            value={sectionName}
            onChange={(e) => setSectionName(e.target.value)}
          />
          <Input
            placeholder="Identifier prefix (e.g. g3v)"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
          />
          <Button onClick={handleAddSection}>Add Section</Button>
        </CardContent>
      </Card>

      {sections.length > 0 && (
        <div className="space-y-4">
          {sections.map((sec, idx) => (
            <Card key={idx}>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">📘 {sec.name} ({sec.prefix})</h3>
                <p className="text-sm text-muted-foreground">No groups yet — next version will allow adding groups and entries.</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
