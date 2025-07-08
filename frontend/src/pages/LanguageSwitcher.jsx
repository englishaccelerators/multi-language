
import React from 'react';

const LanguageSwitcher = ({ currentLang, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="lang" className="text-sm font-semibold">🌐 Language:</label>
      <select
        id="lang"
        value={currentLang}
        onChange={(e) => onChange(e.target.value)}
        className="border px-2 py-1 rounded text-sm"
      >
        <option value="en">🇬🇧 English</option>
        <option value="ar">🇸🇦 Arabic</option>
        <option value="es">🇪🇸 Spanish</option>
        <option value="fr">🇫🇷 French</option>
        <option value="zh">🇨🇳 Chinese</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
