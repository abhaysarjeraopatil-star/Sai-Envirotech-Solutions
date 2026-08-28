# Sai AutoHub — B2B Automotive Sales & Operations Platform

An enterprise-grade B2B Automotive Sales, CRM, Quotation Engine & Dual-Ledger Inventory Platform designed for **Sai Envirotech Solutions** (Uran Islampur, Sangli, Maharashtra).

---

## 🚀 Key Features

1. **Public B2B Showroom**: Filter automotive bumpers, tractor parts, and earthmoving parts by vehicle platform (Mahindra Bolero, JCB 3DX, Sonalika DI-750, Tata Ace) and customs HSN codes (`87071000`, `8707`).
2. **Multi-Item RFQ Cart**: Bulk buyers build quote requests with target vehicles and notes, automatically routing into the Sales CRM.
3. **AI RFQ Parser**: Extracts structured parts and quantities from raw WhatsApp/Email text with verification before creating an inquiry.
4. **Sales CRM Pipeline**: Kanban board with lead status progression (`NEW` ➔ `CONTACTED` ➔ `SPECS_VERIFIED` ➔ `QUOTATION_SENT` ➔ `WON`).
5. **Configurable GST Quotation Engine**: Live dynamic tax calculation for Intra-state (CGST 9% + SGST 9%) vs Inter-state (IGST 18%), packaging, freight, and printable PDF documents.
6. **Customer Self-Service Portal**: B2B clients review quotes, perform **1-Click Atomic Acceptance**, and track orders.
7. **Dual-Ledger Inventory**: Physical vs Reserved vs Available-to-Promise (`Available = Physical - Reserved`) with transactional consistency.
8. **Secure Token Tracking**: Non-guessable 9-character tokens (e.g., `AUT-8X3K9P`) for consignments in transit.
9. **Executive KPI Dashboard**: Net Taxable Revenue, Statutory Tax Schedules, Gross Order Bookings, and Low-Stock triggers.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router, Server Actions)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Modern SaaS UI
- **Database**: PostgreSQL (Supabase) & Prisma ORM
- **State & Context**: React Context with LocalStorage persistence
- **Icons**: Lucide React

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Supabase Environment Variables
Copy `.env.example` to `.env.local` and set your Supabase API credentials:
```env
NEXT_PUBLIC_SUPABASE_URL="https://gowvkclrwjkcmtycjsoe.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 👥 Corporate Roles & Access

Sign in at [/login](http://localhost:3000/login) using corporate credentials:
- **Admin**: S Patil (`admin@saiautohub.com`) — Access `/admin/dashboard`
- **Sales Head**: Rahul Deshmukh (`sales@saiautohub.com`) — Access `/admin/dashboard`
- **Warehouse Manager**: Vikas Shinde (`inventory@saiautohub.com`) — Access `/admin/dashboard`
- **B2B Client**: Anand Kulkarni (`client@abcautoparts.com`) — Access `/portal/dashboard`

---

## 📜 Statutory Tax Schedules
Tax rates under HSN `87071000` and `8707` are dynamically configurable under `/admin/tax-rules` according to CBIC GST notifications.
