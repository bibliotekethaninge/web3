import React, { useState } from 'react';
import { Mail, MessageSquare, Send, Globe, Cpu, Wifi, Code2, Terminal, Network } from 'lucide-react';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormState({ name: '', email: '', subject: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-8 py-24">
          <div className="flex items-center gap-12">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Terminal className="w-8 h-8 text-indigo-600" />
                <Code2 className="w-8 h-8 text-purple-600" />
                <Network className="w-8 h-8 text-pink-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Get in Touch with Our Team
              </h1>
              <p className="text-lg text-gray-600">
                Have questions about Web3 Analytics? Our global team of blockchain experts is available 24/7 to assist you with any technical inquiries.
              </p>
            </div>
            <div className="flex-1">
              <img 
                src="https://captainaltcoin.com/wp-content/uploads/2022/03/image-68-1024x585.png" 
                alt="Web3 Analytics Dashboard" 
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-24">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div className="relative">
              <div className="absolute -inset-2">
                <div className="w-full h-full mx-auto opacity-30 blur-lg filter bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-gradient-x"></div>
              </div>
              <div className="relative bg-white/80 backdrop-blur p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Global Support Network</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-indigo-600 mt-1" />
                    <div>
                      <p className="text-gray-600">24/7 Global Support</p>
                      <p className="text-gray-600">Distributed Team Across All Time Zones</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Cpu className="w-5 h-5 text-purple-600" />
                    <p className="text-gray-600">AI-Powered Response System</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-indigo-600" />
                    <p className="text-gray-600">support@web3analytics.com</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Wifi className="w-5 h-5 text-pink-600 mt-1" />
                    <div>
                      <p className="text-gray-600">Real-Time Support</p>
                      <p className="text-gray-600">Average Response Time: &lt; 15 mins</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Support Stats */}
            <div className="relative overflow-hidden rounded-xl bg-white shadow-sm">
              <div className="p-6 space-y-4">
                <h3 className="font-medium text-gray-900">Support Statistics</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Resolution Rate</span>
                      <span className="text-gray-900">99.8%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-[99.8%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Response Time</span>
                      <span className="text-gray-900">&lt; 15 min</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-[95%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Customer Satisfaction</span>
                      <span className="text-gray-900">98.5%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-pink-500 to-rose-500 w-[98.5%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur rounded-xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                    placeholder="Tell us about your inquiry..."
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Typical response time: &lt; 15 minutes
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`
                      inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium
                      transition-all duration-200
                      ${isSubmitting 
                        ? 'bg-indigo-400 cursor-not-allowed' 
                        : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800'
                      }
                    `}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>

                {/* Success Message */}
                {submitted && (
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-lg">
                    <Terminal className="w-5 h-5" />
                    <p>Message received! Our tech team will respond shortly.</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;