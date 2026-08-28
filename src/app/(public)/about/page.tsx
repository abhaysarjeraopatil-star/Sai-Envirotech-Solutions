import React from "react";
import { ShieldCheck, MapPin, Building, Award, CheckCircle, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
          <Building className="w-3.5 h-3.5" /> Established Manufacturing Baseline
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          About Sai Envirotech Solutions
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
          Based in Uran Islampur, Sangli District (Maharashtra), Sai Envirotech Solutions specializes in precision automotive body assemblies, heavy-duty utility vehicle bumpers, and agricultural tractor components.
        </p>
      </div>

      {/* 3 Core Strengths */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">HSN 8707 & 87071000 Compliance</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Registered and classified under central customs codes for passenger car bodies (87071000) and commercial/tractor shells (8707).
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Uran Islampur Logistics Hub</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Located in the Sangli-Kolhapur industrial corridor with direct freight connectivity via JNPT port for international container export.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">B2B Trade & Exporter</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Trusted supplier for state road transport undertakings, automotive fleet operators, and commercial tractor distributors across Western India.
          </p>
        </div>
      </div>

      {/* Corporate Metadata Box */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 space-y-6 shadow-xl">
        <h3 className="text-lg font-bold">Commercial & Statutory Details</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Enterprise Legal Name</span>
            <span className="font-bold text-slate-200">Sai Envirotech Solutions</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Primary Contact Person</span>
            <span className="font-bold text-slate-200">S Patil</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">GSTIN Registration</span>
            <span className="font-mono font-bold text-blue-400">27AALCS9821P1Z4</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Import-Export Code (IEC)</span>
            <span className="font-mono font-bold text-amber-400">0315082194</span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">Verified IndiaMART Trade Profile Baseline</span>
          <a
            href="https://www.indiamart.com/sai-envirotech-solutions/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition"
          >
            <span>View IndiaMART Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
