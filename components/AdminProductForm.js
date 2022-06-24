import { useState } from 'react'
import axios from 'axios'
import { useEffect, useContext } from "react"
import { AuthenticationContext } from '../config/authContext'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminProductForm = () => {


  const [productName, setProductName] = useState('')
  const [productSlug, setProductSlug] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productImage, setProductImage] = useState([])
  const [productDescription, setProductDescription] = useState('')

  const [fileName, setFileName] = useState('')


  const {auth, setAuth} = useContext(AuthenticationContext)


  console.log(productImage[0])


  const postProduct = async e => {
    e.preventDefault()

    const fd = new FormData()

    fd.append('avatar', productImage)
    // fd.append('productName', productName)
    // fd.append('productSlug', productSlug)
    // fd.append('productPrice', productPrice)
    // fd.append('productDescription', productDescription)

    const creds = {
      productName,
      productSlug,
      productPrice,
      productDescription,
      fileName: `/imgs/${fileName}`,

    }

    // console.log(formData._boundary)

    const config1 = {
      headers: {
        "Content-Type": `multipart/form-data`,
         "Authorization": `Bearer ${auth.token}`,
      }
    }


    const config2 = {
      headers: {
         "Authorization": `Bearer ${auth.token}`,
      }
    }

    try {

      if (fileName === '') {
        const request1 = await axios.post('/api/admin/productimageupload', fd, config1)
        const { filename } = request1.data
  
        setFileName(filename)
        creds.fileName = `/imgs/${filename}`
      }

      const request2 = await axios.post('/api/admin/product', creds, config2)
      // const { filename } = request2.data


      toast.success(request2.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });



    } catch (error) {
      console.log(error.response)

      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });


    }
  }

  return (
    <div className="border w-full md:w-2/3 mt-4">

<ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>


          {/* form starts here */}
   <form className="w-5/6 mx-auto py-4 mt-4" method="POST" action="/api/filetest"
    encType="multipart/form-data" onSubmit={postProduct}>


{/* Product Name container */}
<div className="py-2">

<div className="w-full py-2 md:py-0 px-2">
<label htmlFor="productName">Product Name</label><br/>
<input type="text" id="productName" placeholder="Product Name" onChange={e => setProductName(e.target.value)}
className="border w-full h-8 rounded outline-none p-2 mt-2" />
</div>


</div>



{/* Product Slug container */}
<div className="py-2">

<div className="w-full py-2 md:py-0 px-2">
<label htmlFor="productSlug">Product Slug</label><br/>
<input type="text" id="productSlug" placeholder="Product Slug" onChange={e => setProductSlug(e.target.value)}
className="border w-full h-8 rounded outline-none p-2 mt-2" />
</div>


</div>


{/* Product Price container */}
<div className="py-2">

<div className="w-full py-2 md:py-0 px-2">
<label htmlFor="productPrice">Product Price</label><br/>
<input type="number" id="productPrice" placeholder="Product Price" onChange={e => setProductPrice(e.target.value)}
className="border w-full h-8 rounded outline-none p-2 mt-2" />
</div>


</div>


{/* Product file container */}
<div className="py-2">

<div className="w-full py-2 md:py-0 px-2">
<label htmlFor="productImage">Product Image</label><br/>
<input type="file" id="productImage" name="avatar" onChange={e => 
{
  setProductImage(e.target.files[0])
  setFileName('')
}}
className="w-full h-8 outline-none p-2 mt-2" />
</div>


</div>




{/* Product Price container */}
<div className="py-2">

<div className="w-full py-2 md:py-0 px-2">
<label htmlFor="productPrice">Product Description</label><br/>
<textarea  id="productDescription" className="border w-full 
 rounded outline-none p-2 mt-2" onChange={e => setProductDescription(e.target.value)} cols="30" rows="10"></textarea>
</div>


</div>



<button className="btn-primary mt-4">Post</button>


</form>

    </div>
  )
}

export default AdminProductForm