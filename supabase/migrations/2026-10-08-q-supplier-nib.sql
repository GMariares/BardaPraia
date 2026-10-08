-- Suppliers: bank account (NIB / IBAN), shown on the Invoices tab so paying is one copy away
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS nib TEXT DEFAULT '';
