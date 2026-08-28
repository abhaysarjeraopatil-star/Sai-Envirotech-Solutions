"use client";

import React from "react";
import { INITIAL_PRODUCTS, INITIAL_ORDERS } from "@/lib/mockData";
import { formatINR, formatINRShort } from "@/lib/utils";
import {
  BarChart3,
  Download,
  Printer,
  ShieldCheck,
  TrendingUp,
  FileSpreadsheet,
} from "lucide-react";

export default function ReportsAnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
            <span>Executive Business Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Commercial & Statutory Reports
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Exportable trade metrics for sales conversion, tax liabilities, and inventory turnover.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-300 shadow-sm transition"
          >
            <Printer className="w-4 h-4" /> Print Report
          </button>
        </div>
      </div>

      {/* 2 Column Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* HSN Tariff Performance */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-base">Trade Volume by Tariff Heading</h3>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
              CBIC Compliant
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex justify-between font-bold">
                <span className="text-blue-700">HSN 87071000 (Passenger Vehicle Cabs/Bumpers)</span>
                <span className="text-slate-900">68% of Total Bookings</span>
              </div>
              <p className="text-slate-500 text-[11px]">
                Net Taxable Value: ₹1,18,000 | Tax Component (18%): ₹21,240
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex justify-between font-bold">
                <span className="text-amber-700">HSN 8707 (Tractor & JCB Earthmoving Cabs)</span>
                <span className="text-slate-900">32% of Total Bookings</span>
              </div>
              <p className="text-slate-500 text-[11px]">
                Net Taxable Value: ₹74,300 | Tax Component (18%): ₹13,374
              </p>
            </div>
          </div>
        </div>

        {/* Lead Channel Performance */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-base">Lead Ingestion Channel Performance</h3>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              CRM Analytics
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-center">
              <div>
                <div className="font-bold text-slate-900">Website RFQ Cart</div>
                <div className="text-[11px] text-slate-500">18 Inquiries • Avg Quote: ₹54,000</div>
              </div>
              <div className="text-right font-mono font-bold text-emerald-700">
                42% Conversion
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-center">
              <div>
                <div className="font-bold text-slate-900">IndiaMART Verified BuyLeads</div>
                <div className="text-[11px] text-slate-500">14 Inquiries • Avg Quote: ₹62,500</div>
              </div>
              <div className="text-right font-mono font-bold text-emerald-700">
                38% Conversion
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-center">
              <div>
                <div className="font-bold text-slate-900">Direct Phone / WhatsApp</div>
                <div className="text-[11px] text-slate-500">8 Inquiries • Avg Quote: ₹48,000</div>
              </div>
              <div className="text-right font-mono font-bold text-emerald-700">
                50% Conversion
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
