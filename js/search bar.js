// פונקציה להצגת תאריך ושעה נוכחיים
function showDateTime() {
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');
    console.log(`Current Date and Time: ${formattedDate}`);
}

// פונקציית החיפוש הראשית
function search() {
    const searchInput = document.getElementById('search-input');
    const cakeGrid = document.querySelector('.cakeGrid');
    const query = searchInput.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.cakeGrid a');

    // מסיר הודעת "אין תוצאות" קודמת אם קיימת
    const existingNoResults = document.querySelector('.no-results');
    if (existingNoResults) {
        existingNoResults.remove();
    }

    if (query === '') {
        cards.forEach(card => card.style.display = '');
        return;
    }

    let foundResults = false;

    cards.forEach(card => {
        const title = card.querySelector('.title').textContent.toLowerCase();
        const details = card.querySelector('.details').textContent.toLowerCase();

        if (title.includes(query) || details.includes(query)) {
            card.style.display = '';
            foundResults = true;
        } else {
            card.style.display = 'none';
        }
    });

    // מציג הודעה אם אין תוצאות
    if (!foundResults) {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.textContent = 'לא נמצאו תוצאות לחיפוש שלך';
        cakeGrid.appendChild(noResults);
    }
}

// פונקציית הToggle לכפתור החיפוש
window.toggleSearch = function() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.querySelector('.search-button i');
    
    if (searchInput) {
        const isActive = searchInput.classList.toggle('active');
        
        if (isActive) {
            searchInput.style.display = 'block';
            setTimeout(() => {
                searchInput.style.width = '200px';
                searchInput.style.opacity = '1';
            }, 10);
            searchInput.focus();
            searchButton.classList.remove('fa-search');
            searchButton.classList.add('fa-times');
        } else {
            searchInput.style.width = '0';
            searchInput.style.opacity = '0';
            setTimeout(() => {
                searchInput.style.display = 'none';
            }, 300);
            searchInput.value = '';
            search();
            searchButton.classList.remove('fa-times');
            searchButton.classList.add('fa-search');
        }
    }
};

// טיפול בניווט לקטגוריות
function handleCategoryNavigation() {
    document.querySelectorAll('.cakeGrid a').forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            
            const category = this.dataset.category;
            if (!category) {
                console.warn('קטגוריה לא נמצאה בקישור');
                return;
            }

            try {
                localStorage.setItem('selectedCategory', category);
                window.location.href = 'category.html';
            } catch (error) {
                console.error('שגיאה בשמירת הקטגוריה:', error);
            }
        });
    });
}

// אתחול כל האירועים כשהדף נטען
document.addEventListener('DOMContentLoaded', () => {
    // הצגת תאריך ושעה
    showDateTime();
    
    // אתחול שדה החיפוש
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        // מאזין לשינויים בשדה החיפוש
        searchInput.addEventListener('input', search);
        
        // סוגר את החיפוש בלחיצה על Escape
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Escape') {
                toggleSearch();
            }
        });

        // מונע שליחת טופס
        searchInput.closest('form')?.addEventListener('submit', (e) => {
            e.preventDefault();
        });
    }

    // אתחול ניווט קטגוריות
    handleCategoryNavigation();

    // לוג של המשתמש הנוכחי
    console.log('Current User:', 'mosheelkiess');
});

// טיפול בשגיאות כלליות
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + lineNo);
    return false;
};

// טיפול בהבטחות שנכשלו
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
});