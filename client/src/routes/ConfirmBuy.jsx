import React, { useContext } from "react";
import { AppContext } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ConfirmBuy = () => {
  const { cart, setCart, setRoute } = useContext(AppContext);

  const totalPrice = cart.reduce((acc, curr) => {
    return acc + curr.quantity * curr.price;
  }, 0);

  const confirm = () => {
    setCart((currentItems) => {
      return currentItems.map((item) => {
        return { ...item, quantity: 0, price: 0 };
      });
    });
    setRoute("home");
    toast.success(`Successful purchase`, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="rounded-lg border border-sky-600 p-4 flex flex-col gap-2">
        <table className="min-w-full divide-y divide-sky-600">
          <thead className="bg-gray-200">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
              >
                NAME
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
              >
                QUANTITY
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
              >
                PRICE
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {cart.map(
              (item) =>
                item.quantity !== 0 && (
                  <tr key={item.id}>
                    <td className="px-6 py-4  text-gray-800 whitespace-nowrap text-lg font-medium mt-2">
                      {item.name}
                    </td>
                    <td className="px-6 py-4  text-gray-800 whitespace-nowrap text-lg font-medium mt-2">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4  text-gray-800 whitespace-nowrap text-lg font-medium mt-2">
                      {item.price} €
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>

        <div className="border-t border-sky-600"></div>
        <div className="text-lg font-medium mt-2">
          <div className=" flex justify-end">
            <div>TOTAL: {totalPrice} €</div>
          </div>
        </div>
        <div className="border-t border-sky-600"></div>
        <button
          className="bg-sky-500 text-white py-3 px-4 rounded hover:bg-sky-700 transition"
          onClick={() => {
            confirm();
          }}
        >
          CONFIRM
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ConfirmBuy;
