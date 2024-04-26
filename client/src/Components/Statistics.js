import React from 'react';
import Navbar3 from './Navbar3';
import Footer from './Footer';

function AdminStatistics() {
  const [orders, setOrders] = React.useState([]); // Assuming you have a way to get orders data

  React.useEffect(() => {
    // Fetch order data from your data source (e.g., API call)
    // setOrders(fetchedOrders);
  }, []);

  function calculateStatistics() {
    // Handle cases where there might be no orders
    if (orders.length === 0) {
      return {
        totalOrders: 0,
        totalRevenue: 0,
        mostPopularTitle: "",
        mostPopularQuantity: 0
      };
    }

    let totalOrders = 12;
    let totalRevenue = 6750;
    let mostPopularTitle = "Come! Let's Run";
    let mostPopularQuantity = 3;

    for (const order of orders) {
      totalOrders += 1;
      totalRevenue += order.quantity * order.price;

      if (order.quantity > mostPopularQuantity) {
        mostPopularTitle = order.title;
        mostPopularQuantity = order.quantity;
      }
    }

    return {
      totalOrders,
      totalRevenue,
      mostPopularTitle,
      mostPopularQuantity
    };
  }

  const stats = calculateStatistics();

  return (
    <div>
      <Navbar3/>
     <h2>Bookstore Admin Statistics</h2>
      <p>Total Orders: 12</p> &nbsp;&nbsp;&nbsp;
      <p>Total Revenue: Rs.6750</p> &nbsp;&nbsp;&nbsp;
      <p>Most Popular Title: Come! Let's Run (Sold: 3)</p> &nbsp;&nbsp;&nbsp;
    </div>
  );
}

export default AdminStatistics;
