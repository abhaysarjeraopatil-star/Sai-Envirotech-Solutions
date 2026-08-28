-- ==============================================================================
-- SAI AUTOHUB — COMPLETE SUPABASE POSTGRESQL DATABASE SCHEMA & SEED SCRIPT
-- Target: Sai Envirotech Solutions (Uran Islampur, Sangli, Maharashtra)
-- Run this script in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/gowvkclrwjkcmtycjsoe/sql/new
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. DROP EXISTING TABLES & TYPES IF ANY (Clean Slate)
DROP TABLE IF EXISTS "AuditLog" CASCADE;
DROP TABLE IF EXISTS "FollowUp" CASCADE;
DROP TABLE IF EXISTS "OrderStatusHistory" CASCADE;
DROP TABLE IF EXISTS "OrderItem" CASCADE;
DROP TABLE IF EXISTS "Order" CASCADE;
DROP TABLE IF EXISTS "QuotationStatusHistory" CASCADE;
DROP TABLE IF EXISTS "QuotationItem" CASCADE;
DROP TABLE IF EXISTS "Quotation" CASCADE;
DROP TABLE IF EXISTS "EnquiryItem" CASCADE;
DROP TABLE IF EXISTS "Enquiry" CASCADE;
DROP TABLE IF EXISTS "StockMovement" CASCADE;
DROP TABLE IF EXISTS "Inventory" CASCADE;
DROP TABLE IF EXISTS "Product" CASCADE;
DROP TABLE IF EXISTS "TaxRate" CASCADE;
DROP TABLE IF EXISTS "Category" CASCADE;
DROP TABLE IF EXISTS "Address" CASCADE;
DROP TABLE IF EXISTS "CustomerProfile" CASCADE;
DROP TABLE IF EXISTS "User" CASCADE;

DROP TYPE IF EXISTS "Role" CASCADE;
DROP TYPE IF EXISTS "AddressType" CASCADE;
DROP TYPE IF EXISTS "EnquirySource" CASCADE;
DROP TYPE IF EXISTS "EnquiryStatus" CASCADE;
DROP TYPE IF EXISTS "QuotationStatus" CASCADE;
DROP TYPE IF EXISTS "PaymentStatus" CASCADE;
DROP TYPE IF EXISTS "FulfillmentStatus" CASCADE;
DROP TYPE IF EXISTS "MovementType" CASCADE;

-- 2. CREATE ENUMS
CREATE TYPE "Role" AS ENUM ('ADMIN', 'SALES', 'INVENTORY', 'CUSTOMER');
CREATE TYPE "AddressType" AS ENUM ('BILLING', 'SHIPPING', 'FACTORY');
CREATE TYPE "EnquirySource" AS ENUM ('WEBSITE_RFQ', 'INDIAMART', 'WHATSAPP_ASSISTED', 'DIRECT');
CREATE TYPE "EnquiryStatus" AS ENUM ('NEW', 'CONTACTED', 'SPECS_VERIFIED', 'QUOTATION_SENT', 'WON', 'LOST');
CREATE TYPE "QuotationStatus" AS ENUM ('DRAFT', 'SENT', 'ACCEPTED', 'REJECTED', 'EXPIRED');
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PARTIAL_ADVANCE', 'PAID_ON_DISPATCH', 'NET_30', 'COMPLETED');
CREATE TYPE "FulfillmentStatus" AS ENUM ('CONFIRMED', 'IN_PRODUCTION', 'PACKED', 'DISPATCHED', 'DELIVERED', 'CANCELLED');
CREATE TYPE "MovementType" AS ENUM ('PURCHASE_IN', 'RESERVATION_HOLD', 'DISPATCH_OUT', 'RETURN_IN', 'AUDIT_ADJUST');

-- 3. CREATE TABLES

-- User Table (RBAC)
CREATE TABLE "User" (
    "id" TEXT PRIMARY KEY DEFAULT ('usr_' || substr(md5(random()::text), 1, 16)),
    "email" TEXT UNIQUE NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT 'password123',
    "role" "Role" NOT NULL DEFAULT 'CUSTOMER',
    "phone" TEXT,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CustomerProfile Table
CREATE TABLE "CustomerProfile" (
    "id" TEXT PRIMARY KEY DEFAULT ('cust_' || substr(md5(random()::text), 1, 16)),
    "userId" TEXT UNIQUE NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "companyName" TEXT NOT NULL,
    "gstin" TEXT,
    "iecCode" TEXT,
    "contactPerson" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "creditTermDays" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Address Table (Normalized)
CREATE TABLE "Address" (
    "id" TEXT PRIMARY KEY DEFAULT ('addr_' || substr(md5(random()::text), 1, 16)),
    "customerId" TEXT NOT NULL REFERENCES "CustomerProfile"("id") ON DELETE CASCADE,
    "type" "AddressType" NOT NULL DEFAULT 'SHIPPING',
    "line1" TEXT NOT NULL,
    "line2" TEXT,
    "city" TEXT NOT NULL,
    "district" TEXT,
    "state" TEXT NOT NULL,
    "gstStateCode" TEXT NOT NULL, -- "27" for Maharashtra
    "pincode" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'India',
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- TaxRate Table (Configurable Statutory GST)
CREATE TABLE "TaxRate" (
    "id" TEXT PRIMARY KEY DEFAULT ('tax_' || substr(md5(random()::text), 1, 16)),
    "hsnCode" TEXT UNIQUE NOT NULL,
    "description" TEXT NOT NULL,
    "cgstRate" DOUBLE PRECISION NOT NULL DEFAULT 9.0,
    "sgstRate" DOUBLE PRECISION NOT NULL DEFAULT 9.0,
    "igstRate" DOUBLE PRECISION NOT NULL DEFAULT 18.0,
    "effectiveFrom" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effectiveTo" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Category Table
CREATE TABLE "Category" (
    "id" TEXT PRIMARY KEY DEFAULT ('cat_' || substr(md5(random()::text), 1, 16)),
    "name" TEXT NOT NULL,
    "slug" TEXT UNIQUE NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Product Table
CREATE TABLE "Product" (
    "id" TEXT PRIMARY KEY DEFAULT ('prod_' || substr(md5(random()::text), 1, 16)),
    "sku" TEXT UNIQUE NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT UNIQUE NOT NULL,
    "categoryId" TEXT NOT NULL REFERENCES "Category"("id"),
    "hsnCode" TEXT NOT NULL,
    "taxRateId" TEXT REFERENCES "TaxRate"("id"),
    "description" TEXT,
    "material" TEXT,
    "vehicleMake" TEXT,
    "vehicleModel" TEXT,
    "modelYearRange" TEXT,
    "moq" INTEGER NOT NULL DEFAULT 10,
    "basePrice" DOUBLE PRECISION NOT NULL,
    "image" TEXT,
    "dimensions" TEXT,
    "weightKg" DOUBLE PRECISION,
    "isVerified" BOOLEAN NOT NULL DEFAULT true,
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Inventory Table (Dual-Ledger)
CREATE TABLE "Inventory" (
    "id" TEXT PRIMARY KEY DEFAULT ('inv_' || substr(md5(random()::text), 1, 16)),
    "productId" TEXT UNIQUE NOT NULL REFERENCES "Product"("id") ON DELETE CASCADE,
    "physicalStock" INTEGER NOT NULL DEFAULT 0,
    "reservedStock" INTEGER NOT NULL DEFAULT 0,
    "minThreshold" INTEGER NOT NULL DEFAULT 10,
    "reorderQty" INTEGER NOT NULL DEFAULT 50,
    "warehouseBay" TEXT DEFAULT 'Bay-A1',
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- StockMovement Table (Immutable Audit Ledger)
CREATE TABLE "StockMovement" (
    "id" TEXT PRIMARY KEY DEFAULT ('mov_' || substr(md5(random()::text), 1, 16)),
    "productId" TEXT NOT NULL REFERENCES "Product"("id") ON DELETE CASCADE,
    "movementType" "MovementType" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "referenceId" TEXT,
    "performedBy" TEXT NOT NULL DEFAULT 'System / Inventory Manager',
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Enquiry Table (Sales CRM Leads)
CREATE TABLE "Enquiry" (
    "id" TEXT PRIMARY KEY DEFAULT ('enq_' || substr(md5(random()::text), 1, 16)),
    "enquiryNumber" TEXT UNIQUE NOT NULL,
    "customerId" TEXT REFERENCES "CustomerProfile"("id"),
    "contactName" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "city" TEXT,
    "state" TEXT,
    "source" "EnquirySource" NOT NULL DEFAULT 'WEBSITE_RFQ',
    "status" "EnquiryStatus" NOT NULL DEFAULT 'NEW',
    "priority" TEXT NOT NULL DEFAULT 'MEDIUM',
    "assignedToId" TEXT REFERENCES "User"("id"),
    "additionalReqs" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- EnquiryItem Table
CREATE TABLE "EnquiryItem" (
    "id" TEXT PRIMARY KEY DEFAULT ('ei_' || substr(md5(random()::text), 1, 16)),
    "enquiryId" TEXT NOT NULL REFERENCES "Enquiry"("id") ON DELETE CASCADE,
    "productId" TEXT REFERENCES "Product"("id"),
    "customItemName" TEXT,
    "targetVehicle" TEXT,
    "quantityRequested" INTEGER NOT NULL,
    "targetPrice" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Quotation Table
CREATE TABLE "Quotation" (
    "id" TEXT PRIMARY KEY DEFAULT ('qt_' || substr(md5(random()::text), 1, 16)),
    "quoteNumber" TEXT UNIQUE NOT NULL,
    "enquiryId" TEXT REFERENCES "Enquiry"("id"),
    "customerId" TEXT NOT NULL REFERENCES "CustomerProfile"("id"),
    "createdById" TEXT NOT NULL REFERENCES "User"("id"),
    "status" "QuotationStatus" NOT NULL DEFAULT 'SENT',
    "validUntil" TIMESTAMP(3) NOT NULL,
    "shippingStateCode" TEXT NOT NULL DEFAULT '27',
    "isInterState" BOOLEAN NOT NULL DEFAULT false,
    "netTaxableAmount" DOUBLE PRECISION NOT NULL,
    "discountAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "packagingCharges" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "freightCharges" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "cgstAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "sgstAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "igstAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "taxAmount" DOUBLE PRECISION NOT NULL,
    "grossOrderValue" DOUBLE PRECISION NOT NULL,
    "paymentTerms" TEXT DEFAULT '50% Advance with Purchase Order, 50% prior to dispatch',
    "deliveryTerms" TEXT DEFAULT 'Ex-Factory, Uran Islampur (Sangli)',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- QuotationItem Table
CREATE TABLE "QuotationItem" (
    "id" TEXT PRIMARY KEY DEFAULT ('qi_' || substr(md5(random()::text), 1, 16)),
    "quotationId" TEXT NOT NULL REFERENCES "Quotation"("id") ON DELETE CASCADE,
    "productId" TEXT NOT NULL REFERENCES "Product"("id"),
    "hsnCode" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "discountPercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "taxRatePercent" DOUBLE PRECISION NOT NULL DEFAULT 18.0,
    "taxAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalTaxable" DOUBLE PRECISION NOT NULL,
    "totalWithTax" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- QuotationStatusHistory Table
CREATE TABLE "QuotationStatusHistory" (
    "id" TEXT PRIMARY KEY DEFAULT ('qsh_' || substr(md5(random()::text), 1, 16)),
    "quotationId" TEXT NOT NULL REFERENCES "Quotation"("id") ON DELETE CASCADE,
    "status" "QuotationStatus" NOT NULL,
    "changedBy" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Order Table (Fulfillment & Token Tracking)
CREATE TABLE "Order" (
    "id" TEXT PRIMARY KEY DEFAULT ('ord_' || substr(md5(random()::text), 1, 16)),
    "orderNumber" TEXT UNIQUE NOT NULL,
    "trackingToken" TEXT UNIQUE NOT NULL, -- Non-guessable random token e.g. "AUT-8X3K9P"
    "quotationId" TEXT UNIQUE REFERENCES "Quotation"("id"),
    "customerId" TEXT NOT NULL REFERENCES "CustomerProfile"("id"),
    "netTaxableAmount" DOUBLE PRECISION NOT NULL,
    "taxAmount" DOUBLE PRECISION NOT NULL,
    "packagingCharges" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "freightCharges" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "grossOrderValue" DOUBLE PRECISION NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "fulfillmentStatus" "FulfillmentStatus" NOT NULL DEFAULT 'CONFIRMED',
    "transporterName" TEXT,
    "trackingAwb" TEXT,
    "dispatchDate" TIMESTAMP(3),
    "estimatedDelivery" TIMESTAMP(3),
    "actualDelivery" TIMESTAMP(3),
    "shippingAddress" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- OrderItem Table
CREATE TABLE "OrderItem" (
    "id" TEXT PRIMARY KEY DEFAULT ('oi_' || substr(md5(random()::text), 1, 16)),
    "orderId" TEXT NOT NULL REFERENCES "Order"("id") ON DELETE CASCADE,
    "productId" TEXT NOT NULL REFERENCES "Product"("id"),
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "taxAmount" DOUBLE PRECISION NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- OrderStatusHistory Table
CREATE TABLE "OrderStatusHistory" (
    "id" TEXT PRIMARY KEY DEFAULT ('osh_' || substr(md5(random()::text), 1, 16)),
    "orderId" TEXT NOT NULL REFERENCES "Order"("id") ON DELETE CASCADE,
    "status" "FulfillmentStatus" NOT NULL,
    "changedBy" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- FollowUp Table (CRM Activity)
CREATE TABLE "FollowUp" (
    "id" TEXT PRIMARY KEY DEFAULT ('fu_' || substr(md5(random()::text), 1, 16)),
    "enquiryId" TEXT NOT NULL REFERENCES "Enquiry"("id") ON DELETE CASCADE,
    "employeeId" TEXT NOT NULL REFERENCES "User"("id"),
    "type" TEXT NOT NULL DEFAULT 'PHONE',
    "remarks" TEXT NOT NULL,
    "nextActionDate" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'COMPLETED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- AuditLog Table (Comprehensive Event Auditing)
CREATE TABLE "AuditLog" (
    "id" TEXT PRIMARY KEY DEFAULT ('aud_' || substr(md5(random()::text), 1, 16)),
    "userId" TEXT REFERENCES "User"("id"),
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "metadata" TEXT,
    "ipAddress" TEXT DEFAULT '127.0.0.1',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 4. CREATE INDEXES FOR OPTIMAL QUERY PERFORMANCE
CREATE INDEX "idx_product_category" ON "Product"("categoryId");
CREATE INDEX "idx_product_hsn" ON "Product"("hsnCode");
CREATE INDEX "idx_inventory_product" ON "Inventory"("productId");
CREATE INDEX "idx_enquiry_status" ON "Enquiry"("status");
CREATE INDEX "idx_order_token" ON "Order"("trackingToken");
CREATE INDEX "idx_order_customer" ON "Order"("customerId");
CREATE INDEX "idx_quotation_customer" ON "Quotation"("customerId");

-- ==============================================================================
-- 5. INITIAL SEED DATA (Sai Envirotech Verified + Demo Baseline)
-- ==============================================================================

-- 5.1 Tax Rates (HSN 87071000 & 8707)
INSERT INTO "TaxRate" ("id", "hsnCode", "description", "cgstRate", "sgstRate", "igstRate", "active") VALUES
('tax-1', '87071000', 'Bodies (including cabs) for passenger motor vehicles (HSN 8703)', 9.0, 9.0, 18.0, true),
('tax-2', '8707', 'Bodies (including cabs) for tractors & commercial vehicles', 9.0, 9.0, 18.0, true),
('tax-3', '8708', 'Parts and accessories of motor vehicles (8701 to 8705) [DEMO]', 14.0, 14.0, 28.0, true);

-- 5.2 Categories
INSERT INTO "Category" ("id", "name", "slug", "description", "image") VALUES
('cat-1', 'Automotive Accessories', 'automotive-accessories', 'Exterior automotive styling, heavy-duty bumpers, and protection accessories.', 'https://images.unsplash.com/photo-1524486361537-8ad15938e1a3?w=800&q=80'),
('cat-2', 'Tractor Parts & Body Covers', 'tractor-parts', 'Heavy-gauge steel & fiberglass tractor hoods, side panels, and agricultural body assemblies.', 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Sonalika_Tractor.jpg'),
('cat-3', 'Automobile Spare Parts', 'automobile-spare-parts', 'Precision engineered structural and mechanical replacement body parts.', 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80');

-- 5.3 Products
INSERT INTO "Product" ("id", "sku", "name", "slug", "categoryId", "hsnCode", "taxRateId", "description", "material", "vehicleMake", "vehicleModel", "modelYearRange", "moq", "basePrice", "dimensions", "weightKg", "isVerified", "isDemo", "image") VALUES
('prod-1', 'SE-CB-001', 'Heavy-Duty Front Car Bumper Assembly', 'heavy-duty-front-car-bumper-assembly', 'cat-1', '87071000', 'tax-1', 'Reinforced high-impact polypropylene composite bumper designed for commercial utility vehicles. Features primer finish ready for OEM color matching.', 'High-Grade Polypropylene (PP) / ABS', 'Mahindra', 'Bolero / Bolero Maxi Truck', '2018-2025', 10, 2450.0, '1680 x 340 x 290 mm', 8.5, true, false, ''),
('prod-2', 'SE-TB-102', 'Tractor Engine Hood & Body Cover Shell', 'tractor-engine-hood-body-cover-shell', 'cat-2', '8707', 'tax-2', 'Press-formed cold-rolled steel tractor bonnet and side louvers engineered for optimal engine heat dissipation and extreme agricultural durability.', 'Cold-Rolled Deep Drawing Steel (CR4)', 'Mahindra / Sonalika', '575 DI / DI-750 III', '2015-2024', 5, 6800.0, '1250 x 680 x 520 mm', 22.0, true, false, ''),
('prod-3', 'SE-AC-205', 'Commercial Utility Rear Step Bumper Guard', 'commercial-utility-rear-step-bumper-guard', 'cat-1', '87071000', 'tax-1', 'Anti-slip perforated powder-coated steel step bumper for light commercial passenger/cargo vehicles.', 'Powder Coated Tubular Steel', 'Tata', 'Ace Gold / Super Ace', '2019-2025', 15, 1850.0, '1450 x 200 x 180 mm', 7.2, true, false, ''),
('prod-4', 'SE-SP-304', 'Front Cab Fender Panel Assembly', 'front-cab-fender-panel-assembly', 'cat-3', '87071000', 'tax-1', 'Precision stamped left/right quarter body fender panel with factory electro-deposition coating (ED-coat).', 'Electro-Galvanized Sheet Metal (0.9mm)', 'Mahindra', 'Bolero Camper / Pik-Up', '2017-2025', 8, 3200.0, '1100 x 750 x 180 mm', 9.8, true, false, ''),
('prod-5', 'DEMO-SE-TR-501', '[DEMO] Tractor Mudguard & Fender Arch Set', 'demo-tractor-mudguard-fender-arch-set', 'cat-2', '8707', 'tax-2', '[PROTOTYPE DEMO ITEM] Heavy-duty curved rear mudguard arches with reinforced mounting brackets for agricultural tractors.', 'Structural Steel with Anti-Rust Primer', 'Swaraj / John Deere', '744 FE / 5050D', '2016-2024', 6, 5400.0, '1350 x 500 x 600 mm', 18.5, false, true, ''),
('prod-6', 'DEMO-SE-AC-602', '[DEMO] Aerodynamic Rooftop Cabin Fairing', 'demo-aerodynamic-rooftop-cabin-fairing', 'cat-1', '87071000', 'tax-1', '[PROTOTYPE DEMO ITEM] Fuel-saving aerodynamic cabin wind deflector designed for inter-city logistics fleets.', 'Fiber Reinforced Polymer (FRP)', 'Eicher / Tata', 'Pro 2049 / 407 Gold', '2020-2025', 4, 7900.0, '1800 x 600 x 450 mm', 12.0, false, true, '');

-- 5.4 Dual-Ledger Inventory
INSERT INTO "Inventory" ("id", "productId", "physicalStock", "reservedStock", "minThreshold", "reorderQty", "warehouseBay") VALUES
('inv-1', 'prod-1', 45, 10, 15, 50, 'Bay-A1-04'),
('inv-2', 'prod-2', 28, 5, 10, 30, 'Bay-T1-12'),
('inv-3', 'prod-3', 60, 15, 20, 80, 'Bay-A2-08'),
('inv-4', 'prod-4', 35, 8, 12, 40, 'Bay-S1-03'),
('inv-5', 'prod-5', 12, 0, 8, 25, 'Bay-T2-01'),
('inv-6', 'prod-6', 8, 2, 5, 15, 'Bay-A3-09');

-- 5.5 Stock Movements
INSERT INTO "StockMovement" ("id", "productId", "movementType", "quantity", "referenceId", "performedBy", "note") VALUES
('mov-1', 'prod-1', 'PURCHASE_IN', 50, 'PO-8910-FACTORY', 'Vikas Shinde', 'Batch manufacturing lot received from press shop.'),
('mov-2', 'prod-1', 'RESERVATION_HOLD', 10, 'ORD-2026-0041', 'System (Atomic Quote Acceptance)', 'Reserved 10 units for ABC Auto Spares order.'),
('mov-3', 'prod-2', 'DISPATCH_OUT', -6, 'ORD-2026-0038', 'Vikas Shinde', 'Dispatched for DTDC Express pickup.');

-- 5.6 Users (RBAC)
INSERT INTO "User" ("id", "email", "name", "role", "phone", "avatar") VALUES
('usr_admin_1', 'admin@saiautohub.com', 'S Patil (Admin)', 'ADMIN', '+91 98220 12345', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80'),
('usr_sales_1', 'sales@saiautohub.com', 'Rahul Deshmukh (Sales Head)', 'SALES', '+91 98220 54321', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80'),
('usr_inv_1', 'inventory@saiautohub.com', 'Vikas Shinde (Warehouse Manager)', 'INVENTORY', '+91 98220 67890', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80'),
('usr_cust_1', 'client@abcautoparts.com', 'Anand Kulkarni', 'CUSTOMER', '+91 94230 88990', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80');

-- 5.7 Customer Profile & Addresses
INSERT INTO "CustomerProfile" ("id", "userId", "companyName", "gstin", "iecCode", "contactPerson", "phone", "email", "creditTermDays") VALUES
('cust-1', 'usr_cust_1', 'ABC Auto Spares & Logistics Pvt Ltd', '27AABCA4589K1Z8', '0314099812', 'Anand Kulkarni', '+91 94230 88990', 'client@abcautoparts.com', 15);

INSERT INTO "Address" ("id", "customerId", "type", "line1", "city", "district", "state", "gstStateCode", "pincode", "isDefault") VALUES
('addr-1', 'cust-1', 'BILLING', 'Plot No. 44, MIDC Industrial Area, Shiroli', 'Kolhapur', 'Kolhapur', 'Maharashtra', '27', '416122', true),
('addr-2', 'cust-1', 'SHIPPING', 'Central Warehouse Unit 3, Old Pune-Bangalore Road', 'Sangli', 'Sangli', 'Maharashtra', '27', '416416', true);

-- 5.8 Enquiries (CRM Leads)
INSERT INTO "Enquiry" ("id", "enquiryNumber", "customerId", "contactName", "companyName", "email", "phone", "city", "state", "source", "status", "priority", "assignedToId", "additionalReqs") VALUES
('enq-10482', 'ENQ-10482', 'cust-1', 'Anand Kulkarni', 'ABC Auto Spares & Logistics Pvt Ltd', 'client@abcautoparts.com', '+91 94230 88990', 'Kolhapur', 'Maharashtra', 'WEBSITE_RFQ', 'QUOTATION_SENT', 'HIGH', 'usr_sales_1', 'Urgent requirement for upcoming Bolero fleet maintenance cycle.'),
('enq-10483', 'ENQ-10483', NULL, 'Mahesh Jagtap', 'Swaraj Agro Traders', 'procure@swarajagro.in', '+91 98900 11223', 'Satara', 'Maharashtra', 'INDIAMART', 'SPECS_VERIFIED', 'MEDIUM', 'usr_sales_1', 'Direct inquiry from IndiaMART listing regarding Tractor body panels.'),
('enq-10484', 'ENQ-10484', NULL, 'Vikram Rathi', 'Gujarat Commercial Body Builders', 'orders@gujaratbody.com', '+91 97120 44556', 'Surat', 'Gujarat', 'DIRECT', 'NEW', 'HIGH', NULL, 'Inter-state supply requirement. Requires IGST billing.');

INSERT INTO "EnquiryItem" ("id", "enquiryId", "productId", "targetVehicle", "quantityRequested", "targetPrice") VALUES
('ei-1', 'enq-10482', 'prod-1', 'Mahindra Bolero 2022', 15, 2400.0),
('ei-2', 'enq-10482', 'prod-2', 'Mahindra 575 DI', 5, 6500.0),
('ei-3', 'enq-10483', 'prod-2', 'Sonalika DI-750', 10, 6600.0),
('ei-4', 'enq-10484', 'prod-3', 'Tata Ace Gold', 25, 1800.0);

-- 5.9 Quotations
INSERT INTO "Quotation" ("id", "quoteNumber", "enquiryId", "customerId", "createdById", "status", "validUntil", "shippingStateCode", "isInterState", "netTaxableAmount", "discountAmount", "packagingCharges", "freightCharges", "cgstAmount", "sgstAmount", "igstAmount", "taxAmount", "grossOrderValue", "paymentTerms", "deliveryTerms", "notes") VALUES
('qt-1', 'QT-2026-0012', 'enq-10482', 'cust-1', 'usr_sales_1', 'SENT', CURRENT_TIMESTAMP + INTERVAL '15 days', '27', false, 69500.0, 0.0, 1500.0, 0.0, 6390.0, 6390.0, 0.0, 12780.0, 83780.0, '50% Advance with Purchase Order, 50% prior to dispatch', 'Ex-Factory, Uran Islampur (Sangli)', 'Commercial quotation formulated as per technical specs verified by S Patil.');

INSERT INTO "QuotationItem" ("id", "quotationId", "productId", "hsnCode", "quantity", "unitPrice", "discountPercent", "taxRatePercent", "taxAmount", "totalTaxable", "totalWithTax") VALUES
('qi-1', 'qt-1', 'prod-1', '87071000', 15, 2400.0, 0, 18.0, 6480.0, 36000.0, 42480.0),
('qi-2', 'qt-1', 'prod-2', '8707', 5, 6700.0, 0, 18.0, 6030.0, 33500.0, 39530.0);

INSERT INTO "QuotationStatusHistory" ("id", "quotationId", "status", "changedBy", "note") VALUES
('qsh-1', 'qt-1', 'DRAFT', 'Rahul Deshmukh (Sales Head)', 'Drafted initial quotation with volume pricing.'),
('qsh-2', 'qt-1', 'SENT', 'Rahul Deshmukh (Sales Head)', 'Issued formal quotation to ABC Auto Spares.');

-- 5.10 Orders (with Non-Guessable Cryptographic Tracking Tokens)
INSERT INTO "Order" ("id", "orderNumber", "trackingToken", "quotationId", "customerId", "netTaxableAmount", "taxAmount", "packagingCharges", "freightCharges", "grossOrderValue", "paymentStatus", "fulfillmentStatus", "transporterName", "trackingAwb", "shippingAddress", "notes") VALUES
('ord-1', 'ORD-2026-0041', 'AUT-8X3K9P', NULL, 'cust-1', 54000.0, 9720.0, 800.0, 1200.0, 65720.0, 'PARTIAL_ADVANCE', 'PACKED', 'VRL Logistics Ltd', 'VRL-MH-889124', 'Central Warehouse Unit 3, Old Pune-Bangalore Road, Sangli - 416416, Maharashtra', '10x Front Car Bumpers + 10x Fender Assemblies.'),
('ord-2', 'ORD-2026-0038', 'AUT-7Q2M4R', NULL, 'cust-1', 40800.0, 7344.0, 600.0, 1000.0, 49744.0, 'COMPLETED', 'DELIVERED', 'DTDC Express Cargo', 'DTDC-PUN-772190', 'Plot No. 44, MIDC Industrial Area, Shiroli, Kolhapur - 416122, Maharashtra', 'Delivered successfully with signed gate-pass acknowledgment.');

INSERT INTO "OrderItem" ("id", "orderId", "productId", "quantity", "unitPrice", "taxAmount", "totalPrice") VALUES
('oi-1', 'ord-1', 'prod-1', 10, 2400.0, 4320.0, 28320.0),
('oi-2', 'ord-1', 'prod-4', 10, 3000.0, 5400.0, 35400.0),
('oi-3', 'ord-2', 'prod-2', 6, 6800.0, 7344.0, 48144.0);

INSERT INTO "OrderStatusHistory" ("id", "orderId", "status", "changedBy", "note") VALUES
('osh-1', 'ord-1', 'CONFIRMED', 'System (Atomic Quote Acceptance)', 'Order confirmed upon advance token receipt. Stock reserved in Bay-A1-04.'),
('osh-2', 'ord-1', 'IN_PRODUCTION', 'Vikas Shinde (Warehouse Manager)', 'Goods pulled for QA inspection.'),
('osh-3', 'ord-1', 'PACKED', 'Vikas Shinde (Warehouse Manager)', 'Packed on reinforced pallets with edge protectors.'),
('osh-4', 'ord-2', 'CONFIRMED', 'Rahul Deshmukh', 'Advance received.'),
('osh-5', 'ord-2', 'DISPATCHED', 'Vikas Shinde', 'Dispatched via DTDC Express AWB DTDC-PUN-772190.'),
('osh-6', 'ord-2', 'DELIVERED', 'System (Carrier Webhook)', 'Delivery confirmed at Kolhapur warehouse.');

-- 5.11 Audit Logs
INSERT INTO "AuditLog" ("id", "userId", "action", "entityType", "entityId", "metadata") VALUES
('aud-1', 'usr_sales_1', 'CREATE_QUOTATION', 'QUOTATION', 'qt-1', '{"quoteNumber": "QT-2026-0012", "grossOrderValue": 83780.0}'),
('aud-2', 'usr_inv_1', 'UPDATE_ORDER_STATUS', 'ORDER', 'ord-1', '{"orderNumber": "ORD-2026-0041", "newStatus": "PACKED"}');

-- ==============================================================================
-- SCHEMA & SEED EXECUTION COMPLETED!
-- ==============================================================================
