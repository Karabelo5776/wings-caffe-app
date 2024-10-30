// src/components/ProductManagement.js
import React, { useState, useEffect } from 'react';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [editingProductIndex, setEditingProductIndex] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
  });

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductForm({ ...productForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProductIndex !== null) {
      const updatedProducts = products.map((product, index) =>
        index === editingProductIndex ? productForm : product
      );
      setProducts(updatedProducts);
      setEditingProductIndex(null);
    } else {
      setProducts([...products, productForm]);
    }
    setProductForm({ name: '', description: '', price: '', quantity: '' });
    localStorage.setItem('products', JSON.stringify(products));
  };

  const handleEdit = (index) => {
    setProductForm(products[index]);
    setEditingProductIndex(index);
  };

  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  return (
    <section>
      <h2>Product Management</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Product Name" value={productForm.name} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={productForm.description} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={productForm.price} onChange={handleChange} required />
        <input type="number" name="quantity" placeholder="Quantity" value={productForm.quantity} onChange={handleChange} required />
        <button type="submit">{editingProductIndex !== null ? 'Update Product' : 'Add Product'}</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td style={{ backgroundColor: product.quantity <= 5 ? 'red' : 'inherit' }}>
                {product.quantity} {product.quantity <= 5 ? '(Low Stock)' : ''}
              </td>
              <td>
                <button onClick={() => handleEdit(index)} className='edit'>Edit</button>
                <button onClick={() => handleDelete(index)} className='delete'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ProductManagement;
