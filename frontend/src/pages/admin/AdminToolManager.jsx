// ✅ AdminToolManager.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SECTIONS = [
  "vocabulary", "grammar", "spelling", "pronunciation", "rhythm",
  "prefix", "suffix", "root"
];

export default function AdminToolManager() {
  const [allTools, setAllTools] = useState([]);
  const [section, setSection] = useState("vocabulary");
  const [assignedTools, setAssignedTools] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchTools();
  }, []);

  useEffect(() => {
    fetchSectionTools(section);
  }, [section]);

  const fetchTools = async () => {
    const res = await axios.get("/interactive/tools/");
    setAllTools(res.data);
  };

  const fetchSectionTools = async (sec) => {
    const res = await axios.get(`/interactive/tools/by-section/${sec}/`);
    setAssignedTools(res.data.map(r => r.tool.tool_code));
  };

  const toggleTool = async (tool_code) => {
    setSaving(true);
    const is_enabled = !assignedTools.includes(tool_code);
    await axios.post("/interactive/tools/assign/", {
      tool_code,
      section_code: section,
      is_enabled
    });
    fetchSectionTools(section);
    setSaving(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🛠 Interactive Tool Manager</h2>

      <label className="block mb-2">Select Section:</label>
      <select className="mb-4 border p-2" value={section} onChange={e => setSection(e.target.value)}>
        {SECTIONS.map(sec => (
          <option key={sec} value={sec}>{sec.toUpperCase()}</option>
        ))}
      </select>

      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Tool</th>
            <th className="p-2">Quiz Type</th>
            <th className="p-2">Enabled?</th>
          </tr>
        </thead>
        <tbody>
          {allTools.map(tool => (
            <tr key={tool.tool_code} className="border-t">
              <td className="p-2 font-medium">{tool.name}</td>
              <td className="p-2">{tool.quiz_types}</td>
              <td className="p-2">
                <input
                  type="checkbox"
                  checked={assignedTools.includes(tool.tool_code)}
                  onChange={() => toggleTool(tool.tool_code)}
                  disabled={saving}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
