"use client";

import React, { useState } from "react";
import { INITIAL_ORDERS } from "@/lib/mockData";
import { formatINR } from "@/lib/utils";
import {
  Search,
  Truck,
  CheckCircle2,
  Clock,
  Package,
  ShieldCheck,
  AlertCircle,
  Building,
} from "lucide-react";
import Link from "next/link";

export default function TrackOrderPage() {
  const [tokenInput, setTokenInput] = useState("AUT-8X3K9P");
  const [searchedToken, setSearchedToken] = useState("AUT-8X3K9P");

  const order = INITIAL_ORDERS.find(
    (o) => o.trackingToken.toUpperCase() === searchedToken.trim().toUpperCase()
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchedToken(tokenInput.trim());
  };

  const steps = [
    { key: "CONFIRMED", label: "Confirmed", sub: "Stock Reserved" },
    { key: "IN_PRODUCTION", label: "QA & Inspection", sub: "Pallet Prep" },
    { key: "PACKED", label: "Packed", sub: "Palletized" },
    { key: "DISPATCHED", label: "Dispatched", sub: "In-Transit (AWB)" },
    { key: "DELIVERED", label: "Delivered", sub: "Signed Receipt" },
  ];

  const getStepIndex = (status: string) => {
    const map: Record<string, number> = {
      CONFIRMED: 0,
      IN_PRODUCTION: 1,
      PACKED: 2,
      DISPATCHED: 3,
      DELIVERED: 4,
    };
    return map[status] ?? 0;
  };

  const currentStepIdx = order ? getStepIndex(order.fulfillmentStatus) : -1;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
          <Truck className="w-3.5 h-3.5" /> Secure Shipment Traceability
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Track Your B2B Automotive Consignment
        </h1>
        <p className="text-xs text-slate-500">
          Enter your 9-character cryptographic tracking token issued on quotation acceptance.
        </p>

        {/* Token Search Form */}
        <form onSubmit={handleSearch} className="pt-2 flex gap-2 max-w-md mx-auto">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="e.g. AUT-8X3K9P"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              className="w-full text-xs font-mono font-bold pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none uppercase"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition"
          >
            Track Order
          </button>
        </form>

        {/* Quick Demo Tokens */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
          <span>Sample Tokens:</span>
          <button
            onClick={() => {
              setTokenInput("AUT-8X3K9P");
              setSearchedToken("AUT-8X3K9P");
            }}
            className="font-mono font-bold text-blue-600 hover:underline"
          >
            AUT-8X3K9P (Packed)
          </button>
          <span>•</span>
          <button
            onClick={() => {
              setTokenInput("AUT-7Q2M4R");
              setSearchedToken("AUT-7Q2M4R");
            }}
            className="font-mono font-bold text-emerald-600 hover:underline"
          >
            AUT-7Q2M4R (Delivered)
          </button>
        </div>
      </div>

      {/* Order Result Card */}
      {order ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-fadeIn">
          {/* Card Top Info */}
          <div className="p-6 sm:p-8 bg-slate-900 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-400">TOKEN: {order.trackingToken}</span>
                <span className="text-slate-500">|</span>
                <span className="font-mono text-xs font-bold text-slate-300">{order.orderNumber}</span>
              </div>
              <h2 className="text-xl font-bold text-white mt-1">{order.companyName}</h2>
              <p className="text-xs text-slate-400">Consignee: {order.customerName} ({order.phone})</p>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-xs text-slate-400">Gross Order Value (inc. GST):</div>
              <div className="text-2xl font-black text-amber-400 font-mono">{formatINR(order.grossOrderValue)}</div>
              <span className="inline-block mt-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                Payment: {order.paymentStatus}
              </span>
            </div>
          </div>

          {/* Compact Visually Dominant Progress Stepper Line */}
          <div className="p-6 sm:p-8 border-b border-slate-200 bg-slate-50/50">
            <h3 className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-6">
              Consignment Progress Stepper
            </h3>

            {/* Stepper Component */}
            <div className="relative flex items-center justify-between max-w-3xl mx-auto px-4">
              {/* Connecting Background Line */}
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-slate-200 z-0" />
              
              {/* Active Progress Fill */}
              <div 
                className="absolute left-6 top-1/2 -translate-y-1/2 h-1 bg-blue-600 z-0 transition-all duration-500"
                style={{ width: `${(currentStepIdx / (steps.length - 1)) * 88}%` }}
              />

              {steps.map((step, idx) => {
                const isPassed = idx <= currentStepIdx;
                const isCurrent = idx === currentStepIdx;

                return (
                  <div key={step.key} className="relative z-10 flex flex-col items-center group">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs transition-all ${
                        isCurrent
                          ? "bg-blue-600 text-white ring-4 ring-blue-100 scale-110 shadow-md"
                          : isPassed
                          ? "bg-blue-600 text-white"
                          : "bg-white border-2 border-slate-300 text-slate-400"
                      }`}
                    >
                      {isPassed ? "✓" : idx + 1}
                    </div>
                    <div className="text-center mt-2">
                      <div className={`text-xs font-bold ${isCurrent ? "text-blue-700" : isPassed ? "text-slate-800" : "text-slate-400"}`}>
                        {step.label}
                      </div>
                      <div className="text-[10px] text-slate-500 hidden sm:block">
                        {step.sub}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Logistics & Transporter Details */}
          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider">Logistics & Transporter</h4>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Transporter Name:</span>
                  <strong className="text-slate-800">{order.transporterName || "VRL Logistics Ltd"}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Consignment Note / AWB:</span>
                  <strong className="font-mono text-blue-700 font-bold">{order.trackingAwb || "VRL-MH-889124"}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Dispatch Works:</span>
                  <strong className="text-slate-800">Uran Islampur, Sangli (MH)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Destination Address:</span>
                  <span className="text-slate-700 text-right max-w-[220px] font-medium">{order.shippingAddress}</span>
                </div>
              </div>
            </div>

            {/* Consigned Parts List */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider">Consigned Part Items</h4>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
                {order.items.map((item, i) => {
                  const lineTotal = item.totalPrice ?? (item.quantity * item.unitPrice);
                  return (
                    <div key={i} className="p-3 flex justify-between items-center text-xs">
                      <div>
                        <div className="font-bold text-slate-900">{item.productName}</div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          {item.sku ? `SKU: ${item.sku}` : "HSN 87071000 • Factory Component"}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-slate-900">{item.quantity} pcs</div>
                        <div className="text-[11px] text-slate-500">{formatINR(lineTotal)}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center space-y-3 shadow-sm">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">Token Not Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Please check the 9-character token provided in your Quotation Approval receipt.
          </p>
        </div>
      )}
    </div>
  );
}
