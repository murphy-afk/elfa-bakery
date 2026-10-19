-- ============================================================
-- Elfa Bakery: database schema
-- Run this file in MySQL Workbench to create the structure.
-- Safe to run again: it drops and recreates the database.
-- ============================================================

DROP DATABASE IF EXISTS elfa_bakery;

CREATE DATABASE elfa_bakery
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE elfa_bakery;

-- ------------------------------------------------------------
-- Menu categories
-- ------------------------------------------------------------
CREATE TABLE categories (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name_it VARCHAR(120) NOT NULL,
  name_en VARCHAR(120) NOT NULL,
  slug VARCHAR(120) NOT NULL,
  position INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  UNIQUE KEY uq_categories_slug (slug)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Allergens, the 14 EU allergens
-- ------------------------------------------------------------
CREATE TABLE allergens (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  code TINYINT UNSIGNED NOT NULL,
  name_it VARCHAR(120) NOT NULL,
  name_en VARCHAR(120) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_allergens_code (code)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Menu items
-- price is DECIMAL so Workbench can edit it easily.
-- price stays NULL until the owner confirms the real value.
-- ------------------------------------------------------------
CREATE TABLE items (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  category_id INT UNSIGNED NOT NULL,
  name_it VARCHAR(160) NOT NULL,
  name_en VARCHAR(160) NOT NULL,
  description_it VARCHAR(400) DEFAULT NULL,
  description_en VARCHAR(400) DEFAULT NULL,
  price DECIMAL(6,2) DEFAULT NULL,
  image_url VARCHAR(500) DEFAULT NULL,
  is_featured TINYINT(1) NOT NULL DEFAULT 0,
  position INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  KEY idx_items_category (category_id),
  CONSTRAINT fk_items_category
    FOREIGN KEY (category_id) REFERENCES categories (id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Which allergens each item contains
-- ------------------------------------------------------------
CREATE TABLE item_allergens (
  item_id INT UNSIGNED NOT NULL,
  allergen_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (item_id, allergen_id),
  CONSTRAINT fk_ia_item
    FOREIGN KEY (item_id) REFERENCES items (id)
    ON DELETE CASCADE,
  CONSTRAINT fk_ia_allergen
    FOREIGN KEY (allergen_id) REFERENCES allergens (id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Opening hours, one row per day of the week
-- day_index: 0 = Sunday up to 6 = Saturday
-- is_open_all_day = 1 means the shop does not close
-- ------------------------------------------------------------
CREATE TABLE opening_hours (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  day_index TINYINT UNSIGNED NOT NULL,
  day_name_it VARCHAR(20) NOT NULL,
  day_name_en VARCHAR(20) NOT NULL,
  opens TIME DEFAULT NULL,
  closes TIME DEFAULT NULL,
  is_open_all_day TINYINT(1) NOT NULL DEFAULT 0,
  is_closed TINYINT(1) NOT NULL DEFAULT 0,
  note VARCHAR(200) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_hours_day (day_index)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Site settings, one row per key
-- ------------------------------------------------------------
CREATE TABLE settings (
  setting_key VARCHAR(80) NOT NULL,
  setting_value TEXT,
  PRIMARY KEY (setting_key)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Gallery images
-- ------------------------------------------------------------
CREATE TABLE gallery (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  image_url VARCHAR(500) NOT NULL,
  alt_it VARCHAR(200) NOT NULL,
  alt_en VARCHAR(200) NOT NULL,
  position INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
) ENGINE=InnoDB;
