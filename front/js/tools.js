async function getData(url)
{
    const reponse = await fetch(url);
    return await reponse.json();
}

export {getData}; 