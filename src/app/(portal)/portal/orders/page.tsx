"use client";

import React from "react";
import { INITIAL_ORDERS } from "@/lib/mockData";
import { formatINR } from "@/lib/utils";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Printer,
  ExternalLink,
  ShieldCheck,
  Building,
} from "lucide-react";
import Link from "next/link";

export default function PortalOrdersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Orders & Consignment History
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Track production, packing status, carrier consignment numbers, and download commercial delivery challans.
        </p>
      </div>

      <div className="space-y-6">
        {INITIAL_ORDERS.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-8 space-y-6"
          >
            {/* Order Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-base text-slate-900">{order.orderNumber}</span>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">
                    TOKEN: {order.trackingToken}
                  </span>
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      order.fulfillmentStatus === "DELIVERED"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {order.fulfillmentStatus}
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Generated from Quote: <strong>{order.quotationNumber}</strong> • Placed on 26 Aug 2026
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/track-order?token=${order.trackingToken}`}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-sm"
                >
                  <Truck className="w-3.5 h-3.5" /> Track Consignment
                </Link>
                <button
                  onClick={() => window.print()}
                  className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
                  title="Print Delivery Challan"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Consigned Items */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="pb-2">Part Description</th>
                    <th className="pb-2 text-right">Quantity</th>
                    <th className="pb-2 text-right">Unit Rate</th>
                    <th className="pb-2 text-right">Tax (GST)</th>
                    <th className="pb-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {order.items.map((item, i) => {
                    const lineTaxable = item.quantity * item.unitPrice;
                    const lineTax = item.taxAmount ?? Math.round(lineTaxable * 0.18);
                    const lineTotal = item.totalPrice ?? (lineTaxable + lineTax);
                    return (
                      <tr key={i}>
                        <td className="py-2.5">
                          <div className="font-bold text-slate-900">{item.productName}</div>
                          <div className="text-[11px] text-slate-500 font-mono">
                            {item.sku ? `SKU: ${item.sku}` : "HSN 87071000 • Factory Component"}
                          </div>
                        </td>
                        <td className="py-2.5 text-right font-mono font-bold">{item.quantity} pcs</td>
                        <td className="py-2.5 text-right font-mono">{formatINR(item.unitPrice)}</td>
                        <td className="py-2.5 text-right font-mono text-slate-600">{formatINR(lineTax)}</td>
                        <td className="py-2.5 text-right font-bold font-mono text-slate-900">
                          {formatINR(lineTotal)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Logistics & Address Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs text-slate-600">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block text-[11px]">Transporter & Consignment No</span>
                <span className="font-bold text-slate-800">{order.transporterName}</span>
                <span className="font-mono text-blue-700 block font-bold mt-0.5">{order.trackingAwb}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block text-[11px]">Delivery Location</span>
                <span className="font-medium text-slate-800 line-clamp-2">{order.shippingAddress}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block text-[11px]">Gross Order Value</span>
                <span className="text-lg font-black text-slate-900">{formatINR(order.grossOrderValue)}</span>
                <span className="text-[10px] text-emerald-700 font-semibold block">GST Invoiced & Paid</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
