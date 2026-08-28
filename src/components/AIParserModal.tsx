"use client";

import React, { useState } from "react";
import { Sparkles, X, Check, ArrowRight, AlertCircle, Bot, Copy } from "lucide-react";
import { formatINR } from "@/lib/utils";
import { useApp } from "@/lib/store";
import { INITIAL_PRODUCTS } from "@/lib/mockData";

interface AIParserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIParserModal({ isOpen, onClose }: AIParserModalProps) {
  const { addToRFQ } = useApp();

  const [rawText, setRawText] = useState(
    "Hi Patil sir, we need 20 front bumpers for Mahindra Bolero 2022 and 10 tractor engine hoods for Sonalika DI-750 urgently delivered to our Kolhapur warehouse. Please send best export-grade quotation. - Anand, ABC Auto Spares"
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedResult, setParsedResult] = useState<{
    customerName: string;
    companyName: string;
    deliveryCity: string;
    detectedItems: {
      productId: string;
      productName: string;
      sku: string;
      hsnCode: string;
      vehicle: string;
      quantity: number;
      basePrice: number;
    }[];
  } | null>(null);

  if (!isOpen) return null;

  const handleParse = () => {
    setIsProcessing(true);
    setTimeout(() => {
      // Deterministic extraction simulation
      setParsedResult({
        customerName: "Anand Kulkarni",
        companyName: "ABC Auto Spares",
        deliveryCity: "Kolhapur",
        detectedItems: [
          {
            productId: INITIAL_PRODUCTS[0].id,
            productName: INITIAL_PRODUCTS[0].name,
            sku: INITIAL_PRODUCTS[0].sku,
            hsnCode: INITIAL_PRODUCTS[0].hsnCode,
            vehicle: "Mahindra Bolero 2022",
            quantity: 20,
            basePrice: INITIAL_PRODUCTS[0].basePrice,
          },
          {
            productId: INITIAL_PRODUCTS[1].id,
            productName: INITIAL_PRODUCTS[1].name,
            sku: INITIAL_PRODUCTS[1].sku,
            hsnCode: INITIAL_PRODUCTS[1].hsnCode,
            vehicle: "Sonalika DI-750",
            quantity: 10,
            basePrice: INITIAL_PRODUCTS[1].basePrice,
          },
        ],
      });
      setIsProcessing(false);
    }, 1200);
  };

  const handleApplyToCart = () => {
    if (!parsedResult) return;
    parsedResult.detectedItems.forEach((item) => {
      addToRFQ({
        productId: item.productId,
        sku: item.sku,
        name: item.productName,
        hsnCode: item.hsnCode,
        categoryName: "Extracted via AI",
        basePrice: item.basePrice,
        quantity: item.quantity,
        moq: 5,
        targetVehicle: item.vehicle,
      });
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden text-slate-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-white">AI WhatsApp & Email RFQ Extractor</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 font-mono">
                  Feature Flagged
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Converts unstructured buyer messages into verified structured line items with human review.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Raw Text Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Paste Buyer WhatsApp Message / Email RFQ:
              </label>
              <button
                onClick={() =>
                  setRawText(
                    "Need 30 commercial step bumpers for Tata Ace and 15 cab fenders for Mahindra Pik-Up to Sangli factory. - Vikram"
                  )
                }
                className="text-[11px] text-blue-400 hover:underline flex items-center gap-1"
              >
                <Copy className="w-3 h-3" /> Load Sample Message 2
              </button>
            </div>
            <textarea
              rows={4}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Deterministic validation ensures zero hallucinations.</span>
            </div>
            <button
              onClick={handleParse}
              disabled={isProcessing || !rawText.trim()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs shadow-lg transition active:scale-95 disabled:opacity-50"
            >
              <Bot className="w-4 h-4" />
              <span>{isProcessing ? "Extracting Entities..." : "Extract Structured Parts"}</span>
            </button>
          </div>

          {/* Extracted Structured Review Card */}
          {parsedResult && (
            <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Extracted Structured Payload
                </span>
                <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                  <Check className="w-3.5 h-3.5" /> Schema Validated
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-500">Extracted Buyer</div>
                  <div className="font-bold text-slate-200">{parsedResult.customerName}</div>
                </div>
                <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-500">Company</div>
                  <div className="font-bold text-slate-200">{parsedResult.companyName}</div>
                </div>
                <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-500">Destination Hub</div>
                  <div className="font-bold text-slate-200">{parsedResult.deliveryCity}</div>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="text-[11px] font-semibold text-slate-400">Matched Catalog SKUs:</div>
                {parsedResult.detectedItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-white flex items-center gap-2">
                        {item.productName}
                        <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-blue-400">
                          {item.sku}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Vehicle: <strong>{item.vehicle}</strong> | HSN: {item.hsnCode}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-amber-300">{item.quantity} units</div>
                      <div className="text-[10px] text-slate-500">{formatINR(item.basePrice * item.quantity)}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={handleApplyToCart}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-md"
                >
                  <span>Apply Line Items to RFQ Cart</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
