-- Additive migration: trade column on clients + one-time backfill of the
-- three existing rows, matched by exact company name. No other rows touched.
ALTER TABLE clients ADD COLUMN trade TEXT;
UPDATE clients SET trade = 'plumbing'     WHERE company = 'The Golden Plumber'             AND trade IS NULL;
UPDATE clients SET trade = 'painting'     WHERE company = 'Professional Painting Services' AND trade IS NULL;
UPDATE clients SET trade = 'construction' WHERE company = 'Built By Deel'                  AND trade IS NULL;
