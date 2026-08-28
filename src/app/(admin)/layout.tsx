"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/store";
import {
  LayoutDashboard,
  Kanban,
  FileCheck,
  Package,
  Layers,
  Percent,
  TrendingUp,
  Boxes,
  Home,
  ShieldCheck,
  Menu,
  X,
  User,
  LogOut,
  ChevronRight,
  Truck,
  Building,
  Lock,
} from "lucide-react";
import SaiLogo from "@/components/SaiLogo";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { currentUser, logout } = useApp();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // If user is not authenticated, show sign-in prompt
  if (!currentUser) {
    return (
      <div className="min-h-[85vh] bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-md w-full text-center space-y-5 animate-fadeIn">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-black text-slate-900">Authentication Required</h2>
            <p className="text-xs text-slate-500">
              Please sign in with your corporate credentials to access the internal operations workspace.
            </p>
          </div>
          <Link
            href="/login"
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition"
          >
            <span>Sign In to Sai AutoHub</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // Role-Specific Navigation Filter
  const allNavigation = [
    {
      name: "Executive Overview",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      roles: ["ADMIN"],
    },
    {
      name: "Sales Command Center",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      roles: ["SALES"],
    },
    {
      name: "Warehouse Dispatch Center",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      roles: ["INVENTORY"],
    },
    {
      name: "Sales CRM Pipeline",
      href: "/admin/enquiries",
      icon: Kanban,
      badge: "3 New",
      roles: ["ADMIN", "SALES"],
    },
    {
      name: "Quotation Manager",
      href: "/admin/quotations",
      icon: FileCheck,
      badge: "1 Active",
      roles: ["ADMIN", "SALES"],
    },
    {
      name: "Order Fulfillment & Dispatch",
      href: "/admin/orders",
      icon: Package,
      badge: "2 Active",
      roles: ["ADMIN", "INVENTORY"],
    },
    {
      name: "Dual-Ledger Inventory",
      href: "/admin/inventory",
      icon: Boxes,
      roles: ["ADMIN", "INVENTORY"],
    },
    {
      name: "Product Master & HSN",
      href: "/admin/products",
      icon: Layers,
      roles: ["ADMIN", "SALES", "INVENTORY"],
    },
    {
      name: "Statutory Tax Rules",
      href: "/admin/tax-rules",
      icon: Percent,
      roles: ["ADMIN"],
    },
    {
      name: "Commercial Reports",
      href: "/admin/reports",
      icon: TrendingUp,
      roles: ["ADMIN", "SALES"],
    },
  ];

  const visibleNav = allNavigation.filter((item) =>
    item.roles.includes(currentUser.role)
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row">
      {/* Mobile Admin Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 shadow-sm">
        <Link href="/admin/dashboard" className="flex items-center gap-2.5">
          <SaiLogo className="w-8 h-8 rounded-lg shadow-sm" />
          <div>
            <div className="text-sm font-bold text-slate-900">Sai AutoHub</div>
            <div className="text-[10px] text-slate-500 font-mono font-bold uppercase">
              {currentUser.role} ERP
            </div>
          </div>
        </Link>

        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="p-2 rounded-lg bg-slate-100 text-slate-700"
        >
          {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 md:static ${
          mobileNavOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        <div className="p-5 space-y-6">
          {/* Brand & Factory Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <Link href="/" className="flex items-center gap-3">
              <SaiLogo className="w-9 h-9 rounded-xl shadow-sm" />
              <div>
                <div className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                  <span>Sai AutoHub</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold ${
                      currentUser.role === "ADMIN"
                        ? "bg-purple-100 text-purple-700"
                        : currentUser.role === "SALES"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {currentUser.role}
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 font-medium truncate max-w-[130px]">
                  Sai Envirotech • Sangli
                </div>
              </div>
            </Link>
          </div>

          {/* Role Status Tag */}
          <div className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div className="text-[10px] uppercase font-bold text-slate-400">Current Station</div>
            <div className="font-bold text-slate-900 truncate">{currentUser.roleTitle}</div>
          </div>

          {/* Role-Tailored Nav Items */}
          <nav className="space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {currentUser.role === "ADMIN"
                ? "Executive Operations"
                : currentUser.role === "SALES"
                ? "Sales & CRM Workspace"
                : "Warehouse & Racks Workspace"}
            </div>
            {visibleNav.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar User Footer & Fast Links */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/70 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-black text-xs flex items-center justify-center shadow-sm flex-shrink-0">
              {currentUser.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">
                {currentUser.name}
              </div>
              <div className="text-[10px] text-blue-600 font-mono font-bold truncate">
                {currentUser.email}
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
            <Link
              href="/"
              className="text-slate-500 hover:text-slate-900 flex items-center gap-1 font-semibold"
            >
              <Home className="w-3.5 h-3.5" /> Storefront
            </Link>
            <button
              onClick={logout}
              className="text-rose-600 hover:underline font-bold"
            >
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 min-w-0 overflow-y-auto p-4 sm:p-8 lg:p-10">
        <div className="max-w-7xl mx-auto space-y-8">{children}</div>
      </main>
    </div>
  );
}
