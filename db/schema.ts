import { pgTable, text, timestamp, integer, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  username: text("username").notNull().unique(),
  avatarUrl: text("avatar_url"),
  aiCredits: integer("ai_credits").default(10).notNull(),
  role: text("role").default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
});

export const threads = pgTable("threads", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  authorId: uuid("author_id").references(() => users.id).notNull(),
  categoryId: uuid("category_id").references(() => categories.id).notNull(),
  viewCount: integer("view_count").default(0).notNull(),
  beforeImageUrl: text("before_image_url"),
  afterImageUrl: text("after_image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const threadsRelations = relations(threads, ({ one }) => ({
  author: one(users, { fields: [threads.authorId], references: [users.id] }),
  category: one(categories, { fields: [threads.categoryId], references: [categories.id] }),
}));
