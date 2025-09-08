const sidebarContainer = document.getElementById('sidebar-container');

if (sidebarContainer) {
    // 1. Muat komponen sidebar dari file eksternal
    fetch('sidebar-component.html')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok.');
            return response.text();
        })
        .then(data => {
            sidebarContainer.innerHTML = data;
            // 2. Setelah sidebar dimuat, tambahkan interaktivitasnya
            initializeSidebarInteractivity();
            // 3. Atur link yang aktif berdasarkan halaman saat ini
            setActiveLink();
        })
        .catch(error => {
            console.error('Error memuat sidebar:', error);
            sidebarContainer.innerHTML = '<p class="p-4 text-red-500">Gagal memuat sidebar.</p>';
        });
}

function initializeSidebarInteractivity() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle'); // Tombol hamburger
    const sidebarCloseBtn = document.getElementById('sidebar-close-btn'); // Tombol 'X'
    const backdrop = document.getElementById('sidebar-backdrop'); // Latar belakang blur

    const openSidebar = () => {
        sidebar?.classList.remove('-translate-x-full');
        backdrop?.classList.remove('hidden');
    };

    const closeSidebar = () => {
        sidebar?.classList.add('-translate-x-full');
        backdrop?.classList.add('hidden');
    };

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', openSidebar);
    }

    if (sidebarCloseBtn) {
        sidebarCloseBtn.addEventListener('click', closeSidebar);
    }

    if (backdrop) {
        backdrop.addEventListener('click', closeSidebar);
    }
}

function setActiveLink() {
    // Dapatkan nama file halaman saat ini (cth: "index.html", "pengeluaran.html")
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Cari semua link di dalam sidebar
    const links = document.querySelectorAll('#sidebar nav a');

    links.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('bg-gray-700', 'text-white');
        }
    });
}