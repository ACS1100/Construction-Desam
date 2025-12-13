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
            link.addEventListener('click', function(e) {
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
// *** EMI CALCULATION UTILITY FUNCTIONS (Made global for HTML script access) ***
// =========================================================================

function calculateEMI(P, R, N) {
    const r = (R / 12) / 100;
    const n = N * 12;

    if (r === 0) return P / n; // Simple interest approximation if rate is 0

    return P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
}

// Function to format numbers with Indian currency style (e.g., ₹ 1,23,456)
function formatIndianCurrency(number) {
    if (number === null || isNaN(number)) return 'N/A';
    
    // Round to nearest integer before formatting
    number = Math.round(number);
    
    const parts = number.toString().split('.');
    let lastThree = parts[0].substring(parts[0].length - 3);
    const otherNumbers = parts[0].substring(0, parts[0].length - 3);
    
    if (otherNumbers !== '') {
        lastThree = ',' + lastThree;
    }
    
    let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

    if (parts.length > 1) {
        res += "." + parts[1];
    }
    return '₹ ' + res;
}

// Function to calculate and display EMI details
function displayEmiDetails() {
    const loanAmount = parseFloat(getValue('loanAmountInput')) || 0;
    const interestRate = parseFloat(getValue('interestRateInput')) || 0;
    const loanTenure = parseFloat(getValue('loanTenureInput')) || 0;
    
    if (loanAmount <= 0 || loanTenure <= 0) {
        setText('emi-result', 'N/A');
        setText('total-interest-payable', 'N/A');
        setText('total-principal-payable', 'N/A');
        setText('total-amount-payable', 'N/A');
        return;
    }
    
    const emi = calculateEMI(loanAmount, interestRate, loanTenure);
    const totalPrincipal = loanAmount;
    const totalAmount = emi * (loanTenure * 12);
    const totalInterest = totalAmount - totalPrincipal;

    setText('emi-result', formatIndianCurrency(emi));
    setText('total-principal-payable', formatIndianCurrency(totalPrincipal));
    setText('total-interest-payable', formatIndianCurrency(totalInterest));
    setText('total-amount-payable', formatIndianCurrency(totalAmount));
}
// Made displayEmiDetails globally available for HTML inline script to call
window.displayEmiDetails = displayEmiDetails;


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

document.addEventListener('DOMContentLoaded', function() {
    // 1. Initialize Flat Inventory on DOMContentLoaded
    initialSetup();

    // 2. Schedule Visit Modal Logic
    const visitForm = getEl('scheduleVisitForm');
    if (visitForm) {
        visitForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleScheduleVisitSubmit();
        });
    }

    // 3. EMI Calculator Modal pre-fill and display logic
    // Add event listener for when the EMI modal is about to be shown (Bootstrap 5)
    const emiModal = getEl('emiModal');
    if (emiModal) {
        emiModal.addEventListener('show.bs.modal', function () {
            const loanAmountInput = getEl('loanAmountInput');
            const tenureInput = getEl('loanTenureInput');
            const rateInput = getEl('interestRateInput');
            
            // Set default values if empty
            if (loanAmountInput && !loanAmountInput.value) loanAmountInput.value = 1500000;
            if (tenureInput && !tenureInput.value) tenureInput.value = 15;
            if (rateInput && !rateInput.value) rateInput.value = 8.50;
            
            // Update display values
            if (tenureInput) setText('tenureValue', tenureInput.value);
            if (rateInput) setText('rateValue', parseFloat(rateInput.value).toFixed(2));
            
            displayEmiDetails();
        });
    }

    // Bind EMI calculation to input changes
    const emiInputs = ['loanAmountInput', 'loanTenureInput', 'interestRateInput'];
    emiInputs.forEach(id => {
        const el = getEl(id);
        if (el) {
            el.addEventListener('input', function() {
                if (this.id === 'loanTenureInput') {
                    setText('tenureValue', this.value);
                } else if (this.id === 'interestRateInput') {
                    setText('rateValue', parseFloat(this.value).toFixed(2));
                }
                displayEmiDetails();
            });
        }
    });
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
}