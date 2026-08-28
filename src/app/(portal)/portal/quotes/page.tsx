"use client";

import React, { useState } from "react";
import { INITIAL_QUOTATIONS } from "@/lib/mockData";
import { formatINR } from "@/lib/utils";
import {
  FileCheck2,
  CheckCircle2,
  XCircle,
  Download,
  Clock,
  Printer,
  Building,
  ShieldCheck,
  AlertCircle,
  Truck,
} from "lucide-react";
import Link from "next/link";

export default function PortalQuotesPage() {
  const [quotes, setQuotes] = useState(INITIAL_QUOTATIONS);
  const [acceptedOrderId, setAcceptedOrderId] = useState<string | null>(null);
  const [trackingToken, setTrackingToken] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAcceptQuote = (quoteId: string) => {
    setIsProcessing(true);

    // Simulate atomic transactional quote acceptance
    setTimeout(() => {
      setQuotes((prev) =>
        prev.map((q) =>
          q.id === quoteId
            ? {
                ...q,
                status: "ACCEPTED",
                statusHistory: [
                  ...q.statusHistory,
                  {
                    status: "ACCEPTED",
                    changedBy: "Anand Kulkarni (Client 1-Click Acceptance)",
                    note: "Client approved quotation terms. Atomic inventory reservation triggered.",
                    timestamp: new Date().toISOString(),
                  },
                ],
              }
            : q
        )
      );
      setAcceptedOrderId("ORD-2026-0042");
      setTrackingToken("AUT-9Y4L2Z");
      setIsProcessing(false);
    }, 1200);
  };

  const handlePrint = (quoteNumber: string) => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Commercial Quotations
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review formal supply offers formulated by Sai Envirotech Solutions sales team.
          </p>
        </div>
      </div>

      {/* Success Notification on Atomic Conversion */}
      {acceptedOrderId && trackingToken && (
        <div className="p-6 rounded-3xl bg-emerald-50 border-2 border-emerald-300 shadow-lg space-y-3 animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-600 text-white">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-emerald-950 text-base">
                Quotation Accepted & Order Spawned Transactionally!
              </h3>
              <p className="text-xs text-emerald-800">
                PostgreSQL Transaction completed: Order <strong>{acceptedOrderId}</strong> created, stock atomically reserved in warehouse ledger.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-emerald-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <span className="text-[11px] text-slate-500 font-semibold uppercase">Secure Tracking Token:</span>
              <div className="text-xl font-mono font-black text-blue-700">{trackingToken}</div>
            </div>
            <Link
              href={`/track-order?token=${trackingToken}`}
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition shadow-sm"
            >
              Track Order In-Transit ➔
            </Link>
          </div>
        </div>
      )}

      {/* Quotation Cards */}
      <div className="space-y-8">
        {quotes.map((quote) => (
          <div
            key={quote.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden"
          >
            {/* Header Strip */}
            <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-black px-2.5 py-0.5 rounded bg-blue-600 text-white">
                    {quote.quoteNumber}
                  </span>
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      quote.status === "ACCEPTED"
                        ? "bg-emerald-900 text-emerald-300 border border-emerald-700"
                        : "bg-amber-900 text-amber-300 border border-amber-700"
                    }`}
                  >
                    STATUS: {quote.status}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-white mt-1.5">
                  Supply Quotation for {quote.companyName}
                </h2>
                <p className="text-xs text-slate-400">
                  Issued on 28 Aug 2026 by {quote.createdBy} • Ex-Factory Delivery Terms
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePrint(quote.quoteNumber)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Document</span>
                </button>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                      <th className="pb-3">Part Description</th>
                      <th className="pb-3">HSN Code</th>
                      <th className="pb-3 text-right">Quantity</th>
                      <th className="pb-3 text-right">Unit Rate</th>
                      <th className="pb-3 text-right">GST Rate</th>
                      <th className="pb-3 text-right">Tax Amount</th>
                      <th className="pb-3 text-right">Total (inc. GST)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                    {quote.items.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80">
                        <td className="py-3.5">
                          <div className="font-bold text-slate-900">{item.productName}</div>
                          <div className="text-[11px] text-slate-500 font-mono">SKU: {item.sku}</div>
                        </td>
                        <td className="py-3.5 font-mono font-semibold text-blue-700">
                          {item.hsnCode}
                        </td>
                        <td className="py-3.5 text-right font-bold font-mono">
                          {item.quantity} pcs
                        </td>
                        <td className="py-3.5 text-right font-mono">
                          {formatINR(item.unitPrice)}
                        </td>
                        <td className="py-3.5 text-right font-mono text-slate-600">
                          {item.taxRatePercent}%
                        </td>
                        <td className="py-3.5 text-right font-mono text-slate-600">
                          {formatINR(item.taxAmount)}
                        </td>
                        <td className="py-3.5 text-right font-bold text-slate-900 font-mono">
                          {formatINR(item.totalWithTax)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Financial Calculation Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                    Commercial Terms & Validity:
                  </div>
                  <p><strong>Payment Terms:</strong> {quote.paymentTerms}</p>
                  <p><strong>Delivery Terms:</strong> {quote.deliveryTerms}</p>
                  <p><strong>Offer Validity:</strong> Valid until 12 September 2026 (Subject to stock)</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Net Taxable Base Amount:</span>
                    <span className="font-mono font-bold text-slate-800">{formatINR(quote.netTaxableAmount)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Wooden Pallet Packaging & Forwarding:</span>
                    <span className="font-mono text-slate-800">{formatINR(quote.packagingCharges)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>CGST (9% for Maharashtra):</span>
                    <span className="font-mono text-slate-800">{formatINR(quote.cgstAmount)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>SGST (9% for Maharashtra):</span>
                    <span className="font-mono text-slate-800">{formatINR(quote.sgstAmount)}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-black text-slate-900">
                    <span>Gross Total Payable:</span>
                    <span className="text-base text-blue-700">{formatINR(quote.grossOrderValue)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons for Client */}
              {quote.status === "SENT" && (
                <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Accepting locks stock in warehouse ledger and spawns Sales Order.</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleAcceptQuote(quote.id)}
                      disabled={isProcessing}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg transition active:scale-95 disabled:opacity-50"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{isProcessing ? "Reserving Stock..." : "1-Click Accept Quotation"}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
