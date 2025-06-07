"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Restaurant Menu</h1>
                <p className="text-gray-600">Delicious meals crafted with love</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Open Daily</p>
                <p className="font-semibold text-gray-800">10:00 AM - 11:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="space-y-0">
        {/* Starters Section */}
        <section className="relative">
          <Image
            src="/images/menu-starters.png"
            alt="Cold and Hot Starters Menu"
            width={1200}
            height={800}
            className="w-full object-cover"
          />
        </section>

        {/* Chicken Corner Section - New Design */}
        <section className="relative">
          <Image
            src="/images/menu-chicken-new.png"
            alt="Chicken Corner Menu"
            width={1200}
            height={800}
            className="w-full object-cover"
          />
        </section>

        {/* Pizza Section - New Design */}
        <section className="relative">
          <Image
            src="/images/menu-pizza-new.png"
            alt="Pizzeria Hut Menu"
            width={1200}
            height={800}
            className="w-full object-cover"
          />
        </section>

        {/* Fish Corner Section - New Design */}
        <section className="relative">
          <Image
            src="/images/menu-fish-new.png"
            alt="Fish Corner Menu"
            width={1200}
            height={800}
            className="w-full object-cover"
          />
        </section>

        {/* Burgers & Curry Specials Section - New Design */}
        <section className="relative">
          <Image
            src="/images/menu-burgers-curry.png"
            alt="Burgers and Curry Specials Menu"
            width={1200}
            height={800}
            className="w-full object-cover"
          />
        </section>

        {/* Sandwiches & Wraps Section - New Design */}
        <section className="relative">
          <Image
            src="/images/menu-sandwiches-wraps.png"
            alt="Sandwiches and Wraps Menu"
            width={1200}
            height={800}
            className="w-full object-cover"
          />
        </section>

        {/* Goat Corner Section */}
        <section className="relative">
          <Image
            src="/images/menu-goat.png"
            alt="Goat Corner Menu"
            width={1200}
            height={800}
            className="w-full object-cover"
          />
        </section>

        {/* Pork Planet Section */}
        <section className="relative">
          <Image
            src="/images/menu-pork.png"
            alt="Pork Planet Menu"
            width={1200}
            height={800}
            className="w-full object-cover"
          />
        </section>

        {/* Local Health Kitchen Section - New Design */}
        <section className="relative">
          <Image
            src="/images/menu-local-health.png"
            alt="Local Health Kitchen Specials Menu"
            width={1200}
            height={800}
            className="w-full object-cover"
          />
        </section>

        {/* Snacks & Pastries Section - New Design */}
        <section className="relative">
          <Image
            src="/images/menu-snacks-new.png"
            alt="Snacks and Pastry Corner Menu"
            width={1200}
            height={800}
            className="w-full object-cover"
          />
        </section>

        {/* Fresh Healthy Juices Section */}
        <section className="relative">
          <Image
            src="/images/menu-juices.png"
            alt="Fresh Healthy Juices Menu"
            width={1200}
            height={800}
            className="w-full object-cover"
          />
        </section>

        {/* Beef Lovers & Steaks Section - New Design */}
        <section className="relative">
          <Image
            src="/images/menu-beef-new.png"
            alt="Beef Lovers and Steaks Menu"
            width={1200}
            height={800}
            className="w-full object-cover"
          />
        </section>
      </div>

      {/* Call to Action */}
      <div className="bg-white text-center py-16 px-8">
        <h3 className="text-3xl font-bold text-gray-800 mb-4">Ready to Order?</h3>
        <p className="text-lg text-gray-600 mb-8">Contact us to place your order or visit us at Fun & Fit Complex</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
          >
            📞 Call: 076 306 5220
          </Button>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
          >
            📞 Call: 070 151 8089
          </Button>
          <Button size="lg" variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50">
            📍 Visit Us
          </Button>
        </div>
      </div>
    </div>
  )
}
