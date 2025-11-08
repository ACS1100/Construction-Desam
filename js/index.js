// --- CONFIGURATION & DATA ---
const PROJECTS_PER_PAGE = 8;

// Maps locations to their respective areas (used for dropdown population)
const locationAreaMap = {
    "chennai": ["omr", "ecr", "tambaram"],
    "madurai": ["ayyankottai", "gomatipuram", "tirupalai"]
};

// Project Data Array (Expanded to 12 projects)
// IMPORTANT: The 'id' field MUST match the 'data-id' attribute in the HTML templates above.
const projectData = [
    // Original 8 Projects
    { "id": "proj-1", "project": "OMR Vista", "category": "ongoing", "location": "chennai", "area": "omr", "link": "work-single.html", "description": "Chennai (OMR) - Building tomorrow's skyline." },
    { "id": "proj-2", "project": "Fair Land", "category": "ongoing", "location": "madurai", "area": "ayyankottai", "link": "fair-land.html", "description": "Madurai (Ayyankottai) - Contemporary commercial space.", "is_link": true },
    { "id": "proj-3", "project": "ECR Heights", "category": "ongoing", "location": "chennai", "area": "ecr", "link": "work-single.html", "description": "Chennai (ECR) - Classic brick architecture." },
    { "id": "proj-4", "project": "Velachery Square", "category": "completed", "location": "", "area": "", "link": "work-single.html", "description": "Coastal living with serene ocean views." },
    { "id": "proj-5", "project": "Gomatipuram Plaza", "category": "ongoing", "location": "madurai", "area": "gomatipuram", "link": "work-single.html", "description": "Madurai (Gomatipuram) - Spacious industrial facility." },
    { "id": "proj-6", "project": "Anna Nagar", "category": "ongoing", "location": "chennai", "area": "omr", "link": "work-single.html", "description": "Chennai (OMR) - Bright educational spaces." },
    { "id": "proj-7", "project": "KK Nagar", "category": "completed", "location": "", "area": "", "link": "work-single.html", "description": "Elegant residential complex with lush gardens." },
    { "id": "proj-8", "project": "Pasumalai Heights", "category": "completed", "location": "", "area": "", "link": "work-single.html", "description": "Sophisticated gallery space." },
    // 4 New Placeholder Projects
    { "id": "proj-9", "project": "Tambaram Gardens", "category": "ongoing", "location": "chennai", "area": "tambaram", "link": "work-single.html", "description": "Chennai (Tambaram) - Luxurious residential villas." },
    { "id": "proj-10", "project": "Tirupalai Towers", "category": "completed", "location": "", "area": "", "link": "work-single.html", "description": "Madurai (Tirupalai) - Modern IT park infrastructure." },
    { "id": "proj-11", "project": "Ambattur Logistics", "category": "ongoing", "location": "chennai", "area": "omr", "link": "work-single.html", "description": "Chennai (OMR) - High-capacity warehouse and logistics center." },
    { "id": "proj-12", "project": "Kovai Residency", "category": "completed", "location": "", "area": "", "link": "work-single.html", "description": "A successful residential project in Coimbatore." }
];


// --- DOM Elements & State ---
const locationDropdown = document.getElementById('location-filter');
const areaDropdown = document.getElementById('area-filter');
const ongoingFiltersDiv = document.getElementById('ongoing-filters');
// Selects all filter buttons
const galleryTabs = document.querySelectorAll('.gallery-tab-project');
const projectGalleryRow = document.getElementById('project-gallery-row');
const paginationContainer = document.getElementById('pagination-container');
const projectTemplates = document.getElementById('project-templates');

let currentSelectedLocation = "";
let currentSelectedArea = "";
let currentCategory = 'all';


// --- FUNCTION 0: Renders the filtered and paginated items to the DOM ---
function renderGalleryItems(itemsToDisplay) {
    projectGalleryRow.innerHTML = '';

    itemsToDisplay.forEach(project => {
        // 1. Find the static HTML template using the project's ID
        const template = projectTemplates.querySelector(`[data-id="${project.id}"]`);

        if (template) {
            // 2. Clone the template (true for deep clone)
            const projectCard = template.cloneNode(true);
            projectCard.style.display = 'block'; // Ensure cloned card is visible (if template was hidden by default)

            // 3. Inject dynamic data from the JS array into the cloned HTML
            const nameLink = projectCard.querySelector('.project-name-placeholder a');
            nameLink.textContent = project.project;
            nameLink.setAttribute('href', project.link);

            projectCard.querySelector('.project-description-placeholder').textContent = project.description;

            // 4. Update the main image link for details/popup
            const imageLink = projectCard.querySelector('.work a');
            // Check if it's a direct link or an image popup (using the template's existing href attribute for the image popup)
            if (project.is_link) {
                imageLink.setAttribute('href', project.link);
                imageLink.classList.remove('image-popup');
            } else {
                // For image-popup links, retain the image-popup class and existing href (to the image file)
                const currentImageLink = imageLink.getAttribute('href');
                imageLink.setAttribute('href', currentImageLink);
            }

            // 5. Append the finalized card to the visible row
            projectGalleryRow.appendChild(projectCard);
        }
    });

    // 6. Re-initialize Magnific Popup for newly added elements
    // Note: This relies on jQuery being loaded (which it is in index.html)
    if (typeof jQuery !== 'undefined' && typeof jQuery.fn.magnificPopup !== 'undefined') {
        $('.image-popup').magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            closeBtnInside: false,
            fixedContentPos: true,
            mainClass: 'mfp-no-margins mfp-with-zoom',
            image: { verticalFit: true },
            zoom: { enabled: true, duration: 300 }
        });
    }
}

// --- FUNCTION 1: Populates the Location dropdown ---
function populateLocationFilter() {
    const locations = Object.keys(locationAreaMap);
    locationDropdown.innerHTML = '<option value="">-- Select Location --</option>';
    locations.forEach(locationKey => {
        const option = document.createElement('option');
        option.value = locationKey;
        // Capitalize first letter for display
        option.textContent = locationKey.charAt(0).toUpperCase() + locationKey.slice(1);
        locationDropdown.appendChild(option);
    });
}


// --- FUNCTION 2: Updates Area dropdown and triggers re-filter (on location change) ---
function updateAreaFilterAndGallery() {
    const selectedLocation = locationDropdown.value;
    areaDropdown.innerHTML = '<option value="">-- Select Area --</option>';
    areaDropdown.disabled = true;
    currentSelectedArea = ""; // Reset area when location changes

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

    currentSelectedLocation = selectedLocation;
    filterGalleryItems(currentCategory, 1);
}

// --- FUNCTION 3: Creates the Pagination HTML ---
function createPaginationLinks(totalPages, currentPage, category) {
    paginationContainer.innerHTML = '<div class="col text-center"><div class="block-27"></div></div>'; // Reset container

    if (totalPages <= 1) return;

    const ul = document.createElement('ul');
    // Previous button
    const prevLi = document.createElement('li');
    prevLi.innerHTML = `<a href="#">&lt;</a>`;
    if (currentPage === 1) {
        prevLi.classList.add('disabled');
    } else {
        prevLi.addEventListener('click', (e) => {
            e.preventDefault();
            filterGalleryItems(category, currentPage - 1);
            document.getElementById('project-gallery-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
    ul.appendChild(prevLi);

    // Page links
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#">${i}</a>`;
        if (i === currentPage) {
            li.classList.add('active');
        } else {
            li.addEventListener('click', (e) => {
                e.preventDefault();
                filterGalleryItems(category, i);
                document.getElementById('project-gallery-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }
        ul.appendChild(li);
    }

    // Next button
    const nextLi = document.createElement('li');
    nextLi.innerHTML = `<a href="#">&gt;</a>`;
    if (currentPage === totalPages) {
        nextLi.classList.add('disabled');
    } else {
        nextLi.addEventListener('click', (e) => {
            e.preventDefault();
            filterGalleryItems(category, currentPage + 1);
            document.getElementById('project-gallery-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
    ul.appendChild(nextLi);

    // Append list to block-27 container
    const block27 = paginationContainer.querySelector('.block-27');
    if (block27) block27.appendChild(ul);
}


// --- FUNCTION 4: The main filtering and rendering logic ---
function filterGalleryItems(category, page = 1) {
    currentCategory = category;

    // 1. Calculate All Counts and Update Buttons
    const ongoingCount = projectData.filter(item => item.category === 'ongoing').length;
    const completedCount = projectData.filter(item => item.category === 'completed').length;
    const allCount = projectData.length;

    document.getElementById('count-all').textContent = allCount;
    document.getElementById('count-ongoing').textContent = ongoingCount;
    document.getElementById('count-completed').textContent = completedCount;


    // 2. Handle visibility of sub-filters and state reset
    if (category === 'ongoing') {
        ongoingFiltersDiv.style.display = 'flex';
    } else {
        ongoingFiltersDiv.style.display = 'none';
        if (currentCategory !== 'ongoing') {
            // Reset sub-filter state when switching away from 'ongoing'
            currentSelectedLocation = "";
            currentSelectedArea = "";
            locationDropdown.value = "";
            areaDropdown.innerHTML = '<option value="">-- Select Area --</option>';
            areaDropdown.disabled = true;
        }
    }

    // 3. Filter the DATA array
    let filteredData = projectData.filter(item => {
        const matchesCategory = (category === 'all' || item.category === category);
        let matchesSubFilter = true;

        if (category === 'ongoing') {
            // Only consider items that have location and area data if a filter is active
            if (currentSelectedLocation && item.location !== currentSelectedLocation) matchesSubFilter = false;
            if (matchesSubFilter && currentSelectedArea && item.area !== currentSelectedArea) matchesSubFilter = false;
            // NOTE: Projects without a location/area won't show up in the ongoing filtered list if any location is selected
        }

        return matchesCategory && matchesSubFilter;
    });

    // 4. Apply Pagination Logic
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / PROJECTS_PER_PAGE);
    // Ensure currentPage is a valid page number
    let currentPage = totalItems > 0 ? Math.min(Math.max(1, page), totalPages) : 1; 
    const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
    const endIndex = startIndex + PROJECTS_PER_PAGE;
    const itemsToDisplay = filteredData.slice(startIndex, endIndex);

    // 5. Render the items dynamically (using HTML templates)
    renderGalleryItems(itemsToDisplay);

    // 6. Generate Pagination Links
    createPaginationLinks(totalPages, currentPage, category);
}


// --- MAIN INITIALIZATION & EVENT LISTENERS ---
document.addEventListener('DOMContentLoaded', function () {

    populateLocationFilter();

    // --- Tab Click Listener (Primary filter) ---
    galleryTabs.forEach(tab => {
        tab.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default link behavior
            const category = this.getAttribute('data-category');

            galleryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Filter gallery items, always starting at page 1 for a new category
            filterGalleryItems(category, 1);
            document.getElementById('project-gallery-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // --- Location Dropdown Listener ---
    locationDropdown.addEventListener('change', updateAreaFilterAndGallery);

    // --- Area Dropdown Listener ---
    areaDropdown.addEventListener('change', function () {
        currentSelectedArea = this.value;
        // Only re-filter if the 'Ongoing Projects' tab is active
        if (document.querySelector('.gallery-tab-project.active').getAttribute('data-category') === 'ongoing') {
            // Filter, always starting at page 1 for a new sub-filter selection
            filterGalleryItems(currentCategory, 1);
        }
    });

    // Initialize gallery (show 'all' items, page 1 and set counts)
    filterGalleryItems('all', 1);
});