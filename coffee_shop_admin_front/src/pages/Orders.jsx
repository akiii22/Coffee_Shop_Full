import OrderList from "../components/OrderList";

function Orders() {
  return (
    <div className="min-h-screen bg-[#f8f5f2] p-6 font-sans">
      <h1 className="mb-6 text-center text-3xl font-bold text-[#4b2e05]">
        Orders Dashboard
      </h1>
      <OrderList />
    </div>
  );
}

export default Orders;
