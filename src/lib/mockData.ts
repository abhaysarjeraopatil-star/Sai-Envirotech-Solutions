export interface ProductType {
  id: string;
  sku: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  hsnCode: string;
  taxRatePercent: number;
  description: string;
  material: string;
  vehicleMake: string;
  vehicleModel: string;
  modelYearRange: string;
  moq: number;
  basePrice: number;
  image: string;
  dimensions: string;
  weightKg: number;
  isVerified: boolean;
  physicalStock: number;
  reservedStock: number;
  availableStock: number;
  minThreshold: number;
  reorderQty: number;
  warehouseBay: string;
}

export interface EnquiryType {
  id: string;
  enquiryNumber: string;
  contactName: string;
  companyName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  source: "WEBSITE_RFQ" | "INDIAMART" | "WHATSAPP_ASSISTED" | "DIRECT";
  status: "NEW" | "CONTACTED" | "SPECS_VERIFIED" | "QUOTATION_SENT" | "WON" | "LOST";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  assignedTo: string;
  additionalReqs: string;
  items: {
    productId: string;
    productName: string;
    targetVehicle: string;
    quantityRequested: number;
    targetPrice?: number;
  }[];
  createdAt: string;
}

export interface QuotationType {
  id: string;
  quoteNumber: string;
  enquiryId?: string;
  customerName: string;
  companyName: string;
  email: string;
  phone: string;
  shippingState: string;
  shippingStateCode: string;
  isInterState: boolean;
  status: "DRAFT" | "SENT" | "ACCEPTED" | "REJECTED" | "EXPIRED";
  validUntil: string;
  netTaxableAmount: number;
  discountAmount: number;
  packagingCharges: number;
  freightCharges: number;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  taxAmount: number;
  grossOrderValue: number;
  paymentTerms: string;
  deliveryTerms: string;
  notes: string;
  createdBy: string;
  createdAt: string;
  items: {
    productId: string;
    productName: string;
    sku: string;
    hsnCode: string;
    quantity: number;
    unitPrice: number;
    taxRatePercent: number;
    taxAmount: number;
    totalTaxable: number;
    totalWithTax: number;
  }[];
  statusHistory: {
    status: string;
    changedBy: string;
    note: string;
    timestamp: string;
  }[];
}

export interface OrderType {
  id: string;
  orderNumber: string;
  trackingToken: string;
  quotationNumber?: string;
  customerName: string;
  companyName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  netTaxableAmount: number;
  taxAmount: number;
  packagingCharges: number;
  freightCharges: number;
  grossOrderValue: number;
  paymentStatus: "PENDING" | "PARTIAL_ADVANCE" | "PAID_ON_DISPATCH" | "NET_30" | "COMPLETED";
  fulfillmentStatus: "CONFIRMED" | "IN_PRODUCTION" | "PACKED" | "DISPATCHED" | "DELIVERED" | "CANCELLED";
  transporterName?: string;
  trackingAwb?: string;
  dispatchDate?: string;
  estimatedDelivery?: string;
  items: {
    productId: string;
    productName: string;
    sku?: string;
    quantity: number;
    unitPrice: number;
    taxAmount?: number;
    totalPrice?: number;
  }[];
  statusHistory: {
    status: string;
    changedBy: string;
    note: string;
    timestamp: string;
  }[];
}

export interface StockMovementType {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  movementType: "PURCHASE_IN" | "RESERVATION_HOLD" | "DISPATCH_OUT" | "RETURN_IN" | "AUDIT_ADJUST";
  quantity: number;
  referenceId: string;
  performedBy: string;
  note: string;
  createdAt: string;
}

export const INITIAL_CATEGORIES = [
  {
    id: "cat-1",
    name: "Automotive Accessories",
    slug: "automotive-accessories",
    description: "Heavy-duty exterior bumpers, footrests, and protection guards.",
    image: "https://images.unsplash.com/photo-1524486361537-8ad15938e1a3?w=800&auto=format&fit=crop&q=80",
    hsnDefault: "87071000",
  },
  {
    id: "cat-2",
    name: "Tractor & Earthmoving Covers",
    slug: "tractor-parts",
    description: "Deep-draw cold-rolled steel hoods, bonnets, JCB cabin covers, and heavy panels.",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Sonalika_Tractor.jpg",
    hsnDefault: "8707",
  },
  {
    id: "cat-3",
    name: "Automobile Spare Parts",
    slug: "automobile-spare-parts",
    description: "Precision stamped replacement sheet metal panels and cab components.",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&auto=format&fit=crop&q=80",
    hsnDefault: "87071000",
  },
];

export const INITIAL_PRODUCTS: ProductType[] = [
  {
    id: "prod-1",
    sku: "SE-CB-001",
    name: "Heavy-Duty Front Car Bumper Assembly",
    slug: "heavy-duty-front-car-bumper-assembly",
    categoryId: "cat-1",
    categoryName: "Automotive Accessories",
    hsnCode: "87071000",
    taxRatePercent: 18.0,
    description: "Reinforced high-impact polypropylene composite bumper designed for commercial utility vehicles. Features primer finish ready for OEM color matching.",
    material: "High-Grade Polypropylene (PP) / ABS",
    vehicleMake: "Mahindra",
    vehicleModel: "Bolero / Bolero Maxi Truck",
    modelYearRange: "2018-2025",
    moq: 10,
    basePrice: 2450.0,
    image: "",
    dimensions: "1680 x 340 x 290 mm",
    weightKg: 8.5,
    isVerified: true,
    physicalStock: 45,
    reservedStock: 10,
    availableStock: 35,
    minThreshold: 15,
    reorderQty: 50,
    warehouseBay: "Bay-A1-04",
  },
  {
    id: "prod-2",
    sku: "SE-TB-102",
    name: "Tractor Engine Hood & Body Cover Shell",
    slug: "tractor-engine-hood-body-cover-shell",
    categoryId: "cat-2",
    categoryName: "Tractor & Earthmoving Covers",
    hsnCode: "8707",
    taxRatePercent: 18.0,
    description: "Press-formed cold-rolled steel tractor bonnet and side louvers engineered for optimal engine heat dissipation and extreme agricultural durability.",
    material: "Cold-Rolled Deep Drawing Steel (CR4)",
    vehicleMake: "Mahindra / Sonalika",
    vehicleModel: "575 DI / DI-750 III",
    modelYearRange: "2015-2024",
    moq: 5,
    basePrice: 6800.0,
    image: "",
    dimensions: "1250 x 680 x 520 mm",
    weightKg: 22.0,
    isVerified: true,
    physicalStock: 28,
    reservedStock: 5,
    availableStock: 23,
    minThreshold: 10,
    reorderQty: 30,
    warehouseBay: "Bay-T1-12",
  },
  {
    id: "prod-3",
    sku: "SE-JCB-301",
    name: "JCB 3DX Heavy Backhoe Cabin Enclosure Panel & Bumper",
    slug: "jcb-3dx-heavy-backhoe-cabin-enclosure-panel-bumper",
    categoryId: "cat-2",
    categoryName: "Tractor & Earthmoving Covers",
    hsnCode: "8707",
    taxRatePercent: 18.0,
    description: "Heavy-gauge reinforced steel operator cabin side panel and front radiator guard assembly specifically engineered for JCB 3DX / 4DX earthmoving loaders.",
    material: "Heavy-Duty Structural Steel Plate (3.0mm)",
    vehicleMake: "JCB",
    vehicleModel: "3DX / 4DX Super Backhoe Loader",
    modelYearRange: "2016-2025",
    moq: 3,
    basePrice: 11500.0,
    image: "",
    dimensions: "1480 x 720 x 480 mm",
    weightKg: 34.0,
    isVerified: true,
    physicalStock: 16,
    reservedStock: 2,
    availableStock: 14,
    minThreshold: 5,
    reorderQty: 20,
    warehouseBay: "Bay-J1-02",
  },
  {
    id: "prod-4",
    sku: "SE-SP-304",
    name: "Front Cab Fender Panel Assembly",
    slug: "front-cab-fender-panel-assembly",
    categoryId: "cat-3",
    categoryName: "Automobile Spare Parts",
    hsnCode: "87071000",
    taxRatePercent: 18.0,
    description: "Precision stamped left/right quarter body fender panel with factory electro-deposition coating (ED-coat).",
    material: "Electro-Galvanized Sheet Metal (0.9mm)",
    vehicleMake: "Mahindra",
    vehicleModel: "Bolero Camper / Pik-Up",
    modelYearRange: "2017-2025",
    moq: 8,
    basePrice: 3200.0,
    image: "",
    dimensions: "1100 x 750 x 180 mm",
    weightKg: 9.8,
    isVerified: true,
    physicalStock: 35,
    reservedStock: 8,
    availableStock: 27,
    minThreshold: 12,
    reorderQty: 40,
    warehouseBay: "Bay-S1-03",
  },
  {
    id: "prod-5",
    sku: "SE-TR-501",
    name: "Tractor Mudguard & Heavy Fender Arch Assembly",
    slug: "tractor-mudguard-heavy-fender-arch-assembly",
    categoryId: "cat-2",
    categoryName: "Tractor & Earthmoving Covers",
    hsnCode: "8707",
    taxRatePercent: 18.0,
    description: "Heavy-duty curved rear mudguard arches with reinforced mounting brackets for agricultural tractors.",
    material: "Structural Steel with Anti-Rust Primer",
    vehicleMake: "Swaraj / John Deere",
    vehicleModel: "744 FE / 5050D",
    modelYearRange: "2016-2024",
    moq: 6,
    basePrice: 5400.0,
    image: "",
    dimensions: "1350 x 500 x 600 mm",
    weightKg: 18.5,
    isVerified: true,
    physicalStock: 12,
    reservedStock: 0,
    availableStock: 12,
    minThreshold: 8,
    reorderQty: 25,
    warehouseBay: "Bay-T2-01",
  },
  {
    id: "prod-6",
    sku: "SE-AC-602",
    name: "Commercial Utility Rear Step Bumper Guard",
    slug: "commercial-utility-rear-step-bumper-guard",
    categoryId: "cat-1",
    categoryName: "Automotive Accessories",
    hsnCode: "87071000",
    taxRatePercent: 18.0,
    description: "Anti-slip perforated powder-coated steel step bumper for light commercial passenger/cargo vehicles.",
    material: "Powder Coated Tubular Steel",
    vehicleMake: "Tata",
    vehicleModel: "Ace Gold / Super Ace",
    modelYearRange: "2019-2025",
    moq: 15,
    basePrice: 1850.0,
    image: "",
    dimensions: "1450 x 200 x 180 mm",
    weightKg: 7.2,
    isVerified: true,
    physicalStock: 60,
    reservedStock: 15,
    availableStock: 45,
    minThreshold: 20,
    reorderQty: 80,
    warehouseBay: "Bay-A2-08",
  },
];

export const INITIAL_ENQUIRIES: EnquiryType[] = [
  {
    id: "enq-10482",
    enquiryNumber: "ENQ-10482",
    contactName: "Anand Kulkarni",
    companyName: "ABC Auto Spares & Logistics Pvt Ltd",
    email: "client@abcautoparts.com",
    phone: "+91 94230 88990",
    city: "Kolhapur",
    state: "Maharashtra",
    source: "WEBSITE_RFQ",
    status: "QUOTATION_SENT",
    priority: "HIGH",
    assignedTo: "Rahul Deshmukh (Sales Head)",
    additionalReqs: "Urgent requirement for upcoming Bolero & JCB fleet maintenance cycle.",
    items: [
      {
        productId: "prod-1",
        productName: "Heavy-Duty Front Car Bumper Assembly",
        targetVehicle: "Mahindra Bolero 2022",
        quantityRequested: 15,
        targetPrice: 2400.0,
      },
      {
        productId: "prod-3",
        productName: "JCB 3DX Heavy Backhoe Cabin Enclosure Panel & Bumper",
        targetVehicle: "JCB 3DX Super",
        quantityRequested: 4,
        targetPrice: 11000.0,
      },
    ],
    createdAt: "2026-08-27T10:30:00Z",
  },
  {
    id: "enq-10483",
    enquiryNumber: "ENQ-10483",
    contactName: "Mahesh Jagtap",
    companyName: "Swaraj Agro & Earthmoving Traders",
    email: "procure@swarajagro.in",
    phone: "+91 98900 11223",
    city: "Satara",
    state: "Maharashtra",
    source: "INDIAMART",
    status: "SPECS_VERIFIED",
    priority: "MEDIUM",
    assignedTo: "Rahul Deshmukh (Sales Head)",
    additionalReqs: "Direct inquiry from IndiaMART listing regarding Tractor & JCB body panel bulk lot.",
    items: [
      {
        productId: "prod-2",
        productName: "Tractor Engine Hood & Body Cover Shell",
        targetVehicle: "Sonalika DI-750",
        quantityRequested: 10,
        targetPrice: 6600.0,
      },
    ],
    createdAt: "2026-08-28T08:15:00Z",
  },
  {
    id: "enq-10484",
    enquiryNumber: "ENQ-10484",
    contactName: "Vikram Rathi",
    companyName: "Gujarat Commercial Body Builders",
    email: "orders@gujaratbody.com",
    phone: "+91 97120 44556",
    city: "Surat",
    state: "Gujarat",
    source: "DIRECT",
    status: "NEW",
    priority: "HIGH",
    assignedTo: "Rahul Deshmukh",
    additionalReqs: "Inter-state supply requirement. Requires IGST billing and door delivery to Surat warehouse.",
    items: [
      {
        productId: "prod-6",
        productName: "Commercial Utility Rear Step Bumper Guard",
        targetVehicle: "Tata Ace Gold",
        quantityRequested: 25,
        targetPrice: 1800.0,
      },
    ],
    createdAt: "2026-08-28T14:45:00Z",
  },
];

export const INITIAL_QUOTATIONS: QuotationType[] = [
  {
    id: "qt-2026-0012",
    quoteNumber: "QT-2026-0012",
    enquiryId: "enq-10482",
    customerName: "Anand Kulkarni",
    companyName: "ABC Auto Spares & Logistics Pvt Ltd",
    email: "client@abcautoparts.com",
    phone: "+91 94230 88990",
    shippingState: "Maharashtra",
    shippingStateCode: "27",
    isInterState: false,
    status: "SENT",
    validUntil: "2026-09-12T23:59:59Z",
    netTaxableAmount: 82000.0,
    discountAmount: 0.0,
    packagingCharges: 1500.0,
    freightCharges: 0.0,
    cgstAmount: 7515.0,
    sgstAmount: 7515.0,
    igstAmount: 0.0,
    taxAmount: 15030.0,
    grossOrderValue: 98530.0,
    paymentTerms: "100% against Proforma Invoice / Dispatch Advice",
    deliveryTerms: "Ex-Works Uran Islampur (Sangli)",
    notes: "Rates valid for 15 days. Standard wooden pallet packaging included.",
    createdBy: "Rahul Deshmukh (Commercial Lead)",
    createdAt: "2026-08-27T15:30:00Z",
    items: [
      {
        productId: "prod-1",
        productName: "Heavy-Duty Front Car Bumper Assembly",
        sku: "SE-CB-001",
        hsnCode: "87071000",
        quantity: 15,
        unitPrice: 2400.0,
        taxRatePercent: 18.0,
        taxAmount: 6480.0,
        totalTaxable: 36000.0,
        totalWithTax: 42480.0,
      },
      {
        productId: "prod-3",
        productName: "JCB 3DX Heavy Backhoe Cabin Enclosure Panel & Bumper",
        sku: "SE-JCB-301",
        hsnCode: "8707",
        quantity: 4,
        unitPrice: 11500.0,
        taxRatePercent: 18.0,
        taxAmount: 8280.0,
        totalTaxable: 46000.0,
        totalWithTax: 54280.0,
      },
    ],
    statusHistory: [
      {
        status: "DRAFT",
        changedBy: "Rahul Deshmukh",
        note: "Drafted quote based on Enquiry ENQ-10482 specifications.",
        timestamp: "2026-08-27T14:10:00Z",
      },
      {
        status: "SENT",
        changedBy: "Rahul Deshmukh",
        note: "Issued formal commercial proforma with 18% HSN tax schedule.",
        timestamp: "2026-08-27T15:30:00Z",
      },
    ],
  },
];

export const INITIAL_ORDERS: OrderType[] = [
  {
    id: "ord-2026-0041",
    orderNumber: "ORD-2026-0041",
    trackingToken: "AUT-8X3K9P",
    quotationNumber: "QT-2026-0009",
    customerName: "Anand Kulkarni",
    companyName: "ABC Auto Spares & Logistics Pvt Ltd",
    email: "client@abcautoparts.com",
    phone: "+91 94230 88990",
    shippingAddress: "Plot 42, MIDC Shiroli Industrial Estate, Kolhapur, Maharashtra - 416122",
    netTaxableAmount: 48500.0,
    taxAmount: 8730.0,
    packagingCharges: 800.0,
    freightCharges: 1200.0,
    grossOrderValue: 59230.0,
    paymentStatus: "COMPLETED",
    fulfillmentStatus: "DISPATCHED",
    transporterName: "VRL Logistics Ltd",
    trackingAwb: "VRL-KOP-9821104",
    dispatchDate: "2026-08-28T11:00:00Z",
    estimatedDelivery: "2026-08-30",
    items: [
      {
        productId: "prod-1",
        productName: "Heavy-Duty Front Car Bumper Assembly",
        quantity: 10,
        unitPrice: 2450.0,
      },
      {
        productId: "prod-4",
        productName: "Front Cab Fender Panel Assembly",
        quantity: 8,
        unitPrice: 3000.0,
      },
    ],
    statusHistory: [
      {
        status: "CONFIRMED",
        changedBy: "S Patil (Admin)",
        note: "Order confirmed upon client acceptance.",
        timestamp: "2026-08-26T11:00:00Z",
      },
      {
        status: "IN_PRODUCTION",
        changedBy: "Vikas Shinde (Warehouse)",
        note: "Quality gate inspection passed.",
        timestamp: "2026-08-27T09:30:00Z",
      },
      {
        status: "PACKED",
        changedBy: "Vikas Shinde",
        note: "Packed on reinforced pallets with strapping.",
        timestamp: "2026-08-27T16:00:00Z",
      },
      {
        status: "DISPATCHED",
        changedBy: "Vikas Shinde",
        note: "Consigned to VRL Logistics under AWB VRL-KOP-9821104.",
        timestamp: "2026-08-28T11:00:00Z",
      },
    ],
  },
];

export const INITIAL_STOCK_MOVEMENTS: StockMovementType[] = [
  {
    id: "mov-001",
    productId: "prod-1",
    productName: "Heavy-Duty Front Car Bumper Assembly",
    sku: "SE-CB-001",
    movementType: "PURCHASE_IN",
    quantity: 50,
    referenceId: "BATCH-PR-2026-88",
    performedBy: "Vikas Shinde",
    note: "Received finished batch lot from Islampur press shop.",
    createdAt: "2026-08-25T09:00:00Z",
  },
  {
    id: "mov-002",
    productId: "prod-1",
    productName: "Heavy-Duty Front Car Bumper Assembly",
    sku: "SE-CB-001",
    movementType: "RESERVATION_HOLD",
    quantity: -10,
    referenceId: "ORD-2026-0041",
    performedBy: "System (Atomic Lock)",
    note: "Reserved for Order ORD-2026-0041.",
    createdAt: "2026-08-26T11:05:00Z",
  },
];
