import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaInstagram, FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('kuala-lumpur');

  const contactFormRef = useRef(null);
  const locationRef = useRef(null);
  const formInView = useInView(contactFormRef, { once: true, margin: "-100px" });
  const locationInView = useInView(locationRef, { once: true, margin: "-100px" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white">
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
            animate="visible"
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
              Contact <span className="text-amber-400">Us</span>
            </motion.h1>
            
            <motion.div variants={fadeUp} className="w-20 h-px bg-amber-500 mx-auto mb-8"></motion.div>
            
            <motion.p variants={fadeUp} className="text-xl text-gray-300 mb-8 leading-relaxed">
              We'd love to hear from you. Visit our showrooms or reach out to our team for personalized assistance.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Contact Form and Info Section */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div 
              ref={contactFormRef}
              initial="hidden"
              animate={formInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="bg-white rounded-lg shadow-xl p-8 border border-gray-100 order-2 lg:order-1"
            >
              <motion.div variants={fadeUp} className="mb-8">
                <div className="w-12 h-px bg-amber-600 mb-4"></div>
                <h2 className="text-3xl font-serif font-bold">Send Us a Message</h2>
                <p className="text-gray-600 mt-2">We'll get back to you within 24 hours</p>
              </motion.div>

              {submitted ? (
                <motion.div 
                  variants={fadeUp}
                  className="bg-green-50 border border-green-200 rounded-lg p-8 text-center"
                >
                  <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">Thank You!</h3>
                  <p className="text-gray-600 mb-6">Your message has been sent successfully. We'll be in touch with you shortly.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 bg-amber-600 text-white font-medium rounded hover:bg-amber-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form variants={fadeUp} onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600 transition-colors ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600 transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number (Optional)</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600 transition-colors"
                        placeholder="+60 12-345-6789"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
                      <input 
                        type="text" 
                        id="subject" 
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600 transition-colors ${errors.subject ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Product Inquiry"
                      />
                      {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 mb-2">Your Message</label>
                    <textarea 
                      id="message" 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="6" 
                      className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600 transition-colors ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="How can we help you today?"
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-white font-medium px-6 py-3 rounded-md hover:from-amber-700 hover:to-amber-600 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform"
                  >
                    Send Message
                  </button>
                </motion.form>
              )}
            </motion.div>
            
            {/* Contact Information */}
            <motion.div 
              ref={locationRef}
              initial="hidden"
              animate={locationInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="order-1 lg:order-2"
            >
              <motion.div variants={fadeUp} className="mb-8">
                <div className="w-12 h-px bg-amber-600 mb-4"></div>
                <h2 className="text-3xl font-serif font-bold">Our Locations</h2>
                <p className="text-gray-600 mt-2">Visit our showrooms to explore our collections</p>
              </motion.div>
              
              <div className="space-y-12">
                {/* Kuala Lumpur Location */}
                <motion.div 
                  variants={fadeUp}
                  className={`bg-white rounded-lg shadow-lg overflow-hidden border transition-all duration-300 ${selectedLocation === 'kuala-lumpur' ? 'border-amber-400 ring-1 ring-amber-400/30' : 'border-gray-200'}`}
                  onClick={() => setSelectedLocation('kuala-lumpur')}
                >
                  <div className="h-64 bg-gray-200 relative">
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <div className="text-center p-6">
                      <FaMapMarkerAlt size={40} className="text-amber-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Ceylon Gems Hub Malaysia</h3>
                      <p className="text-gray-600">
                        Lot. 4, Parkroyal Penang Resorts,<br />
                        11100 Batu Ferringhi, Pulau Pinang
                      </p>
                      <a 
                        href="https://maps.google.com/?q=Ceylon+Gems+Hub+Malaysia,+Lot.+4,+Parkroyal+Penang+Resorts,+11100+Batu+Ferringhi,+Pulau+Pinang" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-block mt-4 px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors"
                      >
                        Open in Google Maps
                      </a>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 bg-white text-amber-700 py-1 px-3 rounded-full shadow-md text-sm font-medium">
                      Penang
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="text-amber-500 mt-1">
                          <FaMapMarkerAlt size={20} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Ceylon Gems & Jewelry Hub - PG</h3>
                          <p className="text-gray-600 mt-1">Lot. 4, Parkroyal Penang Resorts, 11100 Batu Ferringhi, Pulau Pinang</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="text-amber-500 mt-1">
                          <FaPhoneAlt size={16} />
                        </div>
                        <div>
                          <h3 className="font-semibold">Phone</h3>
                          <p className="text-gray-600 mt-1">+60 4-881 9002</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="text-amber-500 mt-1">
                          <FaClock size={16} />
                        </div>
                        <div>
                          <h3 className="font-semibold">Business Hours</h3>
                          <p className="text-gray-600 mt-1">Tuesday - Sunday: 10AM - 6PM</p>
                          <p className="text-gray-600">Monday: Closed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* General Contact Info */}
              <motion.div variants={fadeUp} className="mt-12 bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">General Inquiries</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-amber-500">
                    <FaEnvelope size={16} />
                  </div>
                  <a href="mailto:ceylongemshub@gmail.com" className="text-gray-700 hover:text-amber-600 transition-colors">ceylongemshub@gmail.com</a>
                </div>
                
                <h3 className="text-xl font-semibold mb-4 mt-6">Connect With Us</h3>
                <div className="flex gap-4">
                  {[
                    { icon: <FaFacebook size={18} />, url: "https://facebook.com", color: "hover:bg-blue-600" },
                    { icon: <FaInstagram size={18} />, url: "https://www.instagram.com/ceylongemshub?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", color: "hover:bg-pink-600" },
                    { icon: <FaTwitter size={18} />, url: "https://twitter.com", color: "hover:bg-blue-400" },
                    { icon: <FaWhatsapp size={18} />, url: "https://wa.me/6048819002", color: "hover:bg-green-500" }
                  ].map((social, index) => (
                    <a 
                      key={index}
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`text-gray-600 hover:text-white ${social.color} w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 border border-gray-300 hover:border-transparent`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="w-16 h-px bg-amber-600 mx-auto mb-8"></div>
            <h2 className="text-4xl font-serif font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-gray-600 text-lg">
              Find quick answers to common questions about our services and products.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  question: "Do I need an appointment to visit your showroom?",
                  answer: "While walk-ins are welcome during regular business hours, we recommend booking an appointment for personalized service, especially if you're interested in custom designs or specific collections."
                },
                {
                  question: "Do you offer international shipping?",
                  answer: "Yes, we offer international shipping for most of our jewelry pieces. Shipping costs and delivery times vary by destination. Please contact us for specific details about shipping to your location."
                },
                {
                  question: "What certifications do your gemstones come with?",
                  answer: "All our significant gemstones come with internationally recognized certifications. Depending on the stone, these may include GIA, IGI, or other reputable gemological laboratory certifications."
                },
                {
                  question: "Do you offer jewelry repair and maintenance services?",
                  answer: "Yes, we provide comprehensive jewelry maintenance services, including cleaning, polishing, resizing, and repairs. We also offer restoration services for heirloom pieces."
                },
                {
                  question: "What is your return policy?",
                  answer: "We offer a 14-day return policy for ready-made jewelry pieces in their original condition with all documentation. Custom-designed pieces have specific terms that will be discussed during the commission process."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
                  <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;