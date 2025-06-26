/*import { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleOptionChange = (productId, optionIndex) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [productId]: optionIndex
    }));
  };

  const addToCart = (product) => {
    const selected = product.options[selectedOptions[product._id] || 0];
    const item = {
      productId: product._id,
      title: product.title,
      price: product.price,
      option: selected,
      image: product.image
    };
    setCart((prev) => [...prev, item]);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>🖼️ FilMak Studio Produkter</h1>

      {loading ? <p>Laddar produkter...</p> : (
        <div>
          {products.map((prod) => (
            <div key={prod._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
              <h2>{prod.title} - {prod.price} kr</h2>
              <img src={prod.image} alt={prod.title} width={150} />
              <p>{prod.description}</p>

              <label>
                Välj alternativ:
                <select
                  onChange={(e) => handleOptionChange(prod._id, e.target.value)}
                  style={{ marginLeft: '1rem' }}
                >
                  {prod.options.map((opt, i) => (
                    <option key={i} value={i}>
                      {opt.size} / {opt.paper} / {opt.finish}
                    </option>
                  ))}
                </select>
              </label>

              <button onClick={() => addToCart(prod)} style={{ marginLeft: '1rem' }}>
                🛒 Lägg till i varukorg
              </button>
            </div>
          ))}

          <hr />

          <h2>🛍️ Din varukorg ({cart.length})</h2>
          {cart.length === 0 ? (
            <p>Varukorgen är tom.</p>
          ) : (
            <ul>
              {cart.map((item, i) => (
                <li key={i} style={{ marginBottom: '1rem' }}>
                  <strong>{item.title}</strong> - {item.price} kr<br />
                  <small>{item.option.size}, {item.option.paper}, {item.option.finish}</small>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
*/

import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Laddar produkter...</p>;

  return (
    <div className="container">
      <h1>🛍️ FilMak Studio Produkter</h1>
      <div className="product-grid">
        {products.map((prod) => (
          <div key={prod._id} className="product-card">
            <img src={prod.image} alt={prod.title} />
            <h2>{prod.title}</h2>
            <p>{prod.description}</p>
            <p className="price">{prod.price} kr</p>
            <ul className="options">
              {prod.options.map((opt, i) => (
                <li key={i}>
                  📐 {opt.size} | 📄 {opt.paper} | ✨ {opt.finish}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

