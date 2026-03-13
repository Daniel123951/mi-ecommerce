"use client"

import { Minus, Plus, X, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Product } from "@/components/product-card"

interface CartItem extends Product {
  quantity: number
}

interface CartSheetProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (productId: string | number, quantity: number) => void
  onRemoveItem: (productId: string | number) => void
}

export function CartSheet({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartSheetProps) {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shipping = subtotal > 500 ? 0 : 50
  const total = subtotal + shipping

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-xl">
            <ShoppingBag className="size-5" />
            Mi Carrito ({items.length})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <div className="rounded-full bg-muted p-6">
              <ShoppingBag className="size-12 text-muted-foreground" />
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">Tu carrito está vacío</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Agrega productos para empezar a comprar
              </p>
            </div>
            <Button onClick={onClose} className="mt-4">
              Continuar comprando
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 rounded-lg border border-border p-3"
                  >
                    <div className="size-20 shrink-0 overflow-hidden rounded-md bg-secondary">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="size-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-foreground line-clamp-1">
                            {item.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 shrink-0 text-muted-foreground hover:text-destructive"
                          onClick={() => onRemoveItem(item.id)}
                        >
                          <X className="size-4" />
                          <span className="sr-only">Eliminar</span>
                        </Button>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="size-7"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="size-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="size-7"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="size-3" />
                          </Button>
                        </div>
                        <span className="font-semibold text-foreground">
                          ${(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Footer */}
            <div className="border-t border-border pt-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Envío</span>
                  <span className="text-foreground">
                    {shipping === 0 ? (
                      <span className="text-primary font-medium">Gratis</span>
                    ) : (
                      `$${shipping}`
                    )}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Envío gratis en compras mayores a $500
                  </p>
                )}
                <div className="flex justify-between border-t border-border pt-2 text-lg font-semibold">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">${total.toLocaleString()}</span>
                </div>
              </div>
              <Button className="mt-4 w-full font-semibold" size="lg">
                Proceder al pago
              </Button>
              <Button
                variant="ghost"
                className="mt-2 w-full text-muted-foreground"
                onClick={onClose}
              >
                Continuar comprando
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
