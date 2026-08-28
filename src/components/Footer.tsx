import React from "react";
import Link from "next/link";
import { ShieldCheck, MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import SaiLogo from "./SaiLogo";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Corporate Profile */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <SaiLogo className="w-8 h-8 rounded-lg shadow-sm" />
              <span className="text-white font-bold text-base tracking-tight">Sai Envirotech Solutions</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Leading Manufacturer & Exporter of Automotive Bumpers, Body Accessories, Tractor Engine Hoods, and JCB Cabin Panels based in Maharashtra.
            </p>
            <div className="pt-2 flex flex-col gap-1 text-[11px] text-slate-300">
              <div><strong>GSTIN:</strong> 27AALCS9821P1Z4</div>
              <div><strong>IEC (Export Code):</strong> 0315082194</div>
              <div><strong>Primary HSN:</strong> 8707, 87071000</div>
            </div>
          </div>

          {/* Col 2: Product Categories */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Manufacturing Range</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/products?cat=automotive-accessories" className="hover:text-white transition">
                  • Car Bumpers & Crash Guards (HSN 87071000)
                </Link>
              </li>
              <li>
                <Link href="/products?cat=tractor-parts" className="hover:text-white transition">
                  • Tractor Body Parts & Engine Hoods (HSN 8707)
                </Link>
              </li>
              <li>
                <Link href="/products?cat=automobile-spare-parts" className="hover:text-white transition">
                  • Commercial Cab Fenders & Step Bumpers
                </Link>
              </li>
              <li>
                <Link href="/products?vehicle=Mahindra" className="hover:text-white transition">
                  • Mahindra Bolero / Pik-Up Compatible Range
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Factory Contact */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Works & Registered Office</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>Uran Islampur, Sangli District, Maharashtra - 415409, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Contact Person: S Patil</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>enquiries@sai-envirotech.com</span>
              </div>
            </div>
          </div>

          {/* Col 4: Platform & IndiaMART Ecosystem */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">B2B Integration</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Unified digital operations platform for Sai Envirotech Solutions, managing RFQs, commercial quotations, dual-ledger stock reservations, and order tracking.
            </p>
            <div className="pt-1">
              <a
                href="https://www.indiamart.com/sai-envirotech-solutions/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition"
              >
                <span>IndiaMART Verified Seller Page</span>
                <ExternalLink className="w-3 h-3 text-blue-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Sai Envirotech Solutions. All rights reserved. Platform: <strong>Sai AutoHub</strong>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="hover:text-slate-300">Admin ERP</Link>
            <Link href="/portal/dashboard" className="hover:text-slate-300">Customer Portal</Link>
            <Link href="/track-order" className="hover:text-slate-300">Tracking Token Lookup</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
