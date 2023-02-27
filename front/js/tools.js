async function getData(url)
{
    const reponse = await fetch(url);
    return await reponse.json();
}

async function sendData(url,order){
   // Envoie la commande à l'API
fetch(url, {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log(`Order ID: ${data.orderId}`);
  })
  .catch(error => {
    console.error("Error submitting order:", error);
  });
}

function isCartEmpty()
{
 // Récupération de tous les produits du panier (s'il y en a)
 let keys = Object.keys(localStorage);
 // Vérification du nombre de produits dans le panier
 return keys.length === 0
}
export {getData, isCartEmpty,sendData}; 

