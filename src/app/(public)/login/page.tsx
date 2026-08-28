"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp, USERS } from "@/lib/store";
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  Building,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { loginAs } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Authentication Credentials Map
  const CREDENTIALS_STORE: Record<string, { pass: string; role: string; redirect: string }> = {
    "admin@saiautohub.com": { pass: "Admin@2026", role: "ADMIN", redirect: "/admin/dashboard" },
    "sales@saiautohub.com": { pass: "Sales@2026", role: "SALES", redirect: "/admin/dashboard" },
    "inventory@saiautohub.com": { pass: "Warehouse@2026", role: "INVENTORY", redirect: "/admin/dashboard" },
    "client@abcautoparts.com": { pass: "Client@2026", role: "CUSTOMER", redirect: "/portal/dashboard" },
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formattedEmail = email.trim().toLowerCase();
    const account = CREDENTIALS_STORE[formattedEmail];

    if (!account || account.pass !== password) {
      setTimeout(() => {
        setIsLoading(false);
        setError("Invalid email address or password. Please verify your corporate credentials.");
      }, 400);
      return;
    }

    // Authenticate user
    const success = loginAs(formattedEmail);
    if (success) {
      setTimeout(() => {
        router.push(account.redirect);
      }, 300);
    } else {
      setIsLoading(false);
      setError("Authentication failed. Account not found in active directory.");
    }
  };

  return (
    <div className="min-h-[82vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full">
        {/* Main Clean Corporate Login Box */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-black text-xl mx-auto shadow-md shadow-blue-500/20">
              SA
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Sign In to Sai AutoHub
            </h1>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Sai Envirotech Solutions • Enterprise B2B Platform & ERP Backoffice
            </p>
          </div>

          {/* Error Notice */}
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                Corporate Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="name@saiautohub.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium transition"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-extrabold text-xs shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer Note */}
          <div className="pt-4 border-t border-slate-100 text-center text-[11px] text-slate-400">
            Protected by Enterprise Role-Based Access Control (RBAC).
          </div>
        </div>
      </div>
    </div>
  );
}
