"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { INITIAL_PRODUCTS, ProductType } from "@/lib/mockData";
import { formatINR } from "@/lib/utils";
import { calculateGST } from "@/lib/tax";
import {
  FileCheck2,
  Plus,
  Trash2,
  Percent,
  Send,
  Building,
  ShieldCheck,
  Truck,
  AlertTriangle,
} from "lucide-react";

export default function NewQuotationBuilderPage() {
  const router = useRouter();

  // Form State
  const [customerName, setCustomerName] = useState("Anand Kulkarni");
  const [companyName, setCompanyName] = useState("ABC Auto Spares & Logistics Pvt Ltd");
  const [email, setEmail] = useState("client@abcautoparts.com");
  const [phone, setPhone] = useState("+91 94230 88990");
  const [shippingStateCode, setShippingStateCode] = useState("27"); // Maharashtra
  const [packagingCharges, setPackagingCharges] = useState(1500);
  const [freightCharges, setFreightCharges] = useState(0);

  // Line items
  const [items, setItems] = useState([
    {
      productId: "prod-1",
      name: "Heavy-Duty Front Car Bumper Assembly",
      sku: "SE-CB-001",
      hsnCode: "87071000",
      quantity: 15,
      unitPrice: 2400,
    },
    {
      productId: "prod-2",
      name: "Tractor Engine Hood & Body Cover Shell",
      sku: "SE-TB-102",
      hsnCode: "8707",
      quantity: 5,
      unitPrice: 6700,
    },
  ]);

  const isInterState = shippingStateCode !== "27";

  // Dynamic calculations
  const taxResult = calculateGST({
    items: items.map((it) => ({
      quantity: it.quantity,
      unitPrice: it.unitPrice,
      taxRatePercent: 18.0,
    })),
    shippingStateCode,
    packagingCharges,
    freightCharges,
  });

  const totalTaxableBase = taxResult.netTaxableAmount;
  const grossOrderValue = taxResult.grossOrderValue;

  const handleAddItem = (prod: ProductType) => {
    setItems([
      ...items,
      {
        productId: prod.id,
        name: prod.name,
        sku: prod.sku,
        hsnCode: prod.hsnCode,
        quantity: prod.moq,
        unitPrice: prod.basePrice,
      },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Quotation formulated successfully with live statutory tax schedule!");
    router.push("/admin/quotations");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
            <span>Sales & Commercial Formulation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Dynamic Quotation Builder
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Formulate itemized quotes with automatic HSN GST schedules (Intra-state 9%+9% vs Inter-state 18%).
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Client & Line Items */}
        <div className="lg:col-span-8 space-y-6">
          {/* Customer Details Card */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100 flex items-center gap-2">
              <Building className="w-4 h-4 text-blue-600" />
              <span>Customer & Destination State</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Contact Person</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Tax State Code (Intra vs Inter-State)
                </label>
                <select
                  value={shippingStateCode}
                  onChange={(e) => setShippingStateCode(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="27">Maharashtra (27) — Intra-State (CGST + SGST)</option>
                  <option value="24">Gujarat (24) — Inter-State (IGST)</option>
                  <option value="29">Karnataka (29) — Inter-State (IGST)</option>
                  <option value="23">Madhya Pradesh (23) — Inter-State (IGST)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Itemized Part Lines</h3>
              <span className="text-xs text-blue-600 font-mono font-bold">
                {items.length} Line(s) Active
              </span>
            </div>

            <div className="space-y-3">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-12 gap-3 items-center text-xs"
                >
                  <div className="col-span-5">
                    <div className="font-bold text-slate-900">{item.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      SKU: {item.sku} | HSN: {item.hsnCode}
                    </div>
                  </div>

                  <div className="col-span-2">
                    <label className="text-[10px] text-slate-500 block mb-0.5">Quantity</label>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 1;
                        setItems(
                          items.map((it, idx) => (idx === index ? { ...it, quantity: val } : it))
                        );
                      }}
                      className="w-full py-1 px-2 rounded-lg bg-white border border-slate-300 text-slate-900 font-bold"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="text-[10px] text-slate-500 block mb-0.5">Rate (₹)</label>
                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value) || 0;
                        setItems(
                          items.map((it, idx) => (idx === index ? { ...it, unitPrice: val } : it))
                        );
                      }}
                      className="w-full py-1 px-2 rounded-lg bg-white border border-slate-300 text-slate-900 font-bold"
                    />
                  </div>

                  <div className="col-span-2 text-right">
                    <label className="text-[10px] text-slate-500 block mb-0.5">Taxable Base</label>
                    <div className="font-mono font-bold text-slate-900">
                      {formatINR(item.quantity * item.unitPrice)}
                    </div>
                  </div>

                  <div className="col-span-1 text-right">
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                      className="p-1 text-slate-400 hover:text-rose-600 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Add Catalog SKUs */}
            <div className="pt-2">
              <div className="text-[11px] font-bold text-slate-600 mb-2">
                Quick Add Factory Catalog SKUs:
              </div>
              <div className="flex flex-wrap gap-2">
                {INITIAL_PRODUCTS.map((prod) => (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => handleAddItem(prod)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-medium border border-slate-200 transition"
                  >
                    + {prod.name} ({formatINR(prod.basePrice)})
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Commercial Summary & Dynamic Tax Engine */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100 flex items-center gap-2">
              <Percent className="w-4 h-4 text-purple-600" />
              <span>Commercial & Statutory Calculation</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Net Taxable Base:</span>
                <span className="font-mono font-bold text-slate-900">{formatINR(totalTaxableBase)}</span>
              </div>

              <div>
                <label className="text-[11px] text-slate-600 block mb-1">
                  Wooden Pallet Packaging & Forwarding (₹):
                </label>
                <input
                  type="number"
                  value={packagingCharges}
                  onChange={(e) => setPackagingCharges(parseFloat(e.target.value) || 0)}
                  className="w-full py-1.5 px-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold"
                />
              </div>

              {/* Dynamic Tax Breakdown */}
              <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 space-y-1.5 text-[11px]">
                <div className="font-bold text-purple-900 flex justify-between">
                  <span>Statutory GST Treatment:</span>
                  <span>{isInterState ? "Inter-State (IGST 18%)" : "Intra-State (9% + 9%)"}</span>
                </div>

                {!isInterState ? (
                  <>
                    <div className="flex justify-between text-purple-800">
                      <span>CGST (Central @ 9%):</span>
                      <span className="font-mono font-bold">{formatINR(taxResult.cgstAmount)}</span>
                    </div>
                    <div className="flex justify-between text-purple-800">
                      <span>SGST (State @ 9%):</span>
                      <span className="font-mono font-bold">{formatINR(taxResult.sgstAmount)}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between text-purple-800">
                    <span>IGST (Integrated @ 18%):</span>
                    <span className="font-mono font-bold">{formatINR(taxResult.igstAmount)}</span>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                <span className="font-bold text-slate-900 text-sm">Gross Commercial Total:</span>
                <span className="text-xl font-black text-slate-900 font-mono">
                  {formatINR(grossOrderValue)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-600/25 flex items-center justify-center gap-2 transition active:scale-95"
            >
              <Send className="w-4 h-4" /> Issue Commercial Quotation
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
