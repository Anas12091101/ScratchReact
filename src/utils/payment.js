import { toast } from "react-hot-toast";

export async function createPayment(token, cardInfo) {
  const response = await fetch(
    "http://127.0.0.1:8000/subscription/create_paypal_order/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      // use the "body" param to optionally pass additional order information
      // like product skus and quantities
      body: JSON.stringify({
        price: cardInfo.price,
      }),
    }
  );
  const order = await response.json();
  return order.id;
}

export async function capturePayment(data, token, cardInfo, changeActive) {
  const response = await fetch(
    "http://127.0.0.1:8000/subscription/capture_paypal_order/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      // use the "body" param to optionally pass additional order information
      // like product skus and quantities
      body: JSON.stringify({
        orderId: data.orderID,
        memberId: cardInfo.id,
      }),
    }
  );
  const order = await response.json();
  const transaction = order.purchase_units[0].payments.captures[0];
  if (transaction.status === "COMPLETED") {
    toast.success("Congrats! You have successfully subscribed", {
      duration: 10000,
    });
    changeActive(cardInfo);
  } else toast.error(transaction.status, { duration: 5000 });
}
