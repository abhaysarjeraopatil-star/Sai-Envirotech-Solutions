"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/lib/store";
import {
  FileText,
  Truck,
  Sparkles,
  Layers,
  ChevronDown,
  Info,
  Menu,
  X,
  Building,
  User,
  LogOut,
  Shield,
  LayoutDashboard,
  Lock,
} from "lucide-react";
import AIParserModal from "./AIParserModal";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { rfqItems, setIsRFQOpen, currentUser, logout } = useApp();
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [catalogDropdownOpen, setCatalogDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
        setCatalogDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Total quantity of parts in the RFQ Cart
  const totalCount = rfqItems.reduce((acc, i) => acc + i.quantity, 0);

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    router.push("/login");
  };

  const getWorkspaceLink = () => {
    if (!currentUser) return "/login";
    if (currentUser.role === "CUSTOMER") return "/portal/dashboard";
    return "/admin/dashboard";
  };

  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "SALES":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "INVENTORY":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full h-[72px] bg-white/95 backdrop-blur-md border-b border-slate-200/80 flex items-center shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-all">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Brand Identity & Desktop Navigation */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition-all">
                SA
              </div>
              <div>
                <div className="text-base font-black text-slate-900 tracking-tight flex items-center gap-1.5 leading-none">
                  <span>Sai AutoHub</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-700 font-mono font-extrabold border border-blue-200">
                    B2B
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium mt-1 leading-none">
                  Sai Envirotech Solutions • Uran Islampur
                </div>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-slate-600">
              {/* Products Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setCatalogDropdownOpen(!catalogDropdownOpen)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition ${
                    pathname.startsWith("/products")
                      ? "bg-blue-50 text-blue-700 font-bold"
                      : "hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Products & Catalog</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {catalogDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-64 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-50 animate-fadeIn text-xs space-y-1">
                    <Link
                      href="/products"
                      onClick={() => setCatalogDropdownOpen(false)}
                      className="block p-2.5 rounded-xl hover:bg-blue-50 text-slate-900 hover:text-blue-700 font-bold"
                    >
                      All Automotive SKUs (Full Catalog)
                    </Link>
                    <Link
                      href="/products?cat=automotive-accessories"
                      onClick={() => setCatalogDropdownOpen(false)}
                      className="block p-2.5 rounded-xl hover:bg-slate-50 text-slate-700"
                    >
                      <div className="font-bold">Automotive Bumpers & Guards</div>
                      <div className="text-[10px] text-slate-400 font-mono">HSN 87071000 • Bolero, Tata Ace</div>
                    </Link>
                    <Link
                      href="/products?cat=tractor-parts"
                      onClick={() => setCatalogDropdownOpen(false)}
                      className="block p-2.5 rounded-xl hover:bg-slate-50 text-slate-700"
                    >
                      <div className="font-bold">Tractor & JCB Earthmoving Covers</div>
                      <div className="text-[10px] text-slate-400 font-mono">HSN 8707 • JCB 3DX, Sonalika, Mahindra</div>
                    </Link>
                    <Link
                      href="/products?cat=automobile-spare-parts"
                      onClick={() => setCatalogDropdownOpen(false)}
                      className="block p-2.5 rounded-xl hover:bg-slate-50 text-slate-700"
                    >
                      <div className="font-bold">Automobile Spare Fender Panels</div>
                      <div className="text-[10px] text-slate-400 font-mono">HSN 87071000 • Sheet Metal Assemblies</div>
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/rfq"
                className={`px-3.5 py-2 rounded-xl transition ${
                  pathname === "/rfq"
                    ? "bg-blue-50 text-blue-700 font-bold"
                    : "hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                Batch RFQ
              </Link>

              <Link
                href="/track-order"
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition ${
                  pathname === "/track-order"
                    ? "bg-blue-50 text-blue-700 font-bold"
                    : "hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Truck className="w-3.5 h-3.5 text-slate-400" />
                <span>Track Consignment</span>
              </Link>

              <Link
                href="/about"
                className={`px-3.5 py-2 rounded-xl transition ${
                  pathname === "/about"
                    ? "bg-blue-50 text-blue-700 font-bold"
                    : "hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                Factory Works
              </Link>
            </nav>
          </div>

          {/* Right Actions: AI Parser, RFQ Cart Drawer Trigger & Sign In / Account Menu */}
          <div className="hidden sm:flex items-center gap-3">
            {/* AI RFQ Parser Button */}
            <button
              onClick={() => setIsAIModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold border border-purple-200/80 transition shadow-sm cursor-pointer"
              title="Extract parts from unstructured WhatsApp or Email messages"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>AI RFQ Parser</span>
            </button>

            {/* RFQ Cart Trigger */}
            <button
              onClick={() => setIsRFQOpen(true)}
              className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-md shadow-blue-600/20 transition active:scale-95 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>RFQ Cart</span>
              {totalCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-slate-950 shadow-sm animate-scaleIn">
                  {totalCount}
                </span>
              )}
            </button>

            {/* If NOT logged in: Show Clean Sign In Button */}
            {!currentUser ? (
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold shadow-sm transition"
              >
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                <span>Sign In</span>
              </Link>
            ) : (
              /* If Authenticated: Show Corporate Account Menu */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition cursor-pointer"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-lg object-cover border border-slate-300"
                  />
                  <div className="text-left hidden xl:block">
                    <div className="text-xs font-bold text-slate-900 leading-tight">
                      {currentUser.name}
                    </div>
                    <div className="text-[10px] font-mono text-blue-600 font-bold uppercase">
                      {currentUser.role}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Account Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-slate-200 shadow-2xl p-2 z-50 animate-fadeIn text-xs space-y-1">
                    {/* Account Header */}
                    <div className="p-3 border-b border-slate-100 bg-slate-50 rounded-xl mb-1">
                      <div className="font-bold text-slate-900">{currentUser.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{currentUser.email}</div>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-[10px] text-slate-600 font-medium truncate max-w-[140px]">
                          {currentUser.roleTitle}
                        </span>
                        <span
                          className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${getRoleBadgeStyle(
                            currentUser.role
                          )}`}
                        >
                          {currentUser.role}
                        </span>
                      </div>
                    </div>

                    {/* Direct Dashboard Link */}
                    <Link
                      href={getWorkspaceLink()}
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-blue-50 text-blue-700 font-bold transition"
                    >
                      {currentUser.role === "CUSTOMER" ? (
                        <>
                          <LayoutDashboard className="w-4 h-4" />
                          <span>Customer Portal</span>
                        </>
                      ) : (
                        <>
                          <Shield className="w-4 h-4" />
                          <span>Operations Dashboard</span>
                        </>
                      )}
                    </Link>

                    {/* Sign Out Button */}
                    <div className="pt-1 border-t border-slate-100">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-2 p-2 rounded-xl text-rose-600 hover:bg-rose-50 font-bold transition cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setIsRFQOpen(true)}
              className="relative p-2 rounded-xl bg-blue-600 text-white"
            >
              <FileText className="w-4 h-4" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full text-[9px] font-black bg-amber-400 text-slate-950">
                  {totalCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 text-slate-700"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-[72px] left-0 right-0 bg-white border-b border-slate-200 p-4 space-y-2 text-xs font-semibold shadow-2xl animate-fadeIn">
            <Link
              href="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2.5 rounded-xl text-slate-800 hover:bg-slate-100"
            >
              Products & Catalog
            </Link>
            <Link
              href="/rfq"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2.5 rounded-xl text-slate-800 hover:bg-slate-100"
            >
              Batch Request for Quote (RFQ)
            </Link>
            <Link
              href="/track-order"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2.5 rounded-xl text-slate-800 hover:bg-slate-100"
            >
              Track Consignment
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2.5 rounded-xl text-slate-800 hover:bg-slate-100"
            >
              Factory Works
            </Link>

            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAIModalOpen(true);
                }}
                className="w-full text-left p-2.5 rounded-xl bg-purple-50 text-purple-700 font-bold flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>AI RFQ Parser</span>
              </button>

              {!currentUser ? (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 text-white font-bold text-center flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Sign In to Account</span>
                </Link>
              ) : (
                <Link
                  href={getWorkspaceLink()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full p-2.5 rounded-xl bg-blue-600 text-white font-bold text-center flex items-center justify-center gap-2"
                >
                  <span>Enter Operations Workspace ({currentUser.name})</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* AI Extraction Modal */}
      <AIParserModal isOpen={isAIModalOpen} onClose={() => setIsAIModalOpen(false)} />
    </>
  );
}
