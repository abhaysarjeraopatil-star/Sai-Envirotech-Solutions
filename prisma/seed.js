const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Sai AutoHub database seeding...");

  // Clean existing tables (in order of relations)
  await prisma.auditLog.deleteMany({});
  await prisma.followUp.deleteMany({});
  await prisma.orderStatusHistory.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.quotationStatusHistory.deleteMany({});
  await prisma.quotationItem.deleteMany({});
  await prisma.quotation.deleteMany({});
  await prisma.enquiryItem.deleteMany({});
  await prisma.enquiry.deleteMany({});
  await prisma.stockMovement.deleteMany({});
  await prisma.inventory.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.taxRate.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.address.deleteMany({});
  await prisma.customerProfile.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("🧹 Cleaned existing records.");

  // 1. Create Tax Rates (Configurable GST engine)
  const tax87071000 = await prisma.taxRate.create({
    data: {
      hsnCode: "87071000",
      description: "Bodies (including cabs) for passenger motor vehicles (HSN 8703)",
      cgstRate: 9.0,
      sgstRate: 9.0,
      igstRate: 18.0,
      active: true,
    }
  });

  const tax8707 = await prisma.taxRate.create({
    data: {
      hsnCode: "8707",
      description: "Bodies (including cabs) for tractors & commercial vehicles",
      cgstRate: 9.0,
      sgstRate: 9.0,
      igstRate: 18.0,
      active: true,
    }
  });

  const tax8708 = await prisma.taxRate.create({
    data: {
      hsnCode: "8708",
      description: "Parts and accessories of the motor vehicles of headings 8701 to 8705 [DEMO/EXTENDED]",
      cgstRate: 14.0,
      sgstRate: 14.0,
      igstRate: 28.0,
      active: true,
    }
  });

  console.log("✅ Created Tax Rates with dynamic CGST/SGST/IGST rules.");

  // 2. Create Categories (matching IndiaMART verified profile)
  const catAccessories = await prisma.category.create({
    data: {
      name: "Automotive Accessories",
      slug: "automotive-accessories",
      description: "Exterior automotive styling, heavy-duty bumpers, and protection accessories.",
      image: "https://images.unsplash.com/photo-1541348263662-e0c82661200e?w=800&q=80",
    }
  });

  const catTractor = await prisma.category.create({
    data: {
      name: "Tractor Parts & Body Covers",
      slug: "tractor-parts",
      description: "Heavy-gauge steel & fiberglass tractor hoods, side panels, and agricultural body assemblies.",
      image: "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?w=800&q=80",
    }
  });

  const catSpareParts = await prisma.category.create({
    data: {
      name: "Automobile Spare Parts",
      slug: "automobile-spare-parts",
      description: "Precision engineered structural and mechanical replacement body parts.",
      image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&q=80",
    }
  });

  console.log("✅ Created Product Categories.");

  // 3. Create Products (Publicly verified + Clearly marked DEMO items)
  const productsData = [
    // Verified 1: Car Bumper
    {
      sku: "SE-CB-001",
      name: "Heavy-Duty Front Car Bumper Assembly",
      slug: "heavy-duty-front-car-bumper-assembly",
      categoryId: catAccessories.id,
      hsnCode: "87071000",
      taxRateId: tax87071000.id,
      description: "Reinforced high-impact polypropylene composite bumper designed for commercial utility vehicles. Features primer finish ready for OEM color matching.",
      material: "High-Grade Polypropylene (PP) / ABS",
      vehicleMake: "Mahindra",
      vehicleModel: "Bolero / Bolero Maxi Truck",
      modelYearRange: "2018-2025",
      moq: 10,
      basePrice: 2450.0,
      dimensions: "1680 x 340 x 290 mm",
      weightKg: 8.5,
      isVerified: true,
      isDemo: false,
      image: "",
      stock: 45,
      reserved: 10,
      minThreshold: 15,
      reorderQty: 50,
      bay: "Bay-A1-04"
    },
    // Verified 2: Tractor Body Parts & Covers
    {
      sku: "SE-TB-102",
      name: "Tractor Engine Hood & Body Cover Shell",
      slug: "tractor-engine-hood-body-cover-shell",
      categoryId: catTractor.id,
      hsnCode: "8707",
      taxRateId: tax8707.id,
      description: "Press-formed cold-rolled steel tractor bonnet and side louvers engineered for optimal engine heat dissipation and extreme agricultural durability.",
      material: "Cold-Rolled Deep Drawing Steel (CR4)",
      vehicleMake: "Mahindra / Sonalika",
      vehicleModel: "575 DI / DI-750 III",
      modelYearRange: "2015-2024",
      moq: 5,
      basePrice: 6800.0,
      dimensions: "1250 x 680 x 520 mm",
      weightKg: 22.0,
      isVerified: true,
      isDemo: false,
      image: "",
      stock: 28,
      reserved: 5,
      minThreshold: 10,
      reorderQty: 30,
      bay: "Bay-T1-12"
    },
    // Verified 3: Automotive Accessories
    {
      sku: "SE-AC-205",
      name: "Commercial Utility Rear Step Bumper Guard",
      slug: "commercial-utility-rear-step-bumper-guard",
      categoryId: catAccessories.id,
      hsnCode: "87071000",
      taxRateId: tax87071000.id,
      description: "Anti-slip perforated powder-coated steel step bumper for light commercial passenger/cargo vehicles.",
      material: "Powder Coated Tubular Steel",
      vehicleMake: "Tata",
      vehicleModel: "Ace Gold / Super Ace",
      modelYearRange: "2019-2025",
      moq: 15,
      basePrice: 1850.0,
      dimensions: "1450 x 200 x 180 mm",
      weightKg: 7.2,
      isVerified: true,
      isDemo: false,
      image: "",
      stock: 60,
      reserved: 15,
      minThreshold: 20,
      reorderQty: 80,
      bay: "Bay-A2-08"
    },
    // Verified 4: Automotive Spare Parts
    {
      sku: "SE-SP-304",
      name: "Front Cab Fender Panel Assembly",
      slug: "front-cab-fender-panel-assembly",
      categoryId: catSpareParts.id,
      hsnCode: "87071000",
      taxRateId: tax87071000.id,
      description: "Precision stamped left/right quarter body fender panel with factory electro-deposition coating (ED-coat).",
      material: "Electro-Galvanized Sheet Metal (0.9mm)",
      vehicleMake: "Mahindra",
      vehicleModel: "Bolero Camper / Pik-Up",
      modelYearRange: "2017-2025",
      moq: 8,
      basePrice: 3200.0,
      dimensions: "1100 x 750 x 180 mm",
      weightKg: 9.8,
      isVerified: true,
      isDemo: false,
      image: "",
      stock: 35,
      reserved: 8,
      minThreshold: 12,
      reorderQty: 40,
      bay: "Bay-S1-03"
    },
    // Demo 5: Extended Catalog Item (Clearly Marked DEMO)
    {
      sku: "DEMO-SE-TR-501",
      name: "[DEMO] Tractor Mudguard & Fender Arch Set",
      slug: "demo-tractor-mudguard-fender-arch-set",
      categoryId: catTractor.id,
      hsnCode: "8707",
      taxRateId: tax8707.id,
      description: "[PROTOTYPE DEMO ITEM] Heavy-duty curved rear mudguard arches with reinforced mounting brackets for agricultural tractors.",
      material: "Structural Steel with Anti-Rust Primer",
      vehicleMake: "Swaraj / John Deere",
      vehicleModel: "744 FE / 5050D",
      modelYearRange: "2016-2024",
      moq: 6,
      basePrice: 5400.0,
      dimensions: "1350 x 500 x 600 mm",
      weightKg: 18.5,
      isVerified: false,
      isDemo: true,
      image: "",
      stock: 12,
      reserved: 0,
      minThreshold: 8,
      reorderQty: 25,
      bay: "Bay-T2-01"
    },
    // Demo 6: Extended Catalog Item (Clearly Marked DEMO)
    {
      sku: "DEMO-SE-AC-602",
      name: "[DEMO] Aerodynamic Rooftop Cabin Fairing",
      slug: "demo-aerodynamic-rooftop-cabin-fairing",
      categoryId: catAccessories.id,
      hsnCode: "87071000",
      taxRateId: tax87071000.id,
      description: "[PROTOTYPE DEMO ITEM] Fuel-saving aerodynamic cabin wind deflector designed for inter-city logistics fleets.",
      material: "Fiber Reinforced Polymer (FRP)",
      vehicleMake: "Eicher / Tata",
      vehicleModel: "Pro 2049 / 407 Gold",
      modelYearRange: "2020-2025",
      moq: 4,
      basePrice: 7900.0,
      dimensions: "1800 x 600 x 450 mm",
      weightKg: 12.0,
      isVerified: false,
      isDemo: true,
      image: "",
      stock: 8,
      reserved: 2,
      minThreshold: 5,
      reorderQty: 15,
      bay: "Bay-A3-09"
    }
  ];

  const createdProducts = [];
  for (const item of productsData) {
    const { stock, reserved, minThreshold, reorderQty, bay, ...prodFields } = item;
    const p = await prisma.product.create({
      data: prodFields
    });

    await prisma.inventory.create({
      data: {
        productId: p.id,
        physicalStock: stock,
        reservedStock: reserved,
        minThreshold: minThreshold,
        reorderQty: reorderQty,
        warehouseBay: bay,
      }
    });

    // Initial Stock Ledger Movement
    await prisma.stockMovement.create({
      data: {
        productId: p.id,
        movementType: "PURCHASE_IN",
        quantity: stock,
        referenceId: "INITIAL-STOCK-AUDIT",
        performedBy: "System Setup / S Patil",
        note: `Initial inventory calibration for ${p.name}`
      }
    });

    createdProducts.push(p);
  }

  console.log(`✅ Created ${createdProducts.length} Products with dual-ledger Inventories & Stock Movements.`);

  // 4. Create Users (RBAC: Admin, Sales, Inventory, Customer)
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@saiautohub.com",
      name: "S Patil (Admin)",
      password: "password123",
      role: "ADMIN",
      phone: "+91 98220 12345",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80"
    }
  });

  const salesUser = await prisma.user.create({
    data: {
      email: "sales@saiautohub.com",
      name: "Rahul Deshmukh (Sales Head)",
      password: "password123",
      role: "SALES",
      phone: "+91 98220 54321",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80"
    }
  });

  const inventoryUser = await prisma.user.create({
    data: {
      email: "inventory@saiautohub.com",
      name: "Vikas Shinde (Warehouse Manager)",
      password: "password123",
      role: "INVENTORY",
      phone: "+91 98220 67890",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80"
    }
  });

  const customerUser = await prisma.user.create({
    data: {
      email: "client@abcautoparts.com",
      name: "Anand Kulkarni",
      password: "password123",
      role: "CUSTOMER",
      phone: "+91 94230 88990",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80"
    }
  });

  console.log("✅ Created RBAC Users (Admin, Sales, Inventory, Customer).");

  // 5. Create Customer Profile & Normalized Addresses
  const customerProfile = await prisma.customerProfile.create({
    data: {
      userId: customerUser.id,
      companyName: "ABC Auto Spares & Logistics Pvt Ltd",
      gstin: "27AABCA4589K1Z8",
      iecCode: "0314099812",
      contactPerson: "Anand Kulkarni",
      phone: "+91 94230 88990",
      email: "client@abcautoparts.com",
      creditTermDays: 15,
    }
  });

  const billingAddress = await prisma.address.create({
    data: {
      customerId: customerProfile.id,
      type: "BILLING",
      line1: "Plot No. 44, MIDC Industrial Area, Shiroli",
      city: "Kolhapur",
      district: "Kolhapur",
      state: "Maharashtra",
      gstStateCode: "27", // Maharashtra
      pincode: "416122",
      country: "India",
      isDefault: true,
    }
  });

  const shippingAddress = await prisma.address.create({
    data: {
      customerId: customerProfile.id,
      type: "SHIPPING",
      line1: "Central Warehouse Unit 3, Old Pune-Bangalore Road",
      city: "Sangli",
      district: "Sangli",
      state: "Maharashtra",
      gstStateCode: "27", // Maharashtra
      pincode: "416416",
      country: "India",
      isDefault: true,
    }
  });

  console.log("✅ Created Customer Profile with normalized Billing & Shipping Addresses.");

  // 6. Create Realistic B2B Enquiries (Leads)
  const enquiry1 = await prisma.enquiry.create({
    data: {
      enquiryNumber: "ENQ-10482",
      customerId: customerProfile.id,
      contactName: "Anand Kulkarni",
      companyName: "ABC Auto Spares & Logistics Pvt Ltd",
      email: "client@abcautoparts.com",
      phone: "+91 94230 88990",
      city: "Kolhapur",
      state: "Maharashtra",
      source: "WEBSITE_RFQ",
      status: "QUOTATION_SENT",
      priority: "HIGH",
      assignedToId: salesUser.id,
      additionalReqs: "Urgent requirement for upcoming Bolero fleet maintenance cycle. Need packaging suitable for long-distance transit.",
      items: {
        create: [
          {
            productId: createdProducts[0].id, // Car Bumper
            targetVehicle: "Mahindra Bolero 2022",
            quantityRequested: 15,
            targetPrice: 2400.0,
          },
          {
            productId: createdProducts[1].id, // Tractor Bonnet
            targetVehicle: "Mahindra 575 DI",
            quantityRequested: 5,
            targetPrice: 6500.0,
          }
        ]
      }
    }
  });

  const enquiry2 = await prisma.enquiry.create({
    data: {
      enquiryNumber: "ENQ-10483",
      contactName: "Mahesh Jagtap",
      companyName: "Swaraj Agro Traders",
      email: "procure@swarajagro.in",
      phone: "+91 98900 11223",
      city: "Satara",
      state: "Maharashtra",
      source: "INDIAMART",
      status: "SPECS_VERIFIED",
      priority: "MEDIUM",
      assignedToId: salesUser.id,
      additionalReqs: "Direct inquiry from IndiaMART listing regarding Tractor body panel bulk lot for agricultural season.",
      items: {
        create: [
          {
            productId: createdProducts[1].id,
            targetVehicle: "Sonalika DI-750",
            quantityRequested: 10,
            targetPrice: 6600.0,
          }
        ]
      }
    }
  });

  const enquiry3 = await prisma.enquiry.create({
    data: {
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
      additionalReqs: "Inter-state supply requirement. Requires IGST billing and door delivery to Surat warehouse.",
      items: {
        create: [
          {
            productId: createdProducts[2].id,
            targetVehicle: "Tata Ace Gold",
            quantityRequested: 25,
            targetPrice: 1800.0,
          }
        ]
      }
    }
  });

  console.log("✅ Created B2B Enquiries across Website RFQ, IndiaMART, and Direct sources.");

  // 7. Create Quotation with exact GST calculation & Status History
  // Let's compute exact financial figures:
  // Item 1: 15 * 2400 = 36,000 (Taxable) | Tax 18% (CGST 9% = 3,240, SGST 9% = 3,240) = 6,480 | Total = 42,480
  // Item 2: 5 * 6700 = 33,500 (Taxable) | Tax 18% (CGST 9% = 3,015, SGST 9% = 3,015) = 6,030 | Total = 39,530
  // Subtotal Net Taxable: 69,500
  // Packaging: 1,500
  // Freight (Ex-Factory): 0
  // Total Taxable Base for GST: 71,000 (Items + P&F)
  // CGST (9%): 6,390
  // SGST (9%): 6,390
  // Total Tax: 12,780
  // Gross Order Value: 83,780
  const quote1 = await prisma.quotation.create({
    data: {
      quoteNumber: "QT-2026-0012",
      enquiryId: enquiry1.id,
      customerId: customerProfile.id,
      createdById: salesUser.id,
      status: "SENT",
      validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days validity
      shippingStateCode: "27", // Maharashtra (Intra-state)
      isInterState: false,
      netTaxableAmount: 69500.0,
      discountAmount: 0.0,
      packagingCharges: 1500.0,
      freightCharges: 0.0,
      cgstAmount: 6390.0,
      sgstAmount: 6390.0,
      igstAmount: 0.0,
      taxAmount: 12780.0,
      grossOrderValue: 83780.0,
      paymentTerms: "50% Advance with purchase confirmation, 50% against pre-dispatch invoice.",
      deliveryTerms: "Ex-Factory, Uran Islampur (Sangli, Maharashtra). Standard heavy-gauge wooden pallet packing included.",
      notes: "Commercial quote formulated as per technical specs verified by S Patil.",
      items: {
        create: [
          {
            productId: createdProducts[0].id,
            hsnCode: "87071000",
            quantity: 15,
            unitPrice: 2400.0,
            taxRatePercent: 18.0,
            taxAmount: 6480.0,
            totalTaxable: 36000.0,
            totalWithTax: 42480.0,
          },
          {
            productId: createdProducts[1].id,
            hsnCode: "8707",
            quantity: 5,
            unitPrice: 6700.0,
            taxRatePercent: 18.0,
            taxAmount: 6030.0,
            totalTaxable: 33500.0,
            totalWithTax: 39530.0,
          }
        ]
      },
      statusHistory: {
        create: [
          {
            status: "DRAFT",
            changedBy: "Rahul Deshmukh (Sales Head)",
            note: "Drafted initial quotation with volume pricing."
          },
          {
            status: "SENT",
            changedBy: "Rahul Deshmukh (Sales Head)",
            note: "Issued formal quotation to ABC Auto Spares with 15-day validity."
          }
        ]
      }
    }
  });

  console.log("✅ Created Quotation #QT-2026-0012 with precise HSN tax calculation & status timeline.");

  // 8. Create a Confirmed Order with Secure Non-Guessable Token & Dual-Ledger Status
  // Net Taxable: 54,000, Tax (18%): 9,720, Freight: 2,000, Gross Value: 65,720
  const order1 = await prisma.order.create({
    data: {
      orderNumber: "ORD-2026-0041",
      trackingToken: "AUT-8X3K9P",
      customerId: customerProfile.id,
      netTaxableAmount: 54000.0,
      taxAmount: 9720.0,
      packagingCharges: 800.0,
      freightCharges: 1200.0,
      grossOrderValue: 65720.0,
      paymentStatus: "PARTIAL_ADVANCE",
      fulfillmentStatus: "PACKED",
      transporterName: "VRL Logistics Ltd",
      trackingAwb: "VRL-MH-889124",
      shippingAddress: "Central Warehouse Unit 3, Old Pune-Bangalore Road, Sangli - 416416, Maharashtra",
      notes: "10x Front Car Bumpers + 10x Fender Assemblies. Palletized and shrink-wrapped.",
      items: {
        create: [
          {
            productId: createdProducts[0].id,
            quantity: 10,
            unitPrice: 2400.0,
            taxAmount: 4320.0,
            totalPrice: 28320.0,
          },
          {
            productId: createdProducts[3].id,
            quantity: 10,
            unitPrice: 3000.0,
            taxAmount: 5400.0,
            totalPrice: 35400.0,
          }
        ]
      },
      statusHistory: {
        create: [
          {
            status: "CONFIRMED",
            changedBy: "System (Atomic Quote Acceptance)",
            note: "Order confirmed upon advance token receipt. Stock reserved in Bay-A1-04 and Bay-S1-03."
          },
          {
            status: "IN_PRODUCTION",
            changedBy: "Vikas Shinde (Warehouse Manager)",
            note: "Goods pulled from main warehouse racks for QA inspection."
          },
          {
            status: "PACKED",
            changedBy: "Vikas Shinde (Warehouse Manager)",
            note: "Packed on reinforced pallets with edge protectors. Handover scheduled for VRL Logistics."
          }
        ]
      }
    }
  });

  // Second Delivered Order for Rich Analytics
  const order2 = await prisma.order.create({
    data: {
      orderNumber: "ORD-2026-0038",
      trackingToken: "AUT-7Q2M4R",
      customerId: customerProfile.id,
      netTaxableAmount: 40800.0,
      taxAmount: 7344.0,
      packagingCharges: 600.0,
      freightCharges: 1000.0,
      grossOrderValue: 49744.0,
      paymentStatus: "COMPLETED",
      fulfillmentStatus: "DELIVERED",
      transporterName: "DTDC Express Cargo",
      trackingAwb: "DTDC-PUN-772190",
      dispatchDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      estimatedDelivery: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      actualDelivery: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      shippingAddress: "Plot No. 44, MIDC Industrial Area, Shiroli, Kolhapur - 416122, Maharashtra",
      notes: "Delivered successfully with signed gate-pass acknowledgment.",
      items: {
        create: [
          {
            productId: createdProducts[1].id,
            quantity: 6,
            unitPrice: 6800.0,
            taxAmount: 7344.0,
            totalPrice: 48144.0,
          }
        ]
      },
      statusHistory: {
        create: [
          {
            status: "CONFIRMED",
            changedBy: "Rahul Deshmukh",
            note: "Advance received."
          },
          {
            status: "DISPATCHED",
            changedBy: "Vikas Shinde",
            note: "Dispatched via DTDC Express AWB DTDC-PUN-772190."
          },
          {
            status: "DELIVERED",
            changedBy: "System (Carrier Webhook)",
            note: "Delivery confirmed at Kolhapur warehouse."
          }
        ]
      }
    }
  });

  console.log("✅ Created Orders with secure tracking tokens and full status histories.");

  // 9. Create CRM Follow-ups
  await prisma.followUp.create({
    data: {
      enquiryId: enquiry1.id,
      employeeId: salesUser.id,
      type: "PHONE",
      remarks: "Discussed technical drawing & MOQ terms with Anand Kulkarni. Client reviewed draft terms favorably.",
      nextActionDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      status: "COMPLETED",
    }
  });

  await prisma.followUp.create({
    data: {
      enquiryId: enquiry2.id,
      employeeId: salesUser.id,
      type: "WHATSAPP",
      remarks: "Shared technical specification sheet for Sonalika DI-750 tractor hood assembly.",
      nextActionDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      status: "SCHEDULED",
    }
  });

  // 10. Create Audit Logs
  await prisma.auditLog.create({
    data: {
      userId: salesUser.id,
      action: "CREATE_QUOTATION",
      entityType: "QUOTATION",
      entityId: quote1.id,
      metadata: JSON.stringify({ quoteNumber: quote1.quoteNumber, grossOrderValue: quote1.grossOrderValue }),
    }
  });

  await prisma.auditLog.create({
    data: {
      userId: inventoryUser.id,
      action: "UPDATE_ORDER_STATUS",
      entityType: "ORDER",
      entityId: order1.id,
      metadata: JSON.stringify({ orderNumber: order1.orderNumber, newStatus: "PACKED" }),
    }
  });

  console.log("🚀 Database seeding completed successfully for Sai AutoHub!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
