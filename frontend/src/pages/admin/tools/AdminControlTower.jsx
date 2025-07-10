// 📍 File: frontend/src/pages/admin/AdminControlTower.jsx

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export default function AdminControlTower() {
  const router = useRouter();

  const features = [
    { title: "🚀 CEO Dashboard", desc: "Track system scale, usage", route: "/admin/ceo" },
    { title: "📦 Website Builder", desc: "Manufacture full dictionary websites.", route: "/admin/tools/website-builder" },
    { title: "🧠 Identifiercode Designer", desc: "Block-level code design engine.", route: "/admin/tools/identifiercode" },
    { title: "✍️ Admin Entry Form", desc: "Fill structured data without seeing code.", route: "/admin/tools/data-entry" },
    { title: "🧠 Grammar Reverse Engine", desc: "Use examples to generate grammar logic.", route: "/admin/tools/grammar-reverse" },
    { title: "🧪 Quiz Generator", desc: "Build quizzes per group, auto-mapped.", route: "/admin/tools/quiz-generator" },
    { title: "🎧 Audio Mapper", desc: "Map suffixes to S3 buckets per region.", route: "/admin/tools/audio-mapper" },
    { title: "📤 Export Manager", desc: "Deploy ZIPs or push to Vercel.", route: "/admin/tools/export-manager" },
    { title: "📊 Mass Import Tool", desc: "Import Excel → DB instantly.", route: "/admin/mass-production" },
    { title: "👥 Role Management", desc: "Add/remove managers, QA, audio team.", route: "/admin/roles" },
    { title: "📢 Ad Manager", desc: "Run banners and sponsor tools.", route: "/admin/ads" },
    { title: "💸 Finance Panel", desc: "Pricing, invoices, licenses.", route: "/admin/finance" },
    { title: "📈 Performance Monitor", desc: "Live usage stats + error tracking.", route: "/admin/performance" },
    { title: "🤖 AI Tutor Engine", desc: "Recommender + learner mistake review.", route: "/admin/ai-tools" }
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">🧭 Admin Control Tower</h1>
      <p className="text-muted-foreground">You are the website manufacturer. Choose a system tool below to begin building, exporting, or scaling.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((tool, idx) => (
          <Card key={idx} onClick={() => router.push(tool.route)} className="cursor-pointer hover:shadow-md">
            <CardContent className="p-4 space-y-2">
              <h2 className="text-lg font-semibold">{tool.title}</h2>
              <p className="text-sm text-muted-foreground">{tool.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
