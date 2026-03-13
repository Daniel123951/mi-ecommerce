-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  discount_price DECIMAL(10,2),
  category TEXT NOT NULL,
  image_url TEXT,
  stock INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read products (public store)
CREATE POLICY "Anyone can view products" ON public.products
  FOR SELECT USING (true);

-- Only authenticated users can insert/update/delete (for admin panel)
CREATE POLICY "Authenticated users can insert products" ON public.products
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update products" ON public.products
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete products" ON public.products
  FOR DELETE TO authenticated USING (true);

-- Insert sample products
INSERT INTO public.products (name, description, price, discount_price, category, image_url, stock, featured, is_new) VALUES
('Audífonos Premium', 'Audífonos inalámbricos con cancelación de ruido activa', 299.99, 249.99, 'Tecnología', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', 50, true, true),
('Smartwatch Elite', 'Reloj inteligente con monitor de salud avanzado', 399.99, NULL, 'Tecnología', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', 30, true, false),
('Chaqueta Minimalista', 'Chaqueta de diseño moderno en algodón orgánico', 189.99, 159.99, 'Ropa', 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop', 25, true, true),
('Bolso de Cuero', 'Bolso artesanal de cuero genuino italiano', 459.99, NULL, 'Accesorios', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop', 15, true, false),
('Lámpara de Diseño', 'Lámpara LED de mesa con diseño escandinavo', 129.99, 99.99, 'Hogar', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', 40, false, true),
('Zapatillas Running Pro', 'Zapatillas deportivas con tecnología de amortiguación', 179.99, NULL, 'Calzado', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', 60, true, false),
('Cámara Instantánea', 'Cámara retro con impresión instantánea', 149.99, 129.99, 'Tecnología', 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop', 20, false, true),
('Silla Ergonómica', 'Silla de oficina con soporte lumbar ajustable', 549.99, 499.99, 'Hogar', 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=400&fit=crop', 10, true, false),
('Gafas de Sol Premium', 'Gafas polarizadas con montura de titanio', 219.99, NULL, 'Accesorios', 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop', 35, false, false),
('Teclado Mecánico', 'Teclado gaming con switches Cherry MX', 159.99, 139.99, 'Tecnología', 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400&h=400&fit=crop', 45, false, true),
('Mochila Urban', 'Mochila resistente al agua con compartimento para laptop', 89.99, NULL, 'Accesorios', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop', 55, false, false),
('Jarrón Artesanal', 'Jarrón de cerámica hecho a mano', 79.99, 59.99, 'Hogar', 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&h=400&fit=crop', 20, false, true);
