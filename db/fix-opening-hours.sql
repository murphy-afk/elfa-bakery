-- ============================================================
-- Elfa Bakery: one-off fix for the opening hours table
-- Run this file in MySQL Workbench against a database that was
-- seeded before 2026-10-20. It replaces the placeholder schedule,
-- Sunday 00:00 to 15:00 with the note "Orario da confermare",
-- with the hours the owner confirmed on 2026-10-20: Sunday 05:30
-- to 21:00, Monday to Saturday open 24 hours.
-- Safe to run again. Every statement matches on a key column,
-- so MySQL Workbench safe update mode accepts them, no need to
-- switch the option off in Preferences, SQL Editor.
-- The gallery table is not touched here, re run db/seed.sql for
-- that. Delete this file once every database holds the new rows.
-- ============================================================

USE elfa_bakery;

-- What the table holds right now.
SELECT id, day_index, day_name_it, opens, closes,
       is_open_all_day, is_closed, note
  FROM opening_hours
 ORDER BY day_index;

-- Confirmed schedule. day_index carries the unique key
-- uq_hours_day, so the WHERE clause matches a key column.
UPDATE opening_hours
   SET day_name_it = 'Domenica', day_name_en = 'Sunday',
       opens = '05:30:00', closes = '21:00:00',
       is_open_all_day = 0, is_closed = 0, note = NULL
 WHERE day_index = 0;

UPDATE opening_hours
   SET day_name_it = 'Lunedì', day_name_en = 'Monday',
       opens = NULL, closes = NULL,
       is_open_all_day = 1, is_closed = 0, note = NULL
 WHERE day_index = 1;

UPDATE opening_hours
   SET day_name_it = 'Martedì', day_name_en = 'Tuesday',
       opens = NULL, closes = NULL,
       is_open_all_day = 1, is_closed = 0, note = NULL
 WHERE day_index = 2;

UPDATE opening_hours
   SET day_name_it = 'Mercoledì', day_name_en = 'Wednesday',
       opens = NULL, closes = NULL,
       is_open_all_day = 1, is_closed = 0, note = NULL
 WHERE day_index = 3;

UPDATE opening_hours
   SET day_name_it = 'Giovedì', day_name_en = 'Thursday',
       opens = NULL, closes = NULL,
       is_open_all_day = 1, is_closed = 0, note = NULL
 WHERE day_index = 4;

UPDATE opening_hours
   SET day_name_it = 'Venerdì', day_name_en = 'Friday',
       opens = NULL, closes = NULL,
       is_open_all_day = 1, is_closed = 0, note = NULL
 WHERE day_index = 5;

UPDATE opening_hours
   SET day_name_it = 'Sabato', day_name_en = 'Saturday',
       opens = NULL, closes = NULL,
       is_open_all_day = 1, is_closed = 0, note = NULL
 WHERE day_index = 6;

-- What the table holds after the fix. Expect seven rows, Sunday
-- 05:30 to 21:00 and the other six flagged open all day, with the
-- note column empty everywhere.
SELECT id, day_index, day_name_it, opens, closes,
       is_open_all_day, is_closed, note
  FROM opening_hours
 ORDER BY day_index;
