-- ============================================================
-- Elfa Bakery: seed data
-- Run this file in MySQL Workbench AFTER schema.sql.
-- Safe to run again: it clears existing rows before inserting.
--
-- Prices are intentionally left NULL. The in-shop prices are not
-- confirmed yet. Public delivery prices were collected and are
-- written down in docs/menu-price-research.md, they are NOT
-- copied here, because delivery prices can differ from the
-- counter price. The owner must fill them in Workbench.
-- Never guess a price.
--
-- Item names and descriptions come from public sources, see
-- docs/menu-price-research.md. Categories marked TODO have no
-- named item in any source yet.
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
-- Categories.
-- Pizze classiche to Kebab come from the in-shop Qromo catalog.
-- Pizza al trancio, Gastronomia, Bevande, Pasticceria and the
-- kebab menu sets come from the shop Glovo listing.
-- TODO: owner confirms the final category order and names.
-- ------------------------------------------------------------
INSERT INTO categories (id, name_it, name_en, slug, position) VALUES
  (1,  'Pizze Classiche',        'Classic Pizzas',            'pizze-classiche',         1),
  (2,  'Pizza al Trancio',       'Pizza by the Slice',        'pizza-al-trancio',        2),
  (3,  'Bagel',                  'Bagels',                    'bagel',                   3),
  (4,  'Insalate',               'Salads',                    'insalate',                4),
  (5,  'Panini e Piadine',       'Sandwiches and Piadinas',   'panini-e-piadine',        5),
  (6,  'Primi e Secondi',        'First and Second Courses',  'primi-e-secondi',         6),
  (7,  'Contorni',               'Side Dishes',               'contorni',                7),
  (8,  'Kebab e Falafel',        'Kebab and Falafel',         'kebab',                   8),
  (9,  'Menu Kebab e Falafel',   'Kebab and Falafel Sets',    'menu-kebab-e-falafel',    9),
  (10, 'Gastronomia',            'Deli Counter',              'gastronomia',            10),
  (11, 'Bevande',                'Drinks',                    'bevande',                11),
  (12, 'Pasticceria',            'Pastries',                  'pasticceria',            12);

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
-- Menu items. price is NULL for every row on purpose.
-- TODO: owner fills in real prices in Workbench.
-- TODO: categories 4 and 7 are empty, see below.
-- ------------------------------------------------------------
INSERT INTO items (id, category_id, name_it, name_en, description_it, description_en, price, image_url, is_featured, position) VALUES

  -- Pizze classiche, source: Glovo listing
  (1,  1, 'Quattro stagioni',              'Four Seasons',            'Cotto, funghi, carciofi e olive nere',            'Ham, mushrooms, artichokes and black olives',   NULL, NULL, 0, 1),
  (2,  1, 'Capricciosa',                   'Capricciosa',             'Pizza capricciosa',                               'Classic pizza capricciosa',                     NULL, NULL, 0, 2),
  (3,  1, 'Valtellina',                    'Valtellina',              'Bresaola, rucola e grana',                        'Bresaola, rocket and grana cheese',             NULL, NULL, 0, 3),
  (4,  1, 'Pizza Kebab',                   'Kebab Pizza',             'Pizza kebab completa',                            'Complete kebab pizza',                          NULL, NULL, 0, 4),
  (5,  1, 'Quattro formaggi',              'Four Cheese',             'Mozzarella e formaggi misti',                     'Mozzarella and mixed cheeses',                 NULL, NULL, 0, 5),
  (6,  1, 'Funghi',                        'Mushrooms',               'Pizza con funghi misti',                          'Pizza with mixed mushrooms',                   NULL, NULL, 0, 6),
  (7,  1, 'Napoli',                        'Naples',                  'Pomodoro, mozzarella e acciughe',                 'Tomato, mozzarella and anchovies',             NULL, NULL, 0, 7),
  (8,  1, 'Tonno e cipolla',               'Tuna and Onion',          'Pizza tonno, cipolla e origano',                  'Tuna, onion and oregano pizza',                NULL, NULL, 0, 8),
  (9,  1, 'Diavola',                       'Spicy Salami',            'Pomodoro, mozzarella e salame piccante',          'Tomato, mozzarella and spicy salami',          NULL, NULL, 0, 9),
  (10, 1, 'Romana',                        'Roman Style',             'Acciughe, capperi e olive',                       'Anchovies, capers and olives',                 NULL, NULL, 0, 10),
  (11, 1, 'Prosciutto funghi',             'Ham and Mushroom',        'Pomodoro, mozzarella, prosciutto e funghi',       'Tomato, mozzarella, ham and mushrooms',        NULL, NULL, 0, 11),
  (12, 1, 'Vegetariana',                   'Vegetarian',              'Pomodoro, mozzarella e verdure miste',            'Tomato, mozzarella and mixed vegetables',      NULL, NULL, 0, 12),
  (13, 1, 'Wurstel e patatine',            'Sausage and Fries',       'Wurstel e patatine',                             'Sausage and fries',                            NULL, NULL, 0, 13),
  (14, 1, 'Bismark',                       'Bismarck',                'Cotto e uovo',                                   'Ham and egg',                                  NULL, NULL, 0, 14),
  (15, 1, 'Porcini scamorza',              'Porcini and Scamorza',    NULL,                                              NULL,                                           NULL, NULL, 0, 15),
  (16, 1, 'Prosciutto crudo',              'Cured Ham',               'Pizza con prosciutto crudo',                     'Pizza with cured ham',                         NULL, NULL, 0, 16),
  (17, 1, 'Margherita',                    'Margherita',              'Pomodoro e mozzarella',                          'Tomato and mozzarella',                        NULL, NULL, 0, 17),
  (18, 1, 'Marinara',                      'Marinara',                'Pizza marinara',                                 'Marinara pizza',                               NULL, NULL, 0, 18),

  -- Pizza al trancio, source: Glovo listing
  (19, 2, 'Pizza al trancio margherita',   'Margherita Slice',        'Margherita al trancio, calda e appena sfornata',  'Hot margherita slice straight from the oven',   NULL, NULL, 0, 1),
  (20, 2, 'Pizza al trancio salame piccante', 'Spicy Salami Slice',   'Salame piccante al trancio, calda e appena sfornata', 'Hot spicy salami slice straight from the oven', NULL, NULL, 0, 2),
  (21, 2, 'Pizza al trancio wurstel e patatine', 'Sausage and Fries Slice', 'Wurstel e patatine al trancio, calda e appena sfornata', 'Hot sausage and fries slice straight from the oven', NULL, NULL, 0, 3),

  -- Bagel, source: review of 2025-11-24
  -- TODO: owner gives the other bagel varieties.
  (22, 3, 'Bagel Salmone, Formaggio e Uovo', 'Salmon, Cheese and Egg Bagel', 'Il bagel più apprezzato dai nostri clienti.', 'The bagel our guests love the most.', NULL, NULL, 1, 1),

  -- Category 4 Insalate: no item name exists in any source.
  -- TODO: owner supplies the salad item names and prices.

  -- Panini e Piadine, source: reviews and the shop Instagram
  -- TODO: the in-shop catalog lists a base piadina with a 1 euro
  -- supplement, the owner must give the item name and price.
  (23, 5, 'Panino con Tacchino, Formaggio e Cetriolini', 'Turkey, Cheese and Pickle Sandwich', 'Panino gourmet con tacchino, formaggio e cetriolini.', 'Gourmet sandwich with turkey, cheese and pickles.', NULL, NULL, 0, 1),
  (24, 5, 'Panino Salmone e Avocado',      'Salmon and Avocado Sandwich', 'Con formaggio spalmabile.',                 'With cream cheese.',                            NULL, NULL, 0, 2),
  (25, 5, 'Panino Sfogliato',              'Flaky Sandwich',          'Novità in negozio.',                             'New in the shop.',                              NULL, NULL, 1, 3),

  -- Primi e Secondi, source: reviews
  (26, 6, 'Lasagna',                       'Lasagna',                 'Ricca, abbondante e gustosa.',                    'Rich, generous and tasty.',                     NULL, NULL, 1, 1),
  (27, 6, 'Omelette',                      'Omelette',                NULL,                                              NULL,                                           NULL, NULL, 0, 2),

  -- Category 7 Contorni: no item name exists in any source.
  -- The Glovo listing puts the fries under Gastronomia.
  -- TODO: owner supplies the side dish item names and prices.

  -- Kebab e Falafel, source: Glovo listing, names kept verbatim
  (28, 8, 'Piatto kebab',                  'Kebab Plate',             'Piatto kebab di pollo',                          'Chicken kebab plate',                           NULL, NULL, 0, 1),
  (29, 8, 'Piadina',                       'Kebab Piadina',           'Piadina kebab',                                  'Kebab piadina',                                 NULL, NULL, 0, 2),
  (30, 8, 'Panino',                        'Kebab Sandwich',          'Panino kebab',                                   'Kebab sandwich',                                NULL, NULL, 0, 3),
  (31, 8, 'Piadina falafel vegana',        'Vegan Falafel Piadina',   'Piadina falafel di ceci',                        'Chickpea falafel piadina',                      NULL, NULL, 0, 4),
  (32, 8, 'Panino falafel vegano',         'Vegan Falafel Sandwich',  'Panino falafel di ceci',                         'Chickpea falafel sandwich',                     NULL, NULL, 0, 5),
  (33, 8, 'Panino hot dog',                'Hot Dog Sandwich',        'Panino con ketchup e maionese',                  'Sandwich with ketchup and mayonnaise',          NULL, NULL, 0, 6),

  -- Menu Kebab e Falafel, source: Glovo listing
  (34, 9, 'Menu piatto kebab',             'Kebab Plate Menu',        'Piatto con bibita',                              'Plate with a drink',                            NULL, NULL, 0, 1),
  (35, 9, 'Menu piadina kebab',            'Kebab Piadina Menu',      'Piadina, patatine e bibita',                     'Piadina, fries and a drink',                    NULL, NULL, 0, 2),
  (36, 9, 'Menu panino kebab',             'Kebab Sandwich Menu',     'Panino, patatine e bibita',                      'Sandwich, fries and a drink',                   NULL, NULL, 0, 3),
  (37, 9, 'Menu piatto falafel',           'Falafel Plate Menu',      'Piatto falafel e bibita',                        'Falafel plate and a drink',                     NULL, NULL, 0, 4),
  (38, 9, 'Menu piadina falafel',          'Falafel Piadina Menu',    'Piadina falafel, patatine e bibita',             'Falafel piadina, fries and a drink',            NULL, NULL, 0, 5),
  (39, 9, 'Menu panino falafel',           'Falafel Sandwich Menu',   'Panino falafel, patatine e bibita',              'Falafel sandwich, fries and a drink',           NULL, NULL, 0, 6),

  -- Gastronomia, sources: Glovo listing for 40 to 44,
  -- shop Facebook post of 08/07/2026 for the arrosticini
  (40, 10, 'Panzerotti fritti',            'Fried Panzerotto',        'Ripieno di pomodoro e mozzarella',               'Filled with tomato and mozzarella',             NULL, NULL, 0, 1),
  (41, 10, 'Porzione di patatine',         'Portion of Fries',        'Patatine fritte',                               'French fries',                                  NULL, NULL, 0, 2),
  (42, 10, 'Arancini',                     'Arancini',                NULL,                                              NULL,                                           NULL, NULL, 0, 3),
  (43, 10, 'Focaccia alle Olive',          'Olive Focaccia',          NULL,                                              NULL,                                           NULL, NULL, 0, 4),
  (44, 10, 'Focaccia Pomodoro e Basilico', 'Tomato and Basil Focaccia', NULL,                                            NULL,                                           NULL, NULL, 0, 5),
  (45, 10, 'Arrosticini di Pecora Abruzzesi DOC', 'Abruzzese Lamb Skewers', 'Cotti al momento.',                     'Cooked to order.',                              NULL, NULL, 0, 6),

  -- Bevande, source: Glovo listing
  (46, 11, 'Coca-Cola bottiglia 1,5 l',    'Coca-Cola 1.5 l Bottle',  'Bottiglia da 1,5 litri',                         '1.5 litre bottle',                              NULL, NULL, 0, 1),
  (47, 11, 'Coca-Cola bottiglia',          'Coca-Cola Bottle',        'Bottiglia',                                      'Bottle',                                        NULL, NULL, 0, 2),
  (48, 11, 'Coca-Cola lattina',            'Coca-Cola Can',           'Lattina',                                        'Can',                                           NULL, NULL, 0, 3),
  (49, 11, 'Coca-Cola Zero lattina',       'Coca-Cola Zero Can',      'Lattina',                                        'Can',                                           NULL, NULL, 0, 4),
  (50, 11, 'Pepsi lattina',                'Pepsi Can',               'Lattina',                                        'Can',                                           NULL, NULL, 0, 5),
  (51, 11, 'Chinotto lattina',             'Chinotto Can',            'Lattina',                                        'Can',                                           NULL, NULL, 0, 6),
  (52, 11, 'Lemon Soda lattina',           'Lemon Soda Can',          'Lattina',                                        'Can',                                           NULL, NULL, 0, 7),
  (53, 11, 'Fanta lattina',                'Fanta Can',               'Lattina',                                        'Can',                                           NULL, NULL, 0, 8),
  (54, 11, 'Sprite lattina',               'Sprite Can',              'Lattina',                                        'Can',                                           NULL, NULL, 0, 9),
  (55, 11, 'Red Bull',                     'Red Bull',                'Lattina',                                        'Can',                                           NULL, NULL, 0, 10),
  (56, 11, 'Estathè limone',               'Lemon Iced Tea',          'Tè freddo al limone',                            'Lemon iced tea',                                NULL, NULL, 0, 11),
  (57, 11, 'Estathè pesca',                'Peach Iced Tea',          'Tè freddo alla pesca',                           'Peach iced tea',                                NULL, NULL, 0, 12),
  (58, 11, 'Acqua naturale',               'Still Water',             'Bottiglia di acqua naturale',                    'Bottle of still water',                         NULL, NULL, 0, 13),
  (59, 11, 'Acqua frizzante',              'Sparkling Water',         'Bottiglia di acqua frizzante',                   'Bottle of sparkling water',                     NULL, NULL, 0, 14),

  -- Pasticceria, sources: Glovo listing for 60 to 68,
  -- shop Facebook post of 14/06/2026 for the crostatine
  (60, 12, 'Chocolate fudge cake',         'Chocolate Fudge Cake',    'Fetta di torta al cioccolato',                   'Slice of chocolate cake',                       NULL, NULL, 0, 1),
  (61, 12, 'Mini doughnut 3 pz',           'Mini Doughnuts, 3 pieces', 'Ripieni di marmellata, fragole o cioccolato',   'Filled with jam, strawberry or chocolate',      NULL, NULL, 0, 2),
  (62, 12, 'Strudel di mela',              'Apple Strudel',           'Marmellata di mela, cannella, mandorle e uvetta', 'Apple jam, cinnamon, almonds and raisins',     NULL, NULL, 0, 3),
  (63, 12, 'Torta ricotta e gocce di cioccolato', 'Ricotta and Chocolate Chip Cake', 'Frolla ricotta',                    'Ricotta shortcrust',                            NULL, NULL, 0, 4),
  (64, 12, 'Sbrodolone crema',             'Sbrodolone Cream Cake',   'Sbrodolone',                                     'Sbrodolone',                                    NULL, NULL, 0, 5),
  (65, 12, 'Doughnut grande',              'Large Doughnut',          'Doughnut',                                       'Doughnut',                                      NULL, NULL, 0, 6),
  (66, 12, 'Mela senza grassi',            'Fat-Free Apple Cake',     'Tortina di mela senza grassi, tipo muffin',       'Fat-free apple cake, muffin style',             NULL, NULL, 0, 7),
  (67, 12, 'Muffins Duomo',                'Duomo Muffins',           'Muffin al cioccolato',                           'Chocolate muffin',                              NULL, NULL, 0, 8),
  (68, 12, 'Muffins San Babila Red Velvet', 'San Babila Red Velvet Muffins', NULL,                                       NULL,                                           NULL, NULL, 0, 9),
  (69, 12, 'Crostatine artigianali',       'Mini Artisan Tarts',      'Preparate ogni giorno.',                         'Made fresh every day.',                         NULL, NULL, 0, 10);

-- ------------------------------------------------------------
-- Allergens. Only what is certain from the listed ingredients:
-- gluten for wheat dough, plus the allergen named in the
-- description of the item.
-- The full matrix is a legal requirement and it is missing.
-- TODO: owner supplies the allergen list for every item.
-- ------------------------------------------------------------
INSERT INTO item_allergens (item_id, allergen_id) VALUES
  (22, 1), (22, 3), (22, 7),
  (23, 1), (23, 7),
  (24, 1), (24, 4), (24, 7),
  (25, 1),
  (26, 1), (26, 3), (26, 7);

-- ------------------------------------------------------------
-- Opening hours.
-- Confirmed by the owner on 2026-10-20, read from the opening
-- hours highlight on the shop Instagram account.
-- Sunday 05:30 to 21:00, every other day open 24 hours.
-- Older public sources still say H24 every day, or Sunday 00:00
-- to 15:00, or Sunday 06:00 to 14:30. Those are out of date.
-- ------------------------------------------------------------
INSERT INTO opening_hours (id, day_index, day_name_it, day_name_en, opens, closes, is_open_all_day, is_closed, note) VALUES
  (1, 0, 'Domenica',   'Sunday',    '05:30:00', '21:00:00', 0, 0, NULL),
  (2, 1, 'Lunedi',     'Monday',    NULL,       NULL,       1, 0, NULL),
  (3, 2, 'Martedi',    'Tuesday',   NULL,       NULL,       1, 0, NULL),
  (4, 3, 'Mercoledi',  'Wednesday', NULL,       NULL,       1, 0, NULL),
  (5, 4, 'Giovedi',    'Thursday',  NULL,       NULL,       1, 0, NULL),
  (6, 5, 'Venerdi',    'Friday',    NULL,       NULL,       1, 0, NULL),
  (7, 6, 'Sabato',     'Saturday',  NULL,       NULL,       1, 0, NULL);

-- ------------------------------------------------------------
-- Site settings
-- TODO: email is empty, the owner supplies it.
-- TODO: the privacy policy needs the legal company data.
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
-- Gallery.
-- The same 26 photographs as client/src/lib/photos.js, so the API and
-- the static list never disagree. Sources are the shop Instagram
-- account, exported by hand, originals in docs/references/instagram/.
-- The watermarked files in docs/references/ must not be used.
-- TODO: owner picks the final order and the captions.
-- ------------------------------------------------------------
INSERT INTO gallery (image_url, alt_it, alt_en, position) VALUES
  ('/photos/exterior-vetrina-01.jpg',
   'La vetrina di Elfa Bakery di sera, con il nome stampato sul vetro',
   'The Elfa Bakery shop front at night, with the name printed on the glass', 1),
  ('/photos/counter-panini-01.jpg',
   'Una fila di panini appena preparati sul banco, con il logo di Elfa Bakery sulla parete',
   'A row of freshly made sandwiches on the counter, with the Elfa Bakery logo on the wall', 2),
  ('/photos/counter-barista-01.jpg',
   'Il barista prepara un cappuccino alla macchina del caffè',
   'The barista makes a cappuccino at the espresso machine', 3),
  ('/photos/counter-confezione-01.jpg',
   'Una confezione di pane con il logo EB su un tagliere di legno',
   'A bread bag with the EB logo on a wooden board', 4),
  ('/photos/interior-counter-01.jpg',
   'L’interno di Elfa Bakery con il banco, le sedie e le luci a soffitto',
   'Inside Elfa Bakery, with the counter, the seats and the ceiling lights', 5),
  ('/photos/food-pizza-02.jpg',
   'Pizza con prosciutto crudo e rucola appena servita',
   'Pizza with prosciutto crudo and rocket, just served', 6),
  ('/photos/food-pizza-01.jpg',
   'Pizza al trancio, croissant, kebab e caffè',
   'Pizza by the slice, croissant, kebab and coffee', 7),
  ('/photos/food-bagel-01.jpg',
   'Due bagel aperti con salmone, avocado, cetrioli e pomodorini',
   'Two open bagels with salmon, avocado, cucumber and cherry tomatoes', 8),
  ('/photos/food-bagel-03.jpg',
   'Bagel con salmone affumicato su un tagliere di legno',
   'Bagel with smoked salmon on a wooden board', 9),
  ('/photos/food-bruschetta-01.jpg',
   'Bagel e bruschetta con salmone affumicato',
   'Bagel and bruschetta with smoked salmon', 10),
  ('/photos/food-panini-01.jpg',
   'Piadina e panini con prosciutto, formaggio e insalata',
   'Piadina and sandwiches with ham, cheese and salad', 11),
  ('/photos/food-panini-02.jpg',
   'Due panini farciti con prosciutto e formaggio, tagliati a metà',
   'Two sandwiches filled with ham and cheese, cut in half', 12),
  ('/photos/food-burger-01.jpg',
   'Hamburger con bacon e patatine fritte davanti allo scaffale del pane',
   'Burger with bacon and fries in front of the bread shelf', 13),
  ('/photos/food-falafel-01.jpg',
   'Piatto di falafel con insalata, patatine e salse',
   'Plate of falafel with salad, fries and sauces', 14),
  ('/photos/food-gastronomia-01.jpg',
   'Selezione di salumi affettati e riso allo zafferano',
   'A selection of sliced cold cuts and saffron rice', 15),
  ('/photos/food-lasagne-01.jpg',
   'Insalata con mozzarella e pomodorini e una porzione di lasagne',
   'Salad with mozzarella and cherry tomatoes and a portion of lasagne', 16),
  ('/photos/food-insalata-01.jpg',
   'Insalata con salmone e un cestino di pane sul tavolo',
   'Salad with salmon and a bread basket on the table', 17),
  ('/photos/food-insalata-02.jpg',
   'Insalata con mozzarella, uova sode e crostini di pane',
   'Salad with mozzarella, hard boiled eggs and croutons', 18),
  ('/photos/pastry-collage-01.jpg',
   'Torta al cioccolato, red velvet, baklava e tiramisù al banco dei dolci',
   'Chocolate cake, red velvet, baklava and tiramisù at the pastry counter', 19),
  ('/photos/pastry-collage-02.jpg',
   'Caffè al banco con crostata di fragole, pasta al pistacchio e dessert al cioccolato',
   'Coffee at the counter with strawberry tart, pistachio pastry and chocolate dessert', 20),
  ('/photos/pastry-crostata-01.jpg',
   'Crostata di fragole con crema e un bagel con salmone',
   'Strawberry tart with cream and a bagel with salmon', 21),
  ('/photos/dessert-tiramisu-01.jpg',
   'Tiramisù al cucchiaio con panna montata',
   'Spoon tiramisù with whipped cream', 22),
  ('/photos/dessert-cucchiaio-01.jpg',
   'Dessert al pistacchio al cucchiaio e il banco della pasticceria',
   'Pistachio dessert in a glass and the pastry counter', 23),
  ('/photos/drinks-caffe-01.jpg',
   'Cappuccino con disegno nel latte, crostata di fragole e cornetto',
   'Cappuccino with a latte art design, strawberry tart and croissant', 24),
  ('/photos/drinks-caffe-02.jpg',
   'Cappuccino, crostata di fragole e pasticcino al pistacchio',
   'Cappuccino, strawberry tart and pistachio pastry', 25),
  ('/photos/drinks-cappuccino-01.jpg',
   'Cappuccino illy con cornetto appena sfornato',
   'Illy cappuccino with a croissant just out of the oven', 26);
