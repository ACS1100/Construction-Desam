// =========================================================================
// *** APARTMENT FLAT INVENTORY DATA ***
const customerFlatData = [
    { "flatNo": "A-101", "floor": 1, "type": "2 BHK", "sqft": 1250, "facing": "East", "status": "Active" },
    { "flatNo": "A-102", "floor": 1, "type": "3 BHK", "sqft": 1500, "facing": "North", "status": "Sold" },
    { "flatNo": "A-201", "floor": 2, "type": "2 BHK", "sqft": 1250, "facing": "East", "status": "Active" },
    { "flatNo": "A-202", "floor": 2, "type": "3 BHK", "sqft": 1500, "facing": "North", "status": "Active" },
    { "flatNo": "B-301", "floor": 3, "type": "1 BHK", "sqft": 800, "facing": "South", "status": "Hold" },
    { "flatNo": "B-302", "floor": 3, "type": "2 BHK", "sqft": 1200, "facing": "West", "status": "Active" },
    { "flatNo": "C-401", "floor": 4, "type": "3 BHK", "sqft": 1450, "facing": "East", "status": "Active" },
    { "flatNo": "C-402", "floor": 4, "type": "1 BHK", "sqft": 750, "facing": "North", "status": "Sold" },
];

// =========================================================================
// *** CONFIGURATION & STATE ***
const itemsPerPage = 12;
let currentPage = 1;
let totalPages = 0;
let filteredData = [];

// --- CONSTANTS ---
const PROJECT_NAME = 'Coastal Residential Development';
const SALES_TEAM_NUMBER = '918807344264';

// --- UTILITY FUNCTIONS ---
const getEl = (id) => document.getElementById(id);
const getValue = (id) => getEl(id) ? getEl(id).value : null;
const setText = (id, content) => getEl(id) ? getEl(id).textContent = content : null;

// =========================================================================
// *** INVENTORY LOGIC ***

// 1. Filtering Logic
function filterAndRender() {
    // Replace jQuery .val() with native .value
    const floorFilter = getValue('flat-floor-filter');
    const typeFilter = getValue('flat-type-filter');
    const statusFilter = getValue('flat-status-filter');
    const searchInput = getValue('flat-no-filter').toLowerCase().trim();

    // Determine view mode (Replace jQuery .hasClass())
    const btnGridView = getEl('btn-view-grid');
    const isGridView = btnGridView && btnGridView.classList.contains('active');
    const viewMode = isGridView ? 'grid' : 'table';

    filteredData = customerFlatData.filter(flat => {
        const floorMatch = floorFilter === 'all' || flat.floor.toString() === floorFilter;
        const typeMatch = typeFilter === 'all' || flat.type === typeFilter;
        const statusMatch = statusFilter === 'all' || flat.status === statusFilter;

        const searchMatch = searchInput === '' ||
            flat.flatNo.toLowerCase().includes(searchInput) ||
            flat.floor.toString().includes(searchInput) ||
            flat.type.toLowerCase().includes(searchInput) ||
            flat.status.toLowerCase().includes(searchInput);

        return floorMatch && typeMatch && statusMatch && searchMatch;
    });

    // Reset pagination and render (Replace jQuery .text())
    currentPage = 1;
    totalPages = Math.ceil(filteredData.length / itemsPerPage);
    setText('total-filtered-flats', filteredData.length);

    renderCurrentPage();
    renderPagination();

    // Update view mode visibility (Replace jQuery .addClass()/.removeClass())
    const tableView = getEl('view-container-table');
    const gridView = getEl('view-container-grid');

    if (tableView && gridView) {
        if (viewMode === 'grid') {
            tableView.classList.add('d-none');
            gridView.classList.remove('d-none');
        } else {
            tableView.classList.remove('d-none');
            gridView.classList.add('d-none');
        }
    }
}

// 2. Rendering Logic for the Current Page
function renderCurrentPage() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredData.slice(startIndex, endIndex);

    const btnGridView = getEl('btn-view-grid');
    const viewMode = btnGridView && btnGridView.classList.contains('active') ? 'grid' : 'table';

    if (viewMode === 'table') {
        renderTable(pageData);
    } else {
        renderGrid(pageData);
    }

    // Update flat count display
    const currentCount = pageData.length > 0 ? `${startIndex + 1}-${Math.min(endIndex, filteredData.length)}` : '0';
    setText('flat-count', currentCount);
}

// 3. Render Table View (List)
function renderTable(data) {
    // Replace jQuery selection and .empty()
    const tableBody = document.querySelector('#flat-inventory-table tbody');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    const whatsappNumber = SALES_TEAM_NUMBER;

    if (data.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" class="text-center p-4">No flats found matching your criteria.</td></tr>`;
        return;
    }

    let rowsHtml = '';
    data.forEach(flat => {
        const statusText = flat.status || 'Unknown';
        const isSold = statusText.toLowerCase() === 'sold';
        const badgeClass = isSold ? "status-sold" : (statusText.toLowerCase() === 'active' ? "status-active" : "bg-secondary text-white");
        const sqftDisplay = flat.sqft ? `${flat.sqft} sq.ft` : 'N/A';

        const message = encodeURIComponent(
            `I am interested in flat No. ${flat.flatNo} in the ${PROJECT_NAME} project.\n` +
            `Details:\n` +
            `Floor: ${flat.floor}\n` +
            `Type: ${flat.type}\n` +
            `Area: ${flat.sqft} sq.ft\n` +
            `Facing: ${flat.facing}\n` +
            `Status: ${statusText}\n` +
            `Please share the price and next steps.`
        );
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

        const btnHtml = isSold
            ? `<button class="btn btn-secondary btn-sm" disabled>Sold Out</button>`
            : `<a href="${whatsappUrl}" target="_blank" class="btn btn-whatsapp btn-sm"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>`;

        rowsHtml += `
            <tr>
                <td>${flat.flatNo}</td> 
                <td>${flat.floor}</td>
                <td>${flat.type}</td>
                <td>${sqftDisplay}</td>
                <td><span class="status-badge ${badgeClass}">${statusText}</span></td>
                <td>${btnHtml}</td>
            </tr>
        `;
    });
    tableBody.innerHTML = rowsHtml;
}

// 4. Render Grid View
function renderGrid(data) {
    // Replace jQuery selection and .empty()
    const gridContainer = getEl('view-container-grid');
    if (!gridContainer) return;
    gridContainer.innerHTML = '';

    const whatsappNumber = SALES_TEAM_NUMBER;

    if (data.length === 0) {
        gridContainer.innerHTML = `<div class="col-12"><div class="alert alert-info text-center">No flats found matching your criteria.</div></div>`;
        return;
    }

    let cardsHtml = '';
    data.forEach(flat => {
        const statusText = flat.status || 'Unknown';
        const isSold = statusText.toLowerCase() === 'sold';
        const statusBadgeClass = isSold ? "status-sold" : (statusText.toLowerCase() === 'active' ? "status-active" : "bg-secondary text-white");
        const cardStatusClass = isSold ? "flat-card-sold" : (statusText.toLowerCase() === 'active' ? "flat-card-active" : "");

        const message = encodeURIComponent(
            `I am interested in flat No. ${flat.flatNo} in the ${PROJECT_NAME} project.\n` +
            `Details:\n` +
            `Floor: ${flat.floor}\n` +
            `Type: ${flat.type}\n` +
            `Area: ${flat.sqft} sq.ft\n` +
            `Facing: ${flat.facing}\n` +
            `Status: ${statusText}\n` +
            `Please share the price and next steps.`
        );
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

        const btnHtml = isSold
            ? `<button class="btn btn-secondary btn-sm btn-block mt-3" disabled>Sold Out</button>`
            : `<a href="${whatsappUrl}" target="_blank" class="btn btn-whatsapp btn-sm btn-block mt-3"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>`;

        cardsHtml += `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 ftco-animate fadeInUp ftco-animated">
                <div class="flat-card ${cardStatusClass}">
                    <div class="flat-card-header">
                        <h5>Flat ${flat.flatNo}</h5>
                        <span class="status-badge ${statusBadgeClass}">${statusText}</span>
                    </div>
                    <div class="flat-card-body">
                        <div class="plot-detail-row">
                            <span class="plot-label"><i class="fa-solid fa-layer-group"></i> Floor:</span>
                            <span class="plot-value">${flat.floor}</span>
                        </div>
                        <div class="plot-detail-row">
                            <span class="plot-label"><i class="fa-solid fa-key"></i> Type:</span>
                            <span class="plot-value">${flat.type}</span>
                        </div>
                        <div class="plot-detail-row">
                            <span class="plot-label"><i class="fa-solid fa-ruler-combined"></i> Area:</span>
                            <span class="plot-value">${flat.sqft} sq.ft</span>
                        </div>
                        <div class="plot-detail-row">
                            <span class="plot-label"><i class="fa-solid fa-compass"></i> Facing:</span>
                            <span class="plot-value">${flat.facing}</span>
                        </div>
                        ${btnHtml}
                    </div>
                </div>
            </div>
        `;
    });
    gridContainer.innerHTML = cardsHtml;
}

// 5. Pagination Logic
function renderPagination() {
    const paginationEl = getEl('flat-pagination');
    if (!paginationEl) return;
    paginationEl.innerHTML = '';

    if (totalPages <= 1) {
        return;
    }

    const maxPagesToShow = 5;
    let startPage;
    let endPage;

    if (totalPages <= maxPagesToShow) {
        // less than max pages so show all
        startPage = 1;
        endPage = totalPages;
    } else {
        // more than max pages so calculate start and end pages
        if (currentPage <= Math.ceil(maxPagesToShow / 2)) {
            startPage = 1;
            endPage = maxPagesToShow;
        } else if (currentPage + Math.floor(maxPagesToShow / 2) >= totalPages) {
            startPage = totalPages - maxPagesToShow + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - Math.floor(maxPagesToShow / 2);
            endPage = currentPage + Math.floor(maxPagesToShow / 2);
        }
    }

    let paginationHtml = '';

    // Previous button
    paginationHtml += `<li class="page-item ${currentPage === 1 ? 'disabled' : ''}"><a class="page-link" href="#" data-page="${currentPage - 1}">Prev</a></li>`;

    // First page button (if needed)
    if (startPage > 1) {
        paginationHtml += `<li class="page-item"><a class="page-link" href="#" data-page="1">1</a></li>`;
        if (startPage > 2) {
            paginationHtml += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
    }

    // Page number buttons
    for (let i = startPage; i <= endPage; i++) {
        paginationHtml += `<li class="page-item ${currentPage === i ? 'active' : ''}"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
    }

    // Last page button (if needed)
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            paginationHtml += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
        paginationHtml += `<li class="page-item"><a class="page-link" href="#" data-page="${totalPages}">${totalPages}</a></li>`;
    }

    // Next button
    paginationHtml += `<li class="page-item ${currentPage === totalPages ? 'disabled' : ''}"><a class="page-link" href="#" data-page="${currentPage + 1}">Next</a></li>`;

    paginationEl.innerHTML = paginationHtml;

    // Bind event listeners to new page links
    paginationEl.querySelectorAll('.page-link').forEach(link => {
        if (!link.parentNode.classList.contains('disabled')) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const newPage = parseInt(this.getAttribute('data-page'));
                if (newPage > 0 && newPage <= totalPages) {
                    currentPage = newPage;
                    renderCurrentPage();
                    renderPagination();
                    // Scroll to inventory section
                    const inventory = getEl('flat-inventory-section');
                    if (inventory) inventory.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    });
}

// 6. Initial Setup: Populate filters and render initial inventory
function initialSetup() {
    const floorFilter = getEl('flat-floor-filter');
    const typeFilter = getEl('flat-type-filter');
    const statusFilter = getEl('flat-status-filter');

    const floors = new Set();
    const types = new Set();

    // Manually add options for status, or populate dynamically from data if needed
    // Re-populate Status filter options explicitly
    if (statusFilter) {
        statusFilter.insertAdjacentHTML('beforeend', '<option value="Active">Active</option>');
        statusFilter.insertAdjacentHTML('beforeend', '<option value="Hold">Hold</option>');
        statusFilter.insertAdjacentHTML('beforeend', '<option value="Sold">Sold</option>');
    }

    customerFlatData.forEach(flat => {
        floors.add(flat.floor.toString());
        types.add(flat.type);
    });

    // Populate Floor Filter
    if (floorFilter) {
        Array.from(floors).sort((a, b) => parseInt(a) - parseInt(b)).forEach(floor => {
            floorFilter.insertAdjacentHTML('beforeend', `<option value="${floor}">${floor}</option>`);
        });
    }

    // Populate Type (BHK) Filter
    if (typeFilter) {
        Array.from(types).sort().forEach(type => {
            typeFilter.insertAdjacentHTML('beforeend', `<option value="${type}">${type}</option>`);
        });
    }

    // Bind filter change events
    const filterInputs = ['flat-floor-filter', 'flat-type-filter', 'flat-status-filter', 'flat-no-filter'];
    filterInputs.forEach(id => {
        const el = getEl(id);
        if (el) el.addEventListener(el.tagName === 'INPUT' ? 'keyup' : 'change', filterAndRender);
    });

    // Bind the reset button
    const resetBtn = getEl('reset-filters');
    if (resetBtn) resetBtn.addEventListener('click', resetFilters);

    // 5. Bind the view toggle buttons
    const btnList = getEl('btn-view-list');
    const btnGrid = getEl('btn-view-grid');
    const tableView = getEl('view-container-table');
    const gridView = getEl('view-container-grid');

    if (btnList && btnGrid && tableView && gridView) {
        btnList.addEventListener('click', function () {
            this.classList.add('active');
            btnGrid.classList.remove('active');
            tableView.classList.remove('d-none');
            gridView.classList.add('d-none');
            renderCurrentPage();
        });

        btnGrid.addEventListener('click', function () {
            this.classList.add('active');
            btnList.classList.remove('active');
            tableView.classList.add('d-none');
            gridView.classList.remove('d-none');
            renderCurrentPage();
        });
    }

    // 6. Initial load of data
    filterAndRender();
}

// 7. Reset Filters Function
function resetFilters() {
    if (getEl('flat-floor-filter')) getEl('flat-floor-filter').value = 'all';
    if (getEl('flat-type-filter')) getEl('flat-type-filter').value = 'all';
    if (getEl('flat-status-filter')) getEl('flat-status-filter').value = 'all';
    if (getEl('flat-no-filter')) getEl('flat-no-filter').value = '';
    filterAndRender();
}


// =========================================================================
// *** FLOOR PLAN VIEWER LOGIC ***
// =========================================================================
const floorPlans = {
    "1bhk": ["images/floor-plan-1bhk-1.jpg", "images/floor-plan-1bhk-2.jpg"],
    "2bhk": ["images/floor-plan-2bhk-1.jpg", "images/floor-plan-2bhk-2.jpg", "images/floor-plan-2bhk-3.jpg"],
    "3bhk": ["images/floor-plan-3bhk-1.jpg", "images/floor-plan-3bhk-2.jpg"],
};

function renderFloorPlan(planId, title, containerId, autoScroll = false) {
    const plans = floorPlans[planId] || [];
    const container = getEl(containerId);

    if (!container) return;

    // Update the title
    const titleEl = getEl('floorPlanViewerTitle');
    if (titleEl) titleEl.textContent = title;

    if (plans.length === 0) {
        container.innerHTML = `<div class="alert alert-warning text-center">No floor plans available for ${planId.toUpperCase()} yet.</div>`;
        return;
    }

    let carouselIndicators = '';
    let carouselItems = '';

    plans.forEach((planUrl, index) => {
        const isActive = index === 0 ? 'active' : '';

        // Indicators
        carouselIndicators += `
            <button type="button" data-bs-target="#floorPlanCarousel" data-bs-slide-to="${index}" 
                    class="${isActive}" aria-current="${isActive ? 'true' : 'false'}" 
                    aria-label="Slide ${index + 1}"></button>
        `;

        // Carousel Items
        carouselItems += `
            <div class="carousel-item ${isActive}">
                <img src="${planUrl}" class="d-block w-100" alt="Floor Plan ${index + 1}">
            </div>
        `;
    });

    // Full Carousel HTML Structure
    container.innerHTML = `
        <div id="floorPlanCarousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                ${carouselIndicators}
            </div>
            <div class="carousel-inner">
                ${carouselItems}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#floorPlanCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#floorPlanCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    `;

    if (autoScroll) {
        // Scroll to the viewer
        container.scrollIntoView({ behavior: 'smooth' });
    }
}
// Made renderFloorPlan globally available for HTML inline script to call
window.renderFloorPlan = renderFloorPlan;


// =========================================================================
// *** MODAL AND INITIALIZATION HOOKS ***
// =========================================================================

document.addEventListener('DOMContentLoaded', function () {
    // 1. Initialize Flat Inventory on DOMContentLoaded
    initialSetup();

    // 2. Schedule Visit Modal Logic
    const visitForm = getEl('scheduleVisitForm');
    if (visitForm) {
        visitForm.addEventListener('submit', function (e) {
            e.preventDefault();
            handleScheduleVisitSubmit();
        });
    }
});

// =========================================================================
// *** WHATSAPP SUBMISSION HANDLER ***
// =========================================================================

function handleScheduleVisitSubmit() {
    const name = getValue('visitorName');
    const phone = getValue('visitorPhone');
    const date = getValue('visitDate');
    const time = getValue('visitTime');

    if (!name || !phone) {
        alert('Please enter your Name and Contact Number.');
        return;
    }

    let whatsappMessage = `*New Site Visit Request (${PROJECT_NAME})*\n\n`;
    whatsappMessage += `*Project:* ${PROJECT_NAME}\n`;
    whatsappMessage += `*Visitor Name:* ${name}\n`;
    whatsappMessage += `*Contact No.:* ${phone}\n`;

    if (date || time) {
        whatsappMessage += `\n*Preferred Schedule:*\n`;
        whatsappMessage += `  - Date: ${date ? date : 'Not Specified'}\n`;
        whatsappMessage += `  - Time: ${time ? time : 'Not Specified'}\n`;
    } else {
        whatsappMessage += `\n_The visitor is flexible. Please contact them to schedule._\n`;
    }

    whatsappMessage += `\n*Source:* Website - ${PROJECT_NAME} Project Page`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappLink = `https://wa.me/${SALES_TEAM_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappLink, '_blank');

    // NATIVE BOOTSTRAP 5 MODAL HIDE
    const visitModalEl = getEl('scheduleVisitModal');
    // Ensure Bootstrap's JS object is loaded before trying to access it
    if (typeof bootstrap !== 'undefined' && visitModalEl) {
        const modalInstance = bootstrap.Modal.getInstance(visitModalEl) || new bootstrap.Modal(visitModalEl);
        modalInstance.hide();
    }

    // Native JavaScript Floor Plan Logic (No jQuery as requested for this feature)

    // --- Floor Plan Data Structure (Max 5 images per plan) ---
    const floorPlanData = {
      '1bhk': [
        { src: 'images/floorplans/1bhk_plan_1.jpg', title: '1 BHK Floor Plan - View 1 (Living/Dining)' },
        { src: 'images/floorplans/1bhk_plan_2.jpg', title: '1 BHK Floor Plan - View 2 (Bedroom)' },
        { src: 'images/floorplans/1bhk_plan_3.jpg', title: '1 BHK Floor Plan - View 3 (Kitchen)' },
        { src: 'images/floorplans/1bhk_plan_4.jpg', title: '1 BHK Floor Plan - View 4 (Balcony)' },
        { src: 'images/floorplans/1bhk_plan_5.jpg', title: '1 BHK Floor Plan - View 5 (Detailed Layout)' }
      ],
      '2bhk': [
        { src: 'images/floorplans/2bhk_plan_1.jpg', title: '2 BHK Floor Plan - View 1 (Master Bedroom)' },
        { src: 'images/floorplans/2bhk_plan_2.jpg', title: '2 BHK Floor Plan - View 2 (Living Area)' },
        { src: 'images/floorplans/2bhk_plan_3.jpg', title: '2 BHK Floor Plan - View 3 (Kids Room)' },
        { src: 'images/floorplans/2bhk_plan_4.jpg', title: '2 BHK Floor Plan - View 4 (Detailed Layout)' },
        { src: 'images/floorplans/2bhk_plan_5.jpg', title: '2 BHK Floor Plan - View 5 (Entrance View)' }
      ],
      '3bhk': [
        { src: 'images/floorplans/3bhk_plan_1.jpg', title: '3 BHK Floor Plan - View 1 (Master Bedroom Suite)' },
        { src: 'images/floorplans/3bhk_plan_2.jpg', title: '3 BHK Floor Plan - View 2 (Kitchen & Utility)' },
        { src: 'images/floorplans/3bhk_plan_3.jpg', title: '3 BHK Floor Plan - View 3 (Balcony View)' },
        { src: 'images/floorplans/3bhk_plan_4.jpg', title: '3 BHK Floor Plan - View 4 (Detailed Layout)' },
        { src: 'images/floorplans/3bhk_plan_5.jpg', title: '3 BHK Floor Plan - View 5 (3D Render)' }
      ],
      '4bhk': [
        { src: 'images/floorplans/4bhk_plan_1.jpg', title: '4 BHK Floor Plan - View 1 (Luxury Living)' },
        { src: 'images/floorplans/4bhk_plan_2.jpg', title: '4 BHK Floor Plan - View 2 (Guest Suite)' },
        { src: 'images/floorplans/4bhk_plan_3.jpg', title: '4 BHK Floor Plan - View 3 (Study Room)' },
        { src: 'images/floorplans/4bhk_plan_4.jpg', title: '4 BHK Floor Plan - View 4 (Detailed Layout)' },
        { src: 'images/floorplans/4bhk_plan_5.jpg', title: '4 BHK Floor Plan - View 5 (Terrace/Rooftop)' }
      ],
      'site': [
        { src: 'images/floorplans/site_plan_1.jpg', title: 'Floor and Site Plan - View 1 (Overall Layout)' },
        { src: 'images/floorplans/site_plan_2.jpg', title: 'Floor and Site Plan - View 2 (Tower A & B)' },
        { src: 'images/floorplans/site_plan_3.jpg', title: 'Floor and Site Plan - View 3 (Amenities Location)' },
        { src: 'images/floorplans/site_plan_4.jpg', title: 'Floor and Site Plan - View 4 (Parking Layout)' },
        { src: 'images/floorplans/site_plan_5.jpg', title: 'Floor and Site Plan - View 5 (Detailed Building View)' }
      ]
    };

    // Central function to render the carousel into the container
    function renderFloorPlan(planId, planTitle, containerId, shouldScroll = false) {
      const container = document.getElementById(containerId);
      const images = floorPlanData[planId];
      const carouselId = `planCarousel-${planId}`; // Unique ID for the carousel

      // 1. Check for data and handle empty case
      if (!images || images.length === 0) {
        container.innerHTML = `<h4 class="text-center mb-3 text-danger">${planTitle}</h4><div class="text-center p-5">No plans available for this unit type.</div>`;
        return;
      }

      // 2. Build the Carousel Inner HTML
      let carouselInnerHTML = '';
      images.forEach((img, index) => {
        const isActive = index === 0 ? ' active' : '';
        carouselInnerHTML += `
                    <div class="carousel-item${isActive} text-center">
                        <img class="d-block mx-auto img-fluid" src="${img.src}" alt="${img.title}">
                        <div class="mt-3 mb-2">
                            <p class="mb-0 text-muted">${img.title}</p>
                            <span class="badge bg-primary">Image ${index + 1} of ${images.length}</span>
                        </div>
                    </div>
                `;
      });

      // 3. Construct the full Carousel structure
      const fullCarouselHTML = `
                <h4 class="text-center mb-3">${planTitle}</h4>
                <div id="${carouselId}" class="carousel slide" data-bs-ride="false">
                    <div class="carousel-inner">${carouselInnerHTML}</div>
                    
                    <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </button>
                </div>
            `;

      // 4. Inject Content
      container.innerHTML = fullCarouselHTML;

      // 5. Scroll (if triggered by a button click)
      if (shouldScroll) {
        container.scrollIntoView({ behavior: 'smooth' });
      }
    }

    

    document.addEventListener('DOMContentLoaded', () => {
      const floorPlanViewerContainer = document.getElementById('floorPlanViewerContainer');
      const viewPlanButtons = document.querySelectorAll('.show-plan-btn');

      // === 1. Load Default Plan (Site Plan) on page load ===
      renderFloorPlan('site', 'Floor and Site Plans Gallery (Default View)', 'floorPlanViewerContainer', false);

      // === 2. Set up button event listeners ===
      viewPlanButtons.forEach(button => {
        button.addEventListener('click', function () {
          const planId = this.getAttribute('data-plan-id');
          const planTitle = this.getAttribute('data-plan-title');

          // Render the selected plan and scroll to it
          renderFloorPlan(planId, planTitle, 'floorPlanViewerContainer', true);
        });
      });
    });

    
}

/**
 * EMI Calculator Logic
 * This file contains the primary function to calculate EMI 
 * and the event listeners for auto-calculation and modal display.
 */

// Function to calculate the EMI
function calculateEMI() {
    // 1. Get input values
    const P = parseFloat(document.getElementById('loanAmount').value);       
    const R_annual = parseFloat(document.getElementById('interestRate').value); 
    let N_years = parseFloat(document.getElementById('loanTenure').value);    
    
    // --- START OF NEW VALIDATION CHECK ---
    const MAX_TENURE = 30;
    const loanTenureElement = document.getElementById('loanTenure');

    if (N_years > MAX_TENURE) {
        // Set the value back to 30 for both calculation and display
        N_years = MAX_TENURE;
        loanTenureElement.value = MAX_TENURE;
    }
    // --- END OF NEW VALIDATION CHECK ---

    // 2. Validate input (original check)
    if (isNaN(P) || P <= 0 || isNaN(R_annual) || R_annual < 0 || isNaN(N_years) || N_years <= 0) {
        document.getElementById('emiResult').textContent = '₹0';
        document.getElementById('interestResult').textContent = '₹0';
        document.getElementById('totalPaymentResult').textContent = '₹0';
        return; 
    }

    // 3. Convert annual rate to monthly rate (r) and years to months (n)
    const r = (R_annual / 12) / 100;
    const n = N_years * 12; // This 'n' is now guaranteed to be 360 or less

    // 4. EMI Calculation Formula (rest of the code remains the same)
    let EMI;
    let totalPayment;
    let totalInterest;
    
    if (r === 0) {
        EMI = P / n;
    } else {
        const powerFactor = Math.pow((1 + r), n);
        EMI = P * r * powerFactor / (powerFactor - 1);
    }
    
    // 5. Calculate Total Payment and Total Interest
    totalPayment = EMI * n;
    totalInterest = totalPayment - P;

    // 6. Format and Display Results
    const formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    
    document.getElementById('emiResult').textContent = formatter.format(EMI);
    document.getElementById('interestResult').textContent = formatter.format(totalInterest);
    document.getElementById('totalPaymentResult').textContent = formatter.format(totalPayment);
}


// Event Listener to handle initial calculation and modal opening (fixes the ReferenceError timing issue)
document.addEventListener('DOMContentLoaded', () => {
    // Get a reference to the Bootstrap modal element
    const emiModal = document.getElementById('emiCalculatorModal');
    
    if (emiModal) {
        // CRITICAL FIX: Add an event listener that runs 'calculateEMI()' 
        // only when the modal is fully opened, ensuring the results elements are available.
        emiModal.addEventListener('shown.bs.modal', function () {
            calculateEMI(); 
        });
    }
    
    // Run an initial calculation on page load for default values
    calculateEMI(); 
});