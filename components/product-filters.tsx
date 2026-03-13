"use client"

import { useState } from "react"
import { SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"

const categories = [
  { id: "all", label: "Todos los productos" },
  { id: "electronics", label: "Electrónica" },
  { id: "fashion", label: "Moda" },
  { id: "home", label: "Hogar" },
  { id: "sports", label: "Deportes" },
  { id: "accessories", label: "Accesorios" },
]

interface ProductFiltersProps {
  selectedCategories: string[]
  onCategoryChange: (categories: string[]) => void
  priceRange: [number, number]
  onPriceChange: (range: [number, number]) => void
  maxPrice: number
}

export function ProductFilters({
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceChange,
  maxPrice,
}: ProductFiltersProps) {
  const handleCategoryToggle = (categoryId: string) => {
    if (categoryId === "all") {
      onCategoryChange([])
      return
    }

    if (selectedCategories.includes(categoryId)) {
      onCategoryChange(selectedCategories.filter((c) => c !== categoryId))
    } else {
      onCategoryChange([...selectedCategories, categoryId])
    }
  }

  const FiltersContent = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Categorías
        </h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center gap-3">
              <Checkbox
                id={category.id}
                checked={
                  category.id === "all"
                    ? selectedCategories.length === 0
                    : selectedCategories.includes(category.id)
                }
                onCheckedChange={() => handleCategoryToggle(category.id)}
                className="border-muted-foreground/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label
                htmlFor={category.id}
                className="cursor-pointer text-sm font-medium text-foreground"
              >
                {category.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Rango de Precio
        </h3>
        <div className="px-1">
          <Slider
            value={priceRange}
            onValueChange={(value) => onPriceChange(value as [number, number])}
            max={maxPrice}
            step={10}
            className="mb-4"
          />
          <div className="flex items-center justify-between text-sm">
            <span className="rounded-md bg-secondary px-3 py-1.5 font-medium text-foreground">
              ${priceRange[0]}
            </span>
            <span className="text-muted-foreground">—</span>
            <span className="rounded-md bg-secondary px-3 py-1.5 font-medium text-foreground">
              ${priceRange[1]}
            </span>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          onCategoryChange([])
          onPriceChange([0, maxPrice])
        }}
      >
        Limpiar filtros
      </Button>
    </div>
  )

  return (
    <>
      {/* Desktop Filters */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Filtros</h2>
            <SlidersHorizontal className="size-5 text-muted-foreground" />
          </div>
          <FiltersContent />
        </div>
      </aside>

      {/* Mobile Filters */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="gap-2 lg:hidden">
            <SlidersHorizontal className="size-4" />
            Filtros
            {selectedCategories.length > 0 && (
              <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                {selectedCategories.length}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80">
          <SheetTitle className="text-lg font-semibold">Filtros</SheetTitle>
          <div className="mt-8">
            <FiltersContent />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
