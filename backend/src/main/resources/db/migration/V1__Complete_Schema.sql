-- Initial schema creation for BookConnect

-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    phone VARCHAR(20),
    provider VARCHAR(20) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'USER',
    enabled BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    CONSTRAINT chk_provider CHECK (provider IN ('LOCAL', 'GOOGLE')),
    CONSTRAINT chk_role CHECK (role IN ('USER', 'ADMIN'))
);

-- Create index on email for faster lookups
CREATE INDEX idx_user_email ON users(email);

-- Create books table
CREATE TABLE books (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    type VARCHAR(20) NOT NULL,
    price DECIMAL(10, 2),
    image_url VARCHAR(500),
    isbn VARCHAR(20),
    language VARCHAR(50),
    pages INTEGER,
    uploader_id UUID NOT NULL,
    available BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    CONSTRAINT fk_book_uploader FOREIGN KEY (uploader_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT chk_category CHECK (category IN ('FICTION', 'ROMANCE', 'MYSTERY_THRILLER', 'SELF_HELP_MOTIVATIONAL', 'FANTASY')),
    CONSTRAINT chk_type CHECK (type IN ('FREE', 'PAID'))
);

-- Create indexes on books table
CREATE INDEX idx_book_category ON books(category);
CREATE INDEX idx_book_type ON books(type);
CREATE INDEX idx_book_uploader ON books(uploader_id);

-- Create borrows table
CREATE TABLE borrows (
    id UUID PRIMARY KEY,
    book_id UUID NOT NULL,
    user_id UUID NOT NULL,
    borrowed_at TIMESTAMP NOT NULL,
    returned_at TIMESTAMP,
    CONSTRAINT fk_borrow_book FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    CONSTRAINT fk_borrow_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes on borrows table
CREATE INDEX idx_borrow_user ON borrows(user_id);
CREATE INDEX idx_borrow_book ON borrows(book_id);

-- Create purchases table
CREATE TABLE purchases (
    id UUID PRIMARY KEY,
    book_id UUID NOT NULL,
    user_id UUID NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'COMPLETED',
    purchased_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_purchase_book FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    CONSTRAINT fk_purchase_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes on purchases table
CREATE INDEX idx_purchase_user ON purchases(user_id);
CREATE INDEX idx_purchase_book ON purchases(book_id);
-- Insert sample data for testing

-- Insert an admin user (password: admin123)
INSERT INTO users (id, name, email, password, phone, provider, role, enabled, created_at, updated_at)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Admin User',
    'admin@bookconnect.com',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', -- bcrypt hash of 'admin123'
    '+1234567890',
    'LOCAL',
    'ADMIN',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- Insert a regular test user (password: user123)
INSERT INTO users (id, name, email, password, phone, provider, role, enabled, created_at, updated_at)
VALUES (
    'b1ffbc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    'Test User',
    'user@bookconnect.com',
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- bcrypt hash of 'user123'
    '+9876543210',
    'LOCAL',
    'USER',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- Insert sample books
INSERT INTO books (id, title, author, description, category, type, price, image_url, isbn, language, pages, uploader_id, available, created_at, updated_at)
VALUES (
    'c2ffbc99-9c0b-4ef8-bb6d-6bb9bd380a33',
    'The Great Adventure',
    'John Smith',
    'An epic tale of courage and discovery in uncharted lands.',
    'FICTION',
    'FREE',
    NULL,
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
    '978-1234567890',
    'English',
    320,
    'b1ffbc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

INSERT INTO books (id, title, author, description, category, type, price, image_url, isbn, language, pages, uploader_id, available, created_at, updated_at)
VALUES (
    'd3ffbc99-9c0b-4ef8-bb6d-6bb9bd380a44',
    'Love in Paris',
    'Emma Wilson',
    'A heartwarming romance set in the city of lights.',
    'ROMANCE',
    'PAID',
    500.00,
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
    '978-0987654321',
    'English',
    280,
    'b1ffbc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

INSERT INTO books (id, title, author, description, category, type, price, image_url, isbn, language, pages, uploader_id, available, created_at, updated_at)
VALUES (
    'e4ffbc99-9c0b-4ef8-bb6d-6bb9bd380a55',
    'The Mystery of Shadow Creek',
    'Detective Jane Doe',
    'A gripping thriller that will keep you on the edge of your seat.',
    'MYSTERY_THRILLER',
    'PAID',
    750.00,
    'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
    '978-1122334455',
    'English',
    400,
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

INSERT INTO books (id, title, author, description, category, type, price, image_url, isbn, language, pages, uploader_id, available, created_at, updated_at)
VALUES (
    'f5ffbc99-9c0b-4ef8-bb6d-6bb9bd380a66',
    'Unlock Your Potential',
    'Motivation Master',
    'Transform your life with proven strategies for success.',
    'SELF_HELP_MOTIVATIONAL',
    'FREE',
    NULL,
    'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop',
    '978-5566778899',
    'English',
    250,
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

INSERT INTO books (id, title, author, description, category, type, price, image_url, isbn, language, pages, uploader_id, available, created_at, updated_at)
VALUES (
    'a6ffbc99-9c0b-4ef8-bb6d-6bb9bd380a77',
    'Dragons of the Ancient Realm',
    'Fantasy Writer',
    'Enter a world of magic, dragons, and epic battles.',
    'FANTASY',
    'PAID',
    850.00,
    'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop',
    '978-9988776655',
    'English',
    520,
    'b1ffbc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);
