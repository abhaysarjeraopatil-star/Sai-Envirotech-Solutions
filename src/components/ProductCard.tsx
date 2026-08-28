"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ProductType } from "@/lib/mockData";
import { formatINR } from "@/lib/utils";
import { useApp } from "@/lib/store";
import { ShieldCheck, Plus, Check, Truck } from "lucide-react";
import ProductImage from "./ProductImage";

interface ProductCardProps {
  product: ProductType;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToRFQ, rfqItems } = useApp();
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(product.moq);

  const isInCart = rfqItems.some((item) => item.productId === product.id);

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
    <div className="group rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        {/* Isolated Product Image Container (Fixed Height + Contain) */}
        <div className="relative h-[220px] sm:h-[240px] bg-slate-50/80 border-b border-slate-100 overflow-hidden">
          <ProductImage
            src={product.image}
            alt={product.name}
            categorySlug={product.categoryId}
            sku={product.sku}
            hsnCode={product.hsnCode}
          />

          {/* Top Floating Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-20 pointer-events-none">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-600/95 text-white shadow-sm backdrop-blur-sm">
              <ShieldCheck className="w-3 h-3" /> Factory Production SKU
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-900/90 text-blue-300 backdrop-blur-sm w-fit">
              HSN {product.hsnCode}
            </span>
          </div>

          {/* Stock Availability Tag */}
          <div className="absolute bottom-3 right-3 z-20 pointer-events-none">
            <span
              className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold shadow-sm backdrop-blur-md ${
                product.availableStock > product.minThreshold
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : product.availableStock > 0
                  ? "bg-amber-50 text-amber-700 border border-amber-200"
                  : "bg-rose-50 text-rose-700 border border-rose-200"
              }`}
            >
              {product.availableStock > 0 ? `${product.availableStock} in Stock` : "Made to Order"}
            </span>
          </div>
        </div>

        {/* Card Body with strict baseline alignment */}
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="truncate max-w-[140px] font-medium">{product.categoryName}</span>
            <span className="font-mono text-[11px] font-bold text-slate-700">{product.sku}</span>
          </div>

          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="font-bold text-slate-900 text-sm hover:text-blue-600 transition line-clamp-2 h-[40px] leading-tight">
              {product.name}
            </h3>
          </Link>

          {/* Vehicle Compatibility Tag */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-100 h-[34px]">
            <Truck className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
            <span className="truncate text-[11px] font-medium">
              Fits: <strong>{product.vehicleMake} {product.vehicleModel}</strong>
            </span>
          </div>

          {/* Price & MOQ Indicator */}
          <div className="pt-2 border-t border-slate-100 flex items-end justify-between">
            <div>
              <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Wholesale Base Rate</div>
              <div className="text-lg font-black text-slate-900 leading-none mt-0.5">
                {formatINR(product.basePrice)}
                <span className="text-xs font-normal text-slate-500 ml-1">/ pc</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
                MOQ: {product.moq} pcs
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Actions (Fixed Baseline) */}
      <div className="p-5 pt-0">
        <div className="flex items-center gap-2">
          <div className="w-20">
            <input
              type="number"
              min={product.moq}
              value={qty}
              onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || product.moq))}
              className="w-full text-center text-xs font-bold py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Quantity"
            />
          </div>

          <button
            onClick={handleAdd}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 ${
              added || isInCart
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20"
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" /> Added to RFQ
              </>
            ) : isInCart ? (
              <>
                <Check className="w-4 h-4" /> In RFQ (+{qty})
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" /> Add to RFQ
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
