let locationDropdown, areaDropdown, ongoingFiltersDiv, galleryTabs, projectCards, paginationContainer;
let currentSelectedLocation = "";
let currentSelectedArea = "";
let currentCategory = 'all';
const PROJECTS_PER_PAGE = 8;
const locationAreaMap = {
    "chennai": ["omr", "ecr", "tambaram"],
    "madurai": ["ayyankottai", "gomatipuram", "tirupalai"]
};

function populateLocationFilter() {
    if (!locationDropdown) return;
    const locations = Object.keys(locationAreaMap);
    locationDropdown.innerHTML = '<option value="">-- Select Location --</option>';
    locations.forEach(locationKey => {
        const option = document.createElement('option');
        option.value = locationKey;
        option.textContent = locationKey.charAt(0).toUpperCase() + locationKey.slice(1);
        locationDropdown.appendChild(option);
    });
}

function updateAreaFilterAndGallery() {
    if (!locationDropdown || !areaDropdown) return;
    const selectedLocation = locationDropdown.value;
    areaDropdown.innerHTML = '<option value="">-- Select Area --</option>';
    areaDropdown.disabled = true;

    if (selectedLocation) {
        const areas = locationAreaMap[selectedLocation] || [];
        areaDropdown.disabled = areas.length === 0;
        areas.forEach(area => {
            const option = document.createElement('option');
            option.value = area;
            option.textContent = area.charAt(0).toUpperCase() + area.slice(1);
            areaDropdown.appendChild(option);
        });
    }
    areaDropdown.value = "";
    currentSelectedLocation = selectedLocation;
    currentSelectedArea = "";
    applyFilters(currentCategory, 1);
}

function applyFilters(category, page = 1) {
    currentCategory = category;
    
    // Reset secondary filters if not ongoing
    if (ongoingFiltersDiv) {
        if (category === 'ongoing') {
            ongoingFiltersDiv.style.display = 'flex';
        } else {
            ongoingFiltersDiv.style.display = 'none';
            if (currentCategory !== 'ongoing') {
                currentSelectedLocation = "";
                currentSelectedArea = "";
                if (locationDropdown) locationDropdown.value = "";
                if (areaDropdown) {
                    areaDropdown.innerHTML = '<option value="">-- Select Area --</option>';
                    areaDropdown.disabled = true;
                }
            }
        }
    }

    let allCount = 0;
    let ongoingCount = 0;
    let completedCount = 0;

    let matchingCards = [];

    // Filter logic
    projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const cardLocation = card.getAttribute('data-location');
        const cardArea = card.getAttribute('data-area');
        
        // Count totals
        allCount++;
        if (cardCategory === 'ongoing') ongoingCount++;
        if (cardCategory === 'completed') completedCount++;

        let matchesCategory = (category === 'all' || cardCategory === category);
        let matchesSubFilter = true;
        if (category === 'ongoing') {
            if (currentSelectedLocation && cardLocation !== currentSelectedLocation) matchesSubFilter = false;
            if (matchesSubFilter && currentSelectedArea && cardArea !== currentSelectedArea) matchesSubFilter = false;
        }

        if (matchesCategory && matchesSubFilter) {
            matchingCards.push(card);
        } else {
            card.style.setProperty('display', 'none', 'important');
        }
    });

    // Update counts
    const countAllEl = document.getElementById('count-all');
    if(countAllEl) countAllEl.textContent = allCount;
    
    const countOngoingEl = document.getElementById('count-ongoing');
    if(countOngoingEl) countOngoingEl.textContent = ongoingCount;
    
    const countCompletedEl = document.getElementById('count-completed');
    if(countCompletedEl) countCompletedEl.textContent = completedCount;

    // Pagination
    const totalItems = matchingCards.length;
    const totalPages = Math.ceil(totalItems / PROJECTS_PER_PAGE);
    let currentPage = Math.min(Math.max(1, page), totalPages || 1);
    const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
    const endIndex = startIndex + PROJECTS_PER_PAGE;

    matchingCards.forEach((card, index) => {
        if (index >= startIndex && index < endIndex) {
            card.style.setProperty('display', 'block', 'important');
        } else {
            card.style.setProperty('display', 'none', 'important');
        }
    });

    createPaginationLinks(totalPages, currentPage, category);
}

function createPaginationLinks(totalPages, currentPage, category) {
    if (!paginationContainer) return;
    paginationContainer.innerHTML = '<div class="col text-center"><div class="block-27"></div></div>'; 
    if (totalPages <= 1) return;

    const ul = document.createElement('ul');
    const prevLi = document.createElement('li');
    prevLi.innerHTML = `<a href="#">&lt;</a>`;
    if (currentPage === 1) {
        prevLi.classList.add('disabled');
    } else {
        prevLi.addEventListener('click', (e) => {
            e.preventDefault();
            applyFilters(category, currentPage - 1);
            const section = document.getElementById('project-gallery-section');
            if(section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
    ul.appendChild(prevLi);

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#">${i}</a>`;
        if (i === currentPage) {
            li.classList.add('active');
        } else {
            li.addEventListener('click', (e) => {
                e.preventDefault();
                applyFilters(category, i);
                const section = document.getElementById('project-gallery-section');
                if(section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }
        ul.appendChild(li);
    }

    const nextLi = document.createElement('li');
    nextLi.innerHTML = `<a href="#">&gt;</a>`;
    if (currentPage === totalPages) {
        nextLi.classList.add('disabled');
    } else {
        nextLi.addEventListener('click', (e) => {
            e.preventDefault();
            applyFilters(category, currentPage + 1);
            const section = document.getElementById('project-gallery-section');
            if(section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
    ul.appendChild(nextLi);

    const block27 = paginationContainer.querySelector('.block-27');
    if (block27) block27.appendChild(ul);
}

function initProjects() {
    locationDropdown = document.getElementById('location-filter');
    areaDropdown = document.getElementById('area-filter');
    ongoingFiltersDiv = document.getElementById('ongoing-filters');
    galleryTabs = document.querySelectorAll('.gallery-tab-project'); 
    projectCards = document.querySelectorAll('.gallery-item-project'); 
    paginationContainer = document.getElementById('pagination-container');

    if (!projectCards || projectCards.length === 0) return; // Silent abort if no cards
    
    populateLocationFilter();

    if (galleryTabs) {
        galleryTabs.forEach(tab => {
            tab.addEventListener('click', function () {
                const category = this.getAttribute('data-category');
                galleryTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                applyFilters(category, 1);
            });
        });
    }
    
    if (locationDropdown) locationDropdown.addEventListener('change', updateAreaFilterAndGallery);
    if (areaDropdown) {
        areaDropdown.addEventListener('change', function () {
            currentSelectedArea = this.value;
            const activeTab = document.querySelector('.gallery-tab-project.active');
            if (activeTab && activeTab.getAttribute('data-category') === 'ongoing') {
                applyFilters(currentCategory, 1); 
            }
        });
    }

    applyFilters('all', 1);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjects);
} else {
    initProjects();
}