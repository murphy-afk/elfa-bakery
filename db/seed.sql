-- ============================================================
-- Elfa Bakery: seed data
-- Run this file in MySQL Workbench AFTER schema.sql.
-- Safe to run again: it clears existing rows before inserting.
--
-- Prices are intentionally left NULL. The real prices were not
-- available in public sources. The owner must fill them in
-- Workbench. Never guess a price.
-- ============================================================

USE elfa_bakery;

-- Clear existing content, children first.
DELETE FROM item_allergens;
DELETE FROM items;
DELETE FROM categories;
DELETE FROM allergens;
DELETE FROM opening_hours;
DELETE FROM settings;
DELETE FROM gallery;

-- ------------------------------------------------------------
-- Categories, order taken from the digital menu catalog
-- ------------------------------------------------------------
INSERT INTO categories (id, name_it, name_en, slug, position) VALUES
  (1, 'Pizze Classiche', 'Classic Pizzas', 'pizze-classiche', 1),
  (2, 'Bagel', 'Bagels', 'bagel', 2),
  (3, 'Insalate', 'Salads', 'insalate', 3),
  (4, 'Panini e Piadine', 'Sandwiches and Piadinas', 'panini-e-piadine', 4),
  (5, 'Primi e Secondi', 'First and Second Courses', 'primi-e-secondi', 5),
  (6, 'Contorni', 'Side Dishes', 'contorni', 6),
  (7, 'Kebab', 'Kebab', 'kebab', 7);

-- ------------------------------------------------------------
-- The 14 EU allergens
-- ------------------------------------------------------------
INSERT INTO allergens (id, code, name_it, name_en) VALUES
  (1, 1,  'Cereali contenenti glutine', 'Cereals containing gluten'),
  (2, 2,  'Crostacei e prodotti a base di crostacei', 'Crustaceans and products thereof'),
  (3, 3,  'Uova e prodotti a base di uova', 'Eggs and products thereof'),
  (4, 4,  'Pesce e prodotti a base di pesce', 'Fish and products thereof'),
  (5, 5,  'Arachidi e prodotti a base di arachidi', 'Peanuts and products thereof'),
  (6, 6,  'Soia e prodotti a base di soia', 'Soy and products thereof'),
  (7, 7,  'Latte e prodotti a base di latte, incluso lattosio', 'Milk and products thereof, including lactose'),
  (8, 8,  'Frutta a guscio', 'Tree nuts'),
  (9, 9,  'Sedano e prodotti a base di sedano', 'Celery and products thereof'),
  (10, 10, 'Senape e prodotti a base di senape', 'Mustard and products thereof'),
  (11, 11, 'Semi di sesamo e prodotti a base di semi di sesamo', 'Sesame and products thereof'),
  (12, 12, 'Anidride solforosa e solfiti', 'Sulphur dioxide and sulphites'),
  (13, 13, 'Lupini e prodotti a base di lupini', 'Lupin and products thereof'),
  (14, 14, 'Molluschi e prodotti a base di molluschi', 'Molluscs and products thereof');

-- ------------------------------------------------------------
-- Menu items, names gathered from reviews and the catalog.
-- Price is NULL on purpose. TODO: owner fills in real prices.
-- ------------------------------------------------------------
INSERT INTO items (id, category_id, name_it, name_en, description_it, description_en, price, image_url, is_featured, position) VALUES
  (1, 1, 'Pizza Kebab', 'Kebab Pizza', NULL, NULL, NULL, NULL, 0, 1),
  (2, 1, 'Pizza Funghi e Prosciutto', 'Mushroom and Ham Pizza', NULL, NULL, NULL, NULL, 0, 2),
  (3, 1, 'Pizza Diavola', 'Spicy Salami Pizza', NULL, NULL, NULL, NULL, 0, 3),
  (4, 1, 'Pizza Quattro Formaggi', 'Four Cheese Pizza', NULL, NULL, NULL, NULL, 0, 4),

  (5, 2, 'Bagel Salmone, Formaggio e Uovo', 'Salmon, Cheese and Egg Bagel', 'Il bagel piu apprezzato dai nostri clienti.', 'The bagel our guests love the most.', NULL, NULL, 1, 1),
  (6, 2, 'Bagel Classico', 'Classic Bagel', NULL, NULL, NULL, NULL, 0, 2),

  (7, 3, 'Insalata Mista', 'Mixed Salad', NULL, NULL, NULL, NULL, 0, 1),
  (8, 3, 'Insalata con Salmone', 'Salmon Salad', NULL, NULL, NULL, NULL, 0, 2),

  (9, 4, 'Panino Sfogliato', 'Flaky Sandwich', 'Novita in negozio.', 'New in the shop.', NULL, NULL, 1, 1),
  (10, 4, 'Panino con Tacchino, Formaggio e Cetriolini', 'Turkey, Cheese and Pickle Sandwich', NULL, NULL, NULL, NULL, 0, 2),
  (11, 4, 'Piadina Classica', 'Classic Piadina', 'Aggiungi 1 euro alla piadina base.', 'Add 1 euro to the base piadina.', NULL, NULL, 0, 3),
  (12, 4, 'Panino Salmone e Avocado', 'Salmon and Avocado Sandwich', 'Con formaggio spalmabile.', 'With cream cheese.', NULL, NULL, 0, 4),

  (13, 5, 'Lasagna', 'Lasagna', 'Ricca, abbondante e gustosa.', 'Rich, generous and tasty.', NULL, NULL, 1, 1),
  (14, 5, 'Omelette', 'Omelette', NULL, NULL, NULL, NULL, 0, 2),

  (15, 6, 'Focaccia alle Olive', 'Olive Focaccia', NULL, NULL, NULL, NULL, 0, 1),
  (16, 6, 'Focaccia Pomodoro e Basilico', 'Tomato and Basil Focaccia', NULL, NULL, NULL, NULL, 0, 2),
  (17, 6, 'Patate Fritte', 'French Fries', NULL, NULL, NULL, NULL, 0, 3),

  (18, 7, 'Kebab', 'Kebab', NULL, NULL, NULL, NULL, 0, 1),
  (19, 7, 'Falafel', 'Falafel', NULL, NULL, NULL, NULL, 0, 2),
  (20, 7, 'Shawarma', 'Shawarma', NULL, NULL, NULL, NULL, 0, 3);

-- ------------------------------------------------------------
-- Allergens for the items where they are certain.
-- TODO: owner confirms and completes the remaining items.
-- ------------------------------------------------------------
INSERT INTO item_allergens (item_id, allergen_id) VALUES
  (5, 1),  (5, 3),  (5, 7),
  (6, 1),
  (9, 1),
  (10, 1), (10, 7),
  (11, 1),
  (12, 4), (12, 7),
  (13, 1), (13, 3), (13, 7);

-- ------------------------------------------------------------
-- Opening hours. The shop states it is always open.
-- Monday to Saturday are set to open all day.
-- Sunday is left to confirm, one source said 06:00 to 14:30.
-- TODO: owner confirms Sunday hours.
-- ------------------------------------------------------------
INSERT INTO opening_hours (id, day_index, day_name_it, day_name_en, opens, closes, is_open_all_day, is_closed, note) VALUES
  (1, 0, 'Domenica', 'Sunday',  '06:00:00', '14:30:00', 0, 0, 'Orario da confermare'),
  (2, 1, 'Lunedi',   'Monday',  NULL,       NULL,       1, 0, NULL),
  (3, 2, 'Martedi',  'Tuesday', NULL,       NULL,       1, 0, NULL),
  (4, 3, 'Mercoledi','Wednesday',NULL,       NULL,       1, 0, NULL),
  (5, 4, 'Giovedi',  'Thursday',NULL,       NULL,       1, 0, NULL),
  (6, 5, 'Venerdi',  'Friday',  NULL,       NULL,       1, 0, NULL),
  (7, 6, 'Sabato',   'Saturday',NULL,       NULL,       1, 0, NULL);

-- ------------------------------------------------------------
-- Site settings
-- ------------------------------------------------------------
INSERT INTO settings (setting_key, setting_value) VALUES
  ('name',            'Elfa Bakery'),
  ('tagline_it',      'Bakery, caffetteria, pasticceria e gastronomia a Milano'),
  ('tagline_en',      'Bakery, coffee shop, pastry shop and deli in Milan'),
  ('address_line',    'Via Sardegna 40'),
  ('address_city',    '20146 Milano'),
  ('address_country', 'Italia'),
  ('phone_primary',   '+39 327 371 8769'),
  ('phone_secondary', '+39 02 3659 8767'),
  ('email',           ''),
  ('website',         'www.elfabakery.it'),
  ('instagram',       'elfa_bakery_milan'),
  ('facebook',        'elfabakery'),
  ('latitude',        '45.461527'),
  ('longitude',       '9.1502783'),
  ('price_range',     '1-10'),
  ('halal',           '1'),
  ('rating_google',   '4.3'),
  ('rating_reviews',  '422');

-- ------------------------------------------------------------
-- Gallery. TODO: owner supplies real photos with usage rights.
-- Left empty on purpose.
-- ------------------------------------------------------------
