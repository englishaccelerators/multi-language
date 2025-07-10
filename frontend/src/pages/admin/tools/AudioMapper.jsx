// 📍 File: frontend/src/pages/admin/tools/AudioMapper.jsx

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function AudioMapper() {
  const [identifierSuffix, setIdentifierSuffix] = useState('');
  const [folderPath, setFolderPath] = useState('');
  const [region, setRegion] = useState('');
  const [mappings, setMappings] = useState([]);

  const handleMap = () => {
    if (!identifierSuffix || !folderPath || !region) return;
    const newMap = { suffix: identifierSuffix, folder: folderPath, region };
    setMappings([...mappings, newMap]);
    setIdentifierSuffix('');
    setFolderPath('');
    setRegion('');
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">🎧 Audio Bucket Mapper</h2>
      <p className="text-muted-foreground">Define how suffixes like -UK or -US map to S3 folders per language and region.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input placeholder="Suffix (e.g., -UK)" value={identifierSuffix} onChange={(e) => setIdentifierSuffix(e.target.value)} />
        <Input placeholder="Region (e.g., UK, US, CAN)" value={region} onChange={(e) => setRegion(e.target.value)} />
        <Input placeholder="Folder Path (e.g., words/uk/)" value={folderPath} onChange={(e) => setFolderPath(e.target.value)} />
      </div>

      <Button className="mt-4" onClick={handleMap}>📁 Save Mapping</Button>

      {mappings.length > 0 && (
        <Card className="mt-6">
          <CardContent className="space-y-2">
            <h3 className="text-lg font-bold">🗺️ Current Mappings</h3>
            {mappings.map((map, idx) => (
              <div key={idx} className="text-sm font-mono">
                {map.suffix} → {map.region} → {map.folder}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
