
display();

function getIdFromUrl (){
    // Récupération de l'id de la commande envoyé sur l'url de la page confirmation
    const queryString = window.location.search;
    // Parse l'URL
    const urlParams = new URLSearchParams(queryString);
    // Récupération de l'id du produit
    return urlParams.get('id');
}

function display (){
    const id = getIdFromUrl();

  // Description du produit à modifier  id="description"
  const commande = document.querySelector("#orderId");
  commande.innerHTML= id;
}