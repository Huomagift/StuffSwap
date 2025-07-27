export async function loadUserFavorites(userId){
  try{
    console.log('Loading favorites for user:', userId);
    
    const supabase = await Auth.initializeSupabase();
    
    // Get favorites with item details using a simpler approach
    const { data, error } = await supabase
      .from('favorites')
      .select(`
        id,
        user_id,
        created_at,
        items (
          id,
          title,
          description,
          image_url,
          category,
          condition,
          user_id
        )
      `)
      .eq('user_id', userId);
    
    if (error) throw error;
    
    // Transform the data to match the expected format
    const transformedData = data.map(favorite => ({
      favorite_id: favorite.id,
      user_id: favorite.user_id,
      favorited_at: favorite.created_at,
      item_id: favorite.items?.id,
      title: favorite.items?.title,
      description: favorite.items?.description,
      image_url: favorite.items?.image_url,
      category: favorite.items?.category,
      condition: favorite.items?.condition,
      item_owner_id: favorite.items?.user_id,
      item_owner_name: 'Unknown', // We'll get this from a separate query if needed
      item_owner_photo: null,
      item_location: 'Location not specified'
    }));
    
    console.log('Favorites loaded:', transformedData);
    return transformedData || [];
    
  } catch(error) {
    console.error('Error loading favorites:', error);
    throw error;
  }
}

export async function loadSwapRequests(userId){
  try{
    const response = await fetch(`/api.swaps?userId=${userId}`);
    const data = await response.json();
    console.log('User swaps:', data);
    return data;
  } catch(error) {
    console.error('Error loading swap requests:', error);
    return [];
  }
}

export async function loadCartItems(userId){
  try{
    console.log('Loading cart items for user:', userId);
    
    const supabase = await Auth.initializeSupabase();
    
    // Get cart items with item details
    const { data, error } = await supabase
      .from('cart')
      .select(`
        id,
        user_id,
        created_at,
        items (
          id,
          title,
          description,
          image_url,
          category,
          condition,
          user_id
        )
      `)
      .eq('user_id', userId);
    
    if (error) throw error;
    
    // Transform the data to match the expected format
    const transformedData = data.map(cartItem => ({
      cart_id: cartItem.id,
      user_id: cartItem.user_id,
      added_at: cartItem.created_at,
      item_id: cartItem.items?.id,
      title: cartItem.items?.title,
      description: cartItem.items?.description,
      image_url: cartItem.items?.image_url,
      category: cartItem.items?.category,
      condition: cartItem.items?.condition,
      item_owner_id: cartItem.items?.user_id,
      item_owner_name: 'Unknown', // We'll get this from a separate query if needed
      item_owner_photo: null,
      estimated_value: 25 // Default estimated value
    }));
    
    console.log('Cart items loaded:', transformedData);
    return transformedData || [];
    
  } catch(error) {
    console.error('Error loading cart items:', error);
    throw error;
  }
}

export async function loadItems() {
  const zip = document.getElementById('zipInput').value;
  if (!zip) return alert("Please enter a zip code!");

  const {data, error} = await supabase 
    .from('swap_items')
    .select('*')
    .eq('zip_code', zip);
    
  if (error){
    console.error("Error loading items:", error);
    return;
  }
  
  const container = document.getElementById('itemsList');
  container.innerHTML='';
  
  if (data.length === 0){
    container.textContent = 'No items found near you!';
  } else {
    data.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'item';
      itemDiv.textContent = `${item.item_name}: ${item.description}`;
      container.appendChild(itemDiv);
    });
  }
}

export async function addToFavorites(userId, itemId) {
  try {
    console.log('Adding item to favorites:', { userId, itemId });
    
    const supabase = await Auth.initializeSupabase();
    
    const { data, error } = await supabase
      .from('favorites')
      .insert({
        user_id: userId,
        item_id: itemId
      })
      .select()
      .single();
    
    if (error) throw error;
    
    console.log('Item added to favorites:', data);
    return data;
    
  } catch (error) {
    console.error('Error adding to favorites:', error);
    throw error;
  }
}

export async function removeFromFavorites(userId, itemId) {
  try {
    console.log('Removing item from favorites:', { userId, itemId });
    
    const supabase = await Auth.initializeSupabase();
    
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('item_id', itemId);
    
    if (error) throw error;
    
    console.log('Item removed from favorites');
    return true;
    
  } catch (error) {
    console.error('Error removing from favorites:', error);
    throw error;
  }
}

export async function toggleFavorite(userId, itemId) {
  try {
    console.log('Toggling favorite:', { userId, itemId });
    
    const supabase = await Auth.initializeSupabase();
    
    // Use the database function to toggle favorite status
    const { data, error } = await supabase
      .rpc('toggle_favorite', {
        user_uuid: userId,
        item_uuid: itemId
      });
    
    if (error) throw error;
    
    console.log('Favorite toggled:', data);
    return data; // Returns true if added, false if removed
    
  } catch (error) {
    console.error('Error toggling favorite:', error);
    throw error;
  }
}

export async function isItemFavorited(userId, itemId) {
  try {
    const supabase = await Auth.initializeSupabase();
    
    const { data, error } = await supabase
      .rpc('is_item_favorited', {
        user_uuid: userId,
        item_uuid: itemId
      });
    
    if (error) throw error;
    
    return data;
    
  } catch (error) {
    console.error('Error checking favorite status:', error);
    return false;
  }
}

export async function getFavoritesCount(userId) {
  try {
    const supabase = await Auth.initializeSupabase();
    
    const { data, error } = await supabase
      .rpc('get_user_favorites_count', {
        user_uuid: userId
      });
    
    if (error) throw error;
    
    return data || 0;
    
  } catch (error) {
    console.error('Error getting favorites count:', error);
    return 0;
  }
}

// Cart-related functions
export async function addToCart(userId, itemId) {
  try {
    console.log('Adding item to cart:', { userId, itemId });
    
    const supabase = await Auth.initializeSupabase();
    
    const { data, error } = await supabase
      .rpc('add_to_cart', {
        user_uuid: userId,
        item_uuid: itemId
      });
    
    if (error) throw error;
    
    console.log('Item added to cart:', data);
    return data;
    
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
}

export async function removeFromCart(userId, itemId) {
  try {
    console.log('Removing item from cart:', { userId, itemId });
    
    const supabase = await Auth.initializeSupabase();
    
    const { data, error } = await supabase
      .rpc('remove_from_cart', {
        user_uuid: userId,
        item_uuid: itemId
      });
    
    if (error) throw error;
    
    console.log('Item removed from cart:', data);
    return data;
    
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
}

export async function clearCart(userId) {
  try {
    console.log('Clearing cart for user:', userId);
    
    const supabase = await Auth.initializeSupabase();
    
    const { data, error } = await supabase
      .rpc('clear_user_cart', {
        user_uuid: userId
      });
    
    if (error) throw error;
    
    console.log('Cart cleared, items removed:', data);
    return data;
    
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
}

export async function isItemInCart(userId, itemId) {
  try {
    const supabase = await Auth.initializeSupabase();
    
    const { data, error } = await supabase
      .rpc('is_item_in_cart', {
        user_uuid: userId,
        item_uuid: itemId
      });
    
    if (error) throw error;
    
    return data;
    
  } catch (error) {
    console.error('Error checking cart status:', error);
    return false;
  }
}

export async function getCartCount(userId) {
  try {
    const supabase = await Auth.initializeSupabase();
    
    const { data, error } = await supabase
      .rpc('get_user_cart_count', {
        user_uuid: userId
      });
    
    if (error) throw error;
    
    return data || 0;
    
  } catch (error) {
    console.error('Error getting cart count:', error);
    return 0;
  }
}
