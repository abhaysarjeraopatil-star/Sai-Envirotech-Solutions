"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { INITIAL_PRODUCTS } from "@/lib/mockData";
import { formatINR } from "@/lib/utils";
import { useApp } from "@/lib/store";
import {
  ShieldCheck,
  Truck,
  Layers,
  ArrowLeft,
  Check,
  Plus,
  Building,
  AlertCircle,
} from "lucide-react";
import ProductImage from "@/components/ProductImage";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { addToRFQ, rfqItems } = useApp();

  const product = INITIAL_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Product SKU Not Found</h2>
        <p className="text-xs text-slate-500">The requested automotive part does not exist in the active catalog.</p>
        <Link href="/products" className="inline-block px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const [qty, setQty] = useState(product.moq);
  const [added, setAdded] = useState(false);

  const isInCart = rfqItems.some((i) => i.productId === product.id);

  const handleAdd = () => {
    addToRFQ({
      productId: product.id,
      sku: product.sku,
      name: product.name,
      hsnCode: product.hsnCode,
      categoryName: product.categoryName,
      basePrice: product.basePrice,
      quantity: Math.max(product.moq, qty),
      moq: product.moq,
      targetVehicle: `${product.vehicleMake} ${product.vehicleModel}`,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/products" className="hover:text-blue-600 flex items-center gap-1 font-medium">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Catalog
        </Link>
        <span>/</span>
        <span>{product.categoryName}</span>
        <span>/</span>
        <span className="font-bold text-slate-900">{product.sku}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
        {/* Left Column: Isolated Product Image & Badges */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 h-[360px] sm:h-[420px]">
            <ProductImage
              src={product.image}
              alt={product.name}
              categorySlug={product.categoryId}
              sku={product.sku}
              hsnCode={product.hsnCode}
            />

            <div className="absolute top-4 left-4 flex flex-col gap-2 z-20 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-md backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4" /> Verified Sai Envirotech Factory SKU
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-900 text-blue-300 w-fit">
                HSN {product.hsnCode}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1 text-slate-600">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <Building className="w-4 h-4 text-blue-600" /> Factory Location & Dispatch Point:
            </div>
            <p>
              Sai Envirotech Solutions Works, Uran Islampur, Sangli District, Maharashtra. Ex-factory dispatch ready on wooden pallets.
            </p>
          </div>
        </div>

        {/* Right Column: Specifications & Commercial Action */}
        <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
                <span>{product.categoryName}</span>
                <span>•</span>
                <span className="font-mono text-slate-700">{product.sku}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {product.name}
              </h1>
            </div>

            {/* Vehicle Compatibility Banner */}
            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 flex items-center gap-3">
              <Truck className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div className="text-xs">
                <div className="text-blue-900 font-bold">Vehicle Platform Fitment:</div>
                <div className="text-blue-800">
                  {product.vehicleMake} {product.vehicleModel} (Model Years: {product.modelYearRange})
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Technical Specifications Table */}
            <div className="pt-2 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                Technical Specifications
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 block text-[11px]">Material Composition</span>
                  <span className="font-bold text-slate-800">{product.material || "High-Impact Composite"}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 block text-[11px]">Dimensions (L×W×H)</span>
                  <span className="font-bold text-slate-800">{product.dimensions}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 block text-[11px]">Unit Weight</span>
                  <span className="font-bold text-slate-800">{product.weightKg} kg</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 block text-[11px]">Warehouse Storage Bay</span>
                  <span className="font-bold text-slate-800">{product.warehouseBay}</span>
                </div>
              </div>
            </div>

            {/* Inventory Status */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-500 block text-[11px]">Dual-Ledger Availability</span>
                <span className="font-bold text-slate-900 text-sm">
                  {product.availableStock} pcs Available to Promise
                </span>
                <span className="text-[11px] text-slate-400 block">
                  (Physical: {product.physicalStock} | Reserved: {product.reservedStock})
                </span>
              </div>
              <span className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                In Stock Ready
              </span>
            </div>
          </div>

          {/* Pricing & Commercial Order Block */}
          <div className="pt-4 border-t border-slate-200 space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-500 font-medium">Wholesale Base Price:</span>
                <div className="text-3xl font-black text-slate-900 leading-none">
                  {formatINR(product.basePrice)}
                  <span className="text-xs font-normal text-slate-500 ml-1.5">/ piece + GST</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-100 text-blue-800">
                  MOQ: {product.moq} units
                </span>
              </div>
            </div>

            {/* Quantity Selector and RFQ Add */}
            <div className="flex items-center gap-3">
              <div className="w-32">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Order Quantity (Min {product.moq})
                </label>
                <input
                  type="number"
                  min={product.moq}
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || product.moq))}
                  className="w-full text-center text-sm font-bold py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex-1 pt-4">
                <button
                  onClick={handleAdd}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-extrabold text-sm shadow-xl transition-all active:scale-95 ${
                    added || isInCart
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/25"
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-5 h-5" /> Added to Batch RFQ
                    </>
                  ) : isInCart ? (
                    <>
                      <Check className="w-5 h-5" /> Added in RFQ (+{qty})
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" /> Add to Batch RFQ Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
