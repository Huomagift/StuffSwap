// What is Stuff Swap Backend Functions
// This integrates with the existing userActions.js system

// 🌍 Load items based on ZIP code
async function loadItems() {
  const zipCode = document.getElementById('zipInput').value;
  if (!zipCode) {
    alert('Please enter a ZIP code.');
    return;
  }

  try {
    // Show loading state
    const itemsList = document.getElementById('itemsList');
    itemsList.innerHTML = '<div class="loading">Searching for items in your area...</div>';

    // Use the existing userActions.js function
    const supabase = await Auth.initializeSupabase();
    
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .eq('zipcode', zipCode);

    if (error) {
      console.error('Error fetching items:', error);
      itemsList.innerHTML = '<div class="error">Error loading items. Please try again.</div>';
      return;
    }

    itemsList.innerHTML = '';

    if (data.length === 0) {
      itemsList.innerHTML = `
        <div class="no-items">
          <h3>No items found in your area</h3>
          <p>Try searching with a different ZIP code or check back later!</p>
        </div>
      `;
      return;
    }

    // Display items in a grid
    data.forEach(item => {
      const itemCard = document.createElement('div');
      itemCard.className = 'item-card';
      itemCard.innerHTML = `
        <div class="item-image">
          <img src="${item.image_url || 'placeholder-image.jpg'}" alt="${item.title}" onerror="this.src='placeholder-image.jpg'">
        </div>
        <div class="item-info">
          <h3>${item.title || 'Untitled Item'}</h3>
          <p class="item-description">${item.description || 'No description available'}</p>
          <p class="item-category">Category: ${item.category || 'General'}</p>
          <p class="item-condition">Condition: ${item.condition || 'Unknown'}</p>
          <button class="view-item-btn" onclick="viewItem('${item.id}')">View Details</button>
        </div>
      `;
      itemsList.appendChild(itemCard);
    });

  } catch (error) {
    console.error('Error:', error);
    document.getElementById('itemsList').innerHTML = '<div class="error">An error occurred. Please try again.</div>';
  }
}

// View item details (placeholder function)
function viewItem(itemId) {
  console.log('Viewing item:', itemId);
  // TODO: Navigate to item detail page
  alert('Item detail page coming soon!');
}
