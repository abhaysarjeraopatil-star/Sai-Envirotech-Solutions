"use client";

import React from "react";
import Link from "next/link";
import { INITIAL_QUOTATIONS, INITIAL_ORDERS } from "@/lib/mockData";
import { formatINR } from "@/lib/utils";
import {
  FileCheck2,
  Package,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Download,
  Truck,
  CheckCircle2,
} from "lucide-react";

export default function PortalDashboard() {
  const pendingQuotes = INITIAL_QUOTATIONS.filter((q) => q.status === "SENT");
  const activeOrders = INITIAL_ORDERS.filter((o) => o.fulfillmentStatus !== "DELIVERED");

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            B2B Client Dashboard
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Welcome back, Anand Kulkarni
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            ABC Auto Spares & Logistics Pvt Ltd • Registered Buyer (Kolhapur Hub)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/portal/quotes"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition"
          >
            <FileCheck2 className="w-4 h-4" /> Review Quotations
          </Link>
          <Link
            href="/products"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition"
          >
            New RFQ Inquiry
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Pending Quotations</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{pendingQuotes.length}</div>
          <p className="text-[11px] text-amber-600 font-semibold">
            Action required: 1 quote awaiting commercial review
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Active Orders in Transit</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{activeOrders.length}</div>
          <p className="text-[11px] text-blue-600 font-semibold">
            1 consignment packed for VRL Logistics pickup
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Lifetime Procured Value</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">
            {formatINR(INITIAL_ORDERS.reduce((s, o) => s + o.grossOrderValue, 0))}
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold">
            100% statutory GST compliant invoices
          </p>
        </div>
      </div>

      {/* Urgent Pending Quotation Review Banner */}
      {pendingQuotes.map((quote) => (
        <div
          key={quote.id}
          className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                  {quote.quoteNumber}
                </span>
                <span className="text-xs font-bold text-amber-800">
                  • Formal Commercial Offer Received
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Quotation for 15x Car Bumpers + 5x Tractor Hoods
              </h2>
              <p className="text-xs text-slate-600">
                Formulated by <strong>{quote.createdBy}</strong> at Sai Envirotech Solutions Works.
              </p>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-xs text-slate-500">Gross Payable Amount (inc. 18% GST):</div>
              <div className="text-2xl font-black text-slate-900">{formatINR(quote.grossOrderValue)}</div>
              <div className="text-[11px] text-slate-500">
                Net Taxable: {formatINR(quote.netTaxableAmount)} | GST: {formatINR(quote.taxAmount)}
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-amber-200/80">
            <span className="text-xs text-slate-600">
              Valid until: <strong>12 September 2026</strong> (Ex-Factory Delivery Terms)
            </span>
            <div className="flex items-center gap-2">
              <Link
                href="/portal/quotes"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition"
              >
                Review & 1-Click Accept ➔
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Recent Orders List */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-base">Consignment Activity & Shipments</h3>
          <Link href="/portal/orders" className="text-xs font-semibold text-blue-600 hover:underline">
            View All Shipments
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {INITIAL_ORDERS.map((order) => (
            <div
              key={order.id}
              className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-900">{order.orderNumber}</span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-100 text-blue-700 font-bold">
                    TOKEN: {order.trackingToken}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      order.fulfillmentStatus === "DELIVERED"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {order.fulfillmentStatus}
                  </span>
                </div>
                <div className="text-slate-500 text-[11px] mt-1">
                  {order.items.map((i) => `${i.quantity}x ${i.productName}`).join(", ")}
                </div>
              </div>

              <div className="text-left sm:text-right">
                <div className="font-bold text-slate-900">{formatINR(order.grossOrderValue)}</div>
                <Link
                  href={`/track-order?token=${order.trackingToken}`}
                  className="text-[11px] text-blue-600 hover:underline font-medium inline-flex items-center gap-1 mt-0.5"
                >
                  <Truck className="w-3 h-3" /> Track Progress ➔
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
