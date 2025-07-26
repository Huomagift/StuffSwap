export async function loadUserFavorites(userId){
  try{
    const response = await fetch(`/api.favorites?userId=${userId}`);
    const data = await response.json();
    console.log('User favorites:', data);
  } catch(error) {
    console.error('Error loading favorites:', error)
  }
}
export async loadSwapRequests(userId){
  try{
    const response = await fetch(`/api.swaps?userId=${userId}`);
    const data = await response.json();
    console.log('User swaps:', data);
  } catch(error) {
    console.error('Error loading swap requests:', error)
  }
}
export async loadCartItems(userId){
  try{
    const response = await fetch(`/api.cartItems?userId=${userId}`);
    const data = await response.json();
    console.log('User cart items:', data);
  } catch(error) {
    console.error('Error loading cart items:', error)
  }
}
