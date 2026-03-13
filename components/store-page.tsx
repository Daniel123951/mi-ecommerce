"use client"

import { useState, useMemo } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ProductCard, Product } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { CartSheet } from "@/components/cart-sheet"
import { Footer } from "@/components/footer"

// Map display categories to filter IDs
const categoryMap: Record<string, string> = {
  "Tecnología": "electronics",
  "Moda": "fashion",
  "Hogar": "home",
  "Deportes": "sports",
  "Accesorios": "accessories",
  "Belleza": "beauty",
}

interface CartItem extends Product {
  quantity: number
}

interface StorePageProps {
  products: Product[]
}

export function StorePage({ products }: StorePageProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500])

  const maxPrice = Math.max(...products.map((p) => p.originalPrice || p.price), 1500)

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategories.length > 0) {
        const productCategoryId = categoryMap[product.category]
        if (!selectedCategories.includes(productCategoryId)) {
          return false
        }
      }

      // Price filter
      const productPrice = product.price
      if (productPrice < priceRange[0] || productPrice > priceRange[1]) {
        return false
      }

      return true
    })
  }, [selectedCategories, priceRange, products])

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const handleUpdateQuantity = (productId: string | number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const handleRemoveItem = (productId: string | number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />

      <main>
        <HeroSection />

        {/* Products Section */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4">
            {/* Section Header */}
            <div className="mb-10 text-center">
              <span className="text-sm font-medium uppercase tracking-wider text-primary">
                Selección Exclusiva
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Productos Destacados
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                Descubre nuestra colección cuidadosamente seleccionada de productos premium
              </p>
            </div>

            {/* Filters + Grid */}
            <div className="flex flex-col gap-8 lg:flex-row">
              {/* Filters */}
              <ProductFilters
                selectedCategories={selectedCategories}
                onCategoryChange={setSelectedCategories}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                maxPrice={maxPrice}
              />

              {/* Products Grid */}
              <div className="flex-1">
                {/* Mobile Filter Button + Results Count */}
                <div className="mb-6 flex items-center justify-between lg:mb-0 lg:hidden">
                  <ProductFilters
                    selectedCategories={selectedCategories}
                    onCategoryChange={setSelectedCategories}
                    priceRange={priceRange}
                    onPriceChange={setPriceRange}
                    maxPrice={maxPrice}
                  />
                  <span className="text-sm text-muted-foreground">
                    {filteredProducts.length} productos
                  </span>
                </div>

                {/* Desktop Results Count */}
                <div className="mb-6 hidden items-center justify-between lg:flex">
                  <span className="text-sm text-muted-foreground">
                    Mostrando {filteredProducts.length} de {products.length} productos
                  </span>
                </div>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="mb-4 rounded-full bg-muted p-6">
                      <svg
                        className="size-12 text-muted-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      No se encontraron productos
                    </h3>
                    <p className="mt-1 text-muted-foreground">
                      Intenta ajustar los filtros para ver más resultados
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <CartSheet
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  )
}
