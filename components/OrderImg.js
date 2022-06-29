import Image from 'next/image'

const OrderImg = ({order}) => {
  return (
    
    <div className="">
    <Image
        src={order.productImage}
        alt={order.productName}
        width={100}
        height={100}
    />
    <h1 className="text-xl">{order.productName}</h1>
    <p>Price: {order.productPrice} BDT</p>
    <p>Quantity: {order.qty}</p>
</div>
  )
}

export default OrderImg