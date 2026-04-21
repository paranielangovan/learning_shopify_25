import { useEffect, useState } from "react";

function App() {
  const [orders, setOrders] = useState([]);

  const [form, setForm] = useState({
    email: "",
    totalPrice: ""
  });

  // Fetch orders
  const fetchOrders = () => {
    fetch("http://localhost:8080/api/orders/orders")
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/orders/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: form.email,
        totalPrice: parseFloat(form.totalPrice)
      })
    })
      .then(res => res.json())
      .then(() => {
        fetchOrders(); // refresh list
        setForm({ email: "", totalPrice: "" });
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "20px", background: "#f5f5f5" }}>
      
      <h1 style={{ textAlign: "center" }}>🧾 Order Management</h1>

      {/* FORM */}
      <form 
        onSubmit={handleSubmit} 
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          marginBottom: "30px"
        }}
      >
        <input
          name="email"
          placeholder="Customer Email"
          value={form.email}
          onChange={handleChange}
          style={{ padding: "10px", width: "200px" }}
          required
        />

        <input
          name="totalPrice"
          placeholder="Total Price"
          value={form.totalPrice}
          onChange={handleChange}
          style={{ padding: "10px", width: "150px" }}
          required
        />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#000",
            color: "#fff",
            border: "none",
            cursor: "pointer"
          }}
        >
          Place Order
        </button>
      </form>

      {/* ORDER LIST */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px"
      }}>
        {orders.map(order => (
          <div key={order.id} style={{
            background: "#fff",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
          }}>
            <h3>📧 {order.email}</h3>
            <p>💰 Total: ₹{order.totalPrice}</p>
            <p>🆔 ID: {order.id}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;