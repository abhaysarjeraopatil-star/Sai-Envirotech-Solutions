"use client";

import React, { useState } from "react";
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from "@/lib/mockData";
import ProductCard from "@/components/ProductCard";
import { Search, Filter, Layers, Truck, ShieldCheck, RefreshCw } from "lucide-react";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedVehicle, setSelectedVehicle] = useState<string>("ALL");
  const [selectedHSN, setSelectedHSN] = useState<string>("ALL");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [search, setSearch] = useState("");

  const vehicles = ["ALL", "Mahindra", "Sonalika", "Tata", "Swaraj / John Deere", "Eicher"];
  const hsnCodes = ["ALL", "87071000", "8707"];

  const filtered = INITIAL_PRODUCTS.filter((p) => {
    const matchesCat =
      selectedCategory === "ALL" || p.categoryName === selectedCategory || p.categoryId === selectedCategory;
    const matchesVeh =
      selectedVehicle === "ALL" || p.vehicleMake.toLowerCase().includes(selectedVehicle.toLowerCase());
    const matchesHSN = selectedHSN === "ALL" || p.hsnCode === selectedHSN;
    const matchesStock = !inStockOnly || p.availableStock > 0;
    const matchesSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());

    return matchesCat && matchesVeh && matchesHSN && matchesStock && matchesSearch;
  });

  const resetFilters = () => {
    setSelectedCategory("ALL");
    setSelectedVehicle("ALL");
    setSelectedHSN("ALL");
    setInStockOnly(false);
    setSearch("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-blue-600/40 text-blue-300 border border-blue-500/40">
              Sai Envirotech B2B Catalog
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Automotive Body Parts & Assemblies
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Precision commercial vehicle bumpers, tractor cowls, and cab accessories manufactured at Uran Islampur works.
          </p>
        </div>
      </div>

      {/* Main Catalog Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar Filters */}
        <div className="space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
              <Filter className="w-4 h-4 text-blue-600" /> Filter Catalog
            </div>
            <button
              onClick={resetFilters}
              className="text-[11px] text-blue-600 hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Search Box */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Search Keywords</label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="SKU, Part Name, Spec..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Category</label>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory("ALL")}
                className={`w-full text-left text-xs px-3 py-2 rounded-lg font-medium transition ${
                  selectedCategory === "ALL"
                    ? "bg-blue-50 text-blue-700 font-bold"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                All Categories ({INITIAL_PRODUCTS.length})
              </button>
              {INITIAL_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`w-full text-left text-xs px-3 py-2 rounded-lg font-medium transition ${
                    selectedCategory === cat.name
                      ? "bg-blue-50 text-blue-700 font-bold"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle Make Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Vehicle Platform</label>
            <div className="flex flex-wrap gap-1.5">
              {vehicles.map((v) => (
                <button
                  key={v}
                  onClick={() => setSelectedVehicle(v)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg border transition ${
                    selectedVehicle === v
                      ? "bg-slate-900 text-white border-slate-900 font-bold"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* HSN Tariff Code Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">HSN Classification</label>
            <div className="space-y-1">
              {hsnCodes.map((hsn) => (
                <button
                  key={hsn}
                  onClick={() => setSelectedHSN(hsn)}
                  className={`w-full text-left text-xs px-3 py-1.5 rounded-lg border transition ${
                    selectedHSN === hsn
                      ? "bg-blue-600 text-white border-blue-600 font-bold"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {hsn === "ALL" ? "All HSN Codes" : `HSN ${hsn}`}
                </button>
              ))}
            </div>
          </div>

          {/* In Stock Toggle */}
          <div className="pt-2 border-t border-slate-200">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span>In-Stock Ready for Dispatch Only</span>
            </label>
          </div>
        </div>

        {/* Right Product Grid */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <span>
              Showing <strong className="text-slate-900">{filtered.length}</strong> matching part(s)
            </span>
            <span className="text-[11px] text-slate-400">
              Verified Sai Envirotech Factory Production SKUs
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800">No matching parts found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try adjusting your search criteria or clearing specific vehicle/HSN filters.
              </p>
              <button
                onClick={resetFilters}
                className="mt-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
