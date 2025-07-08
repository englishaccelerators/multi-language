
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export default function SaaSCEODashboard() {
  const router = useRouter();

  const controls = [
    { title: "🌍 Manage Languages", route: "/admin/languages", desc: "Launch and scale content across Arabic, English, French, etc." },
    { title: "🧱 Identifier Structure", route: "/admin/structure", desc: "Define blocks and rules for every language (math model)" },
    { title: "👥 Role & Team Management", route: "/admin/roles", desc: "Assign roles like Manager, Admin, Finance, QA" },
    { title: "🧠 AI + Mass Production", route: "/admin/autofill", desc: "Upload words and let AI build content at scale" },
    { title: "📦 Site Export + Hosting", route: "/admin/export", desc: "Launch ZIP or live sites to Vercel, GitHub, Railway" },
    { title: "💰 Monetization & Ads", route: "/admin/ads", desc: "Place ads or track bundles for revenue" },
    { title: "📊 Finance & Revenue Logs", route: "/admin/finance", desc: "View income, buyers, licenses, and expenses" },
    { title: "🧩 No-Code Assistant", route: "/admin/nocode", desc: "Run everything without coding — visual entry, exports, audio" },
    { title: "📘 SaaS Company Status", route: "/admin/insights", desc: "Track KPIs like languages launched, admins onboarded, total sites" }
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">🚀 SaaS CEO Dashboard</h1>
      <p className="text-muted-foreground">Your company control center — run your multilingual education platform like Pearson, Oxford, or Cengage. All no-code.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {controls.map((c, idx) => (
          <Card key={idx} onClick={() => router.push(c.route)} className="cursor-pointer hover:shadow-md">
            <CardContent className="p-4 space-y-1">
              <h2 className="font-semibold">{c.title}</h2>
              <p className="text-sm text-muted-foreground">{c.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
