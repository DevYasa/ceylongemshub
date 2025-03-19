import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaMedal, FaGem, FaCertificate, FaHandshake, FaQuoteLeft } from 'react-icons/fa';
import Signature from '../assets/signature.png';
import Haris from '../assets/haris.jpg';
import Yasir from '../assets/yasir.jpg';
import John from '../assets/john.jpg';
import Sarah from '../assets/sarah.jpg';
import Ring from '../assets/ring.jpg';

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

function AboutUs() {
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  const testimonialsRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const storyInView = useInView(storyRef, { once: true, margin: "-100px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  const teamInView = useInView(teamRef, { once: true, margin: "-100px" });
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: "-100px" });

  // Team member data
  const teamMembers = [
    {
      name: "Haris Yusuf",
      role: "Founder & Master Gemologist",
      image: Haris, // Replace with actual path
      description: "With over 25 years of experience in gemology, Haris brings unparalleled expertise from the heart of Sri Lanka's gem industry."
    },
    {
      name: "Mohamed Yasir",
      role: "Lead Jewelry Designer",
      image: Yasir, // Replace with actual path
      description: "Combining Eastern and Western design philosophies, Yasir creates pieces that bridge cultures and traditions."
    },
    {
      name: "John Patrick",
      role: "Chief Craftsman",
      image: John, // Replace with actual path
      description: "A third-generation jeweler, John's hands bring our most intricate designs to life with precision and artistry."
    },
    {
      name: "Sarah Tan",
      role: "Customer Experience Director",
      image: Sarah, // Replace with actual path
      description: "Sarah ensures that each client's journey with us is as brilliant as our gems, from consultation to aftercare."
    }
  ];

  // Company values
  const companyValues = [
    {
      icon: <FaGem className="text-amber-500" size={28} />,
      title: "Exceptional Quality",
      description: "We source only the finest gemstones, certified for authenticity and quality, to create jewelry of unparalleled excellence."
    },
    {
      icon: <FaCertificate className="text-amber-500" size={28} />,
      title: "Ethical Sourcing",
      description: "Every gem in our collection is ethically sourced with full traceability, ensuring fair practices throughout our supply chain."
    },
    {
      icon: <FaMedal className="text-amber-500" size={28} />,
      title: "Artisanal Craftsmanship",
      description: "Our master craftsmen blend traditional techniques with modern innovation to create timeless pieces that will be cherished for generations."
    },
    {
      icon: <FaHandshake className="text-amber-500" size={28} />,
      title: "Personalized Service",
      description: "We believe in building relationships that last a lifetime, offering personalized consultations and exceptional aftercare."
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <div ref={heroRef} className="relative bg-gray-900 text-white">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/90"></div>
          <div className="absolute inset-0 bg-repeat opacity-10" style={{
            backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cGF0aCBkPSJNMjAgMEwwIDIwTDIwIDQwTDQwIDIwTDIwIDBaIiBmaWxsPSIjZDk3NzA2Ii8+PC9zdmc+')",
            backgroundSize: "30px 30px"
          }} />
        </div>

        <div className="container mx-auto px-6 py-32 relative z-10">
          <motion.div 
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={fadeUp} className="inline-block mb-4">
              <div className="w-20 h-20 relative mx-auto mb-6">
                <div className="absolute inset-0 border-2 border-amber-400 transform rotate-45"></div>
                <div className="absolute inset-3 border border-amber-500/50 transform rotate-45"></div>
                <div className="absolute inset-0 flex items-center justify-center text-amber-400 font-serif text-2xl">CG</div>
              </div>
            </motion.div>

            <motion.h1 
              variants={fadeUp} 
              className="text-5xl font-serif font-bold mb-6"
            >
              Our <span className="text-amber-400">Story</span>
            </motion.h1>
            
            <motion.div variants={fadeUp} className="w-20 h-px bg-amber-500 mx-auto mb-8"></motion.div>
            
            <motion.p variants={fadeUp} className="text-xl text-gray-300 mb-8 leading-relaxed">
              Bringing the finest gems from Ceylon to Malaysia, with a heritage of craftsmanship spanning generations.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Our Story Section */}
      <div ref={storyRef} className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              animate={storyInView ? "visible" : "hidden"}
              variants={fadeUp}
              className="relative"
            >
              <div className="relative z-10 overflow-hidden rounded-lg shadow-xl">
                <img 
                  src={Ring} // Replace with actual image
                  alt="Ceylon Gems Workshop" 
                  className="w-full h-auto object-cover"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 right-8 bottom-12 border border-amber-400/40 rounded-lg"></div>
              <div className="absolute -bottom-4 -right-4 left-8 top-12 border border-amber-300/30 rounded-lg"></div>
              
              <div className="absolute -bottom-6 -right-6 bg-amber-100 w-32 h-32 rounded-lg"></div>
              <div className="absolute -top-2 right-1/2 transform translate-x-1/2 translate-y-1/2 w-16 h-16 border-2 border-amber-400 rounded-full"></div>
            </motion.div>

            <motion.div 
              initial="hidden"
              animate={storyInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="space-y-6"
            >
              <motion.div variants={fadeUp} className="mb-4">
                <div className="w-16 h-px bg-amber-600"></div>
                <h2 className="text-4xl font-serif font-bold mt-5 mb-8">A Legacy of Exceptional Craftsmanship</h2>
              </motion.div>
              
              <motion.p variants={fadeUp} className="text-gray-700 leading-relaxed">
                Founded in 2010 by Haris Yusuf, Ceylon Gems & Jewelry Hub began as a vision to bring the extraordinary gemstones of Sri Lanka to the Malaysian market. With a family heritage in gemology spanning three generations, Rajith combined his deep knowledge of precious stones with a passion for exquisite craftsmanship.
              </motion.p>
              
              <motion.p variants={fadeUp} className="text-gray-700 leading-relaxed">
                What started as a small workshop in Kuala Lumpur has flourished into a premier jewelry house, known for our commitment to quality, ethical sourcing, and breathtaking designs that honor both traditional and contemporary aesthetics.
              </motion.p>
              
              <motion.p variants={fadeUp} className="text-gray-700 leading-relaxed">
                Today, we connect the rich gemstone heritage of Ceylon with the diverse cultural landscape of Malaysia, creating pieces that celebrate momentous occasions and become treasured heirlooms.
              </motion.p>
              
              <motion.div variants={fadeUp} className="pt-6">
                <img 
                  src={Signature} // Replace with founder's signature
                  alt="Founder's Signature" 
                  className="h-16 w-auto"
                />
                <p className="text-gray-500 mt-2">Haris Yusuf, Founder</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div ref={valuesRef} className="py-24 bg-gradient-to-b from-neutral-50 to-white relative">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-100 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-amber-100 rounded-full opacity-30 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <motion.div variants={fadeUp} className="w-16 h-px bg-amber-600 mx-auto mb-8"></motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl font-serif font-bold mb-6">Our Core Values</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-600 text-lg">
              These principles guide every decision we make and piece we create, ensuring that our jewelry not only looks exceptional but is created with integrity.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {companyValues.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 transition-transform duration-300 hover:transform hover:scale-105"
              >
                <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-6 mx-auto">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">{value.title}</h3>
                <p className="text-gray-600 text-center">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Our Team Section */}
      <div ref={teamRef} className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            animate={teamInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <motion.div variants={fadeUp} className="w-16 h-px bg-amber-600 mx-auto mb-8"></motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl font-serif font-bold mb-6">Meet Our Artisans</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-600 text-lg">
              The passionate individuals behind our exceptional jewelry, bringing expertise, creativity, and dedication to every piece.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            animate={teamInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="relative group"
              >
                <div className="relative overflow-hidden rounded-lg">
                  <div className="aspect-w-3 aspect-h-4 bg-gray-100">
                    <img 
                      src={member.image}
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Overlay with details on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h4 className="text-xl font-semibold text-white">{member.name}</h4>
                    <p className="text-amber-400 mb-4">{member.role}</p>
                    <p className="text-gray-300 text-sm">{member.description}</p>
                  </div>
                </div>
                
                {/* Information visible by default */}
                <div className="mt-4 group-hover:opacity-0 transition-opacity duration-300">
                  <h4 className="text-xl font-semibold">{member.name}</h4>
                  <p className="text-amber-600">{member.role}</p>
                </div>
                
                {/* Gold corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-400 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-400 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div ref={testimonialsRef} className="py-24 bg-gray-50 relative">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-amber-100 rounded-full opacity-20 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            animate={testimonialsInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <motion.div variants={fadeUp} className="w-16 h-px bg-amber-600 mx-auto mb-8"></motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl font-serif font-bold mb-6">Client Testimonials</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-600 text-lg">
              Hear from our valued clients about their experience with Ceylon Gems & Jewelry Hub.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            animate={testimonialsInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  name: "Lisa Wong",
                  role: "Entrepreneur",
                  quote: "The sapphire engagement ring I purchased exceeded all expectations. The personal consultation made the experience special, and the craftsmanship is beyond compare."
                },
                {
                  name: "Raj Mehta",
                  role: "Finance Director",
                  quote: "My wife was speechless when I gave her the ruby anniversary necklace. The attention to detail and the quality of the gemstone is extraordinary."
                },
                {
                  name: "Anita Chen",
                  role: "Interior Designer",
                  quote: "I've been collecting jewelry for years, and Ceylon Gems produces some of the most exquisite pieces I've ever seen. Their custom design service is impeccable."
                },
                {
                  name: "David Lim",
                  role: "Surgeon",
                  quote: "The family heirloom they restored for us looks even better than when it was new. Their craftsmanship respects the history while enhancing the beauty."
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className="bg-white p-8 rounded-lg shadow-md relative"
                >
                  <FaQuoteLeft className="text-amber-200 text-4xl absolute top-4 left-4 opacity-40" />
                  <div className="pl-6 relative z-10">
                    <p className="text-gray-700 italic mb-6">{testimonial.quote}</p>
                    <div className="flex items-center">
                      <div className="w-2 h-10 bg-amber-500 mr-4"></div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-gray-500 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-24 bg-gray-900 text-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/90 to-gray-900/95"></div>
          <div className="absolute inset-0 bg-repeat opacity-5" style={{
            backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cGF0aCBkPSJNMjAgMEwwIDIwTDIwIDQwTDQwIDIwTDIwIDBaIiBmaWxsPSIjZDk3NzA2Ii8+PC9zdmc+')",
            backgroundSize: "40px 40px"
          }} />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-bold mb-8">Experience the Ceylon Gems Difference</h2>
            <p className="text-xl text-gray-300 mb-10">
              Visit our showroom to discover our collections and meet our team of expert craftsmen and designers.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/collections" className="px-8 py-4 bg-white text-amber-800 font-medium rounded hover:bg-gray-100 transition-colors">
                Explore Collections
              </Link>
              <Link to="/contact" className="px-8 py-4 bg-amber-600 text-white font-medium rounded hover:bg-amber-700 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;