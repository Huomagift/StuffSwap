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
    const response = await fetch(`/api.cartItems?userId=${userId}`);
    const data = await response.json();
    console.log('User cart items:', data);
    return data;
  } catch(error) {
    console.error('Error loading cart items:', error);
    return [];
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
