import { InferInsertModel, InferSelectModel, sql } from "drizzle-orm";
import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { AdapterAccountType } from "next-auth/adapters";

// ============================
// Users Table
// ============================
export const users = sqliteTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image"),

  firstName: text("firstName"),
  lastName: text("lastName"),
  address: text("address"),

  createdAt: text("createdAt").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updatedAt").default(sql`CURRENT_TIMESTAMP`),
});

// ============================
// Invoices Table
// ============================
export const invoices = sqliteTable("invoice", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),

  invoiceName: text("invoiceName").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(strftime('%s','now') * 1000)`),
  updatedAt: integer("updatedAt", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(strftime('%s','now') * 1000)`),
  dueDate: text("dueDate").notNull(),
  date: integer("date", { mode: "timestamp_ms" }).notNull(),
  status: text("status", {
    enum: ["PENDING", "PAID"],
  }).notNull(),

  fromName: text("fromName").notNull(),
  fromEmail: text("fromEmail").notNull(),
  fromAddress: text("fromAddress").notNull(),

  clientName: text("clientName").notNull(),
  clientEmail: text("clientEmail").notNull(),
  clientAddress: text("clientAddress").notNull(),

  currency: text("currency", {
    enum: ["INR", "USD", "EUR", "GBP"],
  }).notNull(),

  invoiceNumber: integer("invoiceNumber").notNull(),
  invoiceItemDescription: text("invoiceItemDescription").notNull(),
  invoiceItemQuantity: integer("invoiceItemQuantity").notNull(),
  invoiceItemRate: integer("invoiceItemRate").notNull(),
  invoiceItemTotal: integer("invoiceItemTotal").notNull(),

  note: text("note"),

  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const accounts = sqliteTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  ]
);

export const sessions = sqliteTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
});

export const verificationTokens = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (verificationToken) => [
    primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  ]
);

export const authenticators = sqliteTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: integer("credentialBackedUp", {
      mode: "boolean",
    }).notNull(),
    transports: text("transports"),
  },
  (authenticator) => [
    primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  ]
);

type User = InferSelectModel<typeof users>;
type Invoices = InferSelectModel<typeof invoices>;
type NewUser = InferInsertModel<typeof users>;
type NewInvoice = InferInsertModel<typeof users>;

export type { Invoices, NewInvoice, NewUser, User };
