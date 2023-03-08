async function getData(url)
{
    const reponse = await fetch(url);
    return await reponse.json();
}

async function sendData(url,order)
{
   // Envoie la commande à l'API
    return fetch(url, 
    {
        method: "POST",
        body: JSON.stringify(order),
        headers: 
        {
          "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .catch(error => 
    {
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

function formatPrice(amount)
{
    const formatter = new Intl.NumberFormat('fr-FR', 
    {
      style: 'currency',
      currency: 'EUR',
    })

    return formatter.format(amount);
}

export {getData, isCartEmpty,sendData, formatPrice}; 

