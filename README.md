# APEX College Library Management System (Project 1)

A complete, high-level, academic-grade frontend for **Project 1 : Library Management System**, built with zero external dependencies, responsive modern styling, client-side relational storage (`localStorage`), automated late submission fine calculation, and full implementation of all 8 required database queries.

---

## 🌟 Project 1 Specification Compliance

| Specification | Implementation Details |
|---|---|
| **Users** | **Librarian (Admin)** & **Member (Student / Faculty)** with instant role switching. |
| **8 Website Pages** | `login.html`, `index.html` (catalogue), `add-edit-book.html`, `member-register.html`, `issue-book.html`, `return-book.html`, `borrowing-history.html`, `reports.html`. |
| **4 Relational Tables** | `Members`, `Categories`, `Books`, `Loans` with all primary, foreign, unique, and check constraints. |
| **Business Rule 1** | A member may hold at most 3 books at once (`active_loans <= 3`). |
| **Business Rule 2** | A book with 0 available copies cannot be issued (`available_copies > 0`). |
| **Business Rule 3** | Automatic late fine: **`fine = 10 per day late`**. |
| **Advanced Task** | Atomic transaction: Insert into Loans & decrement `available_copies` together; rollback if copies are 0. |

---

## 📑 The 8 Pages (Surfaces)

1. [**`login.html`**](file:///c:/Users/zulqa/OneDrive/Desktop/New%20folder/login.html) &bull; **Page 1: Login**
   - Switch between **Librarian (Admin)** and **Member (Student/Faculty)** roles.
   - Pre-populated credentials for one-click demonstration.

2. [**`index.html`**](file:///c:/Users/zulqa/OneDrive/Desktop/New%20folder/index.html) &bull; **Page 2: Book Catalogue with Search**
   - Academic book showcase with high-res cover pictures, categories, ISBNs, and copy counters.
   - Search by title, author, category, or filter by only available copies.

3. [**`add-edit-book.html`**](file:///c:/Users/zulqa/OneDrive/Desktop/New%20folder/add-edit-book.html) &bull; **Page 3: Add / Edit Books**
   - Add new books or update existing ones with custom picture URLs.
   - Live real-time book preview card as you type.

4. [**`member-register.html`**](file:///c:/Users/zulqa/OneDrive/Desktop/New%20folder/member-register.html) &bull; **Page 4: Member Registration**
   - Register Student or Faculty with unique email and contact verification.
   - Member roster table with active loans counter.

5. [**`issue-book.html`**](file:///c:/Users/zulqa/OneDrive/Desktop/New%20folder/issue-book.html) &bull; **Page 5: Issue Book**
   - Select book and member; checks that member has `< 3` books and copies `> 0`.
   - Executes atomic transaction: creates loan and decrements `available_copies`.

6. [**`return-book.html`**](file:///c:/Users/zulqa/OneDrive/Desktop/New%20folder/return-book.html) &bull; **Page 6: Return Book & Automatic Fine**
   - Select issued book; calculates days overdue past due date.
   - Auto-computes **`fine = days_overdue * 10`**.
   - Increments `available_copies` and generates official printable check-in receipt.

7. [**`borrowing-history.html`**](file:///c:/Users/zulqa/OneDrive/Desktop/New%20folder/borrowing-history.html) &bull; **Page 7: Member's Borrowing History**
   - Member identity card, active loans, lifetime history, and overdue fine statements.

8. [**`reports.html`**](file:///c:/Users/zulqa/OneDrive/Desktop/New%20folder/reports.html) &bull; **Page 8: Reports & 8 Queries**
   - Interactive Chart.js charts + live execution of all 8 required SQL queries + CSV export.

---

## 📊 All 8 Required SQL Queries (Evaluated on Page 8)

1. **Query 1:** Books currently issued and not yet returned, with member names (`JOIN`).
2. **Query 2:** Overdue loans as of today and the fine owed (`(today - due_date) * 10`).
3. **Query 3:** Number of books per category (`GROUP BY category_id`).
4. **Query 4:** Top 5 most-borrowed books (`ORDER BY borrow_count DESC LIMIT 5`).
5. **Query 5:** Members who have never borrowed a book (`LEFT JOIN Loans WHERE loan_id IS NULL`).
6. **Query 6:** Total fines collected per month (`SUM(fine_amount) GROUP BY strftime('%Y-%m')`).
7. **Query 7:** Members with more than 2 active loans (`HAVING COUNT(*) > 2`).
8. **Query 8:** Search books by partial title (`WHERE title LIKE '%term%'`).

---

## 🚀 How to Run

1. Open folder: `c:\Users\zulqa\OneDrive\Desktop\New folder`
2. Double click **`index.html`** in any browser (Chrome, Edge, Firefox).
3. Use the top navigation bar to access all 8 surfaces or switch roles.
4. All SQL schemas, triggers, and procedures are located in **`schema.sql`**.

