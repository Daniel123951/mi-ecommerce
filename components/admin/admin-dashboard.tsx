"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  Plus, 
  Pencil, 
  Trash2, 
  LogOut, 
  Store, 
  Package, 
  DollarSign,
  Loader2,
  ImageIcon
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Product {
  id: string
  name: string
  description: string | null
  price: number
  discount_price: number | null
  category: string
  image_url: string | null
  stock: number
  featured: boolean
  is_new: boolean
  created_at: string
}

const CATEGORIES = ["Tecnología", "Accesorios", "Deportes", "Hogar", "Belleza", "Moda"]

interface AdminDashboardProps {
  initialProducts: Product[]
  userEmail: string
}

export function AdminDashboard({ initialProducts, userEmail }: AdminDashboardProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  const handleAddProduct = async (formData: FormData) => {
    setIsLoading(true)
    const supabase = createClient()

    const newProduct = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      discount_price: formData.get("discount_price") ? parseFloat(formData.get("discount_price") as string) : null,
      category: formData.get("category") as string,
      image_url: formData.get("image_url") as string || null,
      stock: parseInt(formData.get("stock") as string) || 0,
      featured: formData.get("featured") === "on",
      is_new: formData.get("is_new") === "on",
    }

    const { data, error } = await supabase
      .from("products")
      .insert(newProduct)
      .select()
      .single()

    if (!error && data) {
      setProducts([data, ...products])
      setIsAddOpen(false)
    }

    setIsLoading(false)
  }

  const handleUpdateProduct = async (formData: FormData) => {
    if (!editingProduct) return
    setIsLoading(true)
    const supabase = createClient()

    const updatedProduct = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      discount_price: formData.get("discount_price") ? parseFloat(formData.get("discount_price") as string) : null,
      category: formData.get("category") as string,
      image_url: formData.get("image_url") as string || null,
      stock: parseInt(formData.get("stock") as string) || 0,
      featured: formData.get("featured") === "on",
      is_new: formData.get("is_new") === "on",
    }

    const { error } = await supabase
      .from("products")
      .update(updatedProduct)
      .eq("id", editingProduct.id)

    if (!error) {
      setProducts(products.map(p => 
        p.id === editingProduct.id ? { ...p, ...updatedProduct } : p
      ))
      setEditingProduct(null)
    }

    setIsLoading(false)
  }

  const handleDeleteProduct = async (id: string) => {
    const supabase = createClient()
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id)

    if (!error) {
      setProducts(products.filter(p => p.id !== id))
    }
    setDeleteConfirm(null)
  }

  const totalStock = products.reduce((acc, p) => acc + p.stock, 0)
  const totalValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0)

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Store className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">LUXE Admin</h1>
              <p className="text-xs text-muted-foreground">{userEmail}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/">Ver Tienda</Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-4 md:p-6">
        {/* Stats */}
        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Productos
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Unidades en Stock
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStock}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Valor del Inventario
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totalValue.toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Productos</CardTitle>
              <CardDescription>Gestiona el inventario de tu tienda</CardDescription>
            </div>
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Producto
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Agregar Nuevo Producto</DialogTitle>
                  <DialogDescription>
                    Completa los datos del producto
                  </DialogDescription>
                </DialogHeader>
                <ProductForm 
                  onSubmit={handleAddProduct} 
                  isLoading={isLoading}
                  onCancel={() => setIsAddOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Imagen</TableHead>
                    <TableHead>Producto</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead className="text-right">Precio</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                    <TableHead className="text-center">Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        {product.image_url ? (
                          <Image
                            src={product.image_url}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="rounded-md object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                            <ImageIcon className="h-5 w-5 text-muted-foreground" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1">
                            {product.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                          {product.category}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div>
                          <div className="font-medium">${product.price}</div>
                          {product.discount_price && (
                            <div className="text-xs text-green-600">
                              ${product.discount_price}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={product.stock < 10 ? "text-destructive font-medium" : ""}>
                          {product.stock}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-1">
                          {product.featured && (
                            <span className="inline-flex items-center rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                              Destacado
                            </span>
                          )}
                          {product.is_new && (
                            <span className="inline-flex items-center rounded bg-green-500/10 px-1.5 py-0.5 text-[10px] font-medium text-green-600">
                              Nuevo
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Dialog 
                            open={editingProduct?.id === product.id} 
                            onOpenChange={(open) => !open && setEditingProduct(null)}
                          >
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => setEditingProduct(product)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                              <DialogHeader>
                                <DialogTitle>Editar Producto</DialogTitle>
                                <DialogDescription>
                                  Modifica los datos del producto
                                </DialogDescription>
                              </DialogHeader>
                              <ProductForm 
                                product={product}
                                onSubmit={handleUpdateProduct} 
                                isLoading={isLoading}
                                onCancel={() => setEditingProduct(null)}
                              />
                            </DialogContent>
                          </Dialog>
                          
                          <Dialog 
                            open={deleteConfirm === product.id} 
                            onOpenChange={(open) => !open && setDeleteConfirm(null)}
                          >
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-destructive hover:text-destructive"
                                onClick={() => setDeleteConfirm(product.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Eliminar Producto</DialogTitle>
                                <DialogDescription>
                                  ¿Estás seguro de que deseas eliminar &quot;{product.name}&quot;? Esta acción no se puede deshacer.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="flex justify-end gap-2 pt-4">
                                <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
                                  Cancelar
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  onClick={() => handleDeleteProduct(product.id)}
                                >
                                  Eliminar
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {products.length === 0 && (
              <div className="py-12 text-center">
                <Package className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-medium">No hay productos</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Comienza agregando tu primer producto
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

interface ProductFormProps {
  product?: Product
  onSubmit: (formData: FormData) => void
  isLoading: boolean
  onCancel: () => void
}

function ProductForm({ product, onSubmit, isLoading, onCancel }: ProductFormProps) {
  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(new FormData(e.currentTarget))
      }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Nombre del Producto *</Label>
        <Input 
          id="name" 
          name="name" 
          defaultValue={product?.name} 
          required 
          placeholder="Ej: Audífonos Bluetooth Pro"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea 
          id="description" 
          name="description" 
          defaultValue={product?.description || ""} 
          placeholder="Describe las características del producto..."
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Precio *</Label>
          <Input 
            id="price" 
            name="price" 
            type="number" 
            step="0.01"
            defaultValue={product?.price} 
            required 
            placeholder="0.00"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="discount_price">Precio con Descuento</Label>
          <Input 
            id="discount_price" 
            name="discount_price" 
            type="number" 
            step="0.01"
            defaultValue={product?.discount_price || ""} 
            placeholder="0.00"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Categoría *</Label>
          <Select name="category" defaultValue={product?.category || CATEGORIES[0]}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="stock">Stock</Label>
          <Input 
            id="stock" 
            name="stock" 
            type="number" 
            defaultValue={product?.stock || 0} 
            placeholder="0"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image_url">URL de la Imagen</Label>
        <Input 
          id="image_url" 
          name="image_url" 
          type="url"
          defaultValue={product?.image_url || ""} 
          placeholder="https://ejemplo.com/imagen.jpg"
        />
        <p className="text-xs text-muted-foreground">
          Puedes usar URLs de Unsplash u otro servicio de imágenes
        </p>
      </div>

      <div className="flex gap-6">
        <div className="flex items-center gap-2">
          <Checkbox 
            id="featured" 
            name="featured" 
            defaultChecked={product?.featured}
          />
          <Label htmlFor="featured" className="text-sm font-normal">
            Producto Destacado
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox 
            id="is_new" 
            name="is_new" 
            defaultChecked={product?.is_new}
          />
          <Label htmlFor="is_new" className="text-sm font-normal">
            Nuevo
          </Label>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Guardando...
            </>
          ) : product ? (
            "Guardar Cambios"
          ) : (
            "Agregar Producto"
          )}
        </Button>
      </div>
    </form>
  )
}
