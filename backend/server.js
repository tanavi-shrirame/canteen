const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./db");
const { Food, Order } = require("./models");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

/* HOME */

app.get("/", (req, res) => {
  res.json({
    message: "CanteenQ Backend is running!",
  });
});

/* GET FOOD */

app.get("/api/food", async (req, res) => {
  try {
    const food = await Food.find();
    res.json(food);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get food",
    });
  }
});

/* ADD FOOD */

app.post("/api/food", async (req, res) => {
  try {
    const food = await Food.create(req.body);

    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add food",
    });
  }
});

/* CREATE ORDER */

app.post("/api/orders", async (req, res) => {
  try {
    const queuePosition =
      (await Order.countDocuments({
        status: "Waiting",
      })) + 1;

    const order = await Order.create({
      orderNumber: Math.floor(Math.random() * 900) + 100,
      items: req.body.items,
      total: req.body.total,
      queuePosition: queuePosition,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create order",
    });
  }
});

/* GET ORDERS */

app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get orders",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});