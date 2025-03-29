"use client"

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Apple, SmartphoneIcon as Android } from "lucide-react";
import { motion } from "framer-motion";
import Screen1 from "../assets/screen1.jpg";
// import { useInView } from "react-intersection-observer";

export default function AppDownload() {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   })

  return (
    <section id="download" className="relative first-line:py-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-40">
      <div className="container mx-auto px-4">
        <motion.div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Download Our <span className="text-neon">Mobile App</span>
            </motion.h2>
            <motion.p
              className="text-gray-400 mb-8 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Get the full EventAI experience on your mobile device. Available for both iOS and Android platforms.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size='lg' className="bg-emerald-500 hover:bg-emerald-600">
                  <Apple className="h-5 w-5" />
                  <div>
                    <div className="text-xs">Download on the</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size='lg' className="bg-emerald-500 hover:bg-emerald-600">
                  <Android className="h-5 w-5" />
                  <div>
                    <div className="text-xs">Get it on</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative h-[500px] w-full">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-[280px] h-[560px] rounded-[40px] border-4 border-gray-800 overflow-hidden relative"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(46, 229, 157, 0.3)",
                      "0 0 40px rgba(46, 229, 157, 0.6)",
                      "0 0 20px rgba(46, 229, 157, 0.3)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  <Image
                    src={Screen1}
                    alt="EventAI Mobile App"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
