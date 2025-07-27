// Wireframe Version JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeSearch();
    initializeCategoryFilters();
    initializeFavorites();
    initializeMapInteractions();
    initializePagination();
    initializeMapControls();
    initializeSwapRequestsButton();
});

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const clearSearch = document.getElementById('clearSearch');
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        filterListings(searchTerm);
        
        // Show/hide clear button
        if (searchTerm.length > 0) {
            clearSearch.style.display = 'block';
        } else {
            clearSearch.style.display = 'none';
        }
    });
    
    clearSearch.addEventListener('click', function() {
        searchInput.value = '';
        searchInput.focus();
        clearSearch.style.display = 'none';
        filterListings('');
    });
}

// Filter listings based on search term
function filterListings(searchTerm) {
    const listings = document.querySelectorAll('.listing-card');
    
    listings.forEach(listing => {
        const title = listing.querySelector('.listing-title').textContent.toLowerCase();
        const username = listing.querySelector('.username').textContent.toLowerCase();
        const category = listing.querySelector('.category-tag').textContent.toLowerCase();
        
        const matchesSearch = searchTerm === '' || 
                            title.includes(searchTerm) || 
                            username.includes(searchTerm) || 
                            category.includes(searchTerm);
        
        if (matchesSearch) {
            listing.style.display = 'block';
            listing.style.animation = 'fadeIn 0.3s ease-in';
        } else {
            listing.style.display = 'none';
        }
    });
}

// Category filter buttons
function initializeCategoryFilters() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter by category
            const category = this.textContent.trim();
            filterByCategory(category);
        });
    });
}

// Filter by category
function filterByCategory(category) {
    const listings = document.querySelectorAll('.listing-card');
    
    if (category === 'All') {
        listings.forEach(listing => {
            listing.style.display = 'block';
        });
        return;
    }
    
    listings.forEach(listing => {
        const listingCategory = listing.querySelector('.category-tag').textContent;
        const categoryMatch = listingCategory.includes(category);
        
        if (categoryMatch) {
            listing.style.display = 'block';
            listing.style.animation = 'fadeIn 0.3s ease-in';
        } else {
            listing.style.display = 'none';
        }
    });
}

// Favorites functionality
function initializeFavorites() {
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('far')) {
                // Add to favorites
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.classList.add('favorited');
                
                // Show notification
                showNotification('Added to favorites!', 'success');
            } else {
                // Remove from favorites
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.classList.remove('favorited');
                
                // Show notification
                showNotification('Removed from favorites!', 'info');
            }
        });
    });
}

// Interactive Map functionality
function initializeMapInteractions() {
    const map = document.getElementById('map');
    let isDragging = false;
    let startX, startY, scrollLeft, scrollTop;
    
    // Map dragging functionality
    map.addEventListener('mousedown', function(e) {
        isDragging = true;
        map.style.cursor = 'grabbing';
        startX = e.pageX - map.offsetLeft;
        startY = e.pageY - map.offsetTop;
        scrollLeft = map.scrollLeft;
        scrollTop = map.scrollTop;
    });
    
    map.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - map.offsetLeft;
        const y = e.pageY - map.offsetTop;
        const walkX = (x - startX) * 2;
        const walkY = (y - startY) * 2;
        map.scrollLeft = scrollLeft - walkX;
        map.scrollTop = scrollTop - walkY;
    });
    
    map.addEventListener('mouseup', function() {
        isDragging = false;
        map.style.cursor = 'grab';
    });
    
    map.addEventListener('mouseleave', function() {
        isDragging = false;
        map.style.cursor = 'grab';
    });
    
    // Map pin interactions
    const mapPins = document.querySelectorAll('.map-pin');
    
    mapPins.forEach(pin => {
        pin.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent map dragging when clicking pins
            
            const username = this.getAttribute('data-username');
            const title = this.getAttribute('data-title');
            const category = this.getAttribute('data-category');
            
            // Show swap request modal
            showSwapRequestModal(title, username, category);
        });
    });
}

// Map controls
function initializeMapControls() {
    const redoSearchBtn = document.getElementById('redoSearchBtn');
    const expandMapBtn = document.getElementById('expandMapBtn');
    const collapseMapBtn = document.getElementById('collapseMapBtn');
    
    redoSearchBtn.addEventListener('click', function() {
        // Reset map view and show all pins
        const map = document.getElementById('map');
        map.scrollLeft = 0;
        map.scrollTop = 0;
        
        showNotification('Map search reset!', 'success');
    });
    
    expandMapBtn.addEventListener('click', function() {
        const mapSection = document.querySelector('.map-section');
        mapSection.classList.toggle('expanded');
        
        if (mapSection.classList.contains('expanded')) {
            mapSection.style.position = 'fixed';
            mapSection.style.top = '0';
            mapSection.style.left = '0';
            mapSection.style.width = '500vw';
            mapSection.style.height = '500vh';
            mapSection.style.zIndex = '1000';
            mapSection.style.borderRadius = '0';
            mapSection.style.padding = '2rem';
        } else {
            mapSection.style.position = '';
            mapSection.style.top = '';
            mapSection.style.left = '';
            mapSection.style.width = '';
            mapSection.style.height = '';
            mapSection.style.zIndex = '';
            mapSection.style.borderRadius = '';
            mapSection.style.padding = '';
        }
    });
    
    collapseMapBtn.addEventListener('click', function() {
        const mapSection = document.querySelector('.map-section');
        mapSection.classList.remove('expanded');
        mapSection.style.position = '';
        mapSection.style.top = '';
        mapSection.style.left = '';
        mapSection.style.width = '';
        mapSection.style.height = '';
        mapSection.style.zIndex = '';
        mapSection.style.borderRadius = '';
        mapSection.style.padding = '';
    });
}

// Pagination functionality
function initializePagination() {
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            paginationButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Simulate page change
            const pageNumber = this.textContent;
            if (pageNumber && !isNaN(pageNumber)) {
                showNotification(`Navigated to page ${pageNumber}`, 'info');
            }
        });
    });
}

// Show swap request modal
function showSwapRequestModal(itemTitle, username = null, category = null) {
    const modal = document.createElement('div');
    modal.className = 'swap-modal';
    
    const userInfo = username ? `<p><strong>Swapper:</strong> @${username}</p>` : '';
    const categoryInfo = category ? `<p><strong>Category:</strong> ${category}</p>` : '';
    
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <h3>Request Swap</h3>
                <p>You're requesting to swap for: <strong>${itemTitle}</strong></p>
                ${userInfo}
                ${categoryInfo}
                <div class="swap-form">
                    <label>
                        <span>What would you like to offer?</span>
                        <textarea placeholder="Describe the item you want to swap..." rows="3"></textarea>
                    </label>
                    <label>
                        <span>Additional message (optional)</span>
                        <textarea placeholder="Any additional details..." rows="2"></textarea>
                    </label>
                </div>
                <div class="modal-actions">
                    <button class="modal-btn cancel">Cancel</button>
                    <button class="modal-btn send">Send Request</button>
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners
    modal.querySelector('.cancel').addEventListener('click', () => modal.remove());
    modal.querySelector('.send').addEventListener('click', () => {
        showNotification('Swap request sent!', 'success');
        modal.remove();
    });
    
    document.body.appendChild(modal);
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#558745' : '#CCD5AE'};
        color: ${type === 'success' ? 'white' : '#20331A'};
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(32, 51, 26, 0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .swap-modal .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(32, 51, 26, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    }
    
    .swap-modal .modal-content {
        background: white;
        padding: 2rem;
        border-radius: 12px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        border: 2px solid #CCD5AE;
        box-shadow: 0 8px 25px rgba(32, 51, 26, 0.2);
    }
    
    .swap-modal h3 {
        color: #20331A;
        margin-bottom: 1rem;
        font-size: 1.5rem;
    }
    
    .swap-modal p {
        color: #446C37;
        margin-bottom: 1rem;
    }
    
    .swap-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin: 1rem 0;
    }
    
    .swap-form label {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .swap-form label span {
        color: #20331A;
        font-weight: 500;
    }
    
    .swap-form textarea {
        padding: 0.75rem;
        border: 2px solid #CCD5AE;
        border-radius: 8px;
        resize: vertical;
        font-family: inherit;
        color: #20331A;
        transition: border-color 0.3s ease;
    }
    
    .swap-form textarea:focus {
        outline: none;
        border-color: #558745;
    }
    
    .modal-actions {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        margin-top: 1.5rem;
    }
    
    .modal-btn {
        padding: 0.5rem 1.5rem;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.2s ease;
        font-size: 0.9rem;
    }
    
    .modal-btn.cancel {
        background: #CCD5AE;
        color: #20331A;
        border: 2px solid #CCD5AE;
    }
    
    .modal-btn.send {
        background: #558745;
        color: white;
        border: 2px solid #558745;
    }
    
    .modal-btn:hover {
        transform: translateY(-1px);
    }
    
    .modal-btn.cancel:hover {
        background: #E9EDC9;
    }
    
    .modal-btn.send:hover {
        background: #66A253;
    }
    
    /* Map expanded styles */
    .map-section.expanded {
        transition: all 0.3s ease;
    }
    
    .map-section.expanded .map-container {
        height: calc(100vh - 4rem);
    }
`;
document.head.appendChild(style); 

// --- Dynamic Pagination and Listings ---
const sampleListings = [
    {
        image: "https://via.placeholder.com/200x200/446C37/ffffff?text=Helmet",
        username: "sportswapper",
        title: "SMN Motorbike Helmet",
        category: "Sports"
    },
    {
        image: "https://via.placeholder.com/200x200/33512A/ffffff?text=Chair",
        username: "furnifan",
        title: "Retro Green Chair",
        category: "Furniture"
    },
    {
        image: "https://via.placeholder.com/200x200/558745/ffffff?text=Toy",
        username: "toysrus",
        title: "Pixel Plush Toy",
        category: "Toys"
    },
    {
        image: "https://via.placeholder.com/200x200/20331A/ffffff?text=Jacket",
        username: "clothes4days",
        title: "Eco Winter Jacket",
        category: "Clothing"
    },
    {
        image: "https://via.placeholder.com/200x200/CCD5AE/ffffff?text=Blender",
        username: "appliholic",
        title: "Kitchen Blender",
        category: "Appliances"
    },
    {
        image: "https://via.placeholder.com/200x200/66A253/ffffff?text=Lamp",
        username: "decorator",
        title: "Rustic Metallic Lamp",
        category: "Decor"
    },
    {
        image: "https://via.placeholder.com/200x200/FAEDCD/ffffff?text=Clock",
        username: "timekeeper",
        title: "Vintage Clock",
        category: "Decor"
    },
    {
        image: "https://via.placeholder.com/200x200/D4A373/ffffff?text=Sofa",
        username: "sofalover",
        title: "Light Gray Livingroom Sofa",
        category: "Furniture"
    },
    {
        image: "https://via.placeholder.com/200x200/33512A/ffffff?text=Bicycle",
        username: "cyclist",
        title: "Electric Blue Bicycle",
        category: "Sports"
    },
    {
        image: "https://via.placeholder.com/200x200/E9EDC9/ffffff?text=iPhone",
        username: "techswapper",
        title: "iPhone 16 Pro",
        category: "Tech"
    },
    {
        image: "https://via.placeholder.com/200x200/558745/ffffff?text=Chair",
        username: "officeguru",
        title: "Gray Padded Office Chair",
        category: "Furniture"
    },
    {
        image: "https://via.placeholder.com/200x200/CCD5AE/ffffff?text=Jeans",
        username: "fashionista",
        title: "Faded Pastel Jeans",
        category: "Clothes"
    }
    // ...add more sample listings as desired...
];

const LISTINGS_PER_PAGE = 8;
const TOTAL_PAGES = 5;
let currentPage = 1;

function getRandomListings() {
    // Shuffle and pick random listings for demo
    const shuffled = sampleListings
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    return shuffled.slice(0, LISTINGS_PER_PAGE);
}

function renderListings() {
    const listingsGrid = document.querySelector('.listings-grid');
    listingsGrid.innerHTML = '';
    const listings = getRandomListings();
    listings.forEach(listing => {
        listingsGrid.innerHTML += `
            <div class="listing-card">
                <div class="listing-image">
                    <img src="${listing.image}" alt="${listing.title}">
                </div>
                <div class="listing-info">
                    <div class="listing-header">
                        <span class="username">@${listing.username}</span>
                        <button class="favorite-btn"><i class="far fa-heart"></i></button>
                    </div>
                    <h3 class="listing-title">${listing.title}</h3>
                    <span class="category-tag">#${listing.category}</span>
                </div>
            </div>
        `;
    });
    initializeFavorites(); // Re-initialize favorite buttons
}

function renderPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    // Left arrow (only if not on first page)
    if (currentPage > 1) {
        const leftBtn = document.createElement('button');
        leftBtn.className = 'pagination-btn';
        leftBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        leftBtn.addEventListener('click', () => goToPage(currentPage - 1));
        pagination.appendChild(leftBtn);
    }

    // Page numbers
    for (let i = 1; i <= TOTAL_PAGES; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = 'pagination-btn';
        pageBtn.textContent = i;
        if (i === currentPage) pageBtn.classList.add('active');
        pageBtn.addEventListener('click', () => goToPage(i));
        pagination.appendChild(pageBtn);
    }

    // Right arrow (only if not on last page)
    if (currentPage < TOTAL_PAGES) {
        const rightBtn = document.createElement('button');
        rightBtn.className = 'pagination-btn';
        rightBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        rightBtn.addEventListener('click', () => goToPage(currentPage + 1));
        pagination.appendChild(rightBtn);
    }
}

function goToPage(page) {
    if (page < 1 || page > TOTAL_PAGES) return;
    currentPage = page;
    renderListings();
    renderPagination();
}

// On DOMContentLoaded, render initial listings and pagination
window.addEventListener('DOMContentLoaded', () => {
    renderListings();
    renderPagination();
}); 

function initializeSwapRequestsButton() {
    const swapBtn = document.getElementById('swapRequestsBtn');
    if (!swapBtn) return;
    swapBtn.addEventListener('click', showSwapRequestsPanel);
}

function showSwapRequestsPanel() {
    // Remove any existing panel
    const existing = document.getElementById('swap-requests-panel');
    if (existing) existing.remove();

    // Hide main content and show fullpage swap requests
    const mainContent = document.querySelector('main.main-content');
    const fullPage = document.getElementById('swap-requests-fullpage');
    if (mainContent && fullPage) {
        mainContent.style.display = 'none';
        fullPage.style.display = 'block';
        renderFullSwapRequestsPage(fullPage, mainContent);
        return;
    }

    // Fallback: show modal panel (old behavior)
    const panel = document.createElement('div');
    panel.id = 'swap-requests-panel';
    panel.innerHTML = `
        <div class="swap-requests-overlay"></div>
        <div class="swap-requests-modal">
            <div class="swap-requests-section">
                <h4>REQUESTS</h4>
                <div class="swap-request-box">
                    <span><a href="#" style="color:#3b82f6;">@username</a> has requested to swap <span style="color:#3b82f6;">ITEM</span> for <span style="color:#ec4899;">@me's ITEM</span></span>
                    <span class="swap-request-actions">
                        <button class="swap-accept">&#10003;</button>
                        <button class="swap-decline">&#10005;</button>
                    </span>
                </div>
            </div>
            <div class="swap-requests-section">
                <h4>ACCEPTED REQUESTS</h4>
                <div class="swap-user-box"><span class="swap-user-icon"></span> <a href="#" style="color:#3b82f6;">@username</a> Stuff Swap</div>
            </div>
            <div class="swap-requests-section">
                <h4>ACCEPTED SWAPS</h4>
                <div class="swap-user-box"><span class="swap-user-icon"></span> <a href="#" style="color:#3b82f6;">@username</a> Stuff Swap</div>
                <div class="swap-user-box"><span class="swap-user-icon"></span> <a href="#" style="color:#3b82f6;">@username</a> Stuff Swap</div>
            </div>
            <div class="swap-requests-section">
                <h4>DECLINED SWAPS</h4>
                <div class="swap-user-box"><span class="swap-user-icon"></span> <a href="#" style="color:#3b82f6;">@username</a> Stuff Swap</div>
            </div>
        </div>
    `;
    document.body.appendChild(panel);

    // Close on overlay click
    panel.querySelector('.swap-requests-overlay').addEventListener('click', () => panel.remove());
    // Optionally: add close button or ESC key support
}

function renderFullSwapRequestsPage(container, mainContent) {
    container.innerHTML = `
    <div class="swap-fullpage-wrapper">
        <button class="swap-fullpage-close">&times;</button>
        <div class="swap-fullpage-left">
            <div class="swap-requests-section">
                <h4>REQUESTS</h4>
                <div class="swap-request-box">
                    <span><a href="#" style="color:#3b82f6;">@username</a> has requested to swap <span style="color:#3b82f6;">ITEM</span> for <span style="color:#ec4899;">@me's ITEM</span></span>
                    <span class="swap-request-actions">
                        <button class="swap-accept">&#10003;</button>
                        <button class="swap-decline">&#10005;</button>
                    </span>
                </div>
            </div>
            <div class="swap-requests-section">
                <h4>ACCEPTED REQUESTS</h4>
                <div class="swap-user-box"><span class="swap-user-icon"></span> <a href="#" style="color:#3b82f6;">@username</a> Stuff Swap</div>
            </div>
            <div class="swap-requests-section">
                <h4>ACCEPTED SWAPS</h4>
                <div class="swap-user-box"><span class="swap-user-icon"></span> <a href="#" style="color:#3b82f6;">@username</a> Stuff Swap</div>
                <div class="swap-user-box"><span class="swap-user-icon"></span> <a href="#" style="color:#3b82f6;">@username</a> Stuff Swap</div>
            </div>
            <div class="swap-requests-section">
                <h4>DECLINED SWAPS</h4>
                <div class="swap-user-box"><span class="swap-user-icon"></span> <a href="#" style="color:#3b82f6;">@username</a> Stuff Swap</div>
            </div>
        </div>
        <div class="swap-fullpage-right">
            <div class="swap-offer-box">
                <div class="swap-offer-row">
                    <span class="swap-user-icon"></span> <a href="#" style="color:#3b82f6;">@username</a> Stuff Swap Offer
                    <div class="swap-offer-product">
                        <div class="swap-offer-img"></div>
                        <div class="swap-offer-title">Title of Product</div>
                    </div>
                </div>
                <div class="swap-offer-row">
                    <span class="swap-user-icon"></span> <span style="color:#ec4899;">@me</span> Stuff Swap Offer
                    <div class="swap-offer-product">
                        <div class="swap-offer-img"></div>
                        <div class="swap-offer-title">Title of Product</div>
                    </div>
                </div>
            </div>
            <div class="swap-approve-row">
                <span class="swap-approve-message">Do you approve this swap?</span>
                <button class="swap-approve-btn">&#10003;</button>
                <button class="swap-approve-cancel">&#10005;</button>
            </div>
            <div class="swap-chat-label">Chat:</div>
            <textarea class="swap-chat-box" rows="3"></textarea>
        </div>
    </div>
    `;
    // Close button returns to main content
    container.querySelector('.swap-fullpage-close').onclick = () => {
        container.style.display = 'none';
        if (mainContent) mainContent.style.display = '';
    };
    // Add notification logic for accept/decline
    const acceptBtn = container.querySelector('.swap-accept');
    const declineBtn = container.querySelector('.swap-decline');
    if (acceptBtn) acceptBtn.onclick = () => showNotification('Swap request accepted!', 'success');
    if (declineBtn) declineBtn.onclick = () => showNotification('Swap request declined!', 'info');
    // Approve/decline in right column
    const approveBtn = container.querySelector('.swap-approve-btn');
    const approveCancel = container.querySelector('.swap-approve-cancel');
    if (approveBtn) approveBtn.onclick = () => showNotification('Swap request accepted!', 'success');
    if (approveCancel) approveCancel.onclick = () => showNotification('Swap request declined!', 'info');
}

// Add minimal styles for the modal
const swapPanelStyle = document.createElement('style');
swapPanelStyle.textContent = `
#swap-requests-panel {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    z-index: 20000;
    display: flex;
    align-items: center;
    justify-content: center;
}
.swap-requests-overlay {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.15);
    z-index: 1;
}
.swap-requests-modal {
    position: relative;
    z-index: 2;
    background: #e5e7eb;
    border-radius: 18px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.18);
    padding: 2rem 2.5rem;
    min-width: 420px;
    max-width: 95vw;
    max-height: 90vh;
    overflow-y: auto;
    font-family: 'Inter', 'Roboto', sans-serif;
    border: 2px solid #bdbdbd;
}
.swap-requests-section {
    margin-bottom: 1.5rem;
}
.swap-requests-section h4 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #222;
    letter-spacing: 0.03em;
}
.swap-request-box {
    background: #fff;
    border-radius: 12px;
    padding: 1rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'Roboto Mono', monospace, monospace;
    font-size: 1rem;
    border: 1.5px solid #bdbdbd;
}
.swap-request-actions button {
    font-size: 1.5rem;
    border: none;
    background: none;
    margin-left: 0.5rem;
    cursor: pointer;
    border-radius: 50%;
    width: 2.2rem;
    height: 2.2rem;
    transition: background 0.2s;
}
.swap-request-actions .swap-accept {
    background: #d1fae5;
    color: #10b981;
}
.swap-request-actions .swap-decline {
    background: #fee2e2;
    color: #ef4444;
}
.swap-request-actions .swap-accept:hover {
    background: #6ee7b7;
}
.swap-request-actions .swap-decline:hover {
    background: #fca5a5;
}
.swap-user-box {
    background: #fff;
    border-radius: 12px;
    padding: 0.75rem 1rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    font-family: 'Roboto Mono', monospace, monospace;
    font-size: 1rem;
    border: 1.5px solid #bdbdbd;
}
.swap-user-icon {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: #e5e7eb;
    border: 1.5px solid #bdbdbd;
    margin-right: 0.7rem;
    vertical-align: middle;
}
@media (max-width: 600px) {
    .swap-requests-modal { min-width: 90vw; padding: 1rem 0.5rem; }
}
`;
document.head.appendChild(swapPanelStyle); 

// Add styles for the fullpage swap requests
const swapFullPageStyle = document.createElement('style');
swapFullPageStyle.textContent = `
.swap-fullpage-wrapper {
    display: flex;
    flex-direction: row;
    background: #e5e7eb;
    border-radius: 18px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.18);
    padding: 2.5rem 2.5rem 2rem 2.5rem;
    min-width: 320px;
    max-width: 900px;
    margin: 2rem auto;
    position: relative;
    font-family: 'Inter', 'Roboto', sans-serif;
    gap: 2.5rem;
    justify-content: center;
}
.swap-fullpage-close {
    position: absolute;
    top: 1.2rem;
    right: 1.2rem;
    font-size: 2rem;
    background: none;
    border: none;
    color: #222;
    cursor: pointer;
    z-index: 10;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    transition: background 0.2s;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.swap-fullpage-close:hover {
    background: #f3f4f6;
}
.swap-fullpage-left {
    flex: 0 0 320px;
    background: #f7fafc;
    border-radius: 14px;
    padding: 1.5rem 1.2rem 1.2rem 1.2rem;
    box-shadow: 2px 0 12px rgba(0,0,0,0.04);
    border: 1.5px solid #d1d5db;
    min-width: 260px;
    max-width: 340px;
}
.swap-fullpage-right {
    flex: 1 1 0%;
    background: #f3f4f6;
    border-radius: 14px;
    padding: 1.5rem 1.5rem 1rem 1.5rem;
    display: flex;
    flex-direction: column;
    min-width: 260px;
    border: 1.5px solid #d1d5db;
    box-shadow: 0 0 0 0 #fff, -2px 0 12px rgba(0,0,0,0.04);
}
.swap-offer-box {
    background: #e5e7eb;
    border-radius: 12px;
    padding: 1rem 1rem 0.5rem 1rem;
    margin-bottom: 1.2rem;
    border: 1.5px solid #bdbdbd;
}
.swap-offer-row {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    gap: 1.2rem;
}
.swap-offer-product {
    background: #fff;
    border-radius: 10px;
    border: 1.5px solid #bdbdbd;
    width: 160px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 1.2rem;
    flex-direction: column;
}
.swap-offer-img {
    width: 50px;
    height: 50px;
    background: #e5e7eb;
    border-radius: 8px;
    margin-bottom: 0.3rem;
    border: 1.5px solid #bdbdbd;
}
.swap-offer-title {
    font-size: 1rem;
    font-weight: 600;
    color: #222;
}
.swap-approve-row {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    gap: 0.5rem;
}
.swap-approve-input {
    flex: 1 1 0%;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    border: 1.5px solid #bdbdbd;
    font-size: 1rem;
}
.swap-approve-btn {
    font-size: 1.5rem;
    background: #d1fae5;
    color: #10b981;
    border: none;
    border-radius: 50%;
    width: 2.2rem;
    height: 2.2rem;
    cursor: pointer;
    margin-left: 0.2rem;
    transition: background 0.2s;
}
.swap-approve-btn:hover {
    background: #6ee7b7;
}
.swap-approve-cancel {
    font-size: 1.5rem;
    background: #fee2e2;
    color: #ef4444;
    border: none;
    border-radius: 50%;
    width: 2.2rem;
    height: 2.2rem;
    cursor: pointer;
    margin-left: 0.2rem;
    transition: background 0.2s;
}
.swap-approve-cancel:hover {
    background: #fca5a5;
}
.swap-chat-label {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.3rem;
    color: #222;
}
.swap-chat-box {
    width: 100%;
    border-radius: 8px;
    border: 1.5px solid #bdbdbd;
    padding: 0.7rem 1rem;
    font-size: 1rem;
    min-height: 60px;
    resize: vertical;
}
@media (max-width: 1100px) {
    .swap-fullpage-wrapper {
        max-width: 98vw;
        padding: 1.2rem 0.2rem;
        gap: 1.2rem;
    }
    .swap-fullpage-left, .swap-fullpage-right {
        min-width: 0;
        max-width: 100vw;
    }
}
@media (max-width: 900px) {
    .swap-fullpage-wrapper {
        flex-direction: column;
        min-width: 90vw;
        padding: 1rem 0.5rem;
        gap: 0.5rem;
    }
    .swap-fullpage-left {
        margin-right: 0;
        margin-bottom: 2rem;
        box-shadow: none;
    }
    .swap-fullpage-right {
        box-shadow: none;
    }
}
@media (max-width: 600px) {
    .swap-fullpage-wrapper {
        padding: 0.5rem 0.1rem;
    }
    .swap-fullpage-left, .swap-fullpage-right {
        padding: 0.7rem 0.3rem;
    }
    .swap-fullpage-close {
        top: 0.5rem;
        right: 0.5rem;
        width: 2rem;
        height: 2rem;
        font-size: 1.3rem;
    }
}
`;
document.head.appendChild(swapFullPageStyle); 