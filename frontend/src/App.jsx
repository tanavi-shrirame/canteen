import { useState } from "react";
import "./index.css";

const foodItems = [
  { id: 1, name: "Veg Burger", price: 50, emoji: "🍔" },
  { id: 2, name: "Pizza", price: 80, emoji: "🍕" },
  { id: 3, name: "Sandwich", price: 60, emoji: "🥪" },
  { id: 4, name: "French Fries", price: 40, emoji: "🍟" },
  { id: 5, name: "Cold Coffee", price: 50, emoji: "🥤" },
  { id: 6, name: "Masala Dosa", price: 70, emoji: "🥞" },
];

function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState(null);

  const addToCart = (food) => {
    const existingItem = cart.find((item) => item.id === food.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...food, quantity: 1 }]);
    }
  };

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = () => {
    if (cart.length === 0) return;

    const newOrder = {
      number: Math.floor(Math.random() * 900) + 100,
      queue: Math.floor(Math.random() * 5) + 1,
    };

    setOrder(newOrder);
    setCart([]);
    setPage("queue");
  };

  return (
    <div className="app">

      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">🍔 CanteenQ</div>

        <nav>
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("menu")}>Menu</button>
          <button onClick={() => setPage("cart")}>
            Cart ({cart.length})
          </button>
          <button onClick={() => setPage("queue")}>
            Queue
          </button>
        </nav>
      </header>

      {/* HOME */}
      {page === "home" && (
        <main className="hero">

          <div className="hero-content">
            <p className="tagline">SMART COLLEGE CANTEEN</p>

            <h1>
              Order Food.
              <br />
              Skip the Queue.
            </h1>

            <p className="description">
              Choose your favourite food, place your order,
              and track your queue position without typing.
            </p>

            <button
              className="primary-btn"
              onClick={() => setPage("menu")}
            >
              🍔 Order Food
            </button>
          </div>

          <div className="hero-food">🍕</div>

        </main>
      )}

      {/* MENU */}
      {page === "menu" && (
        <main className="page">

          <h1>🍔 Today's Menu</h1>

          <p className="subtitle">
            Tap a food item to add it to your cart.
          </p>

          <div className="food-grid">

            {foodItems.map((food) => (
              <div className="food-card" key={food.id}>

                <div className="food-emoji">
                  {food.emoji}
                </div>

                <h2>{food.name}</h2>

                <p className="price">
                  ₹{food.price}
                </p>

                <button
                  className="add-btn"
                  onClick={() => addToCart(food)}
                >
                  + Add to Cart
                </button>

              </div>
            ))}

          </div>

        </main>
      )}

      {/* CART */}
      {page === "cart" && (
        <main className="page">

          <h1>🛒 Your Cart</h1>

          {cart.length === 0 ? (

            <div className="empty-box">

              <div className="empty-icon">🛒</div>

              <h2>Your cart is empty</h2>

              <button
                className="primary-btn"
                onClick={() => setPage("menu")}
              >
                Browse Menu
              </button>

            </div>

          ) : (

            <div className="cart-box">

              {cart.map((item) => (

                <div className="cart-item" key={item.id}>

                  <div className="cart-name">
                    {item.emoji} {item.name}
                  </div>

                  <div className="quantity">

                    <button
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>

                  </div>

                  <strong>
                    ₹{item.price * item.quantity}
                  </strong>

                </div>

              ))}

              <div className="total">
                <span>Total</span>
                <strong>₹{total}</strong>
              </div>

              <button
                className="primary-btn full-btn"
                onClick={placeOrder}
              >
                Place Order →
              </button>

            </div>

          )}

        </main>
      )}

      {/* QUEUE */}
      {page === "queue" && (
        <main className="page queue-page">

          <h1>📊 Queue Status</h1>

          {!order ? (

            <div className="empty-box">

              <div className="empty-icon">📋</div>

              <h2>No active order</h2>

              <button
                className="primary-btn"
                onClick={() => setPage("menu")}
              >
                Order Food
              </button>

            </div>

          ) : (

            <div className="queue-box">

              <div className="success-icon">✓</div>

              <h2>
                Order #{order.number}
              </h2>

              <p>
                Your order has been placed successfully!
              </p>

              <div className="queue-number">

                <span>You are</span>

                <strong>
                  {order.queue}
                </strong>

                <span>
                  in the queue
                </span>

              </div>

              <p>
                Estimated waiting time:
                {" "}
                {order.queue * 3} minutes
              </p>

              <button
                className="primary-btn"
                onClick={() => setPage("menu")}
              >
                Order More Food
              </button>

            </div>

          )}

        </main>
      )}

    </div>
  );
}

export default App;