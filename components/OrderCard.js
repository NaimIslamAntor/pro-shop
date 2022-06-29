import OrderImg from './OrderImg'
import OrderText from './OrderText'



const OrderCard = ({order}) => {
  return (
    <div className='m-4 p-4 border border-r-8'>
        <div className="flex justify-center items-center flex-wrap max-w-full gap-4">

        {
          order.products.map(order => <OrderImg order={order} key={order.id}/>)
        }
        
      
        </div>
        <OrderText order={order}/>
    </div>
  )
}

export default OrderCard