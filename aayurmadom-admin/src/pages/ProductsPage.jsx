import { useEffect, useState } from 'react';

import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  uploadImage,
} from '../api/adminApi';

const emptyForm = {
  name: '',
  category: '',
  description: '',
  oldPrice: '',
  price: '',
  stock: '',
  imageUrl1: '',
  imageUrl2: '',
  imageUrl3: '',
  imageUrl4: '',
};

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
const [fileInputKey, setFileInputKey] = useState(Date.now());
  const loadProducts = async () => {
    const response = await getProducts();
    setProducts(response.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

 const resetForm = () => {
  setForm(emptyForm);
  setEditingId(null);
  setFileInputKey(Date.now());
};
  const handleImageUpload = async (event, fieldName) => {
  const selectedFile = event.target.files[0];

  if (!selectedFile) return;

  try {
    const response = await uploadImage(selectedFile);
    console.log("UPLOAD RESPONSE:", response.data);

    setForm(prev => ({
      ...prev,
      [fieldName]: response.data,
    }));
  } catch (error) {
    console.error('Upload failed:', error);
    alert('Image upload failed');
  }
};

  const handleSubmit = async e => {
    e.preventDefault();

    const productData = {
      name: form.name,
      category: form.category,
      description: form.description,
      oldPrice: Number(form.oldPrice),
      price: Number(form.price),
      stock: Number(form.stock),
       imageUrl1: form.imageUrl1,
        imageUrl2: form.imageUrl2,
        imageUrl3: form.imageUrl3,
        imageUrl4: form.imageUrl4,
    };

    if (editingId) {
      await updateProduct(editingId, productData);
    } else {
      await addProduct(productData);
    }

    resetForm();
    loadProducts();
  };

 const handleEdit = product => {
  setEditingId(product.id);

  setForm({
    name: product.name || '',
    category: product.category || '',
    description: product.description || '',
    oldPrice: product.oldPrice || '',
    price: product.price || '',
    stock: product.stock || '',

    imageUrl1: product.imageUrl1 || '',
    imageUrl2: product.imageUrl2 || '',
    imageUrl3: product.imageUrl3 || '',
    imageUrl4: product.imageUrl4 || '',
  });
  console.log('PRODUCT DATA BEFORE SAVE:', productData);
};
  const handleDelete = async id => {
    if (confirm('Delete this product?')) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  return (
    <div>
      <h1 className="page-title">Products Management</h1>

      <form className="form-card" onSubmit={handleSubmit}>
        <h2>{editingId ? 'Edit Product' : 'Add Product'}</h2>

        <div className="form-grid">
          <input
            name="name"
            placeholder="Product name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            required
          />

          <input
            name="oldPrice"
            placeholder="Old Price"
            type="number"
            value={form.oldPrice}
            onChange={handleChange}
            required
          />

          <input
            name="price"
            placeholder="Current Price"
            type="number"
            value={form.price}
            onChange={handleChange}
            required
          />

          <input
            name="stock"
            placeholder="Stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            required
          />

          <div>
                <input
  key={`image1-${fileInputKey}`}
  type="file"
  accept="image/*"
  onChange={(e) => handleImageUpload(e, 'imageUrl1')}
/>
                {form.imageUrl1 && (
                    <img
                    src={form.imageUrl1}
                    alt=""
                    className="upload-preview"
                    />
                )}
            </div>
<div>
                <input
  key={`image2-${fileInputKey}`}
  type="file"
  accept="image/*"
  onChange={(e) => handleImageUpload(e, 'imageUrl2')}
/>
                {form.imageUrl2 && (
                    <img
                    src={form.imageUrl2}
                    alt=""
                    className="upload-preview"
                    />
                )}
            </div>           <div>
                <input
  key={`image3-${fileInputKey}`}
  type="file"
  accept="image/*"
  onChange={(e) => handleImageUpload(e, 'imageUrl3')}
/>
                {form.imageUrl3 && (
                    <img
                    src={form.imageUrl3}
                    alt=""
                    className="upload-preview"
                    />
                )}
            </div>
            <div>
                <input
  key={`image4-${fileInputKey}`}
  type="file"
  accept="image/*"
  onChange={(e) => handleImageUpload(e, 'imageUrl4')}
    />
                {form.imageUrl4 && (
                    <img
                    src={form.imageUrl4}
                    alt=""
                    className="upload-preview"
                    />
                )}
            </div>
        </div>

        <textarea
          name="description"
          placeholder="Product description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <div>
          <button className="btn btn-green" type="submit">
            {editingId ? 'Update Product' : 'Add Product'}
          </button>

          {editingId && (
            <button
              className="btn btn-gold"
              type="button"
              onClick={resetForm}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="grid">
        {products.map(product => (
          <div key={product.id} className="card">
            <span className="badge">{product.category}</span>
            <h3>{product.name}</h3>
            <div className="image-preview-row">
    {[product.imageUrl1, product.imageUrl2, product.imageUrl3, product.imageUrl4]
      .filter(Boolean)
      .map((img, index) => (
        <img
          key={index}
          src={img}
          alt={product.name}
          className="product-preview-img"
        />
      ))}
  </div>
            <p>{product.description}</p>

            <p>
              <span style={{ textDecoration: 'line-through', color: '#777' }}>
                ₹{product.oldPrice}
              </span>{' '}
              <span className="price">₹{product.price}</span>
            </p>

            <p>Stock: {product.stock}</p>
            <p>Image: {product.imageUrl}</p>
            <p>Image 1: {product.imageUrl1}</p>
            <p>Image 2: {product.imageUrl2}</p>
            <p>Image 3: {product.imageUrl3}</p>
            <p>Image 4: {product.imageUrl4}</p>
            <button
              className="btn btn-green"
              onClick={() => handleEdit(product)}
            >
              Edit
            </button>

            <button
              className="btn btn-red"
              onClick={() => handleDelete(product.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}