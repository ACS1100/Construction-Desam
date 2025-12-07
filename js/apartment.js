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
    
    const whatsappNumber = '918807344264';

    if (data.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" class="text-center p-4">No flats found matching your criteria.</td></tr>`;
        return;
    }

    let rowsHtml = '';
    data.forEach(flat => {
        const statusText = flat.status || 'Unknown';
        const isSold = statusText.toLowerCase() === 'sold';
        const badgeClass = isSold ? "badge-danger" : "badge-success";
        const sqftDisplay = flat.sqft ? `${flat.sqft} sq.ft` : 'N/A';

        const message = encodeURIComponent(
            `I am interested in flat No. ${flat.flatNo} in the Fair Land project.\n` + 
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
    
    const whatsappNumber = '918807344264';
    
    if (data.length === 0) {
        gridContainer.innerHTML = `<div class="col-12 text-center p-4">No flats found matching your criteria.</div>`;
        return;
    }

    let cardsHtml = '';
    data.forEach(flat => {
        const statusText = flat.status || 'Unknown';
        const isSold = statusText.toLowerCase() === 'sold';
        const statusBadgeClass = isSold ? 'status-sold' : 'status-active';
        const cardStatusClass = isSold ? 'card-sold-out' : 'card-available';

        const message = encodeURIComponent(
            `I am interested in flat No. ${flat.flatNo} in the Fair Land project.\n` + 
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
                        <p><strong>Floor:</strong> ${flat.floor}</p>
                        <p><strong>Type:</strong> ${flat.type}</p>
                        <p><strong>Area:</strong> ${flat.sqft} sq.ft</p>
                        <p><strong>Facing:</strong> ${flat.facing}</p>
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
    let startPage, endPage;

    if (totalPages <= maxPagesToShow) {
        startPage = 1;
        endPage = totalPages;
    } else {
        startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
        endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

        if (endPage === totalPages) {
            startPage = Math.max(totalPages - maxPagesToShow + 1, 1);
        }
    }

    let paginationHtml = '';

    // Previous button
    if (currentPage > 1) {
        paginationHtml += `
            <li class="page-item">
                <a class="page-link" href="#" data-page="${currentPage - 1}">Previous</a>
            </li>
        `;
    }

    // Page number buttons
    for (let i = startPage; i <= endPage; i++) {
        const activeClass = (i === currentPage) ? 'active' : '';
        paginationHtml += `
            <li class="page-item ${activeClass}">
                <a class="page-link" href="#" data-page="${i}">${i}</a>
            </li>
        `;
    }

    // Next button
    if (currentPage < totalPages) {
        paginationHtml += `
            <li class="page-item">
                <a class="page-link" href="#" data-page="${currentPage + 1}">Next</a>
            </li>
        `;
    }
    
    paginationEl.innerHTML = paginationHtml;

    // Add click handler to pagination links (Replace jQuery .off() and .on())
    paginationEl.addEventListener('click', function (e) {
        const target = e.target.closest('a.page-link');
        if (target) {
            e.preventDefault();
            const newPage = parseInt(target.dataset.page);
            if (newPage && newPage !== currentPage) {
                currentPage = newPage;
                renderCurrentPage();
                renderPagination();
            }
        }
    });
}

// 6. Utility: Populate Filters
function populateFilters() {
    const floors = new Set();
    const types = new Set();
    const floorFilter = getEl('flat-floor-filter');
    const typeFilter = getEl('flat-type-filter');
    const statusFilter = getEl('flat-status-filter');

    // Helper to clear options while keeping the first ('all')
    const clearOptions = (el) => {
        if (!el) return;
        while (el.children.length > 1) {
            el.removeChild(el.lastChild);
        }
    };
    
    clearOptions(floorFilter);
    clearOptions(typeFilter);
    clearOptions(statusFilter);

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
// *** EMI CALCULATION UTILITY FUNCTIONS ***
// =========================================================================

function calculateEMI(P, R, N) {
    const r = (R / 12) / 100;
    const n = N * 12;
    if (r === 0) return P / n; 
    return P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
}

function formatCurrency(amount) {
    return '₹' + new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);
}

function displayEmiDetails() {
    const P = parseFloat(getValue('loanAmountInput'));
    const N = parseInt(getValue('loanTenureInput'));
    const R = parseFloat(getValue('interestRateInput'));
    const emiResultElement = getEl('emiResult');
    const emiSummaryElement = getEl('emiSummary');
    const n = N * 12;

    if (isNaN(P) || P <= 0 || isNaN(N) || N <= 0 || isNaN(R) || R < 0) {
        if (emiResultElement) emiResultElement.textContent = '₹0';
        if (emiSummaryElement) emiSummaryElement.innerHTML = `Please enter valid loan details.`;
        return;
    }

    let calculatedEMI = calculateEMI(P, R, N);
    
    const totalPayments = calculatedEMI * n;
    const totalInterest = totalPayments - P;
    
    // Display Results
    if (emiResultElement) emiResultElement.textContent = formatCurrency(calculatedEMI.toFixed(0));
    if (emiSummaryElement) {
        emiSummaryElement.innerHTML = `
            For ${formatCurrency(P)} @ ${R.toFixed(2)}% over ${N} years.<br>
            Total Interest: ${formatCurrency(totalInterest.toFixed(0))}
        `;
    }
}


// =========================================================================
// *** EVENT HANDLERS & INITIALIZATION ***

document.addEventListener('DOMContentLoaded', function () {
    // 1. Initial Total Count Display
    setText('total-initial-flats', customerFlatData.length);
    
    // 2. Populate Filters
    populateFilters();

    // 3. Bind the filter and search inputs to re-render the inventory
    const filterIds = ['flat-floor-filter', 'flat-type-filter', 'flat-status-filter', 'flat-no-filter'];
    filterIds.forEach(id => {
        const el = getEl(id);
        if (el) {
            // Using 'input' for search box, 'change' for dropdowns
            el.addEventListener('change', filterAndRender);
            el.addEventListener('input', filterAndRender);
        }
    });
    
    // 4. Bind the reset button
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

    // 6. Initial load of the data
    filterAndRender();

    // --------------------------------------------------
    // *** EMI CALCULATOR BINDINGS (VANILLA JS) ***
    // --------------------------------------------------

    // Modal show event (Note: requires specific handling if using Bootstrap 5 without jQuery)
    // Assuming Bootstrap's native event mechanism is used, or a simple polyfill.
    const emiModal = getEl('emiModal');
    if (emiModal) {
        emiModal.addEventListener('show.bs.modal', function () {
            const loanAmountInput = getEl('loanAmountInput');
            const tenureInput = getEl('loanTenureInput');
            const rateInput = getEl('interestRateInput');
            
            if (loanAmountInput && !loanAmountInput.value) loanAmountInput.value = 1500000;
            if (tenureInput && !tenureInput.value) tenureInput.value = 15;
            if (rateInput && !rateInput.value) rateInput.value = 8.50;
            
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
            el.addEventListener('change', displayEmiDetails);
        }
    });

});