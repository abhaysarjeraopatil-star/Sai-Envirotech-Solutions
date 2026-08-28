"use client";

import React, { useState } from "react";
import {
  INITIAL_PRODUCTS,
  INITIAL_STOCK_MOVEMENTS,
  ProductType,
  StockMovementType,
} from "@/lib/mockData";
import {
  Boxes,
  Plus,
  AlertTriangle,
  History,
  Search,
  ShieldCheck,
  Building,
  CheckCircle2,
} from "lucide-react";

export default function DualLedgerInventoryPage() {
  const [products, setProducts] = useState<ProductType[]>(INITIAL_PRODUCTS);
  const [movements, setMovements] = useState<StockMovementType[]>(INITIAL_STOCK_MOVEMENTS);
  const [search, setSearch] = useState("");
  const [isAddStockOpen, setIsAddStockOpen] = useState(false);

  // Add Stock Modal State
  const [selectedProductId, setSelectedProductId] = useState(INITIAL_PRODUCTS[0].id);
  const [addQty, setAddQty] = useState(25);
  const [referenceId, setReferenceId] = useState("PO-9022-MANUFACTURING");
  const [note, setNote] = useState("Fresh stamped batch lot received from press shop.");

  const handleAddStock = (e: React.FormEvent) => {
    e.preventDefault();
    const product = products.find((p) => p.id === selectedProductId);
    if (!product) return;

    // Update physical and available stock
    setProducts(
      products.map((p) =>
        p.id === selectedProductId
          ? {
              ...p,
              physicalStock: p.physicalStock + addQty,
              availableStock: p.availableStock + addQty,
            }
          : p
      )
    );

    // Record immutable audit movement
    const newMovement: StockMovementType = {
      id: `mov-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      sku: product.sku,
      movementType: "PURCHASE_IN",
      quantity: addQty,
      referenceId,
      performedBy: "Vikas Shinde (Warehouse Manager)",
      note,
      createdAt: new Date().toISOString(),
    };

    setMovements([newMovement, ...movements]);
    setIsAddStockOpen(false);
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.hsnCode.includes(search)
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
            <span>Dual-Ledger Operations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Inventory & Warehouse Stock Control
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Physical stock vs committed order reservations (Available = Physical − Reserved).
          </p>
        </div>

        <button
          onClick={() => setIsAddStockOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-md shadow-blue-600/20 transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add Batch Manufacturing Lot</span>
        </button>
      </div>

      {/* Dual Ledger Table */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-3 border-b border-slate-100">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by SKU, Name, HSN..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-4 text-xs font-bold">
            <div className="flex items-center gap-1.5 text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
              <span>Physical (On-Shelf)</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-600">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>Reserved (Holds)</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-600">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Available to Promise</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                <th className="pb-3">Part Details & SKU</th>
                <th className="pb-3">Vehicle Fitment</th>
                <th className="pb-3">Tariff HSN</th>
                <th className="pb-3 text-center">Physical Stock</th>
                <th className="pb-3 text-center">Reserved Stock</th>
                <th className="pb-3 text-center">Available Stock</th>
                <th className="pb-3 text-center">Min Threshold</th>
                <th className="pb-3 text-right">Warehouse Bay</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredProducts.map((prod) => (
                <tr key={prod.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-4">
                    <div className="font-bold text-slate-900">{prod.name}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{prod.sku}</div>
                  </td>
                  <td className="py-4 text-slate-600">
                    {prod.vehicleMake} {prod.vehicleModel}
                  </td>
                  <td className="py-4 font-mono text-blue-600 font-bold">{prod.hsnCode}</td>
                  <td className="py-4 text-center font-mono font-bold text-slate-900 text-sm">
                    {prod.physicalStock}
                  </td>
                  <td className="py-4 text-center font-mono font-bold text-amber-600 text-sm">
                    {prod.reservedStock}
                  </td>
                  <td className="py-4 text-center">
                    <span className="font-mono font-bold text-emerald-600 text-sm px-2 py-0.5 rounded-lg bg-emerald-50 border border-emerald-200">
                      {prod.availableStock}
                    </span>
                  </td>
                  <td className="py-4 text-center font-mono text-slate-500">{prod.minThreshold} pcs</td>
                  <td className="py-4 text-right font-mono font-bold text-slate-600">{prod.warehouseBay}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Immutable Stock Movement Audit Log */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-base">Immutable Stock Movement Audit Ledger</h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">Transactional Log</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                <th className="pb-3">Timestamp</th>
                <th className="pb-3">Part Description</th>
                <th className="pb-3">Movement Type</th>
                <th className="pb-3 text-center">Quantity Delta</th>
                <th className="pb-3">Reference / Order ID</th>
                <th className="pb-3">Operator</th>
                <th className="pb-3">Audit Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {movements.map((mov) => (
                <tr key={mov.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 text-slate-500 font-mono text-[11px]">
                    {new Date(mov.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}, {new Date(mov.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 font-bold text-slate-900">{mov.productName}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                        mov.movementType === "PURCHASE_IN"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : mov.movementType === "RESERVATION_HOLD"
                          ? "bg-amber-50 text-amber-800 border border-amber-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {mov.movementType}
                    </span>
                  </td>
                  <td className="py-3 text-center font-mono font-bold text-slate-900">
                    {mov.quantity > 0 ? `+${mov.quantity}` : mov.quantity}
                  </td>
                  <td className="py-3 font-mono text-blue-600 font-bold">{mov.referenceId}</td>
                  <td className="py-3 text-slate-600">{mov.performedBy}</td>
                  <td className="py-3 text-slate-500 text-[11px]">{mov.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Stock Modal */}
      {isAddStockOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 border border-slate-200 shadow-2xl animate-fadeIn text-xs">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Receive Batch Production Lot</h3>
              <button
                onClick={() => setIsAddStockOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddStock} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Target Product SKU</label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.sku})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Received Units (+)</label>
                  <input
                    type="number"
                    min={1}
                    value={addQty}
                    onChange={(e) => setAddQty(parseInt(e.target.value) || 1)}
                    className="w-full py-2 px-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Lot / PO Batch ID</label>
                  <input
                    type="text"
                    required
                    value={referenceId}
                    onChange={(e) => setReferenceId(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Audit Note</label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddStockOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-600/20"
                >
                  Record Lot Inward
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
