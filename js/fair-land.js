// =========================================================================
// *** HARDCODED PLOT INVENTORY DATA ***
// This is the data used to populate the table and the dropdown filters.

const customerPlotData = [
    // CLIENT DATA HERE
    {
        "plotNo": 1,
        "facing": "North",
        "sqft": "3500",
        "status": "Active"
    },
    {
        "plotNo": 2,
        "facing": "South",
        "sqft": "4500",
        "status": "Active"
    },
    {
        "plotNo": 3,
        "facing": "East",
        "sqft": "2500",
        "status": "Active"
    },
    {
        "plotNo": 4,
        "facing": "West",
        "sqft": "5000",
        "status": "Sold"
    },
    {
        "plotNo": 5,
        "facing": "North",
        "sqft": "1500",
        "status": "Active"
    },
    {
        "plotNo": 6,
        "facing": "East",
        "sqft": "4500",
        "status": "Active"
    },
    {
        "plotNo": 7,
        "facing": "West",
        "sqft": "5000",
        "status": "Active"
    },
    {
        "plotNo": 8,
        "facing": "South",
        "sqft": "3500",
        "status": "Active"
    },
    {
        "plotNo": 9,
        "facing": "North",
        "sqft": "1500",
        "status": "Active"
    },
    {
        "plotNo": 10,
        "facing": "East",
        "sqft": "2500",
        "status": "Active"
    },
    {
        "plotNo": 11,
        "facing": "West",
        "sqft": "3500",
        "status": "Active"
    },
    {
        "plotNo": 12,
        "facing": "South",
        "sqft": "4500",
        "status": "Active"
    },
    {
        "plotNo": 13,
        "facing": "North",
        "sqft": "5000",
        "status": "Active"
    },
    {
        "plotNo": 14,
        "facing": "East",
        "sqft": "1500",
        "status": "Active"
    },
    {
        "plotNo": 15,
        "facing": "West",
        "sqft": "2500",
        "status": "Sold"
    },
    {
        "plotNo": 16,
        "facing": "South",
        "sqft": "3500",
        "status": "Active"
    },
    {
        "plotNo": 17,
        "facing": "North",
        "sqft": "4500",
        "status": "Active"
    },
    {
        "plotNo": 18,
        "facing": "East",
        "sqft": "5000",
        "status": "Active"
    },
    {
        "plotNo": 19,
        "facing": "West",
        "sqft": "1500",
        "status": "Active"
    },
    {
        "plotNo": 20,
        "facing": "South",
        "sqft": "2500",
        "status": "Sold"
    },
];

// --- CONFIGURATION ---
const plotsPerPage = 24; // Lowered slightly so grid view doesn't scroll forever
let plotData = customerPlotData;
let filteredData = [];
let currentPage = 1;
let currentView = 'list'; // 'list' or 'grid'

// --- UTILITY FUNCTIONS ---
function getUniqueValues(data, key) {
    if (!data || data.length === 0) return [];
    const unique = [...new Set(data.map(item => item[key]).filter(value => value))];
    return unique.sort();
}

function populateFilters(data) {
    const uniqueFacings = getUniqueValues(data, 'facing');
    const $facingFilter = $('#plot-facing-filter');
    $facingFilter.find('option:not(:first)').remove();
    uniqueFacings.forEach(facing => {
        $facingFilter.append(`<option value="${facing}">${facing}</option>`);
    });

    const uniqueStatuses = getUniqueValues(data, 'status');
    const $statusFilter = $('#plot-status-filter');
    $statusFilter.find('option:not(:first)').remove();
    uniqueStatuses.forEach(status => {
        $statusFilter.append(`<option value="${status}">${status}</option>`);
    });
}

// --- RENDERING FUNCTIONS ---

// Master render function that decides which view to show
function renderData() {
    const startIndex = (currentPage - 1) * plotsPerPage;
    const endIndex = startIndex + plotsPerPage;
    const pageData = filteredData.slice(startIndex, endIndex);

    // Update Counts
    const totalFiltered = filteredData.length;
    const plotsShown = pageData.length;
    const startPlot = totalFiltered > 0 ? startIndex + 1 : 0;
    const endPlot = totalFiltered > 0 ? startIndex + plotsShown : 0;
    $('#plot-count').text(startPlot + " - " + endPlot);
    $('#total-filtered-plots').text(totalFiltered);

    // Render appropriate view
    if (currentView === 'list') {
        $('#view-container-table').removeClass('d-none');
        $('#view-container-grid').addClass('d-none');
        renderTable(pageData);
    } else {
        $('#view-container-table').addClass('d-none');
        $('#view-container-grid').removeClass('d-none');
        renderGrid(pageData);
    }

    renderPagination();
}

// 1. Render Table View
function renderTable(data) {
    const $tableBody = $('#plot-inventory-table tbody');
    $tableBody.empty();

    // *** CONFIGURATION: REPLACE THIS NUMBER ***
    const whatsappNumber = '918807344264'; // Your 10-digit number including country code (e.g., 91xxxxxxxxxx)
    // *****************************************

    if (data.length === 0) {
        // Note: Colspan is updated to 5 for the new column
        $tableBody.append(`<tr><td colspan="5" class="text-center p-4">No plots found matching your criteria.</td></tr>`);
        return;
    }

    data.forEach(plot => {
        const sqftDisplay = plot.sqft ? `${plot.sqft} sqft` : '-';
        const statusText = plot.status ? plot.status : 'Unknown';
        const isSold = statusText.toLowerCase() === 'sold';
        // Using existing Bootstrap classes for status badges in the table
        const badgeClass = isSold ? "badge-danger" : "badge-success";

        // 1. Construct the pre-filled WhatsApp message
        const message = encodeURIComponent(
            `I am interested in Plot No. ${plot.plotNo} in the Fair Land project.\n` +
            `Details:\n` +
            `Area: ${plot.sqft} sq.ft\n` +
            `Facing: ${plot.facing}\n` +
            `Status: ${statusText}\n` +
            `Please share the price and next steps.`
        );
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

        // 2. WhatsApp icon HTML (Green for Active, Grey for Sold)
        const whatsappIcon = isSold
            // Disabled/Sold icon (greyed out)
            ? `<span class="text-secondary" title="Sold Out"><i class="fa-brands fa-whatsapp fa-xl"></i></span>`
            // Active plot icon (green and clickable)
            : `<a href="${whatsappUrl}" target="_blank" class="text-success" title="WhatsApp Inquiry"><i class="fa-brands fa-whatsapp fa-xl"></i></a>`;


        const row = `
            <tr>
                <td>${plot.plotNo || '-'}</td>
                <td>${plot.facing || '-'}</td>
                <td>${sqftDisplay}</td>
                <td><span class="badge ${badgeClass} p-2">${statusText}</span></td>
                <td class="text-center">${whatsappIcon}</td>
            </tr>
        `;
        $tableBody.append(row);
    });
}


// 2. Render Grid (Card) View
function renderGrid(data) {
    const $gridContainer = $('#view-container-grid');
    $gridContainer.empty();

    if (data.length === 0) {
        $gridContainer.append(`<div class="col-12 text-center p-5"><h4>No plots found matching your criteria.</h4></div>`);
        return;
    }

    // *** CONFIGURATION: REPLACE THIS NUMBER ***
    const whatsappNumber = '918807344264'; // Your 10-digit number including country code (e.g., 91xxxxxxxxxx)
    // *****************************************

    data.forEach(plot => {
        const statusText = plot.status ? plot.status : 'Unknown';
        const isSold = statusText.toLowerCase() === 'sold';

        const statusBadgeClass = isSold ? 'status-sold' : 'status-active';
        const cardStatusClass = isSold ? 'plot-card-sold' : 'plot-card-active';

        // Construct the pre-filled WhatsApp message
        const message = encodeURIComponent(
            `I am interested in Plot No. ${plot.plotNo} in the Fair Land project.\n` +
            `Details:\n` +
            `Area: ${plot.sqft} sq.ft\n` +
            `Facing: ${plot.facing}\n` +
            `Status: ${statusText}\n` +
            `Please share the price and next steps.`
        );

        // Construct the WhatsApp URL
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

        // Dynamic Button based on status
        const btnHtml = isSold
            ? `<button class="btn btn-secondary btn-sm btn-block mt-3" disabled>Sold Out</button>`
            // CHANGED: Class is now btn-whatsapp
            : `<a href="${whatsappUrl}" target="_blank" class="btn btn-whatsapp btn-sm btn-block mt-3"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>`;

        const cardHtml = `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 ftco-animate fadeInUp ftco-animated">
                <div class="plot-card ${cardStatusClass}">
                    <div class="plot-card-header">
                        <h5>Plot ${plot.plotNo}</h5>
                        <span class="status-badge ${statusBadgeClass}">${statusText}</span>
                    </div>
                    <div class="plot-card-body">
                        
                        <div class="plot-detail-row">
                            <span class="plot-label"><i class="fa-solid fa-compass"></i> Facing</span>
                            <span class="plot-value">${plot.facing}</span>
                        </div>
                        
                        <div class="plot-detail-row">
                            <span class="plot-label"><i class="fa-solid fa-ruler-combined"></i> Area</span>
                            <span class="plot-value">${plot.sqft} Sq.ft</span>
                        </div>
                        
                        ${btnHtml}
                    </div>
                </div>
            </div>
        `;
        $gridContainer.append(cardHtml);
    });
}

function renderPagination() {
    const totalPages = Math.ceil(filteredData.length / plotsPerPage);
    const $pagination = $('#plot-pagination');
    $pagination.empty();

    if (totalPages <= 1) return;

    // Previous
    $pagination.append(`
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage - 1}">Previous</a>
        </li>
    `);

    // Smart Pagination Window
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) {
        $pagination.append('<li class="page-item disabled"><span class="page-link">...</span></li>');
    }

    for (let i = startPage; i <= endPage; i++) {
        $pagination.append(`
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" data-page="${i}">${i}</a>
            </li>
        `);
    }

    if (endPage < totalPages) {
        $pagination.append('<li class="page-item disabled"><span class="page-link">...</span></li>');
    }

    // Next
    $pagination.append(`
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage + 1}">Next</a>
        </li>
    `);
}

// --- EVENT HANDLERS ---

// 1. Pagination Click
$('#plot-pagination').on('click', 'a.page-link', function (e) {
    e.preventDefault();
    const totalPages = Math.ceil(filteredData.length / plotsPerPage);
    const newPage = parseInt($(this).data('page'));

    if (newPage > 0 && newPage <= totalPages) {
        currentPage = newPage;
        renderData();
        // Smooth scroll to top of section
        $('html, body').animate({
            scrollTop: $('.ftco-section').offset().top - 50
        }, 500);
    }
});

// 2. View Toggle Click
$('#btn-view-list').click(function () {
    if (currentView !== 'list') {
        currentView = 'list';
        $(this).addClass('active');
        $('#btn-view-grid').removeClass('active');
        renderData();
    }
});

$('#btn-view-grid').click(function () {
    if (currentView !== 'grid') {
        currentView = 'grid';
        $(this).addClass('active');
        $('#btn-view-list').removeClass('active');
        renderData();
    }
});

// 3. Filters
function applyFilters() {
    const selectedFacing = $('#plot-facing-filter').val();
    const selectedStatus = $('#plot-status-filter').val();
    const plotNoSearch = $('#plot-no-filter').val().trim();
    const plotNoInt = parseInt(plotNoSearch);
    const isValidPlotNoSearch = plotNoSearch !== '' && !isNaN(plotNoInt);

    filteredData = plotData.filter(plot => {
        const matchesFacing = selectedFacing === 'all' || plot.facing === selectedFacing;
        const matchesStatus = selectedStatus === 'all' || plot.status === selectedStatus;
        const matchesPlotNo = !isValidPlotNoSearch || plot.plotNo === plotNoInt;
        return matchesFacing && matchesStatus && matchesPlotNo;
    });

    currentPage = 1;
    renderData();
}

$('#plot-facing-filter, #plot-status-filter').on('change', applyFilters);
$('#plot-no-filter').on('input', applyFilters);

$('#reset-filters').on('click', function () {
    $('#plot-no-filter').val('');
    $('#plot-facing-filter').val('all');
    $('#plot-status-filter').val('all');
    applyFilters();
});

// --- INITIALIZATION ---
if (plotData && plotData.length > 0) {
    $('#total-initial-plots').text(plotData.length);
    populateFilters(plotData);
    applyFilters(); // Triggers initial render
} else {
    $('#plot-inventory-table tbody').html('<tr><td colspan="4">Data Missing.</td></tr>');
}

// --- EMI CALCULATOR LOGIC (Kept as is) ---
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

$('#emiModal').on('show.bs.modal', function () {
    if (!document.getElementById('loanAmountInput').value) document.getElementById('loanAmountInput').value = 1500000;
    displayEmiDetails();
});

/*
 * Schedule Site Visit via WhatsApp Script
 * File: js/schedule-visit.js
 */

// --- SCHEDULE VISIT PRE-FILL LOGIC (ADDED) ---

/**
 * Gets the current date and time formatted for HTML input types 'date' and 'time'.
 */
function getCurrentDateTime() {
    const now = new Date();
    // Get date in YYYY-MM-DD format (required by HTML <input type="date">)
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const currentDate = `${year}-${month}-${day}`;

    // Get time in HH:MM format (24-hour, required by HTML <input type="time">)
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;

    return { currentDate, currentTime };
}

// Use the Bootstrap Modal 'show' event to set the current date/time
$('#scheduleVisitModal').on('show.bs.modal', function () {
    const { currentDate, currentTime } = getCurrentDateTime();

    // Pre-fill the date and time inputs with current values
    $('#visitDate').val(currentDate);
    $('#visitTime').val(currentTime);
});


$(document).ready(function () {
    const SALES_TEAM_NUMBER = '918807344264'; // Replace with your sales team's WhatsApp number (country code + number, no spaces or symbols)
    const PROJECT_NAME = 'Fair Land - Ayyankottai, Madurai';
    // Removed the problematic line that was calling getCurrentDateTime() here.
    
    $('#scheduleVisitForm').on('submit', function (e) {
        e.preventDefault();

        // 1. Get form data
        const name = $('#visitorName').val().trim();
        const phone = $('#visitorPhone').val().trim();
        const date = $('#visitDate').val();
        const time = $('#visitTime').val();

        // 2. Simple Validation
        if (!name || !phone) {
            alert('Please enter your Full Name and WhatsApp Phone Number.');
            return;
        }

        // 3. Construct the message
        let whatsappMessage = `*New Site Visit Request (Fair Land)*\n\n`;
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

        whatsappMessage += `\n*Source:* Website - Fair Land Project Page`;


        // 4. Encode the message and create the WhatsApp link
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappLink = `https://wa.me/${SALES_TEAM_NUMBER}?text=${encodedMessage}`;

        // 5. Open the link in a new tab (or the current tab on mobile)
        window.open(whatsappLink, '_blank');

        // Optional: Close the modal after submission attempt
        $('#scheduleVisitModal').modal('hide');

        // Optional: Show a confirmation message (can be refined with a better UI/Toast)
        // alert('Thank you! Your request is being sent on WhatsApp. Please check your app.');
    });
});