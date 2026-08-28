"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileCheck2,
  Package,
  User,
  ArrowLeft,
  ShieldCheck,
  Building,
  Home,
  LogOut,
  Lock,
  ChevronRight,
} from "lucide-react";
import { useApp } from "@/lib/store";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { currentUser, logout } = useApp();

  if (!currentUser) {
    return (
      <div className="min-h-[85vh] bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-md w-full text-center space-y-5 animate-fadeIn">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-black text-slate-900">Client Portal Access</h2>
            <p className="text-xs text-slate-500">
              Please sign in with your authorized client email to review quotations, confirm purchase orders, and track shipments.
            </p>
          </div>
          <Link
            href="/login"
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition"
          >
            <span>Sign In to Customer Account</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const links = [
    { name: "Overview", href: "/portal/dashboard", icon: LayoutDashboard },
    { name: "Commercial Quotations", href: "/portal/quotes", icon: FileCheck2 },
    { name: "Orders & Shipments", href: "/portal/orders", icon: Package },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Portal Navigation Header */}
      <header className="bg-white text-slate-900 border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white font-black text-base shadow-md shadow-emerald-500/20">
                  CP
                </div>
                <div>
                  <div className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                    Customer Portal
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                      B2B Client
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">Sai Envirotech Solutions</div>
                </div>
              </Link>
            </div>

            {/* Client Identity Display */}
            <div className="flex items-center gap-4 text-xs">
              <div className="hidden sm:flex items-center gap-2.5 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
                <Building className="w-4 h-4 text-blue-600" />
                <div>
                  <span className="font-bold text-slate-900">{currentUser.companyName}</span>
                  <span className="text-slate-500 text-[10px] block font-mono">Consignee: {currentUser.name}</span>
                </div>
              </div>

              <Link
                href="/"
                className="flex items-center gap-1 text-slate-600 hover:text-slate-900 text-xs font-semibold px-3 py-2 rounded-xl hover:bg-slate-100 transition"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Storefront</span>
              </Link>

              <button
                onClick={logout}
                className="text-xs text-rose-600 hover:underline font-bold"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Portal Secondary Tabs Bar */}
        <div className="border-t border-slate-100 bg-slate-50/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition ${
                    isActive
                      ? "border-emerald-600 text-emerald-700 bg-white"
                      : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-emerald-600" : "text-slate-400"}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Page Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
