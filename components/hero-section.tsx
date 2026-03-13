"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-foreground">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
      
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:py-32 lg:py-40">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="text-center lg:text-left">
            <span className="inline-block rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              Nueva Colección 2026
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-background sm:text-5xl lg:text-6xl text-balance">
              Diseño que inspira, calidad que perdura
            </h1>
            <p className="mt-6 text-lg text-background/70 max-w-xl mx-auto lg:mx-0 text-pretty">
              Descubre nuestra selección exclusiva de productos premium. Estilo minimalista 
              con la más alta calidad para tu día a día.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="gap-2 text-base font-semibold px-8">
                Explorar Colección
                <ArrowRight className="size-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base font-semibold px-8 border-background/20 text-background bg-transparent hover:bg-background/10 hover:text-background"
              >
                Ver Ofertas
              </Button>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 rounded-3xl bg-primary/30 blur-3xl" />
              <div className="relative grid grid-cols-2 gap-4 p-4">
                <div className="space-y-4">
                  <div className="aspect-[3/4] rounded-2xl bg-background/10 backdrop-blur-sm border border-background/10 flex items-center justify-center">
                    <div className="text-center p-4">
                      <div className="size-16 mx-auto rounded-xl bg-primary/20 mb-3" />
                      <span className="text-sm text-background/80">Tecnología</span>
                    </div>
                  </div>
                  <div className="aspect-square rounded-2xl bg-primary flex items-center justify-center">
                    <span className="text-xl font-bold text-primary-foreground">-40%</span>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="aspect-square rounded-2xl bg-background/10 backdrop-blur-sm border border-background/10 flex items-center justify-center">
                    <div className="text-center p-4">
                      <div className="size-16 mx-auto rounded-xl bg-background/20 mb-3" />
                      <span className="text-sm text-background/80">Moda</span>
                    </div>
                  </div>
                  <div className="aspect-[3/4] rounded-2xl bg-background/10 backdrop-blur-sm border border-background/10 flex items-center justify-center">
                    <div className="text-center p-4">
                      <div className="size-16 mx-auto rounded-xl bg-background/20 mb-3" />
                      <span className="text-sm text-background/80">Hogar</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
