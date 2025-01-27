// פונקציה להפעלה/כיבוי של שדה החיפוש
function toggleSearch() {
    const searchInput = document.getElementById('search-input');
    searchInput.classList.toggle('active');
    
    if (searchInput.classList.contains('active')) {
        searchInput.focus();
    } else {
        searchInput.value = '';
        search(); // מנקה את תוצאות החיפוש כשסוגרים
    }
}

// פונקציית החיפוש המקורית שלך נשארת אותו דבר
function search() {
    const query = document.getElementById('search-input').value.toLowerCase();
    
    const cakeGrid = document.querySelector('.cake-grid');
    const cakeCards = document.querySelectorAll('.cake-card');
    
    if (cakeGrid) {  // בדוק אם ה-cakeGrid קיים
        cakeGrid.style.display = 'grid';
    }

    if (query === '') {
        cakeCards.forEach(card => {
            card.style.display = 'block';
        });
        return;
    }
    
    let found = false;
    
    cakeCards.forEach(card => {
        const title = card.querySelector('.cake-card-title').textContent.toLowerCase();
        const details = card.querySelector('.cake-card-details').textContent.toLowerCase();
        
        if (title.includes(query) || details.includes(query)) {
            card.style.display = 'block';
            found = true;
        } else {
            card.style.display = 'none';
        }
    });
    
    if (!found) {
        const noResultsElement = document.createElement('div');
        noResultsElement.className = 'no-results-message';
        noResultsElement.style.gridColumn = '1 / -1';
        noResultsElement.innerHTML = '<p>לא נמצאו תוצאות לחיפוש שלך.</p>';
        
        cakeCards.forEach(card => card.style.display = 'none');
        if (!document.querySelector('.no-results-message')) {
            cakeGrid.appendChild(noResultsElement);
        }
    } else {
        const noResultsMessage = document.querySelector('.no-results-message');
        if (noResultsMessage) {
            noResultsMessage.remove();
        }
    }
}

// מוסיף האזנה לאירוע הקלדה
const searchInput = document.getElementById('search-input');
if (searchInput) {
    searchInput.addEventListener('keyup', search);
}

// סוגר את החיפוש בלחיצה מחוץ לאזור החיפוש
document.addEventListener('click', function(event) {
    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.getElementById('search-input');
    
    if (searchContainer && searchInput && !searchContainer.contains(event.target)) {
        searchInput.classList.remove('active');
        searchInput.value = '';
        search();
    }
});
