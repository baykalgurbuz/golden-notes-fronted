import React, { useEffect, useState } from 'react';

const Product = () => {
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('kg');  
  const [note, setNote] = useState(''); 
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await fetch('http://localhost:8080/api/product');
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { product, quantity, unit, note   };

    const response = await fetch('http://localhost:8080/api/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Product saved successfully');
      setProduct('');
      setQuantity('');
      setUnit('kg');
      setNote('');
    } else {
      alert('Failed to save product');
    }
  };

  return (
    <div className='container'>
         <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          className="form-control"
          id="productName"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          required
        />
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
        Save Product
      </button>
    </form>
    <div className="mt-5">
        <h2>Product List</h2>
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
            {products.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>{prod.product}</td>
                <td>{prod.quantity}</td>
                <td>{prod.unit}</td>
                <td>{prod.note}</td>
              
              </tr>
            ))}
            {
              console.log(products)
            }
          </tbody>
        </table>
      </div>
    </div>
   
  );
};

export default Product;
