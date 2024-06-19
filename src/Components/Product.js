import React, { useEffect, useState } from 'react';

const Product = () => {
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('kg');  
  const [note, setNote] = useState(''); 
  const [salesList, setSalesList] = useState([]);
  const [products, setProducts] = useState([]);
 
  useEffect(() => {
    fetchSales();
    fetchProducts();
  }, []);

  const fetchProducts=async()=>{
    try {
      const response =await fetch('http://localhost:8080/api/product');
     if (!response.ok) {
      throw new Error("Fetchleyemedim.")
     } 
     const data =await response.json();
     console.log(response)
     setProducts(data);
    } catch (error) {
      console.log("Fetch error",error)
    }
  }

  const fetchSales = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/sale');
      if (!response.ok) {
        throw new Error("Fetchleyemedim.")
       } 
       const data = await response.json();
    setSalesList(data);
    } catch (error) {
      console.log("Fetch error",error)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { product, quantity, unit, note   };
    try {
      const response = await fetch('http://localhost:8080/api/sale', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert('Sales saved successfully');
        setProduct('');
        setQuantity('');
        setUnit('kg');
        setNote('');
        fetchSales();
      } else {
        alert('Failed to save product');
      }
    } catch (error) {
      console.error('Error save sale:', error);
      alert('Failed to save sale');
    }

  };

  return (
    <div className='container'>
         <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="productName">Product Name:</label>
        <select
            id="productName"
            className="form-control"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            required
          >
            <option value="">Select a product</option>
            {products.map((prod) => (
              <option key={prod.id} value={prod.productName}>
                {prod.productName}
              </option>
            ))}
          </select>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="unit">Unit:</label>
          <select
            id="unit"
            className="form-control"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value="kg">kg</option>
            <option value="g">g</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="note">Note:</label>
        <textarea
          className="form-control"
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Save Sale
      </button>
    </form>
    <div className="mt-5">
        <h2>Sale List</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Note</th>
          
            </tr>
          </thead>
          <tbody>
            {salesList.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.id}</td>
                <td>{sale.product}</td>
                <td>{sale.quantity}</td>
                <td>{sale.unit}</td>
                <td>{sale.note}</td>
              </tr>
            ))}
            {
              console.log(salesList)
            }
          </tbody>
        </table>
      </div>
    </div>
   
  );
};

export default Product;
