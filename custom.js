require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Route to track order
app.post("/track", async (req, res) => {
  const { order_number, email } = req.body;

  try {
    // Fetch order using Shopify API (filter by email)
    const ordersRes = await axios.get(
      `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2023-10/orders.json?email=${email}&status=any`,
      {
        headers: {
          "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN,
        },
      }
    );

    const orders = ordersRes.data.orders;

    const order = orders.find((o) => o.name === `#${order_number}` || o.order_number == order_number);

    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }

    // Get fulfillment data
    const fulfillment = order.fulfillments[0];

    if (!fulfillment) {
      return res.json({ status: "Order placed, but not yet fulfilled." });
    }

    const trackingInfo = {
      tracking_number: fulfillment.tracking_number,
      tracking_url: fulfillment.tracking_url,
      status: fulfillment.shipment_status || "In Transit",
      line_items: order.line_items.map((item) => ({
        title: item.title,
        quantity: item.quantity,
      })),
      created_at: order.created_at,
      customer: order.customer,
    };

    res.json(trackingInfo);
  } catch (error) {
    console.error("Error tracking order:", error.response?.data || error.message);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
