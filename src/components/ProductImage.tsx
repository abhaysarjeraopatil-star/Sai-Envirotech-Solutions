"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Package, ShieldCheck, Truck, Layers, Wrench } from "lucide-react";

interface ProductImageProps {
  src?: string;
  alt: string;
  categorySlug?: string;
  sku?: string;
  className?: string;
  hsnCode?: string;
}

export default function ProductImage({
  src,
  alt,
  categorySlug,
  sku,
  className = "",
  hsnCode,
}: ProductImageProps) {
  const [imgError, setImgError] = useState(false);

  // If image fails or is empty, render a clean, high-precision industrial vector schematic
  if (imgError || !src) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-100 to-slate-200/80 p-6 text-slate-400 select-none relative overflow-hidden">
        {/* Subtle engineering grid */}
        <div className="absolute inset-0 industrial-grid-light opacity-50 pointer-events-none" />

        {/* Technical Schematic Icon */}
        <div className="relative z-10 w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-blue-600 mb-2">
          {categorySlug === "tractor-parts" ? (
            <Truck className="w-8 h-8 text-amber-600" />
          ) : categorySlug === "automobile-spare-parts" ? (
            <Wrench className="w-8 h-8 text-indigo-600" />
          ) : (
            <Layers className="w-8 h-8 text-blue-600" />
          )}
        </div>

        <div className="relative z-10 text-center space-y-0.5">
          <span className="font-mono text-[10px] font-bold text-slate-700 bg-white/80 px-2 py-0.5 rounded border border-slate-200">
            {sku || "AUTOMOTIVE COMPONENT"}
          </span>
          <span className="text-[11px] font-semibold text-slate-500 block truncate max-w-[180px]">
            {alt}
          </span>
          {hsnCode && (
            <span className="text-[9px] text-blue-700 font-mono font-bold block">
              TARIFF HSN {hsnCode}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full flex items-center justify-center bg-slate-50/80 overflow-hidden ${className}`}>
      {/* Subtle blueprint grid in background to unify isolated product shots */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-100 pointer-events-none" />
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setImgError(true)}
        className="relative z-10 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
}
