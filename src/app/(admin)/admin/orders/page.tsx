"use client";

import React, { useState } from "react";
import Link from "next/link";
import { INITIAL_ORDERS, OrderType } from "@/lib/mockData";
import { formatINR } from "@/lib/utils";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Search,
  ExternalLink,
  ShieldCheck,
  Building,
  Edit,
} from "lucide-react";

export default function OrderFulfillmentPage() {
  const [orders, setOrders] = useState<OrderType[]>(INITIAL_ORDERS);
  const [search, setSearch] = useState("");

  const handleUpdateStatus = (
    orderId: string,
    newStatus: "CONFIRMED" | "IN_PRODUCTION" | "PACKED" | "DISPATCHED" | "DELIVERED"
  ) => {
    setOrders(
      orders.map((o) =>
        o.id === orderId
          ? {
              ...o,
              fulfillmentStatus: newStatus,
              statusHistory: [
                ...o.statusHistory,
                {
                  status: newStatus,
                  changedBy: "Vikas Shinde (Warehouse Manager)",
                  note: `Updated fulfillment status to ${newStatus}.`,
                  timestamp: new Date().toISOString(),
                },
              ],
            }
          : o
      )
    );
  };

  const filtered = orders.filter(
    (o) =>
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.trackingToken.toLowerCase().includes(search.toLowerCase()) ||
      o.companyName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
            <span>Fulfillment & Dispatch</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Order Fulfillment & Consignment Dispatch
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage stage progression, assign transporters and AWBs, and issue gate passes from Uran Islampur works.
          </p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-3 border-b border-slate-100">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search Order #, Token, or Client..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <span className="text-xs text-slate-500">Showing {filtered.length} Order(s)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                <th className="pb-3">Order & Client</th>
                <th className="pb-3">Secure Token</th>
                <th className="pb-3">Consigned Parts</th>
                <th className="pb-3 text-right">Gross Total</th>
                <th className="pb-3">Transporter / AWB</th>
                <th className="pb-3 text-center">Fulfillment Stage</th>
                <th className="pb-3 text-right">Update Stage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-4">
                    <div className="font-bold text-slate-900">{order.companyName}</div>
                    <div className="text-[11px] text-blue-600 font-mono font-bold">
                      {order.orderNumber}
                    </div>
                  </td>
                  <td className="py-4">
                    <Link
                      href={`/track-order`}
                      className="font-mono font-bold text-blue-600 hover:underline inline-flex items-center gap-1"
                    >
                      {order.trackingToken}
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </td>
                  <td className="py-4">
                    <div className="text-slate-800">
                      {order.items.map((i) => `${i.quantity}x ${i.productName}`).join(", ")}
                    </div>
                  </td>
                  <td className="py-4 text-right font-mono font-bold text-slate-900">
                    {formatINR(order.grossOrderValue)}
                  </td>
                  <td className="py-4">
                    <div className="text-slate-900 font-semibold">{order.transporterName || "Pending Carrier"}</div>
                    <div className="text-[10px] font-mono text-slate-500">{order.trackingAwb || "AWB TBD"}</div>
                  </td>
                  <td className="py-4 text-center">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                        order.fulfillmentStatus === "DELIVERED"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : order.fulfillmentStatus === "DISPATCHED"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : order.fulfillmentStatus === "PACKED"
                          ? "bg-amber-50 text-amber-800 border border-amber-200"
                          : "bg-slate-100 text-slate-800 border border-slate-200"
                      }`}
                    >
                      {order.fulfillmentStatus}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <select
                      value={order.fulfillmentStatus}
                      onChange={(e) => handleUpdateStatus(order.id, e.target.value as any)}
                      className="py-1 px-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="CONFIRMED">Confirmed</option>
                      <option value="IN_PRODUCTION">QA & Inspection</option>
                      <option value="PACKED">Packed on Pallets</option>
                      <option value="DISPATCHED">Dispatched (In-Transit)</option>
                      <option value="DELIVERED">Delivered</option>
                    </select>
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
