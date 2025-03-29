"use client";

import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, Sparkles, Mail, Phone, MapPin, Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/animations/fade-in";
import { SlideIn } from "@/components/animations/slide-in";
import AppDownload from "@/components/app-download";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold">Partai</span>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <Link href="#features" className="text-gray-300 hover:text-white">Features</Link>
                <Link href="#pricing" className="text-gray-300 hover:text-white">Pricing</Link>
                <Link href="/about" className="text-gray-300 hover:text-white">About us</Link>
                {/* <Button variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20">
                  View Source
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Enhanced Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
          {/* Radial Gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-60%,#3cba9140,transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_80%_60%,#0ea5e940,transparent)]" />
        </div>
        
        <div className="relative pt-32 pb-20 sm:pt-48 sm:pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <FadeIn>
                <h1 className="text-7xl font-bold tracking-tight">
                  <span className="text-white">Intelligent</span>
                  <br />
                  <span className="text-emerald-500">Event Planning</span>
                  <br />
                  <span className="text-white">Assistant</span>
                </h1>
                
                <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto">
                  Transform your event planning with AI-powered scheduling, guest management, and venue recommendations.
                </p>
                
                <div className="mt-10 flex justify-center gap-4">
                  <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600">
                    Download
                  </Button>
                  <Button size="lg" variant="outline" className="bg-black/50">
                    Watch Demo
                  </Button>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <SlideIn delay={0.1}>
              <div className="bg-black/50 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <Calendar className="h-12 w-12 text-emerald-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Smart Scheduling</h3>
                <p className="text-gray-400">AI-powered date and time suggestions based on attendee preferences.</p>
              </div>
            </SlideIn>
            <SlideIn delay={0.2}>
              <div className="bg-black/50 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <Users className="h-12 w-12 text-emerald-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Guest Management</h3>
                <p className="text-gray-400">Automated RSVP tracking and guest list organization.</p>
              </div>
            </SlideIn>
            <SlideIn delay={0.3}>
              <div className="bg-black/50 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <Clock className="h-12 w-12 text-emerald-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
                <p className="text-gray-400">Instant notifications and schedule adjustments.</p>
              </div>
            </SlideIn>
            <SlideIn delay={0.4}>
              <div className="bg-black/50 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <Sparkles className="h-12 w-12 text-emerald-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Venue Matching</h3>
                <p className="text-gray-400">AI-recommended venues based on event requirements.</p>
              </div>
            </SlideIn>
          </div>
        </div>

        {/* Pricing Section */}
        <div id="pricing" className="relative py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
                <p className="text-gray-400">Choose the plan that best fits your needs</p>
              </div>
            </FadeIn>
            <div className="grid md:grid-cols-3 gap-8">
              <SlideIn direction="up" delay={0.1}>
                <div className="bg-black/50 backdrop-blur-sm p-8 rounded-xl border border-white/10">
                  <h3 className="text-2xl font-bold mb-2">Starter</h3>
                  <p className="text-4xl font-bold mb-6">$29<span className="text-lg text-gray-400">/month</span></p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center"><Sparkles className="h-5 w-5 text-emerald-500 mr-2" /> Up to 5 events/month</li>
                    <li className="flex items-center"><Users className="h-5 w-5 text-emerald-500 mr-2" /> 100 guests per event</li>
                    <li className="flex items-center"><Clock className="h-5 w-5 text-emerald-500 mr-2" /> Basic analytics</li>
                  </ul>
                  <Button className="w-full bg-emerald-500 hover:bg-emerald-600">Get Started</Button>
                </div>
              </SlideIn>
              <SlideIn direction="up" delay={0.2}>
                <div className="bg-emerald-500/10 backdrop-blur-sm p-8 rounded-xl border border-emerald-500/20">
                  <h3 className="text-2xl font-bold mb-2">Professional</h3>
                  <p className="text-4xl font-bold mb-6">$79<span className="text-lg text-gray-400">/month</span></p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center"><Sparkles className="h-5 w-5 text-emerald-500 mr-2" /> Unlimited events</li>
                    <li className="flex items-center"><Users className="h-5 w-5 text-emerald-500 mr-2" /> 500 guests per event</li>
                    <li className="flex items-center"><Clock className="h-5 w-5 text-emerald-500 mr-2" /> Advanced analytics</li>
                  </ul>
                  <Button className="w-full bg-emerald-500 hover:bg-emerald-600">Get Started</Button>
                </div>
              </SlideIn>
              <SlideIn direction="up" delay={0.3}>
                <div className="bg-black/50 backdrop-blur-sm p-8 rounded-xl border border-white/10">
                  <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                  <p className="text-4xl font-bold mb-6">Custom</p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center"><Sparkles className="h-5 w-5 text-emerald-500 mr-2" /> Custom solutions</li>
                    <li className="flex items-center"><Users className="h-5 w-5 text-emerald-500 mr-2" /> Unlimited guests</li>
                    <li className="flex items-center"><Clock className="h-5 w-5 text-emerald-500 mr-2" /> Priority support</li>
                  </ul>
                  <Button className="w-full bg-emerald-500 hover:bg-emerald-600">Contact Sales</Button>
                </div>
              </SlideIn>
            </div>
          </div>
        </div>

        <AppDownload />

        {/* Contact Section */}
        <div id="contact" className="relative py-24 bg-black/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16">
              <SlideIn direction="left">
                <div>
                  <h2 className="text-4xl font-bold mb-8">Get in Touch</h2>
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <Mail className="h-6 w-6 text-emerald-500 mr-4" />
                      <p>contact@eventai.com</p>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-6 w-6 text-emerald-500 mr-4" />
                      <p>+1 (555) 123-4567</p>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-6 w-6 text-emerald-500 mr-4" />
                      <p>123 AI Street, Tech City, TC 12345</p>
                    </div>
                  </div>
                </div>
              </SlideIn>
              <SlideIn direction="right">
                <div className="space-y-4">
                  <input type="text" placeholder="Name" className="w-full p-3 bg-black/50 rounded-lg border border-white/10" />
                  <input type="email" placeholder="Email" className="w-full p-3 bg-black/50 rounded-lg border border-white/10" />
                  <textarea placeholder="Message" rows={4} className="w-full p-3 bg-black/50 rounded-lg border border-white/10" />
                  <Button className="w-full bg-emerald-500 hover:bg-emerald-600">Send Message</Button>
                </div>
              </SlideIn>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-black/80 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">Product</h4>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-gray-400 hover:text-white">Features</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white">Pricing</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white">API</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-gray-400 hover:text-white">About</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white">Blog</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white">Careers</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-gray-400 hover:text-white">Documentation</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white">Help Center</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white">Status</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-gray-400 hover:text-white">Privacy</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white">Terms</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white">Security</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex justify-between items-center">
                <p className="text-gray-400">&copy; 2024 Partai. All rights reserved.</p>
                <div className="flex space-x-6">
                  <Link href="#" className="text-gray-400 hover:text-white">
                    <Twitter className="h-6 w-6" />
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    <Linkedin className="h-6 w-6" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}