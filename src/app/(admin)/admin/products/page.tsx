"use client";

import React, { useState } from "react";
import { INITIAL_PRODUCTS, ProductType } from "@/lib/mockData";
import { formatINR } from "@/lib/utils";
import {
  Layers,
  Plus,
  Search,
  ShieldCheck,
  Edit,
  Trash2,
  Building,
} from "lucide-react";

export default function ProductMasterCatalogPage() {
  const [products] = useState<ProductType[]>(INITIAL_PRODUCTS);
  const [search, setSearch] = useState("");

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.hsnCode.includes(search)
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
            <span>Catalog Engineering</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Product Master & HSN Registry
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified Sai Envirotech Solutions automotive, tractor, and JCB earthmoving parts catalog.
          </p>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search SKU, name, HSN..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <span className="text-xs text-slate-500">Total {filtered.length} SKUs</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                <th className="pb-3">SKU & Classification</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Vehicle Fitment</th>
                <th className="pb-3">HSN Code</th>
                <th className="pb-3 text-right">Base Wholesale Rate (₹)</th>
                <th className="pb-3 text-right">MOQ</th>
                <th className="pb-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5">
                    <div className="font-bold text-slate-900 flex items-center gap-2">
                      {prod.name}
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                        Factory Verified
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">{prod.sku}</div>
                  </td>
                  <td className="py-3.5 text-slate-600">{prod.categoryName}</td>
                  <td className="py-3.5">
                    <span className="text-slate-900 font-medium">
                      {prod.vehicleMake} {prod.vehicleModel}
                    </span>
                    <span className="text-[11px] text-slate-500 block">({prod.modelYearRange})</span>
                  </td>
                  <td className="py-3.5 font-mono text-blue-600 font-bold">{prod.hsnCode}</td>
                  <td className="py-3.5 text-right font-mono font-bold text-slate-900">
                    {formatINR(prod.basePrice)}
                  </td>
                  <td className="py-3.5 text-right font-mono font-bold text-slate-600">
                    {prod.moq} pcs
                  </td>
                  <td className="py-3.5 text-center">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      ACTIVE
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
