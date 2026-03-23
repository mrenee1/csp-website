import React from 'react';
import { ArrowLeft, CreditCard, Store, DollarSign, Shield } from 'lucide-react';
import { PageName } from '../types';

interface ImpactPaymentsPageProps {
  onBack: () => void;
  onNavigate: (page: PageName) => void;
}

export const ImpactPaymentsPage: React.FC<ImpactPaymentsPageProps> = ({ onBack, onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
        <div className="relative py-24 px-6 md:px-12 lg:px-24">
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 text-sm uppercase tracking-widest"
          >
            <ArrowLeft size={16} /> Back to Solutions
          </button>
          
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-8 border border-blue-500/30">
              Payment Solutions
            </div>
            
            <div className="flex items-center gap-6 mb-8">
              <img 
                src="https://img.logo.dev/impactpaymentgroup.com?token=pk_YNp0UPuFROeXqQQR8ut6Fg&format=png&retina=true" 
                alt="Impact Payment Group Logo" 
                className="h-20 w-auto"
              />
              <h1 className="text-5xl md:text-7xl font-serif font-medium leading-tight">
                Impact <span className="text-blue-400">Payment Group</span>
              </h1>
            </div>
            
            <p className="text-2xl md:text-3xl text-gray-300 font-light leading-relaxed max-w-3xl">
              Simple, Secure Payment Technology for Modern Businesses
            </p>
            
            <p className="text-lg text-gray-400 mt-8 max-w-3xl leading-relaxed">
              Impact Payment Group provides modern payment infrastructure that helps businesses accept transactions quickly, securely, and efficiently. Through advanced payment processing, point-of-sale systems, and flexible merchant solutions, businesses can streamline operations and improve the customer payment experience.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-24 px-6 md:px-12 lg:px-24">
        {/* Smarter Payment Technology Section */}
        <section className="mb-32">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight">
              Smarter Payment Technology
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-12">
              Payment systems should do more than process transactions. They should help businesses run efficiently, manage operations, and scale as they grow.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              Impact Payments delivers modern payment solutions designed for retail, hospitality, eCommerce, and mobile businesses. Our technology simplifies transactions while giving businesses the tools they need to manage operations and improve efficiency.
            </p>
          </div>
        </section>

        {/* Core Solutions Section */}
        <section className="mb-32">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-16 text-center">
              Core Solutions
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              {[
                {
                  icon: CreditCard,
                  title: "Payment Processing",
                  description: "Secure and dependable payment processing that allows businesses to accept payments in-store, online, or on the go."
                },
                {
                  icon: Store,
                  title: "Point-of-Sale Systems",
                  description: "Modern POS hardware and software designed to manage transactions, inventory, and daily operations through a single platform."
                },
                {
                  icon: DollarSign,
                  title: "Cash Discount Programs",
                  description: "A structured program that allows businesses to offset credit card processing costs while maintaining competitive pricing."
                },
                {
                  icon: Shield,
                  title: "High-Risk Merchant Accounts",
                  description: "Specialized payment processing solutions for businesses that may have difficulty obtaining traditional merchant services."
                }
              ].map((solution, index) => (
                <div key={index} className="bg-[#18181b] p-8 rounded-xl border border-white/10 hover:border-blue-500/40 transition-all duration-500 group">
                  <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                    <solution.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{solution.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{solution.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="mb-32">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">
              Industries We Support
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Impact Payments supports a wide range of businesses, including:
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {['Retail', 'Hospitality', 'eCommerce', 'Mobile and service-based businesses'].map((industry, index) => (
                <div key={index} className="bg-[#18181b] px-6 py-4 rounded-full border border-white/10 text-white font-medium hover:border-blue-500/40 transition-colors">
                  {industry}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-12 text-center">
              Why Businesses Choose Impact Payment Group
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              {[
                {
                  title: "Modern Technology",
                  description: "Advanced payment systems designed to support growing businesses."
                },
                {
                  title: "Flexible Solutions",
                  description: "Customized payment setups based on business needs and industry requirements."
                },
                {
                  title: "Secure Transactions",
                  description: "Reliable payment infrastructure designed to protect business and customer data."
                },
                {
                  title: "Expert Support",
                  description: "Guidance from payment specialists who understand merchant processing and POS systems."
                }
              ].map((benefit, index) => (
                <div key={index} className="bg-[#18181b] p-8 rounded-xl border border-white/10">
                  <h3 className="text-xl font-bold text-blue-400 mb-4">{benefit.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-16">
              <button 
                onClick={() => {
                  window.location.href = 'mailto:michelle@creativesolutionspartners.com?subject=Impact%20Payment%20Group%20Consultation';
                }}
                className="bg-blue-500 text-white px-12 py-5 font-bold hover:bg-blue-600 transition-all duration-500 rounded-lg text-lg uppercase tracking-widest shadow-lg hover:shadow-blue-500/25"
              >
                Ready to Get Started
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};