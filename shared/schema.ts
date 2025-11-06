import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Configuration Schema for Car Customization
export const configurations = pgTable("configurations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  exteriorColor: text("exterior_color").notNull(),
  brakeColor: text("brake_color").notNull(),
  wheelDesign: text("wheel_design").notNull(),
  carbonFiberPackage: text("carbon_fiber_package").notNull(),
  interiorMaterial: text("interior_material").notNull(),
  stitchingColor: text("stitching_color").notNull(),
  emblemStyle: text("emblem_style").notNull(),
  price: integer("price").notNull(),
  shareUrl: text("share_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Test Drive Request Schema
export const testDriveRequests = pgTable("test_drive_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  preferredModel: text("preferred_model").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert Schemas
export const insertConfigurationSchema = createInsertSchema(configurations).omit({
  id: true,
  shareUrl: true,
  createdAt: true,
});

export const insertTestDriveRequestSchema = createInsertSchema(testDriveRequests).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertConfiguration = z.infer<typeof insertConfigurationSchema>;
export type Configuration = typeof configurations.$inferSelect;
export type InsertTestDriveRequest = z.infer<typeof insertTestDriveRequestSchema>;
export type TestDriveRequest = typeof testDriveRequests.$inferSelect;

// Configuration Options
export const exteriorColors = [
  { id: "atlantic-blue", name: "Atlantic Blue", hex: "#1e3a8a", metallic: true },
  { id: "french-racing-blue", name: "French Racing Blue", hex: "#0ea5e9", metallic: true },
  { id: "black-carbon", name: "Black Carbon", hex: "#0a0a0a", metallic: false },
  { id: "glacier-white", name: "Glacier White", hex: "#f8fafc", metallic: true },
  { id: "red-pur-sang", name: "Rouge Pur Sang", hex: "#dc2626", metallic: true },
  { id: "yellow-molsheim", name: "Yellow Molsheim", hex: "#eab308", metallic: true },
  { id: "silver-argent", name: "Silver Argent", hex: "#94a3b8", metallic: true },
  { id: "orange-dutch", name: "Dutch Orange", hex: "#f97316", metallic: true },
];

export const brakeColors = [
  { id: "red", name: "Red Ceramic", hex: "#dc2626" },
  { id: "yellow", name: "Yellow Ceramic", hex: "#eab308" },
  { id: "blue", name: "Blue Ceramic", hex: "#0ea5e9" },
  { id: "black", name: "Black Ceramic", hex: "#0a0a0a" },
  { id: "orange", name: "Orange Ceramic", hex: "#f97316" },
];

export const wheelDesigns = [
  { id: "standard", name: "Standard Alloy", price: 0 },
  { id: "diamond-cut", name: "Diamond Cut", price: 5000 },
  { id: "carbon-fiber", name: "Carbon Fiber", price: 15000 },
  { id: "forged-titanium", name: "Forged Titanium", price: 25000 },
  { id: "split-spoke", name: "Split Spoke", price: 10000 },
];

export const carbonFiberPackages = [
  { id: "none", name: "None", price: 0 },
  { id: "exterior", name: "Exterior Package", price: 35000, includes: ["Hood", "Mirrors", "Diffuser"] },
  { id: "interior", name: "Interior Package", price: 25000, includes: ["Dashboard", "Center Console", "Door Panels"] },
  { id: "full", name: "Full Package", price: 55000, includes: ["All Exterior", "All Interior", "Engine Bay"] },
];

export const interiorMaterials = [
  { id: "leather-black", name: "Black Leather", hex: "#1a1a1a", price: 0 },
  { id: "leather-beige", name: "Beige Leather", hex: "#d4a574", price: 5000 },
  { id: "leather-brown", name: "Brown Leather", hex: "#6b4423", price: 5000 },
  { id: "alcantara-black", name: "Black Alcantara", hex: "#0a0a0a", price: 15000 },
  { id: "alcantara-blue", name: "Blue Alcantara", hex: "#1e3a8a", price: 15000 },
  { id: "carbon-leather", name: "Carbon + Leather", hex: "#2a2a2a", price: 25000 },
];

export const stitchingColors = [
  { id: "white", name: "White", hex: "#ffffff" },
  { id: "red", name: "Red", hex: "#dc2626" },
  { id: "blue", name: "Blue", hex: "#0ea5e9" },
  { id: "yellow", name: "Yellow", hex: "#eab308" },
  { id: "orange", name: "Orange", hex: "#f97316" },
  { id: "black", name: "Black", hex: "#0a0a0a" },
];

// Emblem / Logo Styles
export const emblemStyles = [
  {
    id: "original",
    name: "Original Style",
    description: "Classic EB-inspired badge with rich contrast",
    preview: "/emblems/original.svg",
  },
  {
    id: "minimal",
    name: "Modern Minimal",
    description: "Sleek, flat monochrome variant",
    preview: "/emblems/minimal.svg",
  },
  {
    id: "neon",
    name: "Futuristic Neon",
    description: "Glow edges and tech vibe",
    preview: "/emblems/neon.svg",
  },
  {
    id: "luxury3d",
    name: "3D Luxury",
    description: "Chrome texture with deep reflections",
    preview: "/emblems/luxury3d.svg",
  },
  {
    id: "custom",
    name: "Custom Creative",
    description: "Personalized monogram variant",
    preview: "/emblems/custom.svg",
  },
];

export const bugattiModels = [
  { id: "chiron", name: "Chiron", basePrice: 3000000 },
  { id: "chiron-super-sport", name: "Chiron Super Sport 300+", basePrice: 3500000 },
  { id: "chiron-pur-sport", name: "Chiron Pur Sport", basePrice: 3200000 },
  { id: "bolide", name: "Bolide", basePrice: 4700000 },
  { id: "divo", name: "Divo", basePrice: 5800000 },
];
