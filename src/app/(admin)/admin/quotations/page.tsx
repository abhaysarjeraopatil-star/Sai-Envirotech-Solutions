"use client";

import React, { useState } from "react";
import Link from "next/link";
import { INITIAL_QUOTATIONS, QuotationType } from "@/lib/mockData";
import { formatINR } from "@/lib/utils";
import {
  FileCheck2,
  Plus,
  Search,
  Eye,
  Printer,
  ShieldCheck,
  Percent,
  CheckCircle2,
  Building,
} from "lucide-react";

export default function QuotationManagerPage() {
  const [quotations] = useState<QuotationType[]>(INITIAL_QUOTATIONS);
  const [search, setSearch] = useState("");
  const [previewQuote, setPreviewQuote] = useState<QuotationType | null>(null);

  const filtered = quotations.filter(
    (q) =>
      q.quoteNumber.toLowerCase().includes(search.toLowerCase()) ||
      q.companyName.toLowerCase().includes(search.toLowerCase()) ||
      q.customerName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
            <span>Commercial Formulation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Commercial Quotation Records
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Issued commercial documents with dynamic HSN tax rules (Intra-state CGST/SGST vs Inter-state IGST).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/quotations/new"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-md shadow-blue-600/20 transition active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Quotation</span>
          </Link>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-3 border-b border-slate-100">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search Quote # or Client..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <span className="text-xs text-slate-500">Showing {filtered.length} Quotation(s)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                <th className="pb-3">Quote Ref & Client</th>
                <th className="pb-3">Destination</th>
                <th className="pb-3 text-right">Taxable Value</th>
                <th className="pb-3 text-right">GST Collected</th>
                <th className="pb-3 text-right">Gross Order Total</th>
                <th className="pb-3 text-center">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filtered.map((quote) => (
                <tr key={quote.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-4">
                    <div className="font-bold text-slate-900">{quote.companyName}</div>
                    <div className="text-[11px] text-blue-600 font-mono font-bold">
                      {quote.quoteNumber}
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="text-slate-800">{quote.shippingState}</span>
                    <span className="text-[10px] text-slate-500 block">
                      {quote.isInterState ? "Inter-State (IGST 18%)" : "Intra-State (CGST 9% + SGST 9%)"}
                    </span>
                  </td>
                  <td className="py-4 text-right font-mono font-bold text-slate-900">
                    {formatINR(quote.netTaxableAmount)}
                  </td>
                  <td className="py-4 text-right font-mono font-bold text-purple-700">
                    {formatINR(quote.taxAmount)}
                  </td>
                  <td className="py-4 text-right font-mono font-bold text-emerald-700 text-sm">
                    {formatINR(quote.grossOrderValue)}
                  </td>
                  <td className="py-4 text-center">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      {quote.status}
                    </span>
                  </td>
                  <td className="py-4 text-right space-x-2">
                    <button
                      onClick={() => setPreviewQuote(quote)}
                      className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs inline-flex items-center gap-1 transition"
                    >
                      <Eye className="w-3.5 h-3.5" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Print / Inspect Modal */}
      {previewQuote && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 text-xs border border-slate-200 shadow-2xl animate-fadeIn">
            <div className="flex justify-between items-start pb-4 border-b border-slate-100">
              <div>
                <div className="text-[10px] font-bold uppercase text-blue-600 tracking-wider">
                  Sai Envirotech Solutions • Commercial Department
                </div>
                <h2 className="text-xl font-black text-slate-900">{previewQuote.quoteNumber}</h2>
                <div className="text-slate-500">Customer: {previewQuote.companyName}</div>
              </div>
              <button
                onClick={() => setPreviewQuote(null)}
                className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="font-bold text-slate-800 uppercase tracking-wider">Line Items:</div>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                {previewQuote.items.map((it, i) => (
                  <div key={i} className="p-3 flex justify-between">
                    <div>
                      <div className="font-bold text-slate-900">{it.productName}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        HSN {it.hsnCode} • {it.quantity} units @ {formatINR(it.unitPrice)}
                      </div>
                    </div>
                    <div className="text-right font-mono font-bold text-slate-900">
                      {formatINR(it.totalTaxable)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 font-mono">
              <div className="flex justify-between text-slate-600">
                <span>Net Taxable Base:</span>
                <span>{formatINR(previewQuote.netTaxableAmount)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Pallet Packaging & Forwarding:</span>
                <span>{formatINR(previewQuote.packagingCharges)}</span>
              </div>
              <div className="flex justify-between text-purple-700 font-bold">
                <span>Statutory GST (CGST + SGST):</span>
                <span>+{formatINR(previewQuote.taxAmount)}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-black text-slate-900">
                <span>Gross Commercial Total:</span>
                <span>{formatINR(previewQuote.grossOrderValue)}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-slate-700"
              >
                <Printer className="w-4 h-4" /> Print Commercial PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
