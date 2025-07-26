export async function loadUserFavorites(userId){
  try{
    const response = await fetch(`/api.favorites?userId=${userId}`);
    const data = await response.json();
    console.log('User favorites:', data);
  } catch(error) {
    console.error('Error loading favorites:', error)
  }
}
export async function loadSwapRequests(userId){
  try{
    const response = await fetch(`/api.swaps?userId=${userId}`);
    const data = await response.json();
    console.log('User swaps:', data);
  } catch(error) {
    console.error('Error loading swap requests:', error)
  }
}

export async function loadCartItems(userId){
  try{
    const response = await fetch(`/api.cartItems?userId=${userId}`);
    const data = await response.json();
    console.log('User cart items:', data);
  } catch(error) {
    console.error('Error loading cart items:', error)
  }
}
export async function loadItems() {
const zip=document.getElementbyId('zipInput).value
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
container.textContent('No items found near you!');
  itemDiv.className='item';
  itemDiv.textContent = `${item.item_name}: ${item.description}`;
    container.appendChild(itemDiv);
  });
}
