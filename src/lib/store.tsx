"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Role = "ADMIN" | "SALES" | "INVENTORY" | "CUSTOMER";

export interface UserPersona {
  id: string;
  name: string;
  email: string;
  role: Role;
  roleTitle: string;
  companyName: string;
  avatar: string;
}

export interface RFQItem {
  productId: string;
  sku: string;
  name: string;
  hsnCode: string;
  categoryName: string;
  basePrice: number;
  quantity: number;
  moq: number;
  targetVehicle: string;
  image?: string;
}

export const USERS: UserPersona[] = [
  {
    id: "usr_admin_1",
    name: "S Patil",
    email: "admin@saiautohub.com",
    role: "ADMIN",
    roleTitle: "Managing Director & Plant Head",
    companyName: "Sai Envirotech Solutions",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
  },
  {
    id: "usr_sales_1",
    name: "Rahul Deshmukh",
    email: "sales@saiautohub.com",
    role: "SALES",
    roleTitle: "Sales Head & Commercial Lead",
    companyName: "Sai Envirotech Solutions",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    id: "usr_inv_1",
    name: "Vikas Shinde",
    email: "inventory@saiautohub.com",
    role: "INVENTORY",
    roleTitle: "Warehouse & Logistics Controller",
    companyName: "Sai Envirotech Solutions",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  },
  {
    id: "usr_cust_1",
    name: "Anand Kulkarni",
    email: "client@abcautoparts.com",
    role: "CUSTOMER",
    roleTitle: "Procurement Manager",
    companyName: "ABC Auto Spares & Logistics Pvt Ltd",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80",
  },
];

interface AppContextType {
  currentUser: UserPersona | null;
  setCurrentUser: (user: UserPersona | null) => void;
  loginAs: (email: string) => boolean;
  logout: () => void;
  rfqItems: RFQItem[];
  addToRFQ: (item: RFQItem) => void;
  removeFromRFQ: (productId: string) => void;
  updateRFQQuantity: (productId: string, quantity: number) => void;
  clearRFQ: () => void;
  isRFQOpen: boolean;
  setIsRFQOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserPersona | null>(null); // Starts as Guest / Logged Out
  const [rfqItems, setRfqItems] = useState<RFQItem[]>([]);
  const [isRFQOpen, setIsRFQOpen] = useState(false);

  // Load RFQ items and auth state from localStorage on client mount
  useEffect(() => {
    try {
      const savedRFQ = localStorage.getItem("sai_rfq_cart");
      if (savedRFQ) {
        setRfqItems(JSON.parse(savedRFQ));
      }
      const savedUser = localStorage.getItem("sai_auth_user");
      if (savedUser) {
        const found = USERS.find((u) => u.email.toLowerCase() === savedUser.toLowerCase());
        if (found) setCurrentUser(found);
      }
    } catch (e) {
      console.error("Failed to load local storage state:", e);
    }
  }, []);

  const loginAs = (email: string): boolean => {
    const found = USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUser(found);
      try {
        localStorage.setItem("sai_auth_user", found.email);
      } catch (e) {
        console.error(e);
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem("sai_auth_user");
    } catch (e) {
      console.error(e);
    }
  };

  const addToRFQ = (item: RFQItem) => {
    setRfqItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      let updated: RFQItem[];
      if (existing) {
        updated = prev.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        updated = [...prev, item];
      }
      try {
        localStorage.setItem("sai_rfq_cart", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
    setIsRFQOpen(true);
  };

  const removeFromRFQ = (productId: string) => {
    setRfqItems((prev) => {
      const updated = prev.filter((i) => i.productId !== productId);
      try {
        localStorage.setItem("sai_rfq_cart", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const updateRFQQuantity = (productId: string, quantity: number) => {
    setRfqItems((prev) => {
      const updated = prev.map((i) =>
        i.productId === productId ? { ...i, quantity: Math.max(i.moq, quantity) } : i
      );
      try {
        localStorage.setItem("sai_rfq_cart", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const clearRFQ = () => {
    setRfqItems([]);
    try {
      localStorage.removeItem("sai_rfq_cart");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        loginAs,
        logout,
        rfqItems,
        addToRFQ,
        removeFromRFQ,
        updateRFQQuantity,
        clearRFQ,
        isRFQOpen,
        setIsRFQOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
