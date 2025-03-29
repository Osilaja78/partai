"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { SlideIn } from "@/components/animations/slide-in";
import { Button } from "@/components/ui/button";
import { Users, Trophy, Target, Heart } from "lucide-react";
import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold">EventAI</Link>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <Link href="/#features" className="text-gray-300 hover:text-white">Features</Link>
                <Link href="/#pricing" className="text-gray-300 hover:text-white">Pricing</Link>
                <Link href="/about" className="text-gray-300 hover:text-white">About us</Link>
                <Button variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20">
                  View Source
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-60%,#3cba9140,transparent)]" />
        </div>
        
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h1 className="text-6xl font-bold text-center mb-8">Our Story</h1>
              <p className="text-xl text-gray-400 text-center max-w-3xl mx-auto">
                We're revolutionizing event planning with artificial intelligence, making it easier than ever to create memorable experiences.
              </p>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <SlideIn delay={0.1}>
              <div className="bg-black/50 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <Users className="h-12 w-12 text-emerald-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Customer First</h3>
                <p className="text-gray-400">Every decision we make starts with our customers' needs.</p>
              </div>
            </SlideIn>
            <SlideIn delay={0.2}>
              <div className="bg-black/50 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <Trophy className="h-12 w-12 text-emerald-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                <p className="text-gray-400">We strive for excellence in every aspect of our service.</p>
              </div>
            </SlideIn>
            <SlideIn delay={0.3}>
              <div className="bg-black/50 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <Target className="h-12 w-12 text-emerald-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-gray-400">Constantly pushing boundaries with AI technology.</p>
              </div>
            </SlideIn>
            <SlideIn delay={0.4}>
              <div className="bg-black/50 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <Heart className="h-12 w-12 text-emerald-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Passion</h3>
                <p className="text-gray-400">We're passionate about creating perfect events.</p>
              </div>
            </SlideIn>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-24 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-4xl font-bold text-center mb-16">Meet Our Team</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <SlideIn direction="up" delay={0.1}>
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-emerald-500/20 mx-auto mb-4" />
                <h3 className="text-xl font-semibold">Sarah Johnson</h3>
                <p className="text-emerald-500">CEO & Founder</p>
              </div>
            </SlideIn>
            <SlideIn direction="up" delay={0.2}>
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-emerald-500/20 mx-auto mb-4" />
                <h3 className="text-xl font-semibold">Michael Chen</h3>
                <p className="text-emerald-500">CTO</p>
              </div>
            </SlideIn>
            <SlideIn direction="up" delay={0.3}>
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-emerald-500/20 mx-auto mb-4" />
                <h3 className="text-xl font-semibold">Emily Rodriguez</h3>
                <p className="text-emerald-500">Head of Design</p>
              </div>
            </SlideIn>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <SlideIn direction="left">
              <div className="bg-emerald-500/10 rounded-2xl p-8">
                <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  To revolutionize event planning through artificial intelligence, making it accessible, efficient, and delightful for everyone. We believe in the power of technology to bring people together and create unforgettable moments.
                </p>
              </div>
            </SlideIn>
            <SlideIn direction="right">
              <div className="bg-emerald-500/10 rounded-2xl p-8">
                <h2 className="text-4xl font-bold mb-6">Our Vision</h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  To become the world's leading AI-powered event planning platform, helping millions of people create perfect events with ease. We envision a future where event planning is stress-free and enjoyable.
                </p>
              </div>
            </SlideIn>
          </div>
        </div>
      </div>
    </div>
  );
}