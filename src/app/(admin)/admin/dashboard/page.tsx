"use client";

import React from "react";
import Link from "next/link";
import { formatINR, formatINRShort } from "@/lib/utils";
import {
  INITIAL_PRODUCTS,
  INITIAL_ENQUIRIES,
  INITIAL_ORDERS,
  INITIAL_QUOTATIONS,
} from "@/lib/mockData";
import { useApp } from "@/lib/store";
import {
  TrendingUp,
  FileCheck,
  AlertTriangle,
  Package,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Percent,
  Plus,
  Truck,
  Building,
  Kanban,
  CheckCircle2,
  Clock,
  Boxes,
  Send,
  Phone,
  User,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function DynamicRoleDashboardPage() {
  const { currentUser } = useApp();

  const lowStockCount = INITIAL_PRODUCTS.filter(
    (p) => p.availableStock <= p.minThreshold
  ).length;

  const salesData = [
    { month: "Apr", taxable: 95000, gst: 17100, gross: 112100 },
    { month: "May", taxable: 120000, gst: 21600, gross: 141600 },
    { month: "Jun", taxable: 145000, gst: 26100, gross: 171100 },
    { month: "Jul", taxable: 130000, gst: 23400, gross: 153400 },
    { month: "Aug", taxable: 164300, gst: 29844, gross: 194144 },
  ];

  if (!currentUser) {
    return null;
  }

  // --------------------------------------------------------------------------------
  // 1. SALES HEAD DASHBOARD (Rahul Deshmukh)
  // --------------------------------------------------------------------------------
  if (currentUser.role === "SALES") {
    return (
      <div className="space-y-8 animate-fadeIn">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
              <span>Sales Operations Center • Rahul Deshmukh</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Commercial Pipeline & Ingestion Command
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage leads from Website RFQ, IndiaMART BuyLeads, customer fitment checks, and issue quotations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/quotations/new"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-md shadow-blue-600/20 transition active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Draft New Quotation</span>
            </Link>
          </div>
        </div>

        {/* Sales Specific KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between h-[145px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">Active Inquiries</span>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Kanban className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 font-mono">
                {INITIAL_ENQUIRIES.length} Leads
              </div>
              <div className="text-[11px] text-blue-600 font-semibold mt-1">
                Website + IndiaMART Leads
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between h-[145px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">Active Quotations</span>
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <FileCheck className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-black text-purple-700 font-mono">
                {formatINR(83780)}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">Pending Client Acceptance</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between h-[145px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">Conversion Rate</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-black text-emerald-700 font-mono">42.8%</div>
              <div className="text-[11px] text-emerald-600 font-semibold mt-1">+4.2% vs target</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between h-[145px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">Avg Order Size</span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 font-mono">
                {formatINR(57700)}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">Commercial B2B Volume</div>
            </div>
          </div>
        </div>

        {/* Active Lead Qualification Queue */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Active Lead Ingestion Queue (Sales Action Required)
              </h3>
              <p className="text-xs text-slate-500">
                Incoming purchase inquiries requiring technical specification verification & quote drafting
              </p>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              Open Kanban Pipeline ➔
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {INITIAL_ENQUIRIES.map((enq) => (
              <div key={enq.id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-blue-600">{enq.enquiryNumber}</span>
                    <span className="text-[10px] px-2 py-0.2 rounded-full font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      {enq.source}
                    </span>
                    <span className="text-[10px] px-2 py-0.2 rounded-full font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      {enq.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{enq.companyName}</h4>
                  <p className="text-xs text-slate-600">
                    Contact: <strong>{enq.contactName}</strong> ({enq.phone} • {enq.city}, {enq.state})
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Parts: {enq.items.map((it) => `${it.quantityRequested}x ${it.productName} (${it.targetVehicle})`).join(", ")}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/admin/quotations/new"
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition"
                  >
                    Formulate Commercial Quote ➔
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------------
  // 2. WAREHOUSE MANAGER DASHBOARD (Vikas Shinde)
  // --------------------------------------------------------------------------------
  if (currentUser.role === "INVENTORY") {
    return (
      <div className="space-y-8 animate-fadeIn">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-widest mb-1">
              <span>Warehouse & Logistics Center • Vikas Shinde</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Dual-Ledger Racks & Dispatch Control
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage physical vs reserved inventory, pallet preparation, and logistics carrier dispatch (VRL, DTDC).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/inventory"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-md shadow-blue-600/20 transition active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Receive Production Lot</span>
            </Link>
          </div>
        </div>

        {/* Warehouse Specific KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between h-[145px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">Physical Stock</span>
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                <Boxes className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 font-mono">
                {INITIAL_PRODUCTS.reduce((acc, p) => acc + p.physicalStock, 0)} Units
              </div>
              <div className="text-[11px] text-slate-500 mt-1">Total On-Shelf Warehouse Items</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between h-[145px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">Committed Reservations</span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-black text-amber-600 font-mono">
                {INITIAL_PRODUCTS.reduce((acc, p) => acc + p.reservedStock, 0)} Units
              </div>
              <div className="text-[11px] text-amber-700 font-semibold mt-1">Locked for Active Orders</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between h-[145px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">Orders to Pack</span>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-black text-blue-700 font-mono">1 Pallet</div>
              <div className="text-[11px] text-blue-600 font-semibold mt-1">Ready for VRL Logistics</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between h-[145px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">Low Stock Reorders</span>
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-black text-rose-600 font-mono">
                {lowStockCount} SKUs
              </div>
              <div className="text-[11px] text-slate-500 mt-1">Below Min Threshold</div>
            </div>
          </div>
        </div>

        {/* Daily Dispatch Queue */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Daily Consignment Dispatch Queue
              </h3>
              <p className="text-xs text-slate-500">
                Confirmed orders ready for packing, quality gate inspection, and transporter carrier pickup
              </p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              Manage All Orders ➔
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                  <th className="pb-3">Order & Client</th>
                  <th className="pb-3">Tracking Token</th>
                  <th className="pb-3">Consigned Units</th>
                  <th className="pb-3">Transporter</th>
                  <th className="pb-3 text-center">Fulfillment Status</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {INITIAL_ORDERS.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5">
                      <div className="font-bold text-slate-900">{order.companyName}</div>
                      <div className="text-[11px] text-blue-600 font-mono">{order.orderNumber}</div>
                    </td>
                    <td className="py-3.5 font-mono font-bold text-blue-600">{order.trackingToken}</td>
                    <td className="py-3.5 text-slate-800">
                      {order.items.map((i) => `${i.quantity}x ${i.productName}`).join(", ")}
                    </td>
                    <td className="py-3.5">
                      <div className="font-bold text-slate-900">{order.transporterName || "Pending Assignment"}</div>
                      <div className="text-[10px] font-mono text-slate-500">{order.trackingAwb}</div>
                    </td>
                    <td className="py-3.5 text-center">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          order.fulfillmentStatus === "DELIVERED"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-800 border border-amber-200"
                        }`}
                      >
                        {order.fulfillmentStatus}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <Link
                        href="/admin/orders"
                        className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition"
                      >
                        Update Status
                      </Link>
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

  // --------------------------------------------------------------------------------
  // 3. ADMIN / MANAGING DIRECTOR EXECUTIVE DASHBOARD (S Patil)
  // --------------------------------------------------------------------------------
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-purple-600 uppercase tracking-widest mb-1">
            <span>Executive Operations Command • S Patil</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Sai Envirotech Plant Executive Overview
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Commercial bookings, statutory GST tax liabilities, and plant operations overview.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/quotations/new"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-md shadow-blue-600/20 transition active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Quotation</span>
          </Link>
        </div>
      </div>

      {/* Standardized 4-Column KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Net Taxable Revenue */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between h-[150px] hover:border-blue-300 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Net Taxable Revenue
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">
              {formatINR(164300)}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold mt-1">
              <span>+18.4% vs last month</span>
            </div>
          </div>
        </div>

        {/* Card 2: Statutory GST Component */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between h-[150px] hover:border-purple-300 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Statutory GST
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center">
              <Percent className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-purple-700 font-mono tracking-tight">
              {formatINR(29844)}
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">
              HSN 8707 & 87071000 Schedules
            </div>
          </div>
        </div>

        {/* Card 3: Gross Order Value */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between h-[150px] hover:border-emerald-300 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Gross Order Value
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-700 font-mono tracking-tight">
              {formatINR(194144)}
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">
              Includes Base + Tax + Forwarding
            </div>
          </div>
        </div>

        {/* Card 4: Low Stock Alert */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between h-[150px] hover:border-amber-300 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Low Stock Alerts
            </span>
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                lowStockCount > 0
                  ? "bg-amber-50 border border-amber-200 text-amber-600"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">
              {lowStockCount} <span className="text-sm font-normal text-slate-500">SKUs</span>
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">
              <Link href="/admin/inventory" className="text-blue-600 hover:underline">
                View Dual-Ledger Racks ➔
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Section: Sales Chart + Ingestion Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Net Taxable Sales vs. Statutory Tax Collected
              </h3>
              <p className="text-xs text-slate-500">
                Monthly commercial volume trends across all customer accounts
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <div className="flex items-center gap-1.5 text-blue-600">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <span>Net Taxable Base</span>
              </div>
              <div className="flex items-center gap-1.5 text-purple-600">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                <span>GST Component</span>
              </div>
            </div>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(val) => formatINRShort(val)}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#e2e8f0",
                    borderRadius: "12px",
                    fontSize: "12px",
                    color: "#0f172a",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                  formatter={(val: any) => formatINR(Number(val))}
                />
                <Bar dataKey="taxable" name="Net Taxable Value" fill="#2563eb" radius={[6, 6, 0, 0]} />
                <Bar dataKey="gst" name="GST Component" fill="#9333ea" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Ingestion Channels */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Inquiry Pipeline Source</h3>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                Active CRM
              </span>
            </div>

            <div className="space-y-3 pt-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-800">Website RFQ Cart</span>
                  <span className="text-blue-700">45%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: "45%" }} />
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-800">IndiaMART Verified Leads</span>
                  <span className="text-emerald-700">35%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: "35%" }} />
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-800">Direct Phone / WhatsApp</span>
                  <span className="text-amber-700">20%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "20%" }} />
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/admin/enquiries"
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold text-center border border-slate-200 transition"
          >
            Manage Sales CRM Kanban ➔
          </Link>
        </div>
      </div>
    </div>
  );
}
