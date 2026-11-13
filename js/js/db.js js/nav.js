Shared Navigation Component for Apex College Library Management System
// Controls all 8 pages navigation, user role switching, and database resets

const LIB_PAGES = [
  { id: 'catalogue', name: '2. Book Catalogue', file: 'index.html', icon: 'fa-book-open', role: 'General' },
  { id: 'login', name: '1. Login & Auth', file: 'login.html', icon: 'fa-right-to-bracket', role: 'Auth' },
  { id: 'add-book', name: '3. Add / Edit Books', file: 'add-edit-book.html', icon: 'fa-square-plus', role: 'Librarian' },
  { id: 'member-reg', name: '4. Member Registration', file: 'member-register.html', icon: 'fa-user-plus', role: 'Librarian' },
  { id: 'issue-book', name: '5. Issue Book (Max 3)', file: 'issue-book.html', icon: 'fa-hand-holding-hand', role: 'Librarian' },
  { id: 'return-book', name: '6. Return Book (Fine Calc)', file: 'return-book.html', icon: 'fa-arrow-rotate-left', role: 'Librarian' },
  { id: 'history', name: '7. Borrowing History', file: 'borrowing-history.html', icon: 'fa-clock-rotate-left', role: 'Member' },
  { id: 'reports', name: '8. Reports & 8 Queries', file: 'reports.html', icon: 'fa-chart-pie', role: 'Librarian' }
];

function renderLibraryHeader(activePageId) {
  const container = document.getElementById('global-nav');
  if (!container) return;

  const currentUser = window.libDB ? window.libDB.getCurrentUser() : { role: 'Librarian', name: 'Admin' };
  const isLibrarian = currentUser.role === 'Librarian';

  container.innerHTML = `
    <!-- Top College Notice Bar -->
    <div class="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white text-xs font-semibold py-1 px-4 text-center tracking-wider shadow-sm">
      <span class="inline-flex items-center gap-2">
        <i class="fa-solid fa-graduation-cap"></i>
        COLLEGE LIBRARY MANAGEMENT SYSTEM &bull; PROJECT 1 (4 RELATIONAL TABLES & 8 PAGES)
      </span>
    </div>

    <!-- Navigation Bar -->
    <nav class="sticky top-0 z-50 bg-[#0a1128]/95 backdrop-blur-xl border-b border-white/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          
          <!-- Logo & Title -->
          <a href="index.html" class="flex items-center gap-3 group">
            <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-black font-extrabold text-xl shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <i class="fa-solid fa-book-bookmark text-white"></i>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-serif-title font-bold text-xl tracking-tight text-white group-hover:text-emerald-400 transition-colors">APEX<span class="text-emerald-400">LIBRARY</span></span>
                <span class="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">College Edition</span>
              </div>
              <p class="text-[11px] text-gray-400 hidden sm:block">Automated Circulation & Fine Calculation (Project 1)</p>
            </div>
          </a>

          <!-- Desktop Quick Links -->
          <div class="hidden lg:flex items-center space-x-1 text-xs">
            <a href="index.html" class="px-3 py-2 rounded-xl font-bold transition-all ${activePageId === 'catalogue' ? 'bg-emerald-500 text-black' : 'text-gray-300 hover:text-white hover:bg-white/5'}">
              <i class="fa-solid fa-magnifying-glass mr-1"></i> Book Catalogue
            </a>
            <a href="issue-book.html" class="px-3 py-2 rounded-xl font-bold transition-all ${activePageId === 'issue-book' ? 'bg-emerald-500 text-black' : 'text-gray-300 hover:text-white hover:bg-white/5'}">
              <i class="fa-solid fa-hand-holding-hand mr-1"></i> Issue Book
            </a>
            <a href="return-book.html" class="px-3 py-2 rounded-xl font-bold transition-all ${activePageId === 'return-book' ? 'bg-emerald-500 text-black' : 'text-gray-300 hover:text-white hover:bg-white/5'}">
              <i class="fa-solid fa-arrow-rotate-left mr-1"></i> Return (Fine: 10/day)
            </a>
            <a href="borrowing-history.html" class="px-3 py-2 rounded-xl font-bold transition-all ${activePageId === 'history' ? 'bg-emerald-500 text-black' : 'text-gray-300 hover:text-white hover:bg-white/5'}">
              <i class="fa-solid fa-clock-rotate-left mr-1"></i> History
            </a>
            <a href="reports.html" class="px-3 py-2 rounded-xl font-bold transition-all ${activePageId === 'reports' ? 'bg-emerald-500 text-black' : 'text-gray-300 hover:text-white hover:bg-white/5'}">
              <i class="fa-solid fa-chart-pie mr-1"></i> Reports & 8 Queries
            </a>
          </div>

          <!-- Controls: Role Selector & All 8 Pages Menu -->
          <div class="flex items-center gap-3">
            
            <!-- Role Toggle Badge -->
            <a href="login.html" class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-400 text-xs text-gray-300 transition-colors">
              <i class="fa-solid fa-user-shield text-emerald-400"></i>
              <span>${currentUser.role}: <strong class="text-white">${currentUser.name}</strong></span>
              <span class="text-[10px] text-emerald-400 underline">Switch</span>
            </a>

            <!-- All 8 Pages Mega Dropdown -->
            <div class="relative group">
              <button class="btn-secondary px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border border-white/15">
                <i class="fa-solid fa-layer-group text-emerald-400"></i>
                <span class="hidden md:inline">All 8 Pages</span>
                <span class="w-5 h-5 rounded-full bg-emerald-500 text-black flex items-center justify-center text-[10px] font-black">8</span>
              </button>
              <div class="absolute right-0 mt-2 w-72 rounded-2xl bg-[#0c1630] border border-emerald-500/30 shadow-2xl p-3 hidden group-hover:block transition-all z-50">
                <div class="text-[10px] font-bold uppercase tracking-wider text-emerald-400 px-3 py-1 border-b border-white/10 mb-2">
                  Project 1: 8 Required Surfaces
                </div>
                <div class="space-y-1">
                  ${LIB_PAGES.map(p => `
                    <a href="${p.file}" class="flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all ${p.id === activePageId ? 'bg-emerald-500 text-black font-bold' : 'text-gray-300 hover:bg-white/5 hover:text-white'}">
                      <span class="flex items-center gap-2">
                        <i class="fa-solid ${p.icon} w-4 text-center ${p.id === activePageId ? 'text-black' : 'text-emerald-400'}"></i>
                        <span>${p.name}</span>
                      </span>
                      <span class="text-[10px] opacity-75">${p.role}</span>
                    </a>
                  `).join('')}
                </div>
                <div class="mt-3 pt-2 border-t border-white/10 flex justify-between items-center text-[11px] text-gray-400 px-2">
                  <span>Demo DB</span>
                  <button onclick="resetLibraryData()" class="text-emerald-400 hover:underline flex items-center gap-1">
                    <i class="fa-solid fa-rotate text-[10px]"></i> Reset DB
                  </button>
                </div>
              </div>
            </div>

            <!-- Mobile Hamburger -->
            <button onclick="toggleMobileNav()" class="lg:hidden p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/5">
              <i class="fa-solid fa-bars text-lg"></i>
            </button>

          </div>
        </div>
      </div>

      <!-- Mobile Dropdown -->
      <div id="mobile-nav-panel" class="hidden lg:hidden bg-[#091024] border-b border-white/10 px-4 pt-2 pb-6 space-y-2">
        <div class="text-xs font-bold text-emerald-400 uppercase tracking-wider px-2 py-1">Project 1 Pages</div>
        ${LIB_PAGES.map(p => `
          <a href="${p.file}" class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${p.id === activePageId ? 'bg-emerald-500 text-black font-bold' : 'text-gray-300'}">
            <i class="fa-solid ${p.icon} w-5"></i>
            <span>${p.name}</span>
          </a>
        `).join('')}
      </div>
    </nav>
  `;
}

function renderLibraryFooter() {
  const container = document.getElementById('global-footer');
  if (!container) return;

  container.innerHTML = `
    <footer class="bg-[#070c1d] border-t border-white/10 text-gray-400 text-xs mt-20 pt-16 pb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          <!-- Col 1 -->
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-black font-bold">
                <i class="fa-solid fa-book-bookmark text-white"></i>
              </div>
              <span class="font-serif-title font-bold text-lg text-white">APEX<span class="text-emerald-400">LIBRARY</span></span>
            </div>
            <p class="text-gray-400 leading-relaxed text-[11px]">
              Complete College Library Management System complying with Project 1 specifications. Automated circulation, late return fine calculation (10/day), and catalog searches.
            </p>
          </div>

          <!-- Col 2: Member Surfaces -->
          <div>
            <h4 class="text-white font-bold mb-3 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <i class="fa-solid fa-user-graduate text-emerald-400"></i> Member Surfaces
            </h4>
            <ul class="space-y-2 text-[11px]">
              <li><a href="index.html" class="hover:text-emerald-400">2. Book Catalogue with Search</a></li>
              <li><a href="borrowing-history.html" class="hover:text-emerald-400">7. Member Borrowing History</a></li>
              <li><a href="login.html" class="hover:text-emerald-400">1. Member / Librarian Login</a></li>
            </ul>
          </div>

          <!-- Col 3: Staff Surfaces -->
          <div>
            <h4 class="text-white font-bold mb-3 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <i class="fa-solid fa-id-badge text-emerald-400"></i> Librarian Circulation
            </h4>
            <ul class="space-y-2 text-[11px]">
              <li><a href="issue-book.html" class="hover:text-emerald-400">5. Issue Book (Max 3 Constraint)</a></li>
              <li><a href="return-book.html" class="hover:text-emerald-400">6. Return Book (Automatic Fine)</a></li>
              <li><a href="add-edit-book.html" class="hover:text-emerald-400">3. Add & Edit Books</a></li>
              <li><a href="member-register.html" class="hover:text-emerald-400">4. Member Registration</a></li>
            </ul>
          </div>

          <!-- Col 4: Business Rules -->
          <div>
            <h4 class="text-white font-bold mb-3 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <i class="fa-solid fa-scale-balanced text-emerald-400"></i> Business Rules
            </h4>
            <ul class="space-y-1.5 text-[11px] text-gray-400">
              <li>&bull; <strong class="text-gray-300">Max Books:</strong> At most 3 books per member</li>
              <li>&bull; <strong class="text-gray-300">Copy Check:</strong> 0 available copies cannot issue</li>
              <li>&bull; <strong class="text-gray-300">Late Fine:</strong> 10 per day late automatically</li>
            </ul>
            <button onclick="resetLibraryData()" class="mt-3 w-full btn-secondary py-1.5 px-3 rounded-lg text-[11px] text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10">
              <i class="fa-solid fa-rotate"></i> Reset Demo Database
            </button>
          </div>

        </div>

        <div class="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-gray-500 text-[11px] gap-3">
          <p>&copy; 2026 APEX College Library. Project 1 Architecture & Execution Engine.</p>
          <div class="flex items-center gap-3">
            <span class="inline-flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-emerald-400"></span> 4 Relational Tables Active</span>
          </div>
        </div>
      </div>
    </footer>
  `;
}

function toggleMobileNav() {
  const panel = document.getElementById('mobile-nav-panel');
  if (panel) panel.classList.toggle('hidden');
}

function resetLibraryData() {
  if (confirm('Reset library database back to default books, members, and loans?')) {
    window.libDB.resetToDefault();
    alert('Library database successfully restored to default seed data!');
    window.location.reload();
  }
}

