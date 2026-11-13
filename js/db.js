/ APEX LIBRARY MANAGEMENT SYSTEM - Relational Database Engine (Project 1)
// Tables: Members, Categories, Books, Loans
// Storage: localStorage with persistent relational integrity

const STORAGE_KEYS = {
  MEMBERS: 'lib_members',
  CATEGORIES: 'lib_categories',
  BOOKS: 'lib_books',
  LOANS: 'lib_loans',
  CURRENT_USER: 'lib_current_user'
};

// Initial Seed Data
const DEFAULT_CATEGORIES = [
  { category_id: 1, category_name: 'Computer Science & Software' },
  { category_id: 2, category_name: 'Artificial Intelligence & Data' },
  { category_id: 3, category_name: 'Business, Economics & Finance' },
  { category_id: 4, category_name: 'Literature & Philosophy' },
  { category_id: 5, category_name: 'Physics & Engineering' }
];

const DEFAULT_MEMBERS = [
  {
    member_id: 1,
    name: 'Hamza Khan',
    email: 'hamza.khan@college.edu',
    phone: '+92 300 5551234',
    member_type: 'Student', // CHECK IN ('Student', 'Faculty')
    join_date: '2025-09-01'
  },
  {
    member_id: 2,
    name: 'Dr. Sarah Ahmed',
    email: 'sarah.ahmed@college.edu',
    phone: '+92 321 8884321',
    member_type: 'Faculty',
    join_date: '2024-01-15'
  },
  {
    member_id: 3,
    name: 'Ali Raza',
    email: 'ali.raza@college.edu',
    phone: '+92 333 7779911',
    member_type: 'Student',
    join_date: '2025-10-10'
  },
  {
    member_id: 4,
    name: 'Prof. Tariq Mansoor',
    email: 'tariq.mansoor@college.edu',
    phone: '+92 345 4443322',
    member_type: 'Faculty',
    join_date: '2023-08-20'
  },
  {
    member_id: 5,
    name: 'Ayesha Malik',
    email: 'ayesha.malik@college.edu',
    phone: '+92 312 9998877',
    member_type: 'Student',
    join_date: '2026-02-01' // Never borrowed a book (for Query 5 demo)
  }
];

const DEFAULT_BOOKS = [
  {
    book_id: 1,
    isbn: '978-0131103627',
    title: 'The C Programming Language (2nd Edition)',
    author: 'Brian W. Kernighan, Dennis M. Ritchie',
    category_id: 1,
    total_copies: 5,
    available_copies: 3,
    cover_image: 'https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&w=800&q=80',
    description: 'The definitive classic reference for C programming, memory architecture, and systems engineering.'
  },
  {
    book_id: 2,
    isbn: '978-0262033848',
    title: 'Introduction to Algorithms (CLRS 3rd Edition)',
    author: 'Thomas H. Cormen, Charles E. Leiserson',
    category_id: 1,
    total_copies: 6,
    available_copies: 4,
    cover_image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    description: 'Comprehensive textbook covering data structures, dynamic programming, graph theory, and NP-completeness.'
  },
  {
    book_id: 3,
    isbn: '978-0134685991',
    title: 'Effective Java (3rd Edition)',
    author: 'Joshua Bloch',
    category_id: 1,
    total_copies: 4,
    available_copies: 0, // 0 copies available (Rule 2 demo)
    cover_image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    description: 'Best practice architectural design patterns, generics, concurrency, and functional programming in Java.'
  },
  {
    book_id: 4,
    isbn: '978-0262035613',
    title: 'Deep Learning (Adaptive Computation & Machine Learning)',
    author: 'Ian Goodfellow, Yoshua Bengio, Aaron Courville',
    category_id: 2,
    total_copies: 5,
    available_copies: 3,
    cover_image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80',
    description: 'Foundational mathematical theory of neural networks, backpropagation, CNNs, RNNs, and generative models.'
  },
  {
    book_id: 5,
    isbn: '978-1449369415',
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    category_id: 1,
    total_copies: 4,
    available_copies: 2,
    cover_image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    description: 'The big ideas behind reliable, scalable, and maintainable distributed database systems.'
  },
  {
    book_id: 6,
    isbn: '978-0062316097',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    category_id: 4,
    total_copies: 6,
    available_copies: 5,
    cover_image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=80',
    description: 'Bold survey of human history from the Cognitive Revolution to modern biotechnology and artificial intelligence.'
  },
  {
    book_id: 7,
    isbn: '978-0735211292',
    title: 'Atomic Habits: Tiny Changes, Remarkable Results',
    author: 'James Clear',
    category_id: 3,
    total_copies: 7,
    available_copies: 5,
    cover_image: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=800&q=80',
    description: 'Proven behavioral psychology framework for habit formation, marginal gains, and systems thinking.'
  },
  {
    book_id: 8,
    isbn: '978-0465024759',
    title: 'The Feynman Lectures on Physics (Volume 1)',
    author: 'Richard P. Feynman',
    category_id: 5,
    total_copies: 3,
    available_copies: 2,
    cover_image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80',
    description: 'Legendary Caltech lectures on Newtonian mechanics, thermodynamics, electromagnetism, and quantum principles.'
  }
];

const DEFAULT_LOANS = [
  {
    loan_id: 101,
    book_id: 1, // C Programming
    member_id: 1, // Hamza Khan
    issue_date: '2026-10-15',
    due_date: '2026-10-29',
    return_date: null, // Overdue! (Today is Nov 2026 -> 9 days late, fine = 90)
    fine_amount: 90
  },
  {
    loan_id: 102,
    book_id: 2, // Algorithms
    member_id: 1, // Hamza Khan
    issue_date: '2026-11-01',
    due_date: '2026-11-15',
    return_date: null, // Active & on-time
    fine_amount: 0
  },
  {
    loan_id: 103,
    book_id: 3, // Effective Java
    member_id: 1, // Hamza Khan (Has 3 active loans -> Rule 1 limit reached!)
    issue_date: '2026-11-02',
    due_date: '2026-11-16',
    return_date: null,
    fine_amount: 0
  },
  {
    loan_id: 104,
    book_id: 4, // Deep Learning
    member_id: 2, // Dr. Sarah Ahmed
    issue_date: '2026-10-01',
    due_date: '2026-10-15',
    return_date: '2026-10-20', // Returned 5 days late (5 * 10 = 50 fine paid)
    fine_amount: 50
  },
  {
    loan_id: 105,
    book_id: 5, // Designing Data-Intensive Apps
    member_id: 3, // Ali Raza
    issue_date: '2026-10-10',
    due_date: '2026-10-24',
    return_date: '2026-10-23', // Returned on time (0 fine)
    fine_amount: 0
  },
  {
    loan_id: 106,
    book_id: 1, // C Programming (Borrowed again by Dr. Sarah)
    member_id: 2, // Dr. Sarah Ahmed
    issue_date: '2026-10-25',
    due_date: '2026-11-08',
    return_date: null,
    fine_amount: 0
  },
  {
    loan_id: 107,
    book_id: 5, // Designing Data-Intensive Apps
    member_id: 4, // Prof. Tariq Mansoor
    issue_date: '2026-10-20',
    due_date: '2026-11-03',
    return_date: null, // Overdue by 4 days (4 * 10 = 40 fine)
    fine_amount: 40
  }
];

class LibraryDB {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.MEMBERS)) {
      localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(DEFAULT_MEMBERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.BOOKS)) {
      localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(DEFAULT_BOOKS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.LOANS)) {
      localStorage.setItem(STORAGE_KEYS.LOANS, JSON.stringify(DEFAULT_LOANS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify({ role: 'Librarian', name: 'Chief Librarian' }));
    }
  }

  resetToDefault() {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(DEFAULT_MEMBERS));
    localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(DEFAULT_BOOKS));
    localStorage.setItem(STORAGE_KEYS.LOANS, JSON.stringify(DEFAULT_LOANS));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify({ role: 'Librarian', name: 'Chief Librarian' }));
  }

  // --- Getters ---
  getCategories() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES) || '[]');
  }

  getMembers() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.MEMBERS) || '[]');
  }

  getMemberById(memberId) {
    return this.getMembers().find(m => m.member_id == memberId) || null;
  }

  getBooks() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKS) || '[]');
  }

  getBookById(bookId) {
    return this.getBooks().find(b => b.book_id == bookId) || null;
  }

  getLoans() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.LOANS) || '[]');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER) || '{"role":"Librarian","name":"Admin"}');
  }

  setCurrentUser(user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  }

  // --- Business Rule 1 Check: Member active loan count <= 3 ---
  getActiveLoanCount(memberId) {
    const loans = this.getLoans();
    return loans.filter(l => l.member_id == memberId && l.return_date === null).length;
  }

  // --- Automatic Fine Calculation Formula: fine = 10 per day late ---
  calculateFine(dueDateStr, returnDateStr = null) {
    const due = new Date(dueDateStr);
    const returnDate = returnDateStr ? new Date(returnDateStr) : new Date(); // Compare to today if not yet returned

    // Reset times to midnight for precise calendar day calculation
    due.setHours(0, 0, 0, 0);
    returnDate.setHours(0, 0, 0, 0);

    if (returnDate <= due) {
      return { daysLate: 0, fine: 0 };
    }

    const diffMs = returnDate.getTime() - due.getTime();
    const daysLate = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    const fine = daysLate * 10; // Project 1 Rule: fine = 10 per day late

    return { daysLate, fine };
  }

  // --- Advanced Task: Issue Book Transaction ---
  // Atomic: Inserts into Loans and decrements available_copies together; rollback if copies are 0.
  issueBookTransaction({ book_id, member_id, issue_date, due_date }) {
    const books = this.getBooks();
    const members = this.getMembers();
    const loans = this.getLoans();

    // 1. Verify Book
    const book = books.find(b => b.book_id == book_id);
    if (!book) throw new Error('Book not found.');

    // Business Rule 2: A book with 0 available copies cannot be issued
    if (book.available_copies <= 0) {
      throw new Error(`Transaction Rolled Back: Book "${book.title}" has 0 available copies in stock.`);
    }

    // 2. Verify Member
    const member = members.find(m => m.member_id == member_id);
    if (!member) throw new Error('Member not found.');

    // Business Rule 1: A member may hold at most 3 books at once
    const activeLoans = loans.filter(l => l.member_id == member_id && l.return_date === null).length;
    if (activeLoans >= 3) {
      throw new Error(`Transaction Rolled Back: Member "${member.name}" already holds 3 active books (maximum limit reached). Return a book before issuing a new one.`);
    }

    // 3. Validate Dates: due_date > issue_date
    const issueTime = new Date(issue_date).getTime();
    const dueTime = new Date(due_date).getTime();
    if (dueTime <= issueTime) {
      throw new Error('Due date must be after the issue date.');
    }

    // 4. Atomic Execution: Decrement available_copies
    book.available_copies -= 1;

    // 5. Insert into Loans table
    const newLoanId = loans.length > 0 ? Math.max(...loans.map(l => l.loan_id)) + 1 : 101;
    const newLoan = {
      loan_id: newLoanId,
      book_id: Number(book_id),
      member_id: Number(member_id),
      issue_date,
      due_date,
      return_date: null,
      fine_amount: 0
    };

    loans.push(newLoan);

    // Commit Transaction
    localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(books));
    localStorage.setItem(STORAGE_KEYS.LOANS, JSON.stringify(loans));

    return { loan: newLoan, book, member, remainingCopies: book.available_copies };
  }

  // --- Return Book Transaction: Auto Fine Calculation & Increment Copies ---
  returnBookTransaction({ loan_id, return_date, collected_fine = null }) {
    const loans = this.getLoans();
    const books = this.getBooks();

    const loan = loans.find(l => l.loan_id == loan_id);
    if (!loan) throw new Error('Loan record not found.');
    if (loan.return_date !== null) throw new Error('This book has already been returned.');

    const book = books.find(b => b.book_id == loan.book_id);
    if (!book) throw new Error('Associated book record not found.');

    // 1. Calculate Fine automatically: fine = 10 per day late
    const { daysLate, fine } = this.calculateFine(loan.due_date, return_date);
    const finalFine = collected_fine !== null ? Number(collected_fine) : fine;

    // 2. Atomic Return: Increment available_copies (cannot exceed total_copies)
    book.available_copies = Math.min(book.total_copies, book.available_copies + 1);

    // 3. Update Loan record
    loan.return_date = return_date;
    loan.fine_amount = finalFine;

    // Commit Transaction
    localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(books));
    localStorage.setItem(STORAGE_KEYS.LOANS, JSON.stringify(loans));

    return { loan, book, daysLate, fine: finalFine };
  }

  // --- Add / Edit Book ---
  saveBook(bookData) {
    const books = this.getBooks();
    const isEdit = !!bookData.book_id;

    // Validate ISBN unique check
    const existingIsbn = books.find(b => b.isbn.trim().toLowerCase() === bookData.isbn.trim().toLowerCase() && (!isEdit || b.book_id != bookData.book_id));
    if (existingIsbn) {
      throw new Error(`A book with ISBN "${bookData.isbn}" already exists in the catalogue.`);
    }

    const totalCopies = Number(bookData.total_copies) || 1;
    const availableCopies = bookData.available_copies !== undefined ? Math.min(totalCopies, Math.max(0, Number(bookData.available_copies))) : totalCopies;

    if (isEdit) {
      const idx = books.findIndex(b => b.book_id == bookData.book_id);
      if (idx === -1) throw new Error('Book not found to edit.');
      books[idx] = {
        ...books[idx],
        isbn: bookData.isbn.trim(),
        title: bookData.title.trim(),
        author: bookData.author.trim(),
        category_id: Number(bookData.category_id),
        total_copies: totalCopies,
        available_copies: availableCopies,
        cover_image: bookData.cover_image || books[idx].cover_image,
        description: bookData.description || books[idx].description
      };
      localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(books));
      return books[idx];
    } else {
      const newBookId = books.length > 0 ? Math.max(...books.map(b => b.book_id)) + 1 : 1;
      const newBook = {
        book_id: newBookId,
        isbn: bookData.isbn.trim(),
        title: bookData.title.trim(),
        author: bookData.author.trim(),
        category_id: Number(bookData.category_id),
        total_copies: totalCopies,
        available_copies: availableCopies,
        cover_image: bookData.cover_image || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
        description: bookData.description || 'College library academic edition.'
      };
      books.unshift(newBook);
      localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(books));
      return newBook;
    }
  }

  // --- Member Registration ---
  registerMember(memberData) {
    const members = this.getMembers();

    // Validate Email UNIQUE
    const existing = members.find(m => m.email.trim().toLowerCase() === memberData.email.trim().toLowerCase());
    if (existing) {
      throw new Error(`A member with email "${memberData.email}" is already registered.`);
    }

    // CHECK member_type IN ('Student', 'Faculty')
    if (!['Student', 'Faculty'].includes(memberData.member_type)) {
      throw new Error("Invalid member type. Must be either 'Student' or 'Faculty'.");
    }

    const newId = members.length > 0 ? Math.max(...members.map(m => m.member_id)) + 1 : 1;
    const newMember = {
      member_id: newId,
      name: memberData.name.trim(),
      email: memberData.email.trim().toLowerCase(),
      phone: memberData.phone.trim(),
      member_type: memberData.member_type,
      join_date: memberData.join_date || new Date().toISOString().split('T')[0]
    };

    members.push(newMember);
    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(members));
    return newMember;
  }

  // ==========================================
  // ALL 8 REQUIRED QUERIES (PROJECT 1)
  // ==========================================

  // Query 1: Books currently issued and not yet returned, with member names (JOIN)
  queryCurrentlyIssuedBooks() {
    const loans = this.getLoans().filter(l => l.return_date === null);
    const books = this.getBooks();
    const members = this.getMembers();

    return loans.map(l => {
      const book = books.find(b => b.book_id == l.book_id) || { title: 'Unknown', isbn: 'N/A' };
      const member = members.find(m => m.member_id == l.member_id) || { name: 'Unknown', email: 'N/A', member_type: 'Student' };
      const { daysLate, fine } = this.calculateFine(l.due_date);

      return {
        loan_id: l.loan_id,
        book_title: book.title,
        book_isbn: book.isbn,
        member_name: member.name,
        member_email: member.email,
        member_type: member.member_type,
        issue_date: l.issue_date,
        due_date: l.due_date,
        days_late: daysLate,
        current_fine: fine
      };
    });
  }

  // Query 2: Overdue loans as of today and the fine owed
  queryOverdueLoans() {
    const currentlyIssued = this.queryCurrentlyIssuedBooks();
    return currentlyIssued.filter(l => l.days_late > 0);
  }

  // Query 3: Number of books per category (GROUP BY)
  queryBooksPerCategory() {
    const categories = this.getCategories();
    const books = this.getBooks();

    return categories.map(cat => {
      const count = books.filter(b => b.category_id == cat.category_id).length;
      const totalCopies = books.filter(b => b.category_id == cat.category_id).reduce((sum, b) => sum + (b.total_copies || 0), 0);
      return {
        category_id: cat.category_id,
        category_name: cat.category_name,
        book_count: count,
        total_copies: totalCopies
      };
    });
  }

  // Query 4: Top 5 most-borrowed books (ORDER BY + LIMIT)
  queryTop5MostBorrowedBooks() {
    const loans = this.getLoans();
    const books = this.getBooks();

    const borrowCounts = {};
    loans.forEach(l => {
      borrowCounts[l.book_id] = (borrowCounts[l.book_id] || 0) + 1;
    });

    return Object.entries(borrowCounts)
      .map(([bookId, count]) => {
        const book = books.find(b => b.book_id == bookId) || { title: 'Book #' + bookId, author: 'Unknown', isbn: 'N/A', cover_image: '' };
        return {
          ...book,
          borrow_count: count
        };
      })
      .sort((a, b) => b.borrow_count - a.borrow_count)
      .slice(0, 5);
  }

  // Query 5: Members who have never borrowed a book (LEFT JOIN / NOT EXISTS)
  queryMembersNeverBorrowed() {
    const members = this.getMembers();
    const loans = this.getLoans();
    const borrowerIds = new Set(loans.map(l => l.member_id));

    return members.filter(m => !borrowerIds.has(m.member_id));
  }

  // Query 6: Total fines collected per month
  queryFinesCollectedPerMonth() {
    const loans = this.getLoans().filter(l => l.fine_amount > 0 && l.return_date !== null);

    const monthlyFines = {};
    loans.forEach(l => {
      const month = l.return_date.slice(0, 7); // 'YYYY-MM'
      monthlyFines[month] = (monthlyFines[month] || 0) + Number(l.fine_amount);
    });

    return Object.entries(monthlyFines).map(([month, totalFine]) => ({
      month,
      total_fine: totalFine
    }));
  }

  // Query 7: Members with more than 2 active loans (HAVING count > 2)
  queryMembersWithMoreThan2ActiveLoans() {
    const loans = this.getLoans().filter(l => l.return_date === null);
    const members = this.getMembers();

    const activeCounts = {};
    loans.forEach(l => {
      activeCounts[l.member_id] = (activeCounts[l.member_id] || 0) + 1;
    });

    const result = [];
    Object.entries(activeCounts).forEach(([memberId, count]) => {
      if (count > 2) {
        const member = members.find(m => m.member_id == memberId);
        if (member) {
          result.push({
            ...member,
            active_loans_count: count
          });
        }
      }
    });

    return result;
  }

  // Query 8: Search books by partial title (LIKE '%term%')
  querySearchBooksByTitle(searchTerm) {
    const books = this.getBooks();
    const categories = this.getCategories();
    const term = (searchTerm || '').trim().toLowerCase();

    return books.filter(b => b.title.toLowerCase().includes(term)).map(b => {
      const cat = categories.find(c => c.category_id == b.category_id) || { category_name: 'General' };
      return {
        ...b,
        category_name: cat.category_name
      };
    });
  }
}

// Global instance
window.libDB = new LibraryDB();

