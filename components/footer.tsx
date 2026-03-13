"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Instagram, Facebook, Twitter, Youtube, ArrowRight, Mail } from "lucide-react"

const footerLinks = {
  shop: [
    { name: "Novedades", href: "#" },
    { name: "Más Vendidos", href: "#" },
    { name: "Ofertas", href: "#" },
    { name: "Todas las Categorías", href: "#" },
  ],
  support: [
    { name: "Centro de Ayuda", href: "#" },
    { name: "Envíos", href: "#" },
    { name: "Devoluciones", href: "#" },
    { name: "Métodos de Pago", href: "#" },
  ],
  company: [
    { name: "Sobre Nosotros", href: "#" },
    { name: "Trabaja con Nosotros", href: "#" },
    { name: "Sostenibilidad", href: "#" },
    { name: "Prensa", href: "#" },
  ],
}

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
]

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
    }
  }

  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-16">
        {/* Newsletter Section */}
        <div className="mb-16 rounded-2xl bg-background/10 p-8 md:p-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 mb-4">
                <Mail className="size-4 text-primary" />
                <span className="text-sm font-medium text-primary">Newsletter</span>
              </div>
              <h2 className="text-2xl font-bold text-background md:text-3xl text-balance">
                Suscríbete y obtén un 15% de descuento
              </h2>
              <p className="mt-3 text-background/70">
                Recibe las últimas novedades, ofertas exclusivas y promociones directamente en tu correo.
              </p>
            </div>
            <div>
              {isSubscribed ? (
                <div className="rounded-xl bg-primary/20 p-6 text-center">
                  <div className="mb-2 text-2xl">🎉</div>
                  <p className="font-semibold text-background">¡Gracias por suscribirte!</p>
                  <p className="mt-1 text-sm text-background/70">
                    Revisa tu correo para recibir tu cupón de descuento.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col gap-3 sm:flex-row">
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 bg-background/10 border-background/20 text-background placeholder:text-background/50 focus-visible:ring-primary"
                  />
                  <Button type="submit" className="gap-2 px-6 font-semibold shrink-0">
                    Suscribirse
                    <ArrowRight className="size-4" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {/* Brand Column */}
          <div>
            <span className="text-2xl font-bold tracking-tight text-background">
              LUXE
            </span>
            <p className="mt-4 text-sm text-background/70 leading-relaxed">
              Tu destino para productos premium con diseño minimalista y calidad excepcional.
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="flex size-10 items-center justify-center rounded-full bg-background/10 text-background/70 transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <social.icon className="size-5" />
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-background/50">
              Tienda
            </h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-background/70 transition-colors hover:text-primary"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-background/50">
              Ayuda
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-background/70 transition-colors hover:text-primary"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-background/50">
              Empresa
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-background/70 transition-colors hover:text-primary"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-background/10 pt-8 sm:flex-row">
          <p className="text-sm text-background/50">
            © 2026 LUXE. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-background/50 hover:text-background">
              Privacidad
            </a>
            <a href="#" className="text-sm text-background/50 hover:text-background">
              Términos
            </a>
            <a href="#" className="text-sm text-background/50 hover:text-background">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
