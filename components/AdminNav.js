import Link from 'next/link'


const AdminNav = () => {
  return (
    <div className="border w-full md:w-1/5 flex flex-col gap-4 mt-4">

    <Link href="/admin/product">
          <a className="px-4 py-2 uppercase btn-primary text-center" >
            Product
          </a>
    </Link>

    </div>
  )
}

export default AdminNav