import { bkash } from "../pages/checkout"

const BkashArea = ({ totalPrice, bkashNumber, setBkashNumber, trxId, setTrxId, addOrder }) => {
  return (
    <div>
        
{/* form starts here */}
<div className="w-5/6 mx-auto py-4 mt-4">

<h1 className="text-3xl text-center my-3">Please send <strong>{totalPrice()}</strong> 
BDT the fill the form below</h1>

{/* Bkash number container */}
<div className="py-2">

<div className="w-full py-2 md:py-0 px-2">
<label htmlFor="bkashNumber">Bkash number</label><br/>
<input type="number" id="bkashNumber" placeholder="Enter your bkash number after sending the required monry" 
className="border w-full h-8 rounded outline-none p-2 mt-2" onChange={e => setBkashNumber(e.target.value)}
 value={bkashNumber}/>
</div>


</div>



{/* trxId container */}
<div className="py-2">

<div className="w-full py-2 md:py-0 px-2">
<label htmlFor="trxId">Transaction id</label><br/>
<input type="text" id="trxId" placeholder="Enter the transactionId" 
className="border w-full h-8 rounded outline-none p-2 mt-2" onChange={e => setTrxId(e.target.value)}
 value={trxId}/>
</div>


</div>

<button className="btn-primary mt-4" onClick={() => addOrder(bkash)}>Place Order</button>


 </div>
    </div>
  )
}

export default BkashArea
