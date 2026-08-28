"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { formatINR } from "@/lib/utils";
import { INITIAL_PRODUCTS } from "@/lib/mockData";
import {
  FileCheck2,
  Trash2,
  Plus,
  ArrowRight,
  ShieldCheck,
  Send,
  Building,
  CheckCircle2,
  Layers,
} from "lucide-react";
import ProductImage from "@/components/ProductImage";

export default function RFQPage() {
  const { rfqItems, updateRFQQuantity, removeFromRFQ, clearRFQ } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [contactName, setContactName] = useState("Anand Kulkarni");
  const [companyName, setCompanyName] = useState("ABC Auto Spares & Logistics Pvt Ltd");
  const [email, setEmail] = useState("client@abcautoparts.com");
  const [phone, setPhone] = useState("+91 94230 88990");
  const [state, setState] = useState("Maharashtra");
  const [notes, setNotes] = useState("Urgent requirement for upcoming Bolero fleet maintenance cycle.");

  const totalEstimate = rfqItems.reduce((acc, item) => acc + item.basePrice * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header with Part Counter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 mb-1">
            <FileCheck2 className="w-3.5 h-3.5" /> B2B Commercial Formulation
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Batch Request for Quotation (RFQ)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure line items, verify vehicle fitment, and receive formal commercial quotation with HSN tax schedules within 24 hours.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-4 py-2 rounded-xl bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
            {rfqItems.length} Part(s) in Active Batch
          </span>
          {rfqItems.length > 0 && (
            <button
              onClick={clearRFQ}
              className="text-xs text-rose-600 hover:underline font-bold"
            >
              Clear Cart
            </button>
          )}
        </div>
      </div>

      {submitted ? (
        <div className="p-10 rounded-2xl bg-white border border-slate-200 text-center space-y-4 max-w-lg mx-auto shadow-xl animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">RFQ Ingested Successfully!</h2>
          <div className="text-xs font-mono font-bold text-blue-700 bg-blue-50 py-1.5 px-3 rounded-lg w-fit mx-auto border border-blue-200">
            Enquiry Reference: #ENQ-10485
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Your requirement has been ingested into the Sales CRM pipeline. Sales Head Rahul Deshmukh and S Patil will review vehicle compatibility, apply volume discounts, and issue your formal quotation.
          </p>
          <div className="pt-3 flex justify-center gap-3">
            <Link
              href="/portal/dashboard"
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition"
            >
              Go to Customer Portal
            </Link>
            <Link
              href="/products"
              className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition"
            >
              Browse More Parts
            </Link>
          </div>
        </div>
      ) : rfqItems.length === 0 ? (
        /* Empty State with Immediate Quick-Add Recommendations */
        <div className="space-y-8">
          <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <Layers className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Your RFQ Batch is Empty</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Select parts from our high-demand automotive and tractor component inventory below or explore the full catalog to generate a quote:
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
            >
              <span>Explore Complete Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick Recommendations Grid */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Quick Add High-Demand Automotive Parts:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {INITIAL_PRODUCTS.slice(0, 3).map((prod) => (
                <div
                  key={prod.id}
                  className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between"
                >
                  <div className="h-36 rounded-xl bg-slate-50 mb-3 overflow-hidden">
                    <ProductImage
                      src={prod.image}
                      alt={prod.name}
                      categorySlug={prod.categoryId}
                      sku={prod.sku}
                      hsnCode={prod.hsnCode}
                    />
                  </div>
                  <div className="space-y-1 mb-3">
                    <div className="text-[10px] font-mono text-slate-500">{prod.sku} • HSN {prod.hsnCode}</div>
                    <div className="font-bold text-slate-900 text-xs line-clamp-1">{prod.name}</div>
                    <div className="text-[11px] text-blue-700 font-bold">{formatINR(prod.basePrice)} / pc (MOQ {prod.moq})</div>
                  </div>
                  <Link
                    href={`/products/${prod.slug}`}
                    className="w-full py-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-bold text-xs text-center border border-slate-200 transition"
                  >
                    View & Add to RFQ
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Active RFQ Layout: 2 Columns (Items Table + Buyer Form) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Items Table */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
              <div className="p-4 bg-slate-50 font-bold text-xs text-slate-700 uppercase tracking-wider flex justify-between">
                <span>Part Details</span>
                <span>Quantity & Pricing</span>
              </div>

              {rfqItems.map((item) => (
                <div key={item.productId} className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-200 overflow-hidden flex-shrink-0">
                      <ProductImage
                        src={item.image}
                        alt={item.name}
                        categorySlug={item.categoryName}
                        sku={item.sku}
                      />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">{item.name}</div>
                      <div className="text-[10px] font-mono text-slate-500">
                        {item.sku} • HSN {item.hsnCode}
                      </div>
                      <div className="text-[11px] text-slate-600">
                        Target Vehicle: <strong>{item.targetVehicle}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-xs font-bold text-slate-900">
                        {formatINR(item.basePrice * item.quantity)}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        @{formatINR(item.basePrice)}/pc
                      </div>
                    </div>

                    <div className="w-20">
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
                        className="w-full text-center text-xs font-bold py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <button
                      onClick={() => removeFromRFQ(item.productId)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Estimated Taxable Subtotal */}
            <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-blue-950">Indicative Taxable Base Value:</span>
                <p className="text-[11px] text-blue-800">
                  Applicable GST (CGST+SGST or IGST) & freight will be calculated dynamically based on shipping state.
                </p>
              </div>
              <div className="text-right">
                <span className="text-lg font-black text-blue-950 font-mono">
                  {formatINR(totalEstimate)}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Buyer Details Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
              <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
                Buyer & Delivery Details
              </h3>

              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Company / Entity Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full py-2 px-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Phone / Mobile *
                    </label>
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full py-2 px-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full py-2 px-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Destination State *
                    </label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full py-2 px-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
                    >
                      <option value="Maharashtra">Maharashtra (Intra-State: CGST+SGST)</option>
                      <option value="Gujarat">Gujarat (Inter-State: IGST)</option>
                      <option value="Karnataka">Karnataka (Inter-State: IGST)</option>
                      <option value="Madhya Pradesh">Madhya Pradesh (Inter-State: IGST)</option>
                      <option value="Other">Other State (IGST)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Technical Specifications / Delivery Timeline Notes
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 transition active:scale-95"
                >
                  <Send className="w-4 h-4" /> Submit Commercial RFQ
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
