/**
 * GST Calculation Engine for Sai AutoHub
 * Home State: Maharashtra (State Code: "27")
 * Intra-State (Maharashtra -> Maharashtra): CGST (9%) + SGST (9%)
 * Inter-State (Maharashtra -> Other States): IGST (18%)
 */

export interface TaxCalculationParams {
  items: {
    quantity: number;
    unitPrice: number;
    discountPercent?: number;
    taxRatePercent?: number; // fallback default 18.0%
  }[];
  shippingStateCode: string; // e.g. "27"
  packagingCharges?: number;
  freightCharges?: number;
  customDiscountAmount?: number;
}

export interface TaxCalculationResult {
  isInterState: boolean;
  netTaxableAmount: number;
  discountAmount: number;
  packagingCharges: number;
  freightCharges: number;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  taxAmount: number;
  grossOrderValue: number;
  lineItems: {
    taxableAmount: number;
    taxAmount: number;
    totalWithTax: number;
  }[];
}

export function calculateGST(params: TaxCalculationParams): TaxCalculationResult {
  const {
    items,
    shippingStateCode,
    packagingCharges = 0,
    freightCharges = 0,
    customDiscountAmount = 0,
  } = params;

  const isInterState = shippingStateCode !== "27";

  let netTaxableAmount = 0;
  const lineItems = items.map((item) => {
    const rawTotal = item.quantity * item.unitPrice;
    const discount = rawTotal * ((item.discountPercent || 0) / 100);
    const taxableAmount = rawTotal - discount;
    netTaxableAmount += taxableAmount;

    const rate = item.taxRatePercent ?? 18.0;
    const taxAmount = taxableAmount * (rate / 100);
    const totalWithTax = taxableAmount + taxAmount;

    return {
      taxableAmount,
      taxAmount,
      totalWithTax,
    };
  });

  // Apply packaging & freight to taxable base as per GST valuation rules
  const totalTaxableBase = Math.max(0, netTaxableAmount + packagingCharges - customDiscountAmount);
  
  // Weighted average tax rate for overall order packaging
  const effectiveTaxRate = items.length > 0 && netTaxableAmount > 0
    ? lineItems.reduce((acc, curr) => acc + curr.taxAmount, 0) / netTaxableAmount
    : 0.18;

  let cgstAmount = 0;
  let sgstAmount = 0;
  let igstAmount = 0;

  if (isInterState) {
    igstAmount = totalTaxableBase * effectiveTaxRate;
  } else {
    cgstAmount = (totalTaxableBase * effectiveTaxRate) / 2;
    sgstAmount = (totalTaxableBase * effectiveTaxRate) / 2;
  }

  const taxAmount = isInterState ? igstAmount : cgstAmount + sgstAmount;
  const grossOrderValue = totalTaxableBase + taxAmount + freightCharges;

  return {
    isInterState,
    netTaxableAmount: Math.round(netTaxableAmount * 100) / 100,
    discountAmount: Math.round(customDiscountAmount * 100) / 100,
    packagingCharges: Math.round(packagingCharges * 100) / 100,
    freightCharges: Math.round(freightCharges * 100) / 100,
    cgstAmount: Math.round(cgstAmount * 100) / 100,
    sgstAmount: Math.round(sgstAmount * 100) / 100,
    igstAmount: Math.round(igstAmount * 100) / 100,
    taxAmount: Math.round(taxAmount * 100) / 100,
    grossOrderValue: Math.round(grossOrderValue * 100) / 100,
    lineItems,
  };
}
