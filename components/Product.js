import Image from 'next/image'
import Link from 'next/link'


const Product = ({ src, name, slug, price }) => {
  return (
    <div className="p-4 border rounded">
      <Image
          src={src}
          alt={name}
          width={350}
          height={250}
      />
      <h1 className="py-2">{name}</h1>
      <h1 className="py-2">Price: {price} Taka</h1>

<Link href={`/product/${slug}`}>
      <a className="btn-primary">Buy Now</a>
</Link>
    </div>
  )
}

export default Product