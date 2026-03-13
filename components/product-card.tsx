"use client"

import { useState } from "react"
import { ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface Product {
  id: string | number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  isNew?: boolean
  isSale?: boolean
}

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-xl bg-card border border-border transition-all duration-300 hover:shadow-lg hover:border-primary/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-primary text-primary-foreground">Nuevo</Badge>
          )}
          {product.isSale && (
            <Badge className="bg-foreground text-background">-{discount}%</Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute right-3 top-3 size-9 rounded-full bg-background/80 backdrop-blur-sm transition-all hover:bg-background",
            isLiked ? "text-destructive" : "text-muted-foreground"
          )}
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart className={cn("size-5", isLiked && "fill-current")} />
          <span className="sr-only">Añadir a favoritos</span>
        </Button>

        {/* Quick Add Button */}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 p-3 transition-all duration-300",
            isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          )}
        >
          <Button
            className="w-full gap-2 font-semibold"
            onClick={() => onAddToCart(product)}
          >
            <ShoppingCart className="size-4" />
            Agregar al carrito
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {product.category}
        </span>
        <h3 className="mt-1 font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <div className="mt-auto pt-3 flex items-center gap-2">
          <span className="text-lg font-bold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
