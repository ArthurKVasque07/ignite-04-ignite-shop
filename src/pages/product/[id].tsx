import { useRouter } from "next/router"

export default function ProductPage() {
  const { query } = useRouter();

  return (
    <h1>{JSON.stringify(query)}</h1>
  )
}