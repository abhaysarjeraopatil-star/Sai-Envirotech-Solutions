"use client";

import React, { useState } from "react";
import { Percent, ShieldCheck, AlertTriangle, Edit, Plus, Check } from "lucide-react";

export default function ConfigurableTaxRulesPage() {
  const [rules, setRules] = useState([
    {
      id: "tax-1",
      hsnCode: "87071000",
      description: "Bodies (including cabs) for passenger motor vehicles (headings 8703)",
      cgstRate: 9.0,
      sgstRate: 9.0,
      igstRate: 18.0,
      effectiveFrom: "01 Jul 2026",
      effectiveTo: "Open / Active",
      active: true,
    },
    {
      id: "tax-2",
      hsnCode: "8707",
      description: "Bodies (including cabs) for tractors & commercial earthmoving vehicles (8701 to 8705)",
      cgstRate: 9.0,
      sgstRate: 9.0,
      igstRate: 18.0,
      effectiveFrom: "01 Jul 2026",
      effectiveTo: "Open / Active",
      active: true,
    },
    {
      id: "tax-3",
      hsnCode: "8708",
      description: "Parts and accessories of motor vehicles of headings 8701 to 8705",
      cgstRate: 14.0,
      sgstRate: 14.0,
      igstRate: 28.0,
      effectiveFrom: "01 Apr 2026",
      effectiveTo: "Open / Active",
      active: true,
    },
  ]);

  const [savedAlert, setSavedAlert] = useState(false);

  const handleSaveRate = (id: string, newCgst: number, newSgst: number, newIgst: number) => {
    setRules(
      rules.map((r) =>
        r.id === id ? { ...r, cgstRate: newCgst, sgstRate: newSgst, igstRate: newIgst } : r
      )
    );
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
            <span>Statutory Compliance Matrix</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Configurable GST Tax Rules Engine
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Maintain dynamic CGST, SGST, and IGST schedules linked to customs tariff HSN codes.
          </p>
        </div>
      </div>

      {/* Mandatory Disclaimer Box */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3 shadow-sm">
        <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-600 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-amber-950">Statutory Tax Schedule Notice:</div>
          <p className="text-amber-900/90 leading-relaxed">
            Tax rates are dynamically configurable and must be verified against the applicable CBIC GST classification/notification before issuing a legal commercial tax invoice. Sai AutoHub computes intra-state (Maharashtra $\to$ Maharashtra) vs. inter-state (IGST) tax rules dynamically from this table.
          </p>
        </div>
      </div>

      {savedAlert && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Tax schedule updated successfully! All future quotations will adopt new rates.</span>
        </div>
      )}

      {/* Tax Rates Table */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
            Active HSN Tax Schedules
          </h3>
          <span className="text-xs text-slate-500 font-mono">Home State: Maharashtra (27)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                <th className="pb-3">HSN Code</th>
                <th className="pb-3">Description & Scope</th>
                <th className="pb-3 text-center">CGST (Central %)</th>
                <th className="pb-3 text-center">SGST (State %)</th>
                <th className="pb-3 text-center">IGST (Inter-State %)</th>
                <th className="pb-3">Effective Range</th>
                <th className="pb-3 text-center">Status</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {rules.map((rule) => (
                <tr key={rule.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-4 font-mono font-bold text-blue-600 text-sm">
                    {rule.hsnCode}
                  </td>
                  <td className="py-4 max-w-sm text-slate-800">{rule.description}</td>
                  <td className="py-4 text-center font-mono font-bold text-slate-900">
                    {rule.cgstRate}%
                  </td>
                  <td className="py-4 text-center font-mono font-bold text-slate-900">
                    {rule.sgstRate}%
                  </td>
                  <td className="py-4 text-center font-mono font-bold text-purple-700">
                    {rule.igstRate}%
                  </td>
                  <td className="py-4 text-slate-500 text-[11px]">
                    {rule.effectiveFrom} ➔ {rule.effectiveTo}
                  </td>
                  <td className="py-4 text-center">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      ACTIVE
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <button
                      onClick={() => {
                        const newCgst = prompt("Enter new CGST rate (%):", rule.cgstRate.toString());
                        const newSgst = prompt("Enter new SGST rate (%):", rule.sgstRate.toString());
                        const newIgst = prompt("Enter new IGST rate (%):", rule.igstRate.toString());
                        if (newCgst && newSgst && newIgst) {
                          handleSaveRate(
                            rule.id,
                            parseFloat(newCgst) || rule.cgstRate,
                            parseFloat(newSgst) || rule.sgstRate,
                            parseFloat(newIgst) || rule.igstRate
                          );
                        }
                      }}
                      className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                    >
                      Edit Rate
                    </button>
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
