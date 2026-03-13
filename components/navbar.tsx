"use client"

import { useState } from "react"
import { Search, ShoppingCart, Menu, X, User, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

const categories = [
  { name: "Todos", href: "#" },
  { name: "Electrónica", href: "#" },
  { name: "Moda", href: "#" },
  { name: "Hogar", href: "#" },
  { name: "Deportes", href: "#" },
  { name: "Accesorios", href: "#" },
]

interface NavbarProps {
  cartCount: number
  onCartClick: () => void
}

export function Navbar({ cartCount, onCartClick }: NavbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight text-foreground">
              LUXE
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-1 text-sm font-medium">
                  Categorías
                  <ChevronDown className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {categories.map((category) => (
                  <DropdownMenuItem key={category.name} asChild>
                    <a href={category.href}>{category.name}</a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <a
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Novedades
            </a>
            <a
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Ofertas
            </a>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden flex-1 max-w-md px-8 lg:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar productos..."
                className="w-full pl-10 bg-secondary border-0"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="size-5" />
              <span className="sr-only">Buscar</span>
            </Button>

            {/* User */}
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <User className="size-5" />
              <span className="sr-only">Cuenta</span>
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={onCartClick}
            >
              <ShoppingCart className="size-5" />
              {cartCount > 0 && (
                <Badge className="absolute -right-1 -top-1 size-5 rounded-full p-0 text-xs flex items-center justify-center bg-primary text-primary-foreground">
                  {cartCount}
                </Badge>
              )}
              <span className="sr-only">Carrito</span>
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="size-5" />
                  <span className="sr-only">Menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetTitle className="text-lg font-semibold">Menú</SheetTitle>
                <nav className="mt-8 flex flex-col gap-4">
                  <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Categorías
                  </span>
                  {categories.map((category) => (
                    <a
                      key={category.name}
                      href={category.href}
                      className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {category.name}
                    </a>
                  ))}
                  <div className="my-4 h-px bg-border" />
                  <a
                    href="#"
                    className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                  >
                    Novedades
                  </a>
                  <a
                    href="#"
                    className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                  >
                    Ofertas
                  </a>
                  <a
                    href="#"
                    className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                  >
                    Mi Cuenta
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="border-t border-border py-3 lg:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar productos..."
                className="w-full pl-10 bg-secondary border-0"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
