import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useAuth } from "../hooks/useAuth";
import SectionHeading from "./basic/SectionHeading";
import Card from "./basic/Card";
import Image from "./basic/Image";

const MyOrders: React.FC = () => {
  const { user } = useAuth();
  const orders = useSelector((state: RootState) => state.products.orders);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  if (!user)
    return (
      <div className="text-center text-gray-600 pt-20">
        Please log in to view your orders.
      </div>
    );

  return (
    <Card className="min-h-screen bg-white pt-20 pb-6 flex flex-col items-center">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
          My Orders
        </SectionHeading>
        {orders.length === 0 ? (
          <p className="text-gray-600 text-center">No orders found.</p>
        ) : (
          orders.map((order) => (
            <Card
              key={order.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow mb-4"
            >
              <div
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() =>
                  setExpandedOrder(expandedOrder === order.id ? null : order.id)
                }
                aria-expanded={expandedOrder === order.id}
                aria-label={`Toggle details for order from ${order.date}`}
              >
                <div className="text-sm sm:text-base">
                  <p className="font-semibold text-gray-800">
                    Order Date: {order.date}
                  </p>
                  <p className="text-gray-600">
                    Total Items: {order.totalItems}
                  </p>
                  <p className="text-gray-600">
                    Total Price: ${order.totalPrice.toFixed(2)}
                  </p>
                </div>
                <Card
                  animate={{ rotate: expandedOrder === order.id ? 180 : 0 }}
                  className="text-gray-600"
                >
                  ▼
                </Card>
              </div>
              {expandedOrder === order.id && (
                <Card
                  className="p-4 border-t border-gray-200"
                  animate={{ height: "auto" }}
                >
                  {order.items.map((item) => (
                    <Card
                      key={item.id}
                      className="flex items-center py-3 border-t border-gray-100"
                      animate={{ x: 0 }}
                    >
                      <Image
                        src={item.images[0]}
                        alt={item.title}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded mr-4"
                      />
                      <div className="text-sm sm:text-base">
                        <p className="font-semibold text-gray-800">
                          {item.title}
                        </p>
                        <p className="text-gray-600">Price: ${item.price}</p>
                        <p className="text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </Card>
                  ))}
                </Card>
              )}
            </Card>
          ))
        )}
      </div>
    </Card>
  );
};

export default React.memo(MyOrders);
