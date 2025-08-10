document.addEventListener('DOMContentLoaded', () => {
    wireNav();
    setTodayDate();
    initializeTypingWave();
    initializeProblemsUI();
    wireModal();
    const sectionFromHash = window.location.hash?.replace('#', '') || 'home';
    activateSection(sectionFromHash);
});

function wireNav() {
    const nav = document.getElementById('navLinks');

    nav?.querySelectorAll('a.nav-link').forEach((a) => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            const section = a.getAttribute('data-section');
            if (section) {
                window.location.hash = section;
                activateSection(section);
            }
        });
    });

    window.addEventListener('hashchange', () => {
        const section = window.location.hash.replace('#', '') || 'home';
        activateSection(section);
    });
    document.getElementById('addProblemBtn')?.addEventListener('click', addProblemRow);
    document.querySelector('#leaderboardOverlay .overlay-backdrop')?.addEventListener('click', closeLeaderboardOverlay);
    document.getElementById('overlayCloseBtn')?.addEventListener('click', closeLeaderboardOverlay);
}

function activateSection(sectionName) {
    document.querySelectorAll('.section').forEach((sec) => sec.classList.remove('active'));
    document.getElementById(sectionName)?.classList.add('active');
    document.querySelectorAll('a.nav-link').forEach((a) => {
        if (a.getAttribute('data-section') === sectionName) a.classList.add('active');
        else a.classList.remove('active');
    });
    if (sectionName === 'learn') {
        showComingSoon();
    }
}

function setTodayDate() {
    const today = new Date().toISOString().split('T')[0];
    const input = document.getElementById('submissionDate');
    if (input) input.value = today;
}

function initializeTypingWave() {
    const el = document.getElementById('heroTitle');
    if (!el) return;
    const text = el.textContent || '';
    el.innerHTML = '';
    const wrapper = document.createElement('span');
    wrapper.className = 'wave-text';
    text.split('').forEach((ch, idx) => {
        const span = document.createElement('span');
        span.style.setProperty('--i', String(idx));
        span.textContent = ch;
        wrapper.appendChild(span);
    });
    el.appendChild(wrapper);
}

function problemRowTemplate(index) {
    return `
    <div class="grid md:grid-cols-2 gap-3 items-start" data-problem-index="${index}">
      <div>
        <label class="block text-navy font-semibold mb-1">Problem URL</label>
        <input type="url" name="problemUrl_${index}" placeholder="https://..." class="w-full px-4 py-2 border border-gray-300 rounded-lg" />
      </div>
      <div>
        <label class="block text-navy font-semibold mb-1">Screenshot (optional)</label>
        <input type="file" name="screenshot_${index}" accept="image/*" class="w-full px-4 py-2 border border-gray-300 rounded-lg" />
      </div>
    </div>`;
}

function initializeProblemsUI() {
    const container = document.getElementById('problemsContainer');
    if (!container) return;
    container.innerHTML = problemRowTemplate(0);
}

function addProblemRow() {
    const container = document.getElementById('problemsContainer');
    if (!container) return;
    const nextIdx = container.querySelectorAll('[data-problem-index]').length;
    container.insertAdjacentHTML('beforeend', problemRowTemplate(nextIdx));
}

function wireModal() {
    const overlay = document.querySelector('#profileModal .modal-overlay');
    const closeBtn = document.getElementById('modalCloseBtn');
    overlay?.addEventListener('click', closeProfileModal);
    closeBtn?.addEventListener('click', closeProfileModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeProfileModal();
    });
}

function closeProfileModal() {
    const modal = document.getElementById('profileModal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
}

function showComingSoon() {
    const learnSection = document.getElementById('learn');
    learnSection.innerHTML = `<h2 class="text-3xl font-mono text-center mt-8">Coming Soon...</h2>`;
}