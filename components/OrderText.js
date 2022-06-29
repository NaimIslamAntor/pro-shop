

const OrderText = ({order}) => {
  return (
    <div className="text-center pt-5 border-t-2">
        <h1>Payment status: {order.paymentStatus}</h1>
        <h1>payment method: {order.paymentType}</h1>
        <h1>Total amount: {order.totalPrice} BDT</h1>
        <h1>Delivers In: {order.deliversIn}</h1>
        <h1>Deliver status: {order.deliversStatus}</h1>
    </div>
  )
}

export default OrderText