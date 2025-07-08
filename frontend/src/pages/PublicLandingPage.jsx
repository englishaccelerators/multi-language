
import React from 'react';

const PublicLandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 p-8">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">Brilliant English Dictionary</h1>
        <p className="text-xl mb-8">
          Learn faster, sound smarter, and speak fluently. Trusted by students, schools, and global learners.
        </p>
        <div className="mb-8 space-x-4">
          <a
            href="https://apps.apple.com"
            className="bg-black text-white px-6 py-3 rounded-md inline-block"
          >
            📱 Download on App Store
          </a>
          <a
            href="https://play.google.com"
            className="bg-green-600 text-white px-6 py-3 rounded-md inline-block"
          >
            📲 Get it on Google Play
          </a>
        </div>
        <img
          src="/assets/app-preview.png"
          alt="App Preview"
          className="mx-auto max-w-full h-auto mb-8 rounded shadow"
        />
        <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
        <ul className="text-left max-w-3xl mx-auto text-lg leading-relaxed">
          <li>✅ Accurate definitions with IPA and examples</li>
          <li>✅ AI-assisted quiz feedback and AskGPT tutor</li>
          <li>✅ Real-time pronunciation with UK/US audio</li>
          <li>✅ School plans, billing, analytics, and admin tools</li>
          <li>✅ Mobile app support, multi-language UI, and more</li>
        </ul>
      </div>
    </div>
  );
};

export default PublicLandingPage;
