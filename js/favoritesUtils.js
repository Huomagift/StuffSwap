// Favorites Utilities for StuffSwap
// Common functions for managing favorites across the app

import { toggleFavorite, isItemFavorited, getFavoritesCount } from './userActions.js';

// Add favorite button to any item element
export function addFavoriteButton(itemElement, itemId, userId) {
    const favoriteBtn = document.createElement('button');
    favoriteBtn.className = 'favorite-btn';
    favoriteBtn.innerHTML = '🤍'; // Empty heart
    favoriteBtn.title = 'Add to favorites';
    
    // Check if already favorited
    isItemFavorited(userId, itemId).then(isFavorited => {
        favoriteBtn.innerHTML = isFavorited ? '❤️' : '🤍';
        favoriteBtn.title = isFavorited ? 'Remove from favorites' : 'Add to favorites';
    });
    
    // Handle click
    favoriteBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        try {
            const isFavorited = await toggleFavorite(userId, itemId);
            favoriteBtn.innerHTML = isFavorited ? '❤️' : '🤍';
            favoriteBtn.title = isFavorited ? 'Remove from favorites' : 'Add to favorites';
            
            // Show feedback
            const message = isFavorited ? 'Added to favorites!' : 'Removed from favorites!';
            showToast(message);
            
        } catch (error) {
            console.error('Error toggling favorite:', error);
            showToast('Failed to update favorites', 'error');
        }
    });
    
    return favoriteBtn;
}

// Update favorites count in header
export async function updateFavoritesCount(userId) {
    try {
        const count = await getFavoritesCount(userId);
        const favoritesIcon = document.querySelector('.header-icons .icon');
        
        if (favoritesIcon) {
            // Add count badge if count > 0
            let badge = favoritesIcon.querySelector('.favorites-badge');
            
            if (count > 0) {
                if (!badge) {
                    badge = document.createElement('span');
                    badge.className = 'favorites-badge';
                    favoritesIcon.appendChild(badge);
                }
                badge.textContent = count;
            } else if (badge) {
                badge.remove();
            }
        }
    } catch (error) {
        console.error('Error updating favorites count:', error);
    }
}

// Show toast notification
function showToast(message, type = 'success') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Add styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#e74c3c' : '#27ae60'};
        color: white;
        padding: 12px 20px;
        border-radius: 5px;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Initialize favorites functionality on page load
export async function initializeFavorites(userId) {
    if (!userId) return;
    
    // Update favorites count
    await updateFavoritesCount(userId);
    
    // Add click handler to favorites icon in header
    const favoritesIcon = document.querySelector('.header-icons .icon');
    if (favoritesIcon) {
        favoritesIcon.addEventListener('click', () => {
            window.location.href = 'favorites.html';
        });
    }
}

// CSS for favorites badge
export function addFavoritesStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .favorite-btn {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 5px;
            border-radius: 50%;
            transition: transform 0.2s;
        }
        
        .favorite-btn:hover {
            transform: scale(1.1);
        }
        
        .favorites-badge {
            position: absolute;
            top: -5px;
            right: -5px;
            background: #e74c3c;
            color: white;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            font-size: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }
        
        .header-icons .icon {
            position: relative;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
} 