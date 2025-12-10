-- V2: Add borrower contact details to borrows table and buyer contact details to purchases table

-- Add columns to borrows table
ALTER TABLE borrows ADD COLUMN IF NOT EXISTS borrower_name VARCHAR(255);
ALTER TABLE borrows ADD COLUMN IF NOT EXISTS borrower_phone VARCHAR(20);
ALTER TABLE borrows ADD COLUMN IF NOT EXISTS borrower_city VARCHAR(100);
ALTER TABLE borrows ADD COLUMN IF NOT EXISTS borrower_address TEXT;
ALTER TABLE borrows ADD COLUMN IF NOT EXISTS message_to_owner TEXT;
ALTER TABLE borrows ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'PENDING';

-- Add columns to purchases table
ALTER TABLE purchases ADD COLUMN IF NOT EXISTS buyer_name VARCHAR(255);
ALTER TABLE purchases ADD COLUMN IF NOT EXISTS buyer_phone VARCHAR(20);
ALTER TABLE purchases ADD COLUMN IF NOT EXISTS buyer_city VARCHAR(100);
ALTER TABLE purchases ADD COLUMN IF NOT EXISTS buyer_address TEXT;
ALTER TABLE purchases ADD COLUMN IF NOT EXISTS message_to_owner TEXT;

-- Update existing records with default values (if any exist)
UPDATE borrows SET 
    borrower_name = (SELECT name FROM users WHERE users.id = borrows.user_id),
    borrower_phone = COALESCE((SELECT phone FROM users WHERE users.id = borrows.user_id), 'N/A'),
    borrower_city = 'N/A',
    borrower_address = 'N/A',
    status = 'PENDING'
WHERE borrower_name IS NULL;

UPDATE purchases SET 
    buyer_name = (SELECT name FROM users WHERE users.id = purchases.user_id),
    buyer_phone = COALESCE((SELECT phone FROM users WHERE users.id = purchases.user_id), 'N/A'),
    buyer_city = 'N/A',
    buyer_address = 'N/A'
WHERE buyer_name IS NULL;

-- Now make the columns NOT NULL
ALTER TABLE borrows ALTER COLUMN borrower_name SET NOT NULL;
ALTER TABLE borrows ALTER COLUMN borrower_phone SET NOT NULL;
ALTER TABLE borrows ALTER COLUMN borrower_city SET NOT NULL;
ALTER TABLE borrows ALTER COLUMN borrower_address SET NOT NULL;
ALTER TABLE borrows ALTER COLUMN status SET NOT NULL;

ALTER TABLE purchases ALTER COLUMN buyer_name SET NOT NULL;
ALTER TABLE purchases ALTER COLUMN buyer_phone SET NOT NULL;
ALTER TABLE purchases ALTER COLUMN buyer_city SET NOT NULL;
ALTER TABLE purchases ALTER COLUMN buyer_address SET NOT NULL;
