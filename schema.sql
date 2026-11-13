-- =====================================================================
-- APEX COLLEGE LIBRARY MANAGEMENT SYSTEM - RELATIONAL SCHEMA & QUERIES
-- Project 1 Specification Compliance
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. TABLE DEFINITIONS (DDL)
-- ---------------------------------------------------------------------

-- Table: Members
CREATE TABLE Members (
    member_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    member_type ENUM('Student', 'Faculty') NOT NULL,
    join_date DATE NOT NULL
);

-- Table: Categories (Lookup Table)
CREATE TABLE Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE
);

-- Table: Books
CREATE TABLE Books (
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    isbn VARCHAR(20) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(150) NOT NULL,
    category_id INT NOT NULL,
    total_copies INT NOT NULL DEFAULT 1,
    available_copies INT NOT NULL DEFAULT 1,
    cover_image VARCHAR(500),
    description TEXT,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id) ON DELETE CASCADE,
    CONSTRAINT chk_available_copies CHECK (available_copies BETWEEN 0 AND total_copies)
);

-- Table: Loans (Resolves M-M between Members and Books)
CREATE TABLE Loans (
    loan_id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT NOT NULL,
    member_id INT NOT NULL,
    issue_date DATE NOT NULL,
    due_date DATE NOT NULL,
    return_date DATE NULL,
    fine_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    FOREIGN KEY (book_id) REFERENCES Books(book_id) ON DELETE CASCADE,
    FOREIGN KEY (member_id) REFERENCES Members(member_id) ON DELETE CASCADE,
    CONSTRAINT chk_due_date CHECK (due_date > issue_date)
);

-- ---------------------------------------------------------------------
-- 2. SEED DATA (DML)
-- ---------------------------------------------------------------------

INSERT INTO Categories (category_id, category_name) VALUES
(1, 'Computer Science & Software'),
(2, 'Artificial Intelligence & Data'),
(3, 'Business, Economics & Finance'),
(4, 'Literature & Philosophy'),
(5, 'Physics & Engineering');

INSERT INTO Members (member_id, name, email, phone, member_type, join_date) VALUES
(1, 'Hamza Khan', 'hamza.khan@college.edu', '+92 300 5551234', 'Student', '2025-09-01'),
(2, 'Dr. Sarah Ahmed', 'sarah.ahmed@college.edu', '+92 321 8884321', 'Faculty', '2024-01-15'),
(3, 'Ali Raza', 'ali.raza@college.edu', '+92 333 7779911', 'Student', '2025-10-10'),
(4, 'Prof. Tariq Mansoor', 'tariq.mansoor@college.edu', '+92 345 4443322', 'Faculty', '2023-08-20'),
(5, 'Ayesha Malik', 'ayesha.malik@college.edu', '+92 312 9998877', 'Student', '2026-02-01');

INSERT INTO Books (book_id, isbn, title, author, category_id, total_copies, available_copies, cover_image) VALUES
(1, '978-0131103627', 'The C Programming Language', 'Brian W. Kernighan, Dennis M. Ritchie', 1, 5, 3, 'https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?w=800'),
(2, '978-0262033848', 'Introduction to Algorithms', 'Thomas H. Cormen, Charles E. Leiserson', 1, 6, 4, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800'),
(3, '978-0134685991', 'Effective Java', 'Joshua Bloch', 1, 4, 0, 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800'),
(4, '978-0262035613', 'Deep Learning', 'Ian Goodfellow, Yoshua Bengio', 2, 5, 3, 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800'),
(5, '978-1449369415', 'Designing Data-Intensive Applications', 'Martin Kleppmann', 1, 4, 2, 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800');

INSERT INTO Loans (loan_id, book_id, member_id, issue_date, due_date, return_date, fine_amount) VALUES
(101, 1, 1, '2026-10-15', '2026-10-29', NULL, 90.00),
(102, 2, 1, '2026-11-01', '2026-11-15', NULL, 0.00),
(103, 3, 1, '2026-11-02', '2026-11-16', NULL, 0.00),
(104, 4, 2, '2026-10-01', '2026-10-15', '2026-10-20', 50.00),
(105, 5, 3, '2026-10-10', '2026-10-24', '2026-10-23', 0.00);

-- =====================================================================
-- 3. THE 8 REQUIRED QUERIES (PROJECT 1)
-- =====================================================================

-- Query 1: Books currently issued and not yet returned, with member names (JOIN)
SELECT 
    l.loan_id,
    b.title AS book_title,
    b.isbn,
    m.name AS member_name,
    m.email AS member_email,
    m.member_type,
    l.issue_date,
    l.due_date
FROM Loans l
JOIN Books b ON l.book_id = b.book_id
JOIN Members m ON l.member_id = m.member_id
WHERE l.return_date IS NULL;

-- Query 2: Overdue loans as of today and the fine owed (fine = 10 per day late)
SELECT 
    l.loan_id,
    b.title AS book_title,
    m.name AS member_name,
    m.email AS member_email,
    l.due_date,
    DATEDIFF(CURRENT_DATE, l.due_date) AS days_late,
    (DATEDIFF(CURRENT_DATE, l.due_date) * 10) AS fine_owed
FROM Loans l
JOIN Books b ON l.book_id = b.book_id
JOIN Members m ON l.member_id = m.member_id
WHERE l.return_date IS NULL 
  AND CURRENT_DATE > l.due_date;

-- Query 3: Number of books per category (GROUP BY)
SELECT 
    c.category_id,
    c.category_name,
    COUNT(b.book_id) AS total_books,
    COALESCE(SUM(b.total_copies), 0) AS total_physical_copies
FROM Categories c
LEFT JOIN Books b ON c.category_id = b.category_id
GROUP BY c.category_id, c.category_name;

-- Query 4: Top 5 most-borrowed books (ORDER BY + LIMIT)
SELECT 
    b.book_id,
    b.title,
    b.author,
    b.isbn,
    COUNT(l.loan_id) AS borrow_count
FROM Books b
JOIN Loans l ON b.book_id = l.book_id
GROUP BY b.book_id, b.title, b.author, b.isbn
ORDER BY borrow_count DESC
LIMIT 5;

-- Query 5: Members who have never borrowed a book (LEFT JOIN / NOT EXISTS)
SELECT 
    m.member_id,
    m.name,
    m.email,
    m.member_type,
    m.join_date
FROM Members m
LEFT JOIN Loans l ON m.member_id = l.member_id
WHERE l.loan_id IS NULL;

-- Query 6: Total fines collected per month
SELECT 
    DATE_FORMAT(return_date, '%Y-%m') AS loan_month,
    COUNT(loan_id) AS returned_loans_count,
    SUM(fine_amount) AS total_fines_collected
FROM Loans
WHERE return_date IS NOT NULL 
  AND fine_amount > 0
GROUP BY DATE_FORMAT(return_date, '%Y-%m');

-- Query 7: Members with more than 2 active loans (HAVING)
SELECT 
    m.member_id,
    m.name,
    m.email,
    m.member_type,
    COUNT(l.loan_id) AS active_loans_count
FROM Members m
JOIN Loans l ON m.member_id = l.member_id
WHERE l.return_date IS NULL
GROUP BY m.member_id, m.name, m.email, m.member_type
HAVING COUNT(l.loan_id) > 2;

-- Query 8: Search books by partial title (LIKE)
SELECT 
    b.book_id,
    b.title,
    b.author,
    b.isbn,
    c.category_name,
    b.available_copies,
    b.total_copies
FROM Books b
JOIN Categories c ON b.category_id = c.category_id
WHERE b.title LIKE '%Data%';

-- =====================================================================
-- 4. ADVANCED TASK: TRANSACTION WITH ROLLBACK IF COPIES ARE 0
-- =====================================================================

DELIMITER $$

CREATE PROCEDURE IssueBookTransaction(
    IN p_book_id INT,
    IN p_member_id INT,
    IN p_issue_date DATE,
    IN p_due_date DATE,
    OUT p_status_message VARCHAR(255)
)
BEGIN
    DECLARE v_available_copies INT;
    DECLARE v_active_loans INT;

    -- Exit handler for SQL exceptions: automatically rollback
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_status_message = 'Transaction Rolled Back due to database error.';
    END;

    START TRANSACTION;

    -- Check member active loans limit (max 3 books)
    SELECT COUNT(*) INTO v_active_loans
    FROM Loans
    WHERE member_id = p_member_id AND return_date IS NULL;

    IF v_active_loans >= 3 THEN
        ROLLBACK;
        SET p_status_message = 'Rollback: Member already holds 3 books at once.';
    ELSE
        -- Row lock on book record to prevent concurrent double-issuing
        SELECT available_copies INTO v_available_copies
        FROM Books
        WHERE book_id = p_book_id
        FOR UPDATE;

        -- Roll back if available copies is 0
        IF v_available_copies <= 0 THEN
            ROLLBACK;
            SET p_status_message = 'Rollback: 0 available copies for this book.';
        ELSE
            -- Insert into Loans and decrement available_copies together
            INSERT INTO Loans (book_id, member_id, issue_date, due_date, return_date, fine_amount)
            VALUES (p_book_id, p_member_id, p_issue_date, p_due_date, NULL, 0.00);

            UPDATE Books
            SET available_copies = available_copies - 1
            WHERE book_id = p_book_id;

            COMMIT;
            SET p_status_message = 'Transaction Committed: Book issued successfully.';
        END IF;
    END IF;

END$$

DELIMITER ;
