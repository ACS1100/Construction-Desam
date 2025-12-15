// =========================================================================
// *** APARTMENT Plot INVENTORY DATA ***
const customerPlotData = [
    // CLIENT DATA HERE
    {
        "plotNo": 1,
        "facing": "North",
        "sqft": "3500",
        "price": 4500000,
        "status": "Active"
    },
    {
        "plotNo": 2,
        "facing": "South",
        "sqft": "4500",
        "price": 4500000,

        "status": "Active"
    },
    {
        "plotNo": 3,
        "facing": "East",
        "sqft": "2500",
        "price": 4500000,

        "status": "Active"
    },
    {
        "plotNo": 4,
        "facing": "West",
        "sqft": "5000",
        "price": 7500000,

        "status": "Sold"
    },
    {
        "plotNo": 5,
        "facing": "North",
        "sqft": "1500",
        "price": 7500000,

        "status": "Active"
    },
    {
        "plotNo": 6,
        "facing": "East",
        "sqft": "4500",
        "price": 7500000,

        "status": "Active"
    },
    {
        "plotNo": 7,
        "facing": "West",
        "sqft": "5000",
        "price": 7500000,

        "status": "Active"
    },
    {
        "plotNo": 8,
        "facing": "South",
        "sqft": "3500",
        "price": 7500000,

        "status": "Active"
    },
    {
        "plotNo": 9,
        "facing": "North",
        "sqft": "1500",
        "price": 7500000,

        "status": "Active"
    },
    {
        "plotNo": 10,
        "facing": "East",
        "sqft": "2500",
        "price": 7500000,

        "status": "Active"
    },
    {
        "plotNo": 11,
        "facing": "West",
        "sqft": "3500",
        "price": 7500000,

        "status": "Active"
    },
    {
        "plotNo": 12,
        "facing": "South",
        "sqft": "4500",
        "price": 7500000,

        "status": "Active"
    },
    {
        "plotNo": 13,
        "facing": "North",
        "sqft": "5000",
        "price": 7500000,

        "status": "Active"
    },
    {
        "plotNo": 14,
        "facing": "East",
        "sqft": "1500",
        "price": 7500000,

        "status": "Active"
    },
    {
        "plotNo": 15,
        "facing": "West",
        "sqft": "2500",
        "price": 7500000,

        "status": "Sold"
    },
    {
        "plotNo": 16,
        "facing": "South",
        "sqft": "3500",
        "price": 7500000,

        "status": "Active"
    },
    {
        "plotNo": 17,
        "facing": "North",
        "sqft": "4500",
        "price": 7500000,

        "status": "Active"
    },
    {
        "plotNo": 18,
        "facing": "East",
        "sqft": "5000",
        "price": 7500000,

        "status": "Active"
    },
    {
        "plotNo": 19,
        "facing": "West",
        "sqft": "1500",
        "price": 8500000,

        "status": "Active"
    },
    {
        "plotNo": 20,
        "facing": "South",
        "sqft": "2500",
        "price": 9500000,

        "status": "Sold"
    },
];

// =========================================================================
// *** NEW: Plot IMAGE DATA (5 images per facing for viewer) ***
// NOTE: Ensure these image paths exist, or update them.
const plotImages = {
    "North": [
        { src: 'images/plot/1bhk_view_1.jpg', alt: '1 BHK Living Room' },
        { src: 'images/plot/1bhk_view_2.jpg', alt: '1 BHK Kitchen' },
        { src: 'images/plot/1bhk_view_3.jpg', alt: '1 BHK Bedroom' },
        { src: 'images/plot/1bhk_view_4.jpg', alt: '1 BHK Balcony View' },
        { src: 'images/plot/1bhk_view_5.jpg', alt: '1 BHK Bathroom' },
    ],
    "South": [
        { src: 'images/plot/2bhk_view_1.jpg', alt: '2 BHK Spacious Living Area' },
        { src: 'images/plot/2bhk_view_2.jpg', alt: '2 BHK Master Bedroom' },
        { src: 'images/plot/2bhk_view_3.jpg', alt: '2 BHK Guest Room' },
        { src: 'images/plot/2bhk_view_4.jpg', alt: '2 BHK Modular Kitchen' },
        { src: 'images/plot/2bhk_view_5.jpg', alt: '2 BHK Entrance & Foyer' },
    ],
    "West": [
        { src: 'images/plot/3bhk_view_1.jpg', alt: '3 BHK Premium Hall' },
        { src: 'images/plot/3bhk_view_2.jpg', alt: '3 BHK Dining Area' },
        { src: 'images/plot/3bhk_view_3.jpg', alt: '3 BHK Kids Room' },
        { src: 'images/plot/3bhk_view_4.jpg', alt: '3 BHK Utility Area' },
        { src: 'images/plot/3bhk_view_5.jpg', alt: '3 BHK View from Balcony' },
    ],
    "East": [
        { src: 'images/plot/3bhk_view_1.jpg', alt: '3 BHK Premium Hall' },
        { src: 'images/plot/3bhk_view_2.jpg', alt: '3 BHK Dining Area' },
        { src: 'images/plot/3bhk_view_3.jpg', alt: '3 BHK Kids Room' },
        { src: 'images/plot/3bhk_view_4.jpg', alt: '3 BHK Utility Area' },
        { src: 'images/plot/3bhk_view_5.jpg', alt: '3 BHK View from Balcony' },
    ],
};
// =========================================================================
// *** CONFIGURATION & STATE ***
const itemsPerPage = 5; // FIX: Changed from 12 to 5 so pagination appears with the current 8-plot dataset
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
    const facingFilter = getValue('plot-facing-filter');
    const priceFilter = getValue('plot-price-filter');
    const statusFilter = getValue('plot-status-filter');
    const searchInput = getValue('plot-no-filter').toLowerCase().trim();

    // Determine view mode (Replace jQuery .hasClass())
    const btnGridView = getEl('btn-view-grid');
    const isGridView = btnGridView && btnGridView.classList.contains('active');
    const viewMode = isGridView ? 'grid' : 'table';

    filteredData = customerPlotData.filter(plot => {
        const facingMatch = facingFilter === 'all' || plot.facing === facingFilter;
        const priceMatch = priceFilter === 'all' || plot.price === parseFloat(priceFilter);
        const statusMatch = statusFilter === 'all' || plot.status === statusFilter;

        const searchMatch = searchInput === '' ||
            plot.plotNo.toString().toLowerCase().includes(searchInput) ||
            plot.facing.toLowerCase().includes(searchInput) ||
            // FIX: Convert plot.price (number) to string before comparison
            plot.price.toString().toLowerCase().includes(searchInput) ||
            plot.status.toLowerCase().includes(searchInput);

        return facingMatch && priceMatch && statusMatch && searchMatch;
    });

    // Reset pagination and render (Replace jQuery .text())
    currentPage = 1;
    totalPages = Math.ceil(filteredData.length / itemsPerPage);
    setText('total-filtered-plots', filteredData.length);

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

    // Update plot count display
    const currentCount = pageData.length > 0 ? `${startIndex + 1}-${Math.min(endIndex, filteredData.length)}` : '0';
    setText('plot-count', currentCount);
}

// 3. Render Table View (List) - UPDATED FOR ICON-ONLY BUTTONS
function renderTable(data) {
    // Replace jQuery selection and .empty()
    const tableBody = document.querySelector('#plot-inventory-table tbody');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    const whatsappNumber = SALES_TEAM_NUMBER;

    if (data.length === 0) {
        // Updated colspan to 7 for the new 'Action' column
        tableBody.innerHTML = `<tr><td colspan="7" class="text-center p-4">No plots found matching your criteria.</td></tr>`;
        return;
    }

    let rowsHtml = '';
    data.forEach(plot => {
        const statusText = plot.status || 'Unknown';
        const isSold = statusText.toLowerCase() === 'sold';
        const sqftDisplay = plot.sqft ? `${plot.sqft} sq.ft` : 'N/A';

        // Set Bootstrap 5 badge class based on status
        let badgeClass;
        if (isSold) {
            badgeClass = "bg-danger"; // Sold: Red/Danger
        } else if (statusText.toLowerCase() === 'active') {
            badgeClass = "bg-success"; // Active: Green/Success
        } else {
            badgeClass = "bg-warning text-dark"; // Hold: Yellow/Warning
        }

        // WhatsApp Message content
        const message = encodeURIComponent(
            `I am interested in plot No. ${plot.plotNo} in the ${PROJECT_NAME} project.\n` +
            `Details:\n` +
            `Facing: ${plot.facing}\n` +
            `Area: ${plot.sqft} sq.ft\n` +
            `Price: ${plot.price}\n` +
            `Status: ${statusText}\n` +
            `Please share the price and next steps.`
        );
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

        let viewBtnHtml;
        let whatsappBtnHtml;

        if (isSold) {
            // Disabled state for Sold plots (ICON-ONLY)
            viewBtnHtml = `
                <button class="btn btn-secondary btn-sm disabled" disabled title="Plot is Sold: View Disabled" data-bs-toggle="tooltip" data-bs-placement="top">
                    <i class="fa-solid fa-eye-slash"></i>
                </button>`;

            whatsappBtnHtml = `
                <button class="btn btn-secondary btn-sm disabled" disabled title="Plot is Sold: Contact Disabled" data-bs-toggle="tooltip" data-bs-placement="top">
                    <i class="fa-brands fa-whatsapp fa-xl"></i>
                </button>`;
        } else {
            // Active state (ICON-ONLY)
            viewBtnHtml = `
                <button class="btn btn-info btn-sm view-plot-btn" 
                        data-bs-toggle="modal" 
                        data-bs-target="#plotImageViewerModal"
                        data-bs-placement="top"
                        title="View Plot Images"
                        data-plot-facing="${plot.facing}">
                    <i class="fa-solid fa-camera"></i>
                </button>`;

            // Using btn-success for WhatsApp, icon-only, for a modern look
            whatsappBtnHtml = `<a href="${whatsappUrl}" target="_blank" class="btn btn-success btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Contact on WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>`;
        }

        // Price display style
        const priceClass = isSold ? 'text-decoration-line-through text-danger' : 'fw-bold text-success';

        rowsHtml += `
            <tr>
                <td>${plot.plotNo}</td> 
                <td>${plot.facing}</td>
                <td>${sqftDisplay}</td>
                <td><span class="${priceClass}">${plot.price}</span></td>
                <td><span class="badge ${badgeClass} text-uppercase">${statusText}</span></td>
                <td class="text-center gap-2">${viewBtnHtml} ${whatsappBtnHtml}</td>
            </tr>
        `;
    });
    tableBody.innerHTML = rowsHtml;
}

// 4. Render Grid View - UPDATED FOR ICON-ONLY BUTTONS
function renderGrid(data) {
    // Replace jQuery selection and .empty()
    const gridContainer = getEl('view-container-grid');
    if (!gridContainer) return;
    gridContainer.innerHTML = '';

    const whatsappNumber = SALES_TEAM_NUMBER;

    if (data.length === 0) {
        gridContainer.innerHTML = `<div class="col-12"><div class="alert alert-info text-center">No plots found matching your criteria.</div></div>`;
        return;
    }

    let cardsHtml = '';
    data.forEach(plot => {
        const statusText = plot.status || 'Unknown';
        const isSold = statusText.toLowerCase() === 'sold';
        const sqftDisplay = plot.sqft ? `${plot.sqft} sq.ft` : 'N/A';

        // Set Bootstrap 5 badge class based on status
        let statusBadgeClass;
        let cardStatusClass;
        if (isSold) {
            statusBadgeClass = "bg-danger"; // Sold: Red/Danger
            cardStatusClass = "plot-card-sold";
        } else if (statusText.toLowerCase() === 'active') {
            statusBadgeClass = "bg-success"; // Active: Green/Success
            cardStatusClass = "plot-card-active";
        } else {
            statusBadgeClass = "bg-warning text-dark"; // Hold: Yellow/Warning
            cardStatusClass = "";
        }

        const message = encodeURIComponent(
            `I am interested in plot No. ${plot.plotNo} in the ${PROJECT_NAME} project.\n` +
            `Details:\n` +
            `Facing: ${plot.facing}\n` +
            `Area: ${plot.sqft} sq.ft\n` +
            `Price: ${plot.price}\n` +
            `Status: ${statusText}\n` +
            `Please share the price and next steps.`
        );
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

        let viewBtnHtml;
        let whatsappBtnHtml;

        if (isSold) {
            // Disabled state for Sold plots (ICON-ONLY)
            viewBtnHtml = `
                <button class="btn btn-secondary btn-sm disabled" disabled title="Plot is Sold: View Disabled" data-bs-toggle="tooltip" data-bs-placement="top">
                    <i class="fa-solid fa-eye-slash"></i>
                </button>`;

            whatsappBtnHtml = `
                <button class="btn btn-secondary btn-sm disabled" disabled title="Plot is Sold: Contact Disabled" data-bs-toggle="tooltip" data-bs-placement="top">
                    <i class="fa-brands fa-whatsapp"></i>
                </button>`;
        } else {
            // Active state (ICON-ONLY)
            viewBtnHtml = `
                <button class="btn btn-info btn-sm view-plot-btn" 
                        data-bs-toggle="modal" 
                        data-bs-target="#plotImageViewerModal"
                        data-bs-placement="top"
                        title="View Plot Images"
                        data-plot-facing="${plot.facing}">
                    <i class="fa-solid fa-camera"></i>
                </button>`;

            // Using btn-success for WhatsApp, icon-only.
            whatsappBtnHtml = `<a href="${whatsappUrl}" target="_blank" class="btn btn-success btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Contact on WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>`;
        }

        // Price display style
        const priceClass = isSold ? 'text-decoration-line-through text-danger' : 'fw-bold text-success';

        // Responsive Grid Card Structure (col-12/col-sm-6/col-lg-4 makes it responsive)
        cardsHtml += `
            <div class="col-12 col-sm-6 col-lg-4 mb-4 ftco-animate fadeInUp ftco-animated">
                <div class="plot-card ${cardStatusClass}">
                    <div class="plot-card-header">
                        <h5>Plot ${plot.plotNo}</h5>
                        <span class="badge ${statusBadgeClass} text-uppercase">${statusText}</span>
                    </div>
                    <div class="plot-card-body">
                        <div class="plot-detail-row">
                            <span class="plot-label"><i class="fa-solid fa-key"></i> Facing:</span>
                            <span class="plot-value">${plot.facing}</span>
                        </div>
                        <div class="plot-detail-row">
                            <span class="plot-label"><i class="fa-solid fa-ruler-combined"></i> Area:</span>
                            <span class="plot-value">${sqftDisplay}</span>
                        </div>
                        <div class="plot-detail-row">
                            <span class="plot-label"><i class="fa-solid fa-indian-rupee-sign"></i> Price:</span>
                            <span class="plot-value ${priceClass}">${plot.price}</span>
                        </div>
                    </div>
                    <div class="plot-card-footer p-3 border-top d-flex justify-content-center gap-2">
                        ${viewBtnHtml}
                        ${whatsappBtnHtml}
                    </div>
                </div>
            </div>
        `;
    });
    gridContainer.innerHTML = cardsHtml;
}

// 5. Pagination Logic
function renderPagination() {
    const paginationEl = getEl('plot-pagination');
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
                    const inventory = getEl('plot-inventory-section');
                    if (inventory) inventory.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    });
}

// 6. Initial Setup: Populate filters and render initial inventory
function initialSetup() {
    const facingFilter = getEl('plot-facing-filter');
    const priceFilter = getEl('plot-price-filter');
    const statusFilter = getEl('plot-status-filter');

    const facings = new Set();
    const prices = new Set();

    // Re-populate Status filter options explicitly
    if (statusFilter) {
        statusFilter.insertAdjacentHTML('beforeend', '<option value="Active">Active</option>');
        statusFilter.insertAdjacentHTML('beforeend', '<option value="Hold">Hold</option>');
        statusFilter.insertAdjacentHTML('beforeend', '<option value="Sold">Sold</option>');
    }

    customerPlotData.forEach(plot => {
        facings.add(plot.facing);
        prices.add(plot.price);
    });

    // Populate Facing Filter
    if (facingFilter) {
        Array.from(facings).sort().forEach(facing => {
            facingFilter.insertAdjacentHTML('beforeend', `<option value="${facing}">${facing}</option>`);
        });
    }

    if (priceFilter) {
        Array.from(prices).sort((a, b) => parseFloat(a) - parseFloat(b)).forEach(price => {
            priceFilter.insertAdjacentHTML('beforeend', `<option value="${price}">${price}</option>`);
        });
    }

    // *** FIX: SET INITIAL TOTAL Plot COUNT HERE ***
    setText('total-initial-plots', customerPlotData.length);
    // **********************************************


    // Bind filter change events
    const filterInputs = ['plot-facing-filter', 'plot-price-filter', 'plot-status-filter', 'plot-no-filter'];
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
    if (getEl('plot-facing-filter')) getEl('plot-facing-filter').value = 'all';
    if (getEl('plot-status-filter')) getEl('plot-status-filter').value = 'all';
    if (getEl('plot-price-filter')) getEl('plot-price-filter').value = 'all';

    if (getEl('plot-no-filter')) getEl('plot-no-filter').value = '';
    filterAndRender();
}


// =========================================================================
// *** NEW: PLOT IMAGE VIEWER MODAL LOGIC (FOR THE 5 IMAGES) ***
// =========================================================================

/**
 * Renders a carousel of 5 plot images into the modal container based on the plot facing.
 * Assumes the HTML structure for a Bootstrap modal and carousel is in place:
 * <div id="plotImageViewerModal">
 * <h5 id="plot-image-viewer-title"></h5> <--- FIX: Corrected ID
 * <div id="plotImageCarousel" class="carousel slide" data-bs-ride="false">
 * <div class="carousel-indicators" id="plotImageCarouselIndicators"></div>
 * <div class="carousel-inner" id="plot-image-carousel-inner"></div> <--- FIX: Corrected ID
 * * </div>
 * </div>
 *
 * @param {string} plotFacing - The facing of plot (e.g., "2 BHK").
 */
function renderplotImagesViewer(plotFacing) {
    const images = plotImages[plotFacing];
    const modalTitleEl = document.getElementById('plot-image-viewer-title'); // FIX: Use correct ID
    const carouselInnerEl = document.getElementById('plot-image-carousel-inner'); // FIX: Use correct ID
    const carouselIndicatorsEl = document.getElementById('plotImageCarouselIndicators');

    // Handle missing or zero images
    if (!images || images.length === 0) {
        if (modalTitleEl) modalTitleEl.textContent = `${plotFacing} Plot Images`;
        if (carouselInnerEl) carouselInnerEl.innerHTML = `<div class="p-5 text-center">No images available for ${plotFacing}.</div>`;
        if (carouselIndicatorsEl) carouselIndicatorsEl.innerHTML = '';
        return;
    }

    // Set Title
    if (modalTitleEl) modalTitleEl.textContent = `${plotFacing} Plot Images (${images.length} Views)`;
    if (carouselInnerEl) carouselInnerEl.innerHTML = '';
    if (carouselIndicatorsEl) carouselIndicatorsEl.innerHTML = '';

    let itemsHtml = '';
    let indicatorsHtml = '';

    images.forEach((img, index) => {
        const isActive = index === 0 ? 'active' : '';

        // Carousel Item (Ensuring images are responsive and contained within the modal view)
        itemsHtml += `
            <div class="carousel-item ${isActive} text-center">
                <img src="${img.src}" class="d-block w-100 mx-auto" alt="${img.alt}" style="max-height: 75vh; object-fit: contain;">
                <div class="mt-2 mb-2">
                    <p class="mb-0 text-muted">${img.alt}</p>
                    <span class="badge bg-primary">Image ${index + 1} of ${images.length}</span>
                </div>
            </div>
        `;

        // Carousel Indicator
        indicatorsHtml += `
            <button type="button" data-bs-target="#plotImageCarousel" data-bs-slide-to="${index}" 
                    class="${isActive}" aria-current="${isActive ? 'true' : 'false'}" 
                    aria-label="Slide ${index + 1}"></button>
        `;
    });

    if (carouselInnerEl) carouselInnerEl.innerHTML = itemsHtml;
    if (carouselIndicatorsEl) carouselIndicatorsEl.innerHTML = indicatorsHtml;
}

// =========================================================================
// *** Plot PLAN VIEWER LOGIC ***
// (Original logic from file)
// =========================================================================
const plotPlans = {
    "1bhk": ["images/plot-plan-1bhk-1.jpg", "images/plot-plan-1bhk-2.jpg"],
    "2bhk": ["images/plot-plan-2bhk-1.jpg", "images/plot-plan-2bhk-2.jpg", "images/plot-plan-2bhk-3.jpg"],
    "3bhk": ["images/plot-plan-3bhk-1.jpg", "images/plot-plan-3bhk-2.jpg"],
};

function renderPlotPlan(planId, title, containerId, autoScroll = false) {
    const plans = plotPlans[planId] || [];
    const container = getEl(containerId);

    if (!container) return;

    // Update the title
    const titleEl = getEl('plotPlanViewerTitle');
    if (titleEl) titleEl.textContent = title;

    if (plans.length === 0) {
        container.innerHTML = `<div class="alert alert-warning text-center">No plot plans available for ${planId.toUpperCase()} yet.</div>`;
        return;
    }

    let carouselIndicators = '';
    let carouselItems = '';

    plans.forEach((planUrl, index) => {
        const isActive = index === 0 ? 'active' : '';

        // Indicators
        carouselIndicators += `
            <button type="button" data-bs-target="#plotPlanCarousel" data-bs-slide-to="${index}" 
                    class="${isActive}" aria-current="${isActive ? 'true' : 'false'}" 
                    aria-label="Slide ${index + 1}"></button>
        `;

        // Carousel Items
        carouselItems += `
            <div class="carousel-item ${isActive}">
                <img src="${planUrl}" class="d-block w-100" alt="plot Plan ${index + 1}">
            </div>
        `;
    });

    // Full Carousel HTML Structure
    container.innerHTML = `
        <div id="plotPlanCarousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                ${carouselIndicators}
            </div>
            <div class="carousel-inner">
                ${carouselItems}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#plotPlanCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#plotPlanCarousel" data-bs-slide="next">
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
// Made renderPlotPlan globally available for HTML inline script to call
window.renderPlotPlan = renderPlotPlan;


// =========================================================================
// *** MODAL AND INITIALIZATION HOOKS ***
// =========================================================================

document.addEventListener('DOMContentLoaded', function () {
    // 1. Initialize Plot Inventory on DOMContentLoaded
    initialSetup();

    // 2. Schedule Visit Modal Logic (unchanged)
    const visitForm = getEl('scheduleVisitForm');
    if (visitForm) {
        visitForm.addEventListener('submit', function (e) {
            e.preventDefault();
            handleScheduleVisitSubmit();
        });
    }

    // 3. NEW: Plot Image Viewer Logic (Modal population when button is clicked)
    const plotImageViewerModal = getEl('plotImageViewerModal');
    if (plotImageViewerModal) {
        plotImageViewerModal.addEventListener('show.bs.modal', function (event) {
            // Button that triggered the modal
            const button = event.relatedTarget;
            // Extract info from data-plot-facing attribute
            const plotFacing = button.getAttribute('data-plot-facing');
            // Call the render function
            renderplotImagesViewer(plotFacing);
        });
    }
});

// =========================================================================
// *** WHATSAPP SUBMISSION HANDLER ***
// (Original logic from file)
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

// Native JavaScript Plot Plan Logic (No jQuery as requested for this feature)
// (Original logic from file, updated for consistency)

// --- Plot Plan Data Structure (Max 5 images per plan) ---
const plotPlanData = {
    'site': [
        { src: 'images/image_1.jpg', title: 'Plot and Site Plans Gallery - View 1 (Overall Layout)' },
        { src: 'images/image_2.jpg', title: 'Plot and Site Plans Gallery - View 2 (Tower A & B)' },
        { src: 'images/image_3.jpg', title: 'Plot and Site Plans Gallery - View 3 (Amenities Location)' },
        { src: 'images/image_4.jpg', title: 'Plot and Site Plans Gallery - View 4 (Parking Layout)' },
        { src: 'images/image_5.jpg', title: 'Plot and Site Plans Gallery - View 5 (Detailed Building View)' }
    ]
};

// Central function to render the carousel into the container
function renderPlotPlan(planId, planTitle, containerId, shouldScroll = false) {
    const container = document.getElementById(containerId);
    const images = plotPlanData[planId];
    const carouselId = `planCarousel-${planId}`; // Unique ID for the carousel

    // 1. Check for data and handle empty case
    if (!images || images.length === 0) {
        container.innerHTML = `<h4 class="text-center mb-3 text-danger">${planTitle}</h4><div class="text-center p-5">No plans available for this unit type.</div>`;
        return;
    }

    // 2. Build the Carousel Inner HTML
    let carouselInnerHTML = '';
    let indicatorsHTML = '';
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
        indicatorsHTML += `
            <button type="button" data-bs-target="#${carouselId}" data-bs-slide-to="${index}" 
                    class="${isActive}" aria-current="${isActive ? 'true' : 'false'}" 
                    aria-label="Slide ${index + 1}"></button>
        `;
    });

    // 3. Construct the full Carousel structure
    const fullCarouselHTML = `
                <h4 class="text-center mb-3">${planTitle}</h4>
                <div id="${carouselId}" class="carousel slide" data-bs-ride="false">
                    <div class="carousel-indicators">${indicatorsHTML}</div>
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
    const plotPlanViewerContainer = document.getElementById('plotPlanViewerContainer');
    const viewPlanButtons = document.querySelectorAll('.show-plan-btn');

    // === 1. Load Default Plan (Site Plan) on page load ===
    if (plotPlanViewerContainer) {
        renderPlotPlan('site', 'Plot and Site Plans Gallery (Default View)', 'plotPlanViewerContainer', false);
    }

    // === 2. Set up button event listeners ===
    viewPlanButtons.forEach(button => {
        button.addEventListener('click', function () {
            const planId = this.getAttribute('data-plan-id');
            const planTitle = this.getAttribute('data-plan-title');

            // Render the selected plan and scroll to it
            renderPlotPlan(planId, planTitle, 'plotPlanViewerContainer', true);
        });
    });
});

// --- EMI CALCULATOR LOGIC (Kept as is - pure JS functions) ---
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
    const P = parseFloat(document.getElementById('loanAmountInput').value);
    const N = parseInt(document.getElementById('loanTenureInput').value);
    const R = parseFloat(document.getElementById('interestRateInput').value);
    const emiResultElement = document.getElementById('emiResult');
    const emiSummaryElement = document.getElementById('emiSummary');

    if (isNaN(P) || P <= 0 || isNaN(N) || N <= 0 || isNaN(R) || R <= 0) {
        emiResultElement.textContent = '₹0';
        return;
    }

    let calculatedEMI = (R === 0) ? P / (N * 12) : calculateEMI(P, R, N);
    const totalPayments = calculatedEMI * (N * 12);
    const totalInterest = totalPayments - P;

    emiResultElement.textContent = formatCurrency(calculatedEMI.toFixed(0));
    emiSummaryElement.innerHTML = `For ${formatCurrency(P)} @ ${R.toFixed(2)}% over ${N} years.<br>Total Interest: ${formatCurrency(totalInterest.toFixed(0))}`;
}

/*
 * Schedule Site Visit via WhatsApp Script
 * File: js/schedule-visit.js
 * * NOTE: All remaining jQuery/conflicting code for EMI and Schedule Visit 
 * has been moved to main.js for proper execution within the jQuery environment.
 */