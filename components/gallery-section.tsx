"use client"

import Image from "next/image"
import { useMemo } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import Reveal from "@/components/reveal"

type GalleryItem = {
  src: string
  alt: string
  tag?: string
  span?: string
}

export default function GallerySection() {
  const items = useMemo<GalleryItem[]>(
    () => [
      { src: "/76/g1.png", alt: "Gallery image 1" },
      { src: "/76/g2.png", alt: "Gallery image 2" },
      { src: "/76/g3.png", alt: "Gallery image 3" },
      { src: "/76/g4.png", alt: "Gallery image 4" },
      { src: "/76/g5.png", alt: "Gallery image 5" },
      { src: "/76/g6.png", alt: "Gallery image 6" },
    ],
    [],
  )



  return (
    <section id="gallery" className="border-t border-white/5 bg-[#0d0e10]">
      <style>{`
        @keyframes gallery-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div className="mx-auto max-w-7xl px-0 sm:px-2 py-16 sm:py-28">
        <div className="text-center mb-10">
          <Reveal as="h2" y={10} delay={70} className="text-3xl sm:text-5xl font-bold text-[#c7a17a] tracking-wide">
            Gallery
          </Reveal>
        </div>
        <div
          className="relative w-full overflow-hidden py-6"
          aria-label="Gallery carousel"
        >
          <div
            className="flex gap-8"
            style={{
              width: 'max-content',
              animation: 'gallery-scroll 50s linear infinite',
              display: 'flex',
            }}
          >
            {/* Repeat images for infinite effect */}
            {[...items, ...items].map((g, i) => (
              <div
                key={i}
                className="relative flex-shrink-0 rounded-2xl overflow-hidden border border-white/10 shadow-xl"
                style={{ width: 380, height: 260 }}
              >
                <Image
                  src={g.src || "/placeholder.svg"}
                  alt={g.alt}
                  fill
                  sizes="380px"
                  className="object-cover"
                  priority={i < 2}
                />
              </div>
            ))}
          </div>
        </div>

  {/* No modal or overlays, just the photos */}
      </div>
    </section>
  )
}
