import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(items);
  }, []);

  const removeFromCart = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <h1>🧺 Din Varukorg</h1>
      <button onClick={() => navigate('/')}>← Tillbaka till produkter</button>
      {cart.length === 0 ? (
        <p>Din varukorg är tom.</p>
      ) : (
        <ul>
          {cart.map((item, i) => (
            <li key={i} style={{ marginBottom: '20px' }}>
              <h2>{item.title} - {item.price} kr</h2>
              <img src={item.image} width={100} />
              <p>{item.description}</p>
              <button onClick={() => removeFromCart(i)}>Ta bort</button>
            </li>
          ))}
        </ul>
      )}
      <h3>Totalt: {total} kr</h3>
    </div>
  );
}

export default Cart;
