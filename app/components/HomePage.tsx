"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  BarChart3, 
  CheckCircle2, 
  ChevronRight, 
  Clock3, 
  Command, 
  Droplet, 
  Globe2, 
  Menu, 
  MessageSquare, 
  Package, 
  ShieldCheck, 
  ShoppingCart, 
  Star, 
  Store,
  Users, 
  Wrench, 
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SponsorType } from "@/lib/types";

let counter = 0
const generateId =()=> `${counter++}`;
export default function LandingPage() {
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


const sponsors:SponsorType[] = [{
id:generateId(),
icon:Droplet,
label:"AquaWares",
color:"blue"
},
{
id:generateId(),
icon:Store,
label:"UrbanRetail",
color:"red"
},
{
id:generateId(),
icon:Wrench,
label:"BuildMat",
color:"green"
},
{
id:generateId(),
icon:Globe2,
label:"GlobalTrade",
color:"orange"
},
{
id:generateId(),
icon:ShieldCheck,
label:"SecurePos",
color:"blue"
},
{
id:generateId(),
icon:Package,
label:"BoxStock",
color:"red"
}
]
  return (
    <div className="min-h-screen bg-slate-50 font-sans dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      
      {/* ======================= */}
      {/* NAVIGATION */}
      {/* ======================= */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <Command className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              CCK Retail
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400">Features</Link>
            <Link href="#reviews" className="text-sm font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400">Reviews</Link>
            <Link href="#contact" className="text-sm font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400">Contact</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Log in</Link>
            </Button>
            <Button className="bg-indigo-600 text-white hover:bg-indigo-700" asChild>
              <Link href="/auth/register">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600 dark:text-slate-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-6 dark:border-slate-800 dark:bg-slate-950 md:hidden">
            <div className="flex flex-col gap-4">
              <Link href="#features" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium">Features</Link>
              <Link href="#reviews" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium">Reviews</Link>
              <Link href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium">Contact</Link>
              <hr className="my-2 border-slate-200 dark:border-slate-800" />
              <Button variant="outline" className="w-full justify-center" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button className="w-full justify-center bg-indigo-600 text-white" asChild>
                <Link href="/new_sale">Get Started</Link>
              </Button>
            </div>
          </div>
        )}
      </nav>

      <main>
        {/* ======================= */}
        {/* HERO SECTION */}
        {/* ======================= */}
        <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]"></div>
          
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            
            <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-7xl">
              The modern manager for <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-sky-500">ambitious retailers</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              Manage inventory, process sales instantly, track pending payments, and scale your storefront—all from one lightning-fast platform built for modern commerce.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto bg-indigo-600 text-white hover:bg-indigo-700 h-12 px-8 text-base">
                <Link href={"/auth/register"} className="flex gap-2 items-center justify-center">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base">
                Book a Demo
              </Button>
            </div>
             <div className="mt-16 mx-auto max-w-5xl rounded-xl border border-slate-200/50 bg-white/50 p-2 shadow-2xl backdrop-blur-sm dark:border-slate-800/50 dark:bg-slate-900/50">
  <div className="aspect-video w-full rounded-lg border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-950 flex flex-col overflow-hidden">
    
    {/* Mac OS Window Controls */}
    <div className="h-10 w-full border-b border-slate-200 dark:border-slate-800 flex items-center px-4 gap-2 bg-white dark:bg-slate-900 z-50">
      <div className="h-3 w-3 rounded-full bg-rose-400"></div>
      <div className="h-3 w-3 rounded-full bg-amber-400"></div>
      <div className="h-3 w-3 rounded-full bg-emerald-400"></div>
    </div>
    
    {/* SaaS Interactive Overlapping Layout */}
    <div className="relative flex-1 w-full bg-slate-50 dark:bg-slate-900/50 overflow-hidden flex items-center justify-center p-4">
      
      {/* Left Supporting Image: Products */}
      <div className="absolute left-[-15%] md:left-4 top-1/2 -translate-y-1/2 w-[70%] md:w-[45%] rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl z-10 opacity-70 transition-all duration-500 hover:translate-y-[-55%] hover:scale-105 hover:opacity-100 hover:z-30 bg-white dark:bg-slate-950 group">
        <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors z-20"></div>
        <div className="aspect-4/3 relative w-full overflow-hidden rounded-xl">
          <Image
            src="/products.jpeg"
            alt="Products Dashboard Preview"
            fill
            className="object-cover object-top"
            unoptimized
          />
        </div>
      </div>

      {/* Right Supporting Image: Stock */}
      <div className="absolute right-[-15%] md:right-4 top-1/2 -translate-y-1/2 w-[70%] md:w-[45%] rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl z-10 opacity-70 transition-all duration-500 hover:translate-y-[-55%] hover:scale-105 hover:opacity-100 hover:z-30 bg-white dark:bg-slate-950 group">
        <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors z-20"></div>
        <div className="aspect-4/3 relative w-full overflow-hidden rounded-xl">
          <Image
            src="/stock.jpeg"
            alt="Stock Dashboard Preview"
            fill
            className="object-cover object-top"
            unoptimized
          />
        </div>
      </div>

      {/* Center Main Image: Sale (Prominent) */}
      <div className="relative w-[85%] md:w-[60%] rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xl z-20 transition-transform duration-700 hover:scale-[1.02] bg-white dark:bg-slate-950">
        <div className="aspect-16/10 relative w-full overflow-hidden rounded-xl ring-1 ring-black/5 dark:ring-white/10">
          <Image
            src="/sale.jpeg"
            alt="Sale Dashboard Preview"
            fill
            className="object-cover object-top"
            unoptimized
          />
        </div>
      </div>

    </div>
  </div>
</div>
          </div>
        </section>

        
        <section className="border-y border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-950/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm font-semibold uppercase tracking-wider text-slate-500">
              Trusted by leading retailers and luxury showrooms
            </p>
            <div className="mt-8 flex overflow-hidden">
              <div className="flex gap-10 animate-infinite-scroll">
              {
                [...sponsors, ...sponsors].map((sponsor,idx) => {
                  const Icon = sponsor.icon
                 return (<div key={`sponsor.id-${idx}`} className="flex gap-2 items-center justify-center">
                    <Icon className={`size-8 text-${sponsor.color}-500`} />
                    <span className="text-xl font-medium">{sponsor.label}</span>
                  </div>)
                })
              }
              </div>
            </div>
          </div>
        </section>

        {/* ======================= */}
        {/* FEATURES SECTION */}
        {/* ======================= */}
        <section id="features" className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Everything you need to run your store
              </h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                Stop juggling multiple spreadsheets and legacy software. CCK Retail brings your entire workflow into one unified interface.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                  <ShoppingCart className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">Lightning Fast POS</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Process transactions in seconds. Easily add products, handle variants, and apply custom discounts on the fly without leaving the screen.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
                  <Clock3 className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">Pending Orders & Drafts</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Never lose a potential sale. Save carts as drafts, manage partial payments, and track outstanding balances seamlessly until completion.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400">
                  <Package className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">Smart Inventory</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Keep real-time track of your stock levels. Support for complex variants (size, color, material) ensures your database always matches reality.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">Actionable Analytics</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Make data-driven decisions with built-in dashboards. Track daily revenue, top-selling items, and staff performance in real-time.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">Customer CRM</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Build lasting relationships. Save customer details, track purchase history, and generate digital receipts instantly for a premium experience.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">Multi-Tenant Architecture</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Expand from one shop to a franchise. Complete data isolation, staff role management, and scalable infrastructure to grow with your business.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ======================= */}
        {/* REVIEWS & TESTIMONIALS */}
        {/* ======================= */}
        <section id="reviews" className="bg-slate-100 py-24 dark:bg-slate-900/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Loved by store owners
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "CCK Retail completely changed how we handle our plumbing inventory. Managing variants for different pipe sizes used to be a nightmare, but now it's effortless.",
                  name: "Michael O.",
                  role: "Owner, Prime Pipes & Hardware",
                  rating: 5
                },
                {
                  quote: "The pending sales feature is a lifesaver. We do a lot of layaway and installment payments, and tracking outstanding balances is finally automated and accurate.",
                  name: "Sarah T.",
                  role: "Manager, Luxe Wares",
                  rating: 5
                },
                {
                  quote: "Fastest POS I've ever used. The UI is clean, my cashiers learned it in 10 minutes, and the end-of-day revenue reports are always spot on.",
                  name: "David K.",
                  role: "Director, Urban Supply Co.",
                  rating: 5
                }
              ].map((review, i) => (
                <div key={i} className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                  <div>
                    <div className="flex items-center gap-1 mb-4 text-amber-500">
                      {[...Array(review.rating)].map((_, idx) => (
                        <Star key={idx} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 italic mb-6">
                      &ldquo;{review.quote}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold dark:bg-indigo-900 dark:text-indigo-300">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{review.name}</h4>
                      <p className="text-xs text-slate-500">{review.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ======================= */}
        {/* CONTACT & CTA */}
        {/* ======================= */}
        <section id="contact" className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-3xl bg-indigo-600 shadow-xl dark:bg-indigo-900">
              <div className="grid lg:grid-cols-2">
                <div className="p-10 lg:p-16 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Ready to upgrade your store?
                  </h2>
                  <p className="mt-4 text-lg text-indigo-100">
                    Get in touch with our team for a personalized demo, or create an account to start exploring the system instantly.
                  </p>
                  
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Button className="bg-white text-indigo-600 hover:bg-slate-50 h-12 px-8 text-base">
                      Create Free Account
                    </Button>
                  </div>

                  <div className="mt-10 flex flex-col gap-4 text-indigo-100">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-5 w-5" />
                      <span>support@cckretail.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                      <span>24/7 Priority Support</span>
                    </div>
                  </div>
                </div>
                
                {/* Contact Form Half */}
                <div className="bg-white p-10 lg:p-16 dark:bg-slate-950">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Send us a message</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">First Name</label>
                        <input type="text" className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Last Name</label>
                        <input type="text" className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Work Email</label>
                      <input type="email" className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
                      <textarea rows={4} className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700"></textarea>
                    </div>
                    <Button type="button" className="w-full bg-indigo-600 text-white hover:bg-indigo-700 h-10">
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

     
      <footer className="border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-indigo-600 text-white">
                  <Command className="h-4 w-4" />
                </div>
                <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                  CCK Retail
                </span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Empowering modern retailers with robust point of sale and inventory management tools.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Features</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Pricing</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Hardware Integration</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Changelog</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Documentation</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Help Center</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Retail Blog</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Contact Sales</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 flex flex-col md:flex-row items-center justify-between border-t border-slate-200 pt-8 dark:border-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              © {new Date().getFullYear()} CCK Retail. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0 text-slate-400">
              <Link href="#" className="hover:text-slate-600 dark:hover:text-slate-300">
                
              </Link>
              {/* Add more social icons as needed */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
