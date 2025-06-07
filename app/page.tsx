"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Phone,
  MapPin,
  Clock,
  Users,
  Utensils,
  Wine,
  Waves,
  Calendar,
  Star,
  ChevronDown,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

export default function FunFitComplex() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: "exterior",
      title: "Fit & Fun Complex",
      subtitle: "Your Ultimate Entertainment Destination",
      description:
        "Experience the perfect blend of dining, sports, and relaxation all under one roof. Welcome to where fitness meets fun!",
      image: "/images/complex-exterior.jpg",
    },
    {
      id: "turf",
      title: "Professional Football Turf",
      subtitle: "FIFA-Standard Playing Surface",
      description:
        "Play on our premium artificial turf designed for optimal performance. Perfect for matches, training, and tournaments with professional lighting.",
      image: "/images/football-turf.jpg",
    },
    {
      id: "restaurant",
      title: "Gourmet Restaurant",
      subtitle: "Culinary Excellence Awaits",
      description:
        "Savor authentic local dishes and international cuisine prepared by our expert chefs. From traditional steamed meals to wood-fired pizzas.",
      image: "/images/chicken-corner-menu.jpg",
    },
    {
      id: "beef",
      title: "Premium Steaks & Grills",
      subtitle: "The Finest Cuts of Meat",
      description:
        "Indulge in our selection of premium beef cuts and expertly grilled steaks. Each dish is prepared to perfection with the finest ingredients.",
      image: "/images/beef-steak-menu.jpg",
    },
    {
      id: "health",
      title: "Local Health Kitchen",
      subtitle: "Traditional Wellness Cuisine",
      description:
        "Discover the authentic flavors of traditional steamed dishes prepared with fresh local ingredients for healthy, nutritious meals.",
      image: "/images/local-health-menu.jpg",
    },
    {
      id: "juices",
      title: "Fresh Healthy Juices",
      subtitle: "Natural Wellness in Every Sip",
      description:
        "Boost your health with our selection of fresh, cold-pressed juices made from premium fruits and vegetables. Perfect for detox and energy.",
      image: "/images/fresh-juices-menu.jpg",
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "restaurant", "turf", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000) // Increased to 6 seconds for better reading time
    return () => clearInterval(interval)
  }, [slides.length])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const currentSlideData = slides[currentSlide]

  const services = [
    {
      icon: Wine,
      title: "Premium Bar",
      description: "Enjoy our wide selection of drinks in a relaxed atmosphere",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Utensils,
      title: "Restaurant",
      description: "Delicious meals with diverse menu options to satisfy every taste",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Users,
      title: "Football Turf",
      description: "Professional quality turf for matches and training sessions",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Waves,
      title: "Sauna",
      description: "Relax and rejuvenate in our premium sauna facilities",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Calendar,
      title: "Meeting Point",
      description: "Perfect venue for events, meetings, and celebrations",
      color: "from-indigo-500 to-purple-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">F&F</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Fit & Fun Complex
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["home", "services", "restaurant", "turf", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors duration-200 ${
                    activeSection === section ? "text-purple-600 font-semibold" : "text-gray-600 hover:text-purple-600"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-purple-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {["home", "services", "restaurant", "turf", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-purple-600 capitalize w-full text-left"
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Slideshow Section */}
      <section id="home" className="pt-16 min-h-screen relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            {/* Background Image */}
            <div className="absolute inset-0 transition-opacity duration-1000">
              <Image
                src={currentSlideData.image || "/placeholder.svg"}
                alt={currentSlideData.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Slide Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                <div className="text-center">
                  <h1 className="text-5xl lg:text-7xl font-bold text-white mb-4 drop-shadow-lg">
                    {currentSlideData.title}
                  </h1>
                  <h2 className="text-2xl lg:text-3xl font-semibold text-purple-200 mb-6 drop-shadow-lg">
                    {currentSlideData.subtitle}
                  </h2>
                  <p className="text-lg lg:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
                    {currentSlideData.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg shadow-lg"
                      onClick={() => scrollToSection("services")}
                    >
                      Explore Services
                    </Button>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 text-lg shadow-lg"
                      onClick={() => scrollToSection("contact")}
                    >
                      Contact Us
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slideshow Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex items-center space-x-4">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Slide Indicators */}
            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Slide Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
          <div
            className="h-full bg-white transition-all duration-300 ease-out"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">Our Premium Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover a world of entertainment, dining, and relaxation all under one roof
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg overflow-hidden"
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurant Section */}
      <section id="restaurant" className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">Our Restaurant</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From authentic local dishes to international cuisine, our menu offers something special for every taste
            </p>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">12+</div>
                <div className="text-gray-600">Menu Categories</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">80+</div>
                <div className="text-gray-600">Delicious Dishes</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">Fresh</div>
                <div className="text-gray-600">Daily Ingredients</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">Local</div>
                <div className="text-gray-600">& International</div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800 text-center">Featured Categories</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                  <span className="font-medium text-gray-800">🍗 Chicken Corner</span>
                  <span className="text-orange-600 font-bold">From 20,000</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                  <span className="font-medium text-gray-800">🥩 Beef & Steak</span>
                  <span className="text-orange-600 font-bold">From 25,000</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                  <span className="font-medium text-gray-800">🥗 Health Kitchen</span>
                  <span className="text-orange-600 font-bold">From 10,000</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                  <span className="font-medium text-gray-800">🧃 Fresh Juices</span>
                  <span className="text-orange-600 font-bold">From 8,000</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                  <span className="font-medium text-gray-800">🍕 Pizzeria Hut</span>
                  <span className="text-orange-600 font-bold">From 25,000</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                  <span className="font-medium text-gray-800">🐟 Fish Corner</span>
                  <span className="text-orange-600 font-bold">From 25,000</span>
                </div>
              </div>
            </div>

            <div className="text-center pt-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3"
                onClick={() => (window.location.href = "/menu")}
              >
                View Full Menu
              </Button>
            </div>
          </div>

          {/* Menu Preview Gallery */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            <div className="relative group">
              <div className="aspect-square rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/chicken-corner-menu.jpg"
                  alt="Chicken Corner"
                  width={300}
                  height={300}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl flex items-end">
                <div className="p-4 text-white">
                  <h4 className="font-bold">Chicken Corner</h4>
                  <p className="text-sm text-white/80">Premium chicken dishes</p>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="aspect-square rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/beef-steak-menu.jpg"
                  alt="Beef & Steak"
                  width={300}
                  height={300}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl flex items-end">
                <div className="p-4 text-white">
                  <h4 className="font-bold">Beef & Steak</h4>
                  <p className="text-sm text-white/80">Premium cuts & steaks</p>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="aspect-square rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/local-health-menu.jpg"
                  alt="Health Kitchen"
                  width={300}
                  height={300}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl flex items-end">
                <div className="p-4 text-white">
                  <h4 className="font-bold">Health Kitchen</h4>
                  <p className="text-sm text-white/80">Local specialties</p>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="aspect-square rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/fresh-juices-menu.jpg"
                  alt="Fresh Juices"
                  width={300}
                  height={300}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl flex items-end">
                <div className="p-4 text-white">
                  <h4 className="font-bold">Fresh Juices</h4>
                  <p className="text-sm text-white/80">Healthy beverages</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Football Turf Section */}
      <section id="turf" className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative lg:order-1">
              <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <Image
                  src="/images/football-turf.jpg"
                  alt="Football Turf"
                  width={600}
                  height={400}
                  className="object-cover"
                />
              </div>
            </div>

            <div className="space-y-8 lg:order-2">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">Professional Football Turf</h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Play on our premium artificial turf designed for optimal performance and safety
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Star className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Premium Quality</h3>
                    <p className="text-gray-600">FIFA-standard artificial turf</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Flexible Hours</h3>
                    <p className="text-gray-600">Available for booking anytime</p>
                  </div>
                </div>

                <div className="p-6 bg-white rounded-xl shadow-lg">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">70,000</div>
                    <div className="text-gray-600">Per Hour</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-purple-900 to-pink-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Ready to experience the best entertainment complex? Contact us today!
            </p>
            <div className="mt-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3"
                onClick={() => (window.location.href = "/booking")}
              >
                Book Now
              </Button>
            </div>
          </div>

          <div className="mb-16">
            <div className="bg-white/10 backdrop-blur-md border-white/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-center mb-6">Find Us Here</h3>
              <div className="aspect-video rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7520872847654!2d32.6452480!3d0.3897150!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMjMnMjMuMCJOIDMywrAzOCc0Mi45IkU!5e0!3m2!1sen!2sug!4v1710927867634!5m2!1sen!2sug"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader className="text-center">
                <Phone className="h-12 w-12 text-purple-300 mx-auto mb-4" />
                <CardTitle>Call Us</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-2">
                <p>076 306 5220</p>
                <p>070 151 8089</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader className="text-center">
                <MapPin className="h-12 w-12 text-purple-300 mx-auto mb-4" />
                <CardTitle>Visit Us</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>Fit & Fun Complex</p>
                <p>Your Entertainment Destination</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white md:col-span-2 lg:col-span-1">
              <CardHeader className="text-center">
                <Clock className="h-12 w-12 text-purple-300 mx-auto mb-4" />
                <CardTitle>Opening Hours</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>Daily: 10:00 AM - 11:00 PM</p>
                <p>Always ready to serve you!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">F&F</span>
              </div>
              <span className="font-bold text-xl">Fun & Fit Complex</span>
            </div>
            <p className="text-gray-400 mb-4">Your ultimate destination for entertainment, dining, and sports</p>
            {/* <p className="text-gray-500">© 2025 Fit & Fun Complex. All rights reserved.</p> */}
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={() => scrollToSection("home")}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40"
      >
        <ChevronDown className="h-6 w-6 mx-auto transform rotate-180" />
      </button>
    </div>
  )
}
