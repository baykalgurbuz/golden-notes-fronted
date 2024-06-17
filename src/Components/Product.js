import React, { useState } from 'react';

const Product = () => {
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('kg'); // varsayılan olarak kg seçili
  const [note, setNote] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { product, quantity, unit, note };

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
    </div>
   
  );
};

export default Product;
