import {getCurrentUser, isAuthenticated} from './auth.js'
import {loadUserFavorites, loadSwapRequests, loadCartItems} from './userActions.js'
let user = null;
let userId = null;
async function initializeHomePage(){
  user = await getCurrentUser();
  userId = user?.id;

  if (userId){
    loadUserFavorites(userId);
    loadSwapRequests(userId); 
    loadCartItems(userId);
    document.getElementById('favoritesIcon').addEventListener('click', () =>{
      loadUserFavorites(userId);
    });
    document.getElementById('swapRequestsIcon').addEventListener('click',() =>{
      loadSwapRequests(userId);
    });
    document.getElementById('cartIcon').addEventListener('click',()=>{
      loadCartItems(userId);
});
  }
  else{
    showGuestView();
  }
}
initializeHomePage();

