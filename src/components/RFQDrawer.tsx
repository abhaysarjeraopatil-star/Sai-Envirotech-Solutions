"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { formatINR } from "@/lib/utils";
import {
  X,
  Trash2,
  Send,
  Building2,
  FileCheck,
  AlertCircle,
  Truck,
  CheckCircle2,
} from "lucide-react";
import ProductImage from "./ProductImage";

export default function RFQDrawer() {
  const { isRFQOpen, setIsRFQOpen, rfqItems, updateRFQQuantity, removeFromRFQ, clearRFQ } =
    useApp();
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [contactName, setContactName] = useState("Anand Kulkarni");
  const [companyName, setCompanyName] = useState("ABC Auto Spares & Logistics Pvt Ltd");
  const [email, setEmail] = useState("client@abcautoparts.com");
  const [phone, setPhone] = useState("+91 94230 88990");
  const [shippingState, setShippingState] = useState("Maharashtra");
  const [notes, setNotes] = useState("Urgent requirement for upcoming Bolero fleet maintenance cycle.");

  if (!isRFQOpen) return null;

  const totalEstimatedAmount = rfqItems.reduce(
    (acc, item) => acc + item.basePrice * item.quantity,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    clearRFQ();
    setIsRFQOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsRFQOpen(false)}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-white shadow-2xl flex flex-col justify-between overflow-hidden animate-slideLeft border-l border-slate-200">
          {/* Header */}
          <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div>
              <div className="text-xs font-mono font-bold text-blue-400">SALES CRM DISPATCH</div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Request for Quotation Cart</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-600 font-mono">
                  {rfqItems.length} items
                </span>
              </h2>
            </div>
            <button
              onClick={() => setIsRFQOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {submitted ? (
              <div className="text-center py-10 space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">RFQ Ingested Into CRM!</h3>
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-left space-y-2">
                  <div className="font-bold text-blue-900">Assigned Reference: #ENQ-10485</div>
                  <p className="text-slate-600">
                    Your request was routed to Sales Head Rahul Deshmukh. A formal commercial quotation with statutory HSN tax breakdown will be prepared.
                  </p>
                </div>
                <div className="pt-4 flex flex-col gap-2">
                  <Link
                    href="/portal/dashboard"
                    onClick={handleReset}
                    className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition"
                  >
                    View in Customer Portal
                  </Link>
                  <button
                    onClick={handleReset}
                    className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition"
                  >
                    Close & Create New RFQ
                  </button>
                </div>
              </div>
            ) : rfqItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <FileCheck className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-800">Your RFQ cart is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Browse our B2B catalog and click <strong>Add to RFQ</strong> on vehicle bumpers, hoods, and body panels to request volume wholesale pricing.
                </p>
                <Link
                  href="/products"
                  onClick={() => setIsRFQOpen(false)}
                  className="inline-block px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition shadow-md"
                >
                  Browse Automotive Catalog
                </Link>
              </div>
            ) : (
              <>
                {/* Part Items List */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-500 pb-2 border-b border-slate-200">
                    <span>Selected Part SKUs</span>
                    <button
                      onClick={clearRFQ}
                      className="text-rose-600 hover:underline text-[11px]"
                    >
                      Clear All
                    </button>
                  </div>

                  <div className="space-y-2 divide-y divide-slate-100">
                    {rfqItems.map((item) => (
                      <div key={item.productId} className="pt-2 flex items-start justify-between gap-3">
                        <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-200 overflow-hidden flex-shrink-0">
                          <ProductImage
                            src={item.image}
                            alt={item.name}
                            categorySlug={item.categoryName}
                            sku={item.sku}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-slate-900 truncate">{item.name}</div>
                          <div className="text-[10px] font-mono text-slate-500">
                            {item.sku} • HSN {item.hsnCode}
                          </div>
                          <div className="text-[11px] text-blue-700 font-semibold mt-0.5">
                            {formatINR(item.basePrice)} / pc
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-1.5">
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              min={item.moq}
                              value={item.quantity}
                              onChange={(e) =>
                                updateRFQQuantity(
                                  item.productId,
                                  Math.max(item.moq, parseInt(e.target.value) || item.moq)
                                )
                              }
                              className="w-16 text-center text-xs font-bold py-1 px-1 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              title="Quantity"
                            />
                            <button
                              onClick={() => removeFromRFQ(item.productId)}
                              className="p-1 text-slate-400 hover:text-rose-600 rounded"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="text-xs font-bold text-slate-800 font-mono">
                            {formatINR(item.basePrice * item.quantity)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subtotal Preview */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-slate-700">Indicative Taxable Base:</span>
                    <div className="text-[10px] text-slate-400">Excludes GST & Freight</div>
                  </div>
                  <span className="text-base font-black text-slate-900 font-mono">
                    {formatINR(totalEstimatedAmount)}
                  </span>
                </div>

                {/* Buyer Information Form */}
                <form onSubmit={handleSubmit} className="space-y-3 pt-2 text-xs">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Buyer & Company Credentials
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full py-2 px-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Contact Person *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full py-2 px-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="text"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full py-2 px-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full py-2 px-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Destination State *
                      </label>
                      <select
                        value={shippingState}
                        onChange={(e) => setShippingState(e.target.value)}
                        className="w-full py-2 px-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs"
                      >
                        <option value="Maharashtra">Maharashtra (27)</option>
                        <option value="Gujarat">Gujarat (24)</option>
                        <option value="Karnataka">Karnataka (29)</option>
                        <option value="Other">Other State</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Fleet / Fitment Requirements
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full py-2 px-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 transition active:scale-95"
                  >
                    <Send className="w-4 h-4" /> Submit Commercial RFQ Batch
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
