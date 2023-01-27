import { stripe } from "@/lib/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router"
import { useState } from "react";
import Stripe from "stripe";

interface ProductPageProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    description: string
    defaultPriceId: string
  }
}

export default function ProductPage({ product }: ProductPageProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  const { isFallback } = useRouter();

  async function handleBuyButton() {
    try {
      setIsCreatingCheckoutSession(true)
      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId
      })

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)
      alert(err)
    }
  }

  if(isFallback) {
    return <p>Loading page...</p>
  }

  return (
    <>
      <Head>
          <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} alt="Camiseta" width={520} height={480} />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <h1>{product.price}</h1>

          <p>{product.description}</p>

          <button disabled={isCreatingCheckoutSession} onClick={handleBuyButton}>Comprar agora</button>
        </ProductDetails>
      </ProductContainer>
    </>
   
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_MLH5Wy0Y97hDAC' } },
    ],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1 // 1 hours
  }
}