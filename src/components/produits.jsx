import React, { useEffect, useState } from 'react';
import axios from 'axios';

const produits = () => {
  const [produitPU, setProduitPU] = useState(null);
  const [produitTVA, setProduitTVA] = useState(null);
  const [produitTot, setProduitTot] = useState(null);
  const [produitNet, setProduitNet] = useState(null);

  useEffect(() => {
    // Fetch prices from your server endpoint
    const fetchPrices = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/produit/totalPrice');
        setProduitPU(response.data.produitPU);
        setProduitTVA(response.data.produitTVA);
        setProduitTot(response.data.produitTot);
        setProduitNet(response.data.produitNet);
      } catch (error) {
        console.error('Error fetching prices:', error);
      }
    };

    fetchPrices();
  }, []); // Run this effect only once when the component mounts

  return (
    <div>
      <p>ProduitPU: {produitPU}</p>
      <p>ProduitTVA: {produitTVA}</p>
      <p>ProduitTot: {produitTot}</p>
      <p>ProduitNet: {produitNet}</p>
    </div>
  );
};



export default produits