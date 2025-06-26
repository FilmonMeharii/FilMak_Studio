import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const addToCart = (product) => {
    const existing = JSON.parse(localStorage.getItem('cart')) || [];
    localStorage.setItem('cart', JSON.stringify([...existing, product]));
    alert('Produkt tillagd i varukorg!');
  };

  if (loading) return <p>Laddar produkter...</p>;

  return (
    <div>
      <h1>🖼️ FilMak Studio Produkter</h1>
      <button onClick={() => navigate('/cart')}>Gå till Varukorg</button>
      <ul>
        {products.map(prod => (
          <li key={prod._id} style={{ margin: '20px 0' }}>
            <h2>{prod.title} - {prod.price} kr</h2>
            <img src={prod.image} alt={prod.title} width={150} />
            <p>{prod.description}</p>
            <button onClick={() => addToCart(prod)}>Lägg till i varukorg</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
