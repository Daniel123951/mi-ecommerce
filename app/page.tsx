import { createClient } from "@/lib/supabase/server"
import { StorePage } from "@/components/store-page"
import { Product } from "@/components/product-card"

export default async function HomePage() {
  const supabase = await createClient()
  
  const { data: dbProducts } = await supabase
    .from("products")
    .select("*")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false })

  // Transform database products to match the Product interface
  const products: Product[] = (dbProducts || []).map((p) => ({
    id: p.id,
    name: p.name,
    price: p.discount_price || p.price,
    originalPrice: p.discount_price ? p.price : undefined,
    image: p.image_url || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    category: p.category,
    isNew: p.is_new,
    isSale: !!p.discount_price,
  }))

  return <StorePage products={products} />
}
