"use client";

import React, { useState } from "react";
import Link from "next/link";
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from "@/lib/mockData";
import ProductCard from "@/components/ProductCard";
import {
  ShieldCheck,
  Truck,
  FileCheck2,
  Layers,
  Wrench,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Search,
  Building2,
  Zap,
} from "lucide-react";
import { useApp } from "@/lib/store";

export default function HomePage() {
  const { setIsRFQOpen } = useApp();
  const [selectedVehicle, setSelectedVehicle] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const vehicles = ["ALL", "Mahindra", "JCB", "Sonalika", "Tata", "Swaraj / John Deere"];

  const filteredProducts = INITIAL_PRODUCTS.filter((p) => {
    const matchesVehicle =
      selectedVehicle === "ALL" ||
      p.vehicleMake.toLowerCase().includes(selectedVehicle.toLowerCase());
    const matchesSearch =
      searchQuery === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.hsnCode.includes(searchQuery);
    return matchesVehicle && matchesSearch;
  });

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section with Industrial Factory Stamping Background */}
      <section className="relative bg-slate-950 text-white overflow-hidden py-16 sm:py-24 border-b border-slate-800">
        {/* High-Quality Automotive Factory Floor Background with Navy Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1600&auto=format&fit=crop&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-blue-950/60 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-600/30 text-blue-300 border border-blue-500/40 backdrop-blur-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  Sai Envirotech Solutions • Uran Islampur Works
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
                  HSN 8707 & 87071000 Compliant
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                B2B Automotive Parts & <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300 bg-clip-text text-transparent">
                  Precision Body Panels
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                Direct factory supply of heavy-duty car bumpers, commercial utility fenders, tractor body covers, and JCB backhoe cabin panels. Engineered for commercial fleets and state transport bodies.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/products"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-xl shadow-blue-600/25 transition active:scale-95"
                >
                  <Layers className="w-4 h-4" />
                  <span>Explore B2B Catalog</span>
                </Link>

                <button
                  onClick={() => setIsRFQOpen(true)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition active:scale-95"
                >
                  <FileCheck2 className="w-4 h-4 text-amber-400" />
                  <span>Request Custom Quotation</span>
                </button>

                <Link
                  href="/track-order"
                  className="flex items-center gap-1.5 px-4 py-3 text-xs font-semibold text-slate-400 hover:text-white transition"
                >
                  <span>Track Token</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Value Props Strip */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-xs text-slate-400">
                <div>
                  <div className="text-white font-bold text-sm">24-Hr Turnaround</div>
                  <div className="text-[11px] text-slate-400">Automated Quotation Engine</div>
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Dual-Ledger</div>
                  <div className="text-[11px] text-slate-400">Transactional Stock Control</div>
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Ex-Factory</div>
                  <div className="text-[11px] text-slate-400">Uran Islampur, Sangli Works</div>
                </div>
              </div>
            </div>

            {/* Right Card: Quick Fitment & Live RFQ Search */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-3xl bg-slate-900/95 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-400" />
                    <span className="font-extrabold text-sm text-white">Quick Fitment & Parts Finder</span>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-blue-950 text-blue-400 border border-blue-800">
                    Live RFQ
                  </span>
                </div>

                <p className="text-xs text-slate-400">
                  Filter precision body parts by vehicle make or enter target SKU / HSN code to build your order:
                </p>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="Search Bolero, JCB 3DX, HSN 87071000, SE-CB-001..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Vehicle Quick Filter Buttons */}
                <div>
                  <div className="text-[11px] font-semibold text-slate-400 mb-2">Filter by Vehicle Platform:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {vehicles.map((v) => (
                      <button
                        key={v}
                        onClick={() => setSelectedVehicle(v)}
                        className={`text-xs px-3 py-1.5 rounded-xl font-medium transition ${
                          selectedVehicle === v
                            ? "bg-blue-600 text-white shadow-md font-bold"
                            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Match Counter */}
                <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800">
                  <span>Found <strong>{filteredProducts.length}</strong> matching SKU(s)</span>
                  <Link href="/products" className="text-blue-400 hover:underline flex items-center gap-1">
                    <span>View All Catalog</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Verified Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
          <div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              Verified Production Categories
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Manufacturing & Export Range
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-md">
            All categories categorized under official customs tariff HSN 8707 & 87071000 for domestic supply and container exports.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?cat=${cat.slug}`}
              className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Technical Schematic Blueprint Header */}
              <div className="relative h-44 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-blue-950 flex flex-col items-center justify-center p-6 text-center select-none">
                {/* Engineering Grid Overlay */}
                <div 
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
                    backgroundSize: "20px 20px"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />

                {/* Central Schematic Icon */}
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-white/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  {cat.slug === "tractor-parts" ? (
                    <Truck className="w-8 h-8 text-amber-600" />
                  ) : cat.slug === "automobile-spare-parts" ? (
                    <Wrench className="w-8 h-8 text-indigo-600" />
                  ) : (
                    <Layers className="w-8 h-8 text-blue-600" />
                  )}
                </div>

                {/* HSN Tariff Tag & Category Title */}
                <div className="relative z-10 flex flex-col items-center gap-1 text-white">
                  <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-blue-600/90 text-blue-50 border border-blue-400/30 shadow-sm">
                    TARIFF HSN {cat.hsnDefault}
                  </span>
                  <h3 className="text-base font-bold tracking-tight text-white group-hover:text-blue-300 transition mt-0.5">
                    {cat.name}
                  </h3>
                </div>
              </div>

              {/* Description & Action */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-white">
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
                  <span>Browse Part Numbers</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
          <div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              Available Wholesale Inventory
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              High-Demand Automotive, Tractor & JCB SKUs
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500">
              Showing {filteredProducts.length} of {INITIAL_PRODUCTS.length} parts
            </span>
            <Link
              href="/products"
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-blue-600 transition"
            >
              View Full Catalog
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Operations Digitalization Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative space-y-8">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Operations Digitalization
              </span>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight mt-1">
                How Sai AutoHub Eliminates B2B Sales Friction
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mt-2">
                Upgrading from traditional manual phone calls, WhatsApp PDFs, and spreadsheet stock checks to an atomic, transactionally consistent order lifecycle.
              </p>
            </div>

            {/* Step Progression Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-xs">
                  01
                </div>
                <div className="font-bold text-sm text-white">Multi-Item RFQ</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Bulk buyers select exact vehicle part codes and quantities with instant inquiry routing to the Sales CRM.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-xs">
                  02
                </div>
                <div className="font-bold text-sm text-white">Dynamic Quotation</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Sales team formulates quote with dynamic HSN tax calculation (intra-state CGST/SGST vs inter-state IGST) & PDF generation.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-xs">
                  03
                </div>
                <div className="font-bold text-sm text-white">Atomic Reservation</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Upon 1-click customer acceptance, PostgreSQL transactions lock stock into <code>reservedStock</code> to prevent overselling.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center font-bold text-xs">
                  04
                </div>
                <div className="font-bold text-sm text-white">Dispatch & Tracking</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Warehouse packs and assigns transporter AWB. Client tracks real-time progress via secure non-guessable token.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero guesswork. 100% auditability across sales reps and warehouse bays.</span>
              </div>
              <Link
                href="/admin/dashboard"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg transition"
              >
                Experience Admin ERP Backoffice ➔
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
