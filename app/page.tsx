"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Coffee,
  Facebook,
  Instagram,
  MenuIcon,
  Phone,
  X,
  MapPin,
  Clock,
  Mail,
  ShieldCheck,
  CupSoda,
  Building,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import FeatureTiles from "@/components/FeatureTiles"
import GallerySection from "@/components/gallery-section"
import Reveal from "@/components/reveal"
import { useToast } from "@/hooks/use-toast"
import { SocialIcon } from "react-social-icons"

export default function Page() {
  return (
    <main className="bg-[#0d0d0e] text-zinc-200">
      <TopBar />
      <SiteHeader />
      <HeroSection />
      <AboutSection />
      <FeatureTiles />
      <MenuSection />
      <GallerySection />
      <ContactSection />
      <ReservationSection />
      <SiteFooter />
    </main>
  )
}

/* Top utility bar */
function TopBar() {
  return (
    <div className="hidden lg:block border-b border-white/5 bg-black/40">
      <div className="mx-auto max-w-7xl px-6 py-2 text-xs text-zinc-300 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-[#c7a17a]" />
            <span>Open: 6:30 AM – 8:30 PM</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 text-[#c7a17a]" />
            <a className="hover:text-white" href="tel:+1234567890">
              +1 (234) 567-890
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-3.5 w-3.5 text-[#c7a17a]" />
            <a className="hover:text-white" href="mailto:contact@76.com">
              contact@76.com
            </a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" aria-label="Instagram" className="hover:text-white">
            <Instagram className="h-4 w-4" />
          </a>
          <a href="#" aria-label="Facebook" className="hover:text-white">
            <Facebook className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  )
}

/* Header with navigation */
function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [targetCount, setTargetCount] = useState<number | null>(null)
  const [currentCount, setCurrentCount] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)

  async function fetchFollowerCount() {
    try {
      const response = await fetch(
        'https://www.pathsocial.com/wp-admin/admin-ajax.php?action=growth_page_rapid_search&account_handle=the.76.gafsa',
        {
          headers: {
            'Accept': 'application/json',
          },
        }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch follower count')
      }

      const data = await response.json()

      if (data.success && data.data) {
        const followersCount = data.data.followers_count
        const parsedCount =
          typeof followersCount === "string"
            ? parseFloat(followersCount.replace(/[^0-9.]/g, "")) *
              (followersCount.includes("K")
                ? 1000
                : followersCount.includes("M")
                ? 1000000
                : 1)
            : followersCount
        setTargetCount(parsedCount)
      } else {
        throw new Error('Invalid data format')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch follower count')
    }
  }

  useEffect(() => {
    fetchFollowerCount()
  }, [])

  useEffect(() => {
    if (targetCount !== null && currentCount < targetCount) {
      const interval = setInterval(() => {
        setCurrentCount((prev) => Math.min(prev + Math.ceil(targetCount / 100), targetCount))
      }, 50)
      return () => clearInterval(interval)
    }
  }, [targetCount, currentCount])

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0e0e10]">
      <div className="mx-auto max-w-7xl px-6 py-3 flex items-center">
        <Image
          src="/76/logo.png"
          alt="76 Cafe Resto Logo"
          width={40}
          height={40}
          className="h-10 w-10 rounded-full"
        />

        {/* Desktop Navigation */}
        <nav className="ml-10 hidden md:flex items-center gap-7 text-sm">
          <NavLink href="#">Home</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#menu">Menu</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <SocialIcon
            url="https://www.instagram.com/the.76.gafsa"
            target="_blank"
            bgColor="transparent"
            style={{ height: 30, width: 30 }}
            className="hover:opacity-75"
          />
          <span className="text-sm text-zinc-300">
            {error
              ? "Error"
              : targetCount !== null
              ? currentCount >= 1000
                ? `${(currentCount / 1000).toFixed(1)}K`
                : new Intl.NumberFormat().format(currentCount)
              : "Loading..."}
          </span>
          <Button
            asChild
            variant="outline"
            className="hidden sm:inline-flex border-[#c7a17a]/40 text-zinc-200 hover:text-black hover:bg-[#c7a17a] bg-transparent"
          >
            <Link href="#reservation">Reserve</Link>
          </Button>
          <Button className="hidden lg:inline-flex bg-[#c7a17a] text-black hover:bg-[#b6906b]">
            Book a Table
          </Button>

          {/* Hamburger Button */}
          <button
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[9999] transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Dark backdrop */}
        <div
          className="absolute inset-0 bg-black/60"
          onClick={() => setOpen(false)}
        />

        {/* Menu panel */}
        <div className="absolute right-0 top-0 h-full w-64 bg-[#0e0e10] shadow-lg flex flex-col p-6">
          <div className="flex justify-end items-center mb-6">
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="p-1 rounded-md hover:bg-white/10"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>

          <nav className="flex flex-col gap-4 text-sm">
            <MobileLink href="#" onClick={() => setOpen(false)}>Home</MobileLink>
            <MobileLink href="#about" onClick={() => setOpen(false)}>About</MobileLink>
            <MobileLink href="#menu" onClick={() => setOpen(false)}>Menu</MobileLink>
            <MobileLink href="#contact" onClick={() => setOpen(false)}>Contact</MobileLink>
            <Button asChild className="bg-[#c7a17a] text-black hover:bg-[#b6906b] mt-4">
              <Link href="#reservation" onClick={() => setOpen(false)}>Book a Table</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}



function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-zinc-300 hover:text-white transition-colors">
      {children}
    </Link>
  )
}
function MobileLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="rounded-md px-2 py-2 hover:bg-white/5">
      {children}
    </Link>
  )
}

/* Hero */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0">
        <video
          src="/76/Hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/25" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-36 flex flex-col items-center justify-center w-full">
        <Reveal
          as="p"
          y={8}
          delay={0}
          className="uppercase tracking-[0.25em] text-xs md:text-sm text-[#EDB95E] text-center"
        >
          Welcome to 76 Cafe Resto – Gafsa
        </Reveal>
        <Reveal
          as="h1"
          y={10}
          delay={80}
          className="mt-4 font-extrabold leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center"
        >
          Taste the World
          <br />
          In the Heart of Gafsa
        </Reveal>
        <Reveal
          as="p"
          y={12}
          delay={160}
          className="mt-5 max-w-xl text-zinc-300 text-center"
        >
          From authentic Tunisian specialties to international favorites,
          enjoy freshly prepared dishes, impeccable service, and a vibrant atmosphere.
        </Reveal>
        <Reveal
          as="div"
          y={14}
          delay={240}
          className="mt-8 flex flex-wrap gap-3 justify-center"
        >
          <Button
            className="bg-[#EDB95E] text-black hover:bg-[#d9a84f]"
            onClick={() => {
              const el = document.querySelector("#menu");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore Menu
          </Button>
          <Button
            variant="outline"
            className="border-[#EDB95E]/40 text-zinc-100 hover:bg-[#EDB95E] hover:text-black bg-transparent"
            onClick={() => {
              const el = document.querySelector("#reservation");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Reserve a Table
          </Button>
        </Reveal>
      </div>
    </section>
  )
}


/* About */
function AboutSection() {
  return (
    <section id="about" className="relative border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <Reveal
            as="p"
            y={8}
            className="uppercase tracking-[0.25em] text-xs text-[#EDB95E]"
          >
            About Us
          </Reveal>
          <Reveal
            as="h2"
            y={10}
            delay={70}
            className="mt-3 text-3xl sm:text-4xl font-bold"
          >
            A Culinary Journey in the Heart of Gafsa
          </Reveal>
          <Reveal
            as="p"
            y={12}
            delay={140}
            className="mt-5 text-zinc-300"
          >
            At <strong>76 Cafe Resto</strong>, we bring together the rich flavors of
            Tunisian tradition and the best of world cuisine. From freshly grilled
            meats to artisanal pizzas, vibrant salads, and indulgent desserts,
            every dish is crafted with care and served in a warm, elegant setting.
          </Reveal>

          <Reveal y={14} delay={210}>
            <blockquote className="mt-8 rounded-lg bg-[#2b231c]/40 border border-[#EDB95E]/20 p-5 text-sm">
              <p className="text-zinc-200 italic">
                {'"'}More than a restaurant — it’s where great food, beautiful
                ambiance, and attentive service come together.{'"'}
              </p>
            </blockquote>
          </Reveal>
        </div>
        <Reveal y={12} delay={120} className="relative">
          <div className="relative mx-auto max-w-lg">
            <Image
              src="/76/about.png" // Replace with an actual photo from the cafe
              alt="Interior of 76 Cafe Resto in Gafsa"
              width={520}
              height={520}
              className="mx-auto rounded-lg border border-white/5"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}


function TileCard({ title, icon, img }: { title: string; icon: React.ReactNode; img: string }) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-[#EDB95E]/20 shadow-lg">
      <Image
        src={img || "/placeholder.svg"}
        alt={title}
        width={640}
        height={320}
        className="h-44 md:h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/50 transition-colors duration-300 group-hover:bg-black/40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center gap-3 text-white/90">
          <span className="text-[#EDB95E] text-xl">{icon}</span>
          <span className="font-medium tracking-wide">{title}</span>
        </div>
      </div>
    </div>
  )
}


/* Menu */
function MenuSection() {
  const items = [
    {
      name: "Grilled Mix Platter",
      desc: "Selection of tender meats, seasonal vegetables, and house sauces",
      price: "38 DT",
    },
    {
      name: "76 Signature Pizza",
      desc: "Thin crust, rich tomato sauce, mozzarella, fresh toppings",
      price: "22 DT",
    },
    {
      name: "Tunisian Brik",
      desc: "Crispy pastry filled with egg, tuna, and herbs",
      price: "9 DT",
    },
    {
      name: "Fresh Fruit Cocktail",
      desc: "Refreshing seasonal fruits blended into a tropical mix",
      price: "12 DT",
    },
    {
      name: "Cappuccino",
      desc: "Velvety foam with rich espresso base",
      price: "7 DT",
    },
    {
      name: "Chocolate Fondant",
      desc: "Warm, gooey chocolate cake with vanilla ice cream",
      price: "15 DT",
    },
  ];

  return (
    <section id="menu" className="relative border-t border-white/5">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <div className="text-center">
          <Reveal
            as="p"
            y={8}
            className="uppercase tracking-[0.25em] text-xs text-[#EDB95E]"
          >
            Our Best Picks
          </Reveal>
          <Reveal
            as="h2"
            y={10}
            delay={70}
            className="mt-3 text-3xl sm:text-4xl font-bold"
          >
            76 Cafe Resto Signature Menu
          </Reveal>
        </div>

        <div className="mt-10 max-w-2xl mx-auto px-4 sm:px-0">
          <ul className="space-y-8">
            {items.map((it, i) => (
              <React.Fragment key={i}>
          <Reveal y={14} delay={i * 60}>
            <li className="group relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2.5 sm:before:top-3 before:w-2 before:h-2 before:rounded-full before:bg-[#EDB95E] hover:before:scale-150 before:transition-transform">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                <h3 className="font-medium text-lg sm:text-xl text-white tracking-wide group-hover:text-[#EDB95E] transition-colors pr-16 sm:pr-0">
            {it.name}
                </h3>
                <div className="flex items-center absolute sm:relative right-0 top-0 sm:top-auto">
            <div className="hidden sm:block h-px w-12 bg-[#EDB95E]/30 mx-4 group-hover:w-20 transition-all duration-300"></div>
            <span className="text-[#EDB95E] font-bold whitespace-nowrap text-base sm:text-lg">
              {it.price}
            </span>
                </div>
              </div>
              <p className="text-zinc-400 mt-1 sm:mt-2 pl-1 text-xs">{it.desc}</p>
            </li>
          </Reveal>
          {i < items.length - 1 && (
            <div className="border-t border-[#EDB95E]/20 mx-2" />
          )}
              </React.Fragment>
            ))}
          </ul>

        </div>
        <div className="mt-8 text-center">
          <Button className="bg-[#EDB95E] text-black hover:bg-[#d9a84f] px-8 py-3 text-base rounded-full shadow-md">
            View Full Menu
          </Button>
        </div>
      </div>
    </section>
  );
}

/* Contact */
function ContactSection() {
  const sendMessageToWhatsApp = async (data) => {
    const phoneNumber = "+21653400440";
    const message = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nMessage: ${data.message}`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    // Open WhatsApp URL in a new tab
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="contact" className="border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <Reveal
            as="p"
            y={8}
            className="uppercase tracking-[0.25em] text-xs text-[#EDB95E]"
          >
            We would be delighted to welcome you
          </Reveal>
          <Reveal
            as="h2"
            y={10}
            delay={70}
            className="mt-3 text-3xl sm:text-4xl font-bold"
          >
            Contact 76 Cafe Resto
          </Reveal>
          <Reveal
            as="p"
            y={12}
            delay={140}
            className="mx-auto mt-4 max-w-2xl text-zinc-400"
          >
            Reservations, events, or just want to say hello?
            Write to us or find us on the map.
          </Reveal>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2 items-start text-white">
          {/* Contact Form */}
          <Reveal y={14}>
            <Card className="bg-[#111215] border-white/5 text-white">
              <CardContent className="p-6 sm:p-8">
                <form
                  className="grid gap-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const data = Object.fromEntries(new FormData(form));
                    sendMessageToWhatsApp(data);
                    form.reset();
                  }}
                >
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required
                      className="bg-transparent"
                    />
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        className="bg-transparent"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+216 XX XXX XXX"
                        className="bg-transparent"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="How can we help you?"
                      rows={5}
                      className="resize-none bg-transparent"
                      required
                    />
                  </div>
                  <Button className="bg-[#EDB95E] text-black hover:bg-[#d8a94e]">
                    Send Message
                  </Button>
                </form>

                {/* Quick contact details */}
                <div className="mt-8 grid gap-3 text-sm text-zinc-300">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-[#EDB95E]" />
                    Rue Mongi Slim, Gafsa, Tunisia
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone className="h-4 w-4 text-[#EDB95E]" />
                    +216 98 123 456
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail className="h-4 w-4 text-[#EDB95E]" />
                    contact@76caferesto.com
                  </div>
                </div>
              </CardContent>
            </Card>
          </Reveal>

          {/* Google Map */}
          <Reveal y={14} delay={120}>
            <div className="relative">
              <div className="overflow-hidden rounded-xl border border-white/5">
                <iframe
                  title="76 Cafe Resto Gafsa - Google Map"
                  src="https://www.google.com/maps?q=76%20Cafe%20Resto%20Gafsa&output=embed"
                  className="h-[420px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="mt-4 rounded-lg bg-[#0f1113] p-4 text-sm text-zinc-400 border border-white/5">
                Located in the heart of Gafsa, with parking nearby. Perfect for a quick lunch or a friendly evening.
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}


/* Reservation (formerly CTA) */
function ReservationSection() {
  "use client"
  const [reservationSent, setReservationSent] = useState(false)
  const { toast } = useToast()
  const today = new Date().toISOString().split("T")[0]

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    const token = "8444561822:AAGagyXzlvzUbg1iA-2dbkt43FR3GfQErm0"
    const chatId = "5435317629"

    const message = `Reservation Request:\n\n` +
      `Name: ${data.name}\n` +
      `Phone: ${data.phone}\n` +
      `Email: ${data.email}\n` +
      `Party Size: ${data.party}\n` +
      `Date: ${data.date}\n` +
      `Time: ${data.time}\n` +
      `Special Requests: ${data.notes || "None"}`

    try {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      })

      setReservationSent(true)
      form.reset()
    } catch (error) {
      console.error("Failed to send reservation to Telegram:", error)
    }
  }

  return (
    <section id="reservation" aria-labelledby="reservation-title" className="relative border-t border-white/5">
      <div className="absolute inset-0">
        <Image
          src={"/76/res.png"}
          alt="Coffee shop background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0b0b0c]/75" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-20">
        <Reveal
          y={14}
          className="mx-auto w-full max-w-3xl rounded-xl border border-white/10 bg-[#0f1113]/90 p-6 shadow-xl backdrop-blur"
        >
          <div className="text-center">
            <p className="uppercase tracking-[0.25em] text-xs text-[#c7a17a]">Plan your visit</p>
            <h2 id="reservation-title" className="mt-2 text-2xl sm:text-3xl font-bold">
              Make a Reservation
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-zinc-400">
              Book your table in seconds. We&apos;ll confirm by phone or email.
            </p>
          </div>

          <form onSubmit={onSubmit} className="mt-8 grid gap-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="res-name">Name</Label>
                <Input id="res-name" name="name" placeholder="Your full name" required className="bg-transparent" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="res-phone">Phone</Label>
                <Input
                  id="res-phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 234 567 890"
                  required
                  className="bg-transparent"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="res-email">Email</Label>
                <Input
                  id="res-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="bg-transparent"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="res-party">Party size</Label>
                <Input
                  id="res-party"
                  name="party"
                  type="number"
                  min={1}
                  max={12}
                  step={1}
                  placeholder="2"
                  required
                  className="bg-transparent"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="res-date">Date</Label>
                <Input id="res-date" name="date" type="date" min={today} required className="bg-transparent" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="res-time">Time</Label>
                <Input
                  id="res-time"
                  name="time"
                  type="time"
                  step={900}
                  min="06:30"
                  max="21:30"
                  required
                  className="bg-transparent"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="res-notes">Special requests (optional)</Label>
              <Textarea
                id="res-notes"
                name="notes"
                rows={4}
                placeholder="Allergies, occasion, seating preference..."
                className="resize-none bg-transparent"
              />
            </div>

            <div className="mt-2 flex items-center justify-between">
              <p className="text-xs text-zinc-400">Open daily 6:30 AM – 9:30 PM</p>
              <Button className="bg-[#c7a17a] text-black hover:bg-[#b6906b]">Request Reservation</Button>
            </div>
          </form>

          {reservationSent && (
            <p className="mt-4 text-sm text-green-500 text-center">
              Your reservation has been sent successfully.
            </p>
          )}
        </Reveal>
      </div>
    </section>
  )
}
/* Footer */
function SiteFooter() {
  const gallery = new Array(6).fill(0).map((_, i) => ({
    src: `/images/76-gallery-${i + 1}.jpg` // Replace with real photos later
  }));
  return (
    <footer id="footer" className="border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 font-semibold">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#EDB95E] text-black">
          <Building className="h-4 w-4" />
              </span>
              76 Café Resto
            </div>
            <p className="mt-4 text-sm text-zinc-400">
              A stylish restaurant and event space in Gafsa, offering vibrant cuisine and a warm atmosphere. Perfect for dining or hosting your special moments.
            </p>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="font-semibold">Opening Hours</h3>
            <ul className="mt-4 space-y-2 text-sm text-zinc-400">
              <li>Every day: 5:00 AM – 12:00 AM</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold">Contact Us</h3>
            <ul className="mt-4 space-y-3 text-sm text-zinc-400">
              <li className="flex items-start gap-2">
          <MapPin className="h-4 w-4 text-[#EDB95E]" />
          P15, Gafsa Est, Gafsa Governorate, Tunisia
              </li>
              <li className="flex items-start gap-2">
          <Phone className="h-4 w-4 text-[#EDB95E]" />
          +216 98 204 202
              </li>
              <li className="flex items-start gap-2">
          <Mail className="h-4 w-4 text-[#EDB95E]" />
          (via our Facebook page)
              </li>
            </ul>
          </div>

          {/* Gallery */}
          <div>
            <h3 className="font-semibold">Gallery</h3>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
          <Image
            key={i}
            src={`/76/g${i}.png`}
            alt={`Gallery ${i}`}
            width={120}
            height={120}
            className="h-16 w-full rounded object-cover"
          />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/5 pt-6 text-xs text-zinc-500 flex flex-col sm:flex-row items-center gap-3 justify-between">
          <div>© 2025 76 Café Resto. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-zinc-300">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-zinc-300">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


