import React, { useState } from 'react';
import { ArrowLeft, User, Building, Mail, Phone, MapPin, FileText, Target, Users, Calendar, CheckCircle } from 'lucide-react';
import { PageName } from '../types';

interface PartnerApplicationProps {
  onBack: () => void;
  onNavigate: (page: PageName) => void;
  isAuthenticated?: boolean;
  user?: { email: string } | null;
  onLogout?: () => void;
}

export const PartnerApplication: React.FC<PartnerApplicationProps> = ({ 
  onBack, 
  onNavigate,
  isAuthenticated = false,
  user = null,
  onLogout
}) => {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    title: '',
    
    // Business Information
    businessType: '',
    yearsInBusiness: '',
    annualRevenue: '',
    teamSize: '',
    serviceArea: '',
    
    // Partnership Interest
    partnershipType: '',
    investmentCapacity: '',
    timeline: '',
    goals: '',
    
    // Additional Information
    experience: '',
    referralSource: '',
    additionalInfo: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.businessType) newErrors.businessType = 'Business type is required';
    if (!formData.partnershipType) newErrors.partnershipType = 'Partnership type is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Prepare email content
      const subject = encodeURIComponent('Partner Application Submission');
      const body = encodeURIComponent(`
Partner Application Details:

PERSONAL INFORMATION:
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Title: ${formData.title}
Company: ${formData.company}

BUSINESS INFORMATION:
Business Type: ${formData.businessType}
Years in Business: ${formData.yearsInBusiness}
Annual Revenue: ${formData.annualRevenue}
Team Size: ${formData.teamSize}
Service Area: ${formData.serviceArea}

PARTNERSHIP INTEREST:
Type: ${formData.partnershipType}
Investment Capacity: ${formData.investmentCapacity}
Timeline: ${formData.timeline}
Goals: ${formData.goals}

EXPERIENCE:
${formData.experience}

REFERRAL:
${formData.referralSource}

ADDITIONAL INFORMATION:
${formData.additionalInfo}
      `);
      
      // Send email
      window.location.href = `mailto:michelle@creativesolutionspartners.com?subject=${subject}&body=${body}`;
      setSubmitted(true);
      
      // Reset form after submission
      setTimeout(() => {
        setFormData({
          firstName: '', lastName: '', email: '', phone: '', company: '', title: '',
          businessType: '', yearsInBusiness: '', annualRevenue: '', teamSize: '', serviceArea: '',
          partnershipType: '', investmentCapacity: '', timeline: '', goals: '',
          experience: '', referralSource: '', additionalInfo: ''
        });
        setSubmitted(false);
      }, 3000);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={40} className="text-green-400" />
          </div>
          <h1 className="text-4xl font-serif mb-6">Application Submitted!</h1>
          <p className="text-xl text-gray-300 mb-8">
            Thank you for your interest in partnering with Creative Solutions Partners. 
            We'll review your application and contact you within 2-3 business days.
          </p>
          <button 
            onClick={() => onBack()}
            className="bg-brand-gold text-[#0a0a0a] px-8 py-4 font-bold hover:bg-[#d4af37] transition-all duration-500 rounded-lg text-lg uppercase tracking-widest"
          >
            Return to Partners
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-yellow-900/20"></div>
        <div className="relative py-24 px-6 md:px-12 lg:px-24">
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 text-sm uppercase tracking-widest"
          >
            <ArrowLeft size={16} /> Back to Partners
          </button>
          
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-gold/20 text-gold px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-8 border border-gold/30">
              Partnership Opportunity
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-medium leading-tight mb-8">
              Become a <span className="text-gold">Partner</span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-300 font-light leading-relaxed max-w-3xl">
              Join our network of elite partners and help shape the future of business solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Personal Information Section */}
            <section className="bg-[#18181b] p-8 rounded-xl border border-white/10">
              <h2 className="text-2xl font-serif text-white mb-8 flex items-center gap-3">
                <User size={24} className="text-gold" />
                Personal Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-widest">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full bg-[#0a0a0a] border ${errors.firstName ? 'border-red-500' : 'border-white/20'} rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors ${errors.firstName ? 'animate-shake' : ''}`}
                    placeholder="John"
                  />
                  {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-widest">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full bg-[#0a0a0a] border ${errors.lastName ? 'border-red-500' : 'border-white/20'} rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors ${errors.lastName ? 'animate-shake' : ''}`}
                    placeholder="Smith"
                  />
                  {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-widest">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full bg-[#0a0a0a] border ${errors.email ? 'border-red-500' : 'border-white/20'} rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors ${errors.email ? 'animate-shake' : ''}`}
                    placeholder="john@company.com"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-widest">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full bg-[#0a0a0a] border ${errors.phone ? 'border-red-500' : 'border-white/20'} rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors ${errors.phone ? 'animate-shake' : ''}`}
                    placeholder="(555) 123-4567"
                  />
                  {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-widest">
                    Company *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={`w-full bg-[#0a0a0a] border ${errors.company ? 'border-red-500' : 'border-white/20'} rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors ${errors.company ? 'animate-shake' : ''}`}
                    placeholder="Your Company Name"
                  />
                  {errors.company && <p className="text-red-400 text-sm mt-1">{errors.company}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-widest">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full bg-[#0a0a0a] border border-white/20 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                    placeholder="CEO, Founder, etc."
                  />
                </div>
              </div>
            </section>

            {/* Business Information Section */}
            <section className="bg-[#18181b] p-8 rounded-xl border border-white/10">
              <h2 className="text-2xl font-serif text-white mb-8 flex items-center gap-3">
                <Building size={24} className="text-gold" />
                Business Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-widest">
                    Business Type *
                  </label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    className={`w-full bg-[#0a0a0a] border ${errors.businessType ? 'border-red-500' : 'border-white/20'} rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors ${errors.businessType ? 'animate-shake' : ''}`}
                  >
                    <option value="">Select business type</option>
                    <option value="consulting">Consulting Firm</option>
                    <option value="agency">Marketing/Agency</option>
                    <option value="technology">Technology Company</option>
                    <option value="financial">Financial Services</option>
                    <option value="healthcare">Healthcare Provider</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.businessType && <p className="text-red-400 text-sm mt-1">{errors.businessType}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-widest">
                    Years in Business
                  </label>
                  <input
                    type="number"
                    name="yearsInBusiness"
                    value={formData.yearsInBusiness}
                    onChange={handleInputChange}
                    className="w-full bg-[#0a0a0a] border border-white/20 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                    placeholder="5"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-widest">
                    Annual Revenue
                  </label>
                  <select
                    name="annualRevenue"
                    value={formData.annualRevenue}
                    onChange={handleInputChange}
                    className="w-full bg-[#0a0a0a] border border-white/20 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                  >
                    <option value="">Select revenue range</option>
                    <option value="under-100k">Under $100K</option>
                    <option value="100k-500k">$100K - $500K</option>
                    <option value="500k-1m">$500K - $1M</option>
                    <option value="1m-5m">$1M - $5M</option>
                    <option value="5m-plus">$5M+</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-widest">
                    Team Size
                  </label>
                  <select
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleInputChange}
                    className="w-full bg-[#0a0a0a] border border-white/20 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                  >
                    <option value="">Select team size</option>
                    <option value="1-5">1-5 employees</option>
                    <option value="6-20">6-20 employees</option>
                    <option value="21-50">21-50 employees</option>
                    <option value="51-100">51-100 employees</option>
                    <option value="100-plus">100+ employees</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-widest">
                    Service Area
                  </label>
                  <input
                    type="text"
                    name="serviceArea"
                    value={formData.serviceArea}
                    onChange={handleInputChange}
                    className="w-full bg-[#0a0a0a] border border-white/20 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                    placeholder="Geographic regions you serve"
                  />
                </div>
              </div>
            </section>

            {/* Partnership Interest Section */}
            <section className="bg-[#18181b] p-8 rounded-xl border border-white/10">
              <h2 className="text-2xl font-serif text-white mb-8 flex items-center gap-3">
                <Target size={24} className="text-gold" />
                Partnership Interest
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-widest">
                    Type of Partnership *
                  </label>
                  <select
                    name="partnershipType"
                    value={formData.partnershipType}
                    onChange={handleInputChange}
                    className={`w-full bg-[#0a0a0a] border ${errors.partnershipType ? 'border-red-500' : 'border-white/20'} rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors ${errors.partnershipType ? 'animate-shake' : ''}`}
                  >
                    <option value="">Select partnership type</option>
                    <option value="reseller">Reseller/Channel Partner</option>
                    <option value="referral">Referral Partner</option>
                    <option value="strategic">Strategic Alliance</option>
                    <option value="technology">Technology Integration</option>
                    <option value="distribution">Distribution Partner</option>
                  </select>
                  {errors.partnershipType && <p className="text-red-400 text-sm mt-1">{errors.partnershipType}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-widest">
                    Investment Capacity
                  </label>
                  <select
                    name="investmentCapacity"
                    value={formData.investmentCapacity}
                    onChange={handleInputChange}
                    className="w-full bg-[#0a0a0a] border border-white/20 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                  >
                    <option value="">Select investment range</option>
                    <option value="under-10k">Under $10K</option>
                    <option value="10k-50k">$10K - $50K</option>
                    <option value="50k-100k">$50K - $100K</option>
                    <option value="100k-plus">$100K+</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-widest">
                    Timeline
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full bg-[#0a0a0a] border border-white/20 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                  >
                    <option value="">Select timeline</option>
                    <option value="immediate">Immediate (0-3 months)</option>
                    <option value="short">Short-term (3-6 months)</option>
                    <option value="medium">Medium-term (6-12 months)</option>
                    <option value="long">Long-term (12+ months)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-widest">
                    Partnership Goals
                  </label>
                  <textarea
                    name="goals"
                    value={formData.goals}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-[#0a0a0a] border border-white/20 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                    placeholder="What are your goals for this partnership?"
                  ></textarea>
                </div>
              </div>
            </section>

            {/* Additional Information Section */}
            <section className="bg-[#18181b] p-8 rounded-xl border border-white/10">
              <h2 className="text-2xl font-serif text-white mb-8 flex items-center gap-3">
                <FileText size={24} className="text-gold" />
                Additional Information
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-widest">
                    Relevant Experience
                  </label>
                  <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-[#0a0a0a] border border-white/20 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                    placeholder="Describe your relevant business experience..."
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-widest">
                    How Did You Hear About Us?
                  </label>
                  <input
                    type="text"
                    name="referralSource"
                    value={formData.referralSource}
                    onChange={handleInputChange}
                    className="w-full bg-[#0a0a0a] border border-white/20 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                    placeholder="Referral source, conference, social media, etc."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-widest">
                    Additional Information
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-[#0a0a0a] border border-white/20 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                    placeholder="Any other information you'd like to share..."
                  ></textarea>
                </div>
              </div>
            </section>

            {/* Submit Button */}
            <div className="text-center pt-8">
              <button
                type="submit"
                className="bg-gold text-[#0a0a0a] px-12 py-5 font-bold hover:bg-[#d4af37] transition-all duration-500 rounded-lg text-lg uppercase tracking-widest shadow-lg hover:shadow-gold/25"
              >
                Submit Application
              </button>
              <p className="text-gray-400 text-sm mt-4">
                By submitting this application, you agree to our partnership terms and privacy policy.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};