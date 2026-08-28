"use client";

import React, { useState } from "react";
import Link from "next/link";
import { INITIAL_ENQUIRIES, EnquiryType } from "@/lib/mockData";
import { formatINR } from "@/lib/utils";
import {
  Kanban,
  Table as TableIcon,
  Search,
  Plus,
  ArrowRight,
  Sparkles,
  Phone,
  Mail,
  Building,
  CheckCircle2,
  Clock,
  Send,
} from "lucide-react";

export default function SalesEnquiriesCRMPage() {
  const [enquiries, setEnquiries] = useState<EnquiryType[]>(INITIAL_ENQUIRIES);
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
  const [search, setSearch] = useState("");

  const stages = [
    { key: "NEW", label: "01. New Lead Ingested", color: "border-blue-300 bg-blue-50/40 text-blue-900" },
    { key: "CONTACTED", label: "02. Contacted & Engaged", color: "border-indigo-300 bg-indigo-50/40 text-indigo-900" },
    { key: "SPECS_VERIFIED", label: "03. Specs & Fitment Verified", color: "border-amber-300 bg-amber-50/40 text-amber-900" },
    { key: "QUOTATION_SENT", label: "04. Formal Quotation Sent", color: "border-purple-300 bg-purple-50/40 text-purple-900" },
    { key: "WON", label: "05. Deal Won / PO Issued", color: "border-emerald-300 bg-emerald-50/40 text-emerald-900" },
  ];

  const handleAdvanceStage = (id: string, currentStatus: string) => {
    const stageOrder = ["NEW", "CONTACTED", "SPECS_VERIFIED", "QUOTATION_SENT", "WON"];
    const currentIdx = stageOrder.indexOf(currentStatus);
    if (currentIdx < stageOrder.length - 1) {
      const nextStatus = stageOrder[currentIdx + 1] as any;
      setEnquiries(
        enquiries.map((e) => (e.id === id ? { ...e, status: nextStatus } : e))
      );
    }
  };

  const filteredEnquiries = enquiries.filter(
    (e) =>
      e.companyName.toLowerCase().includes(search.toLowerCase()) ||
      e.contactName.toLowerCase().includes(search.toLowerCase()) ||
      e.enquiryNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
            <span>Sales & Commercial CRM</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Inquiry Pipeline & Lead Qualification
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track inquiries from Website RFQ Cart, IndiaMART BuyLeads, and Direct Channels through to Won Deals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 rounded-xl bg-slate-200 border border-slate-300">
            <button
              onClick={() => setViewMode("kanban")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                viewMode === "kanban" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Kanban className="w-3.5 h-3.5" /> Kanban
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                viewMode === "table" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" /> Table
            </button>
          </div>

          <Link
            href="/admin/quotations/new"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-md shadow-blue-600/20 transition active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Create Quotation</span>
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Search by company, contact person, or #ENQ reference..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
        />
      </div>

      {/* Kanban Board Mode */}
      {viewMode === "kanban" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {stages.map((stage) => {
            const stageLeads = filteredEnquiries.filter((e) => e.status === stage.key);
            return (
              <div
                key={stage.key}
                className="rounded-2xl bg-slate-100/80 border border-slate-200 p-3.5 flex flex-col justify-between min-h-[500px] space-y-3"
              >
                <div>
                  {/* Column Header */}
                  <div className={`p-2.5 rounded-xl border font-bold text-xs flex justify-between items-center mb-3 ${stage.color}`}>
                    <span className="truncate">{stage.label}</span>
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-white shadow-sm font-bold">
                      {stageLeads.length}
                    </span>
                  </div>

                  {/* Lead Cards */}
                  <div className="space-y-3">
                    {stageLeads.map((lead) => (
                      <div
                        key={lead.id}
                        className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all space-y-3"
                      >
                        <div>
                          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1">
                            <span className="font-bold text-blue-600">{lead.enquiryNumber}</span>
                            <span className="px-1.5 py-0.2 rounded bg-slate-100 font-medium">
                              {lead.source}
                            </span>
                          </div>
                          <h4 className="font-bold text-slate-900 text-xs">{lead.companyName}</h4>
                          <div className="text-[11px] text-slate-500">{lead.contactName} ({lead.city}, {lead.state})</div>
                        </div>

                        {/* Items summary */}
                        <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-[11px] space-y-0.5">
                          <div className="font-bold text-slate-700">Requested Parts:</div>
                          {lead.items.map((item, idx) => (
                            <div key={idx} className="text-slate-600 truncate">
                              • {item.quantityRequested}x {item.productName} ({item.targetVehicle})
                            </div>
                          ))}
                        </div>

                        <div className="text-[10px] text-slate-500 italic line-clamp-2">
                          "{lead.additionalReqs}"
                        </div>

                        {/* Card Footer Actions */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[10px] font-bold text-slate-400">
                            Assigned: Rahul D.
                          </span>

                          {lead.status !== "WON" && (
                            <button
                              onClick={() => handleAdvanceStage(lead.id, lead.status)}
                              className="px-2 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center gap-1 transition"
                            >
                              <span>Advance</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center pt-2">
                  <span className="text-[10px] text-slate-400 font-mono">Stage: {stage.key}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table Mode */
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                  <th className="pb-3">Ref & Company</th>
                  <th className="pb-3">Contact Details</th>
                  <th className="pb-3">Source</th>
                  <th className="pb-3">Requirements</th>
                  <th className="pb-3 text-center">Stage</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredEnquiries.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5">
                      <div className="font-bold text-slate-900">{lead.companyName}</div>
                      <div className="text-[11px] text-blue-600 font-mono font-bold">{lead.enquiryNumber}</div>
                    </td>
                    <td className="py-3.5">
                      <div className="text-slate-800">{lead.contactName}</div>
                      <div className="text-[11px] text-slate-500">{lead.phone} • {lead.city}</div>
                    </td>
                    <td className="py-3.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        {lead.source}
                      </span>
                    </td>
                    <td className="py-3.5 max-w-xs truncate text-slate-600">
                      {lead.items.map((i) => `${i.quantityRequested}x ${i.productName}`).join(", ")}
                    </td>
                    <td className="py-3.5 text-center">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <Link
                        href="/admin/quotations/new"
                        className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition"
                      >
                        Formulate Quote
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
