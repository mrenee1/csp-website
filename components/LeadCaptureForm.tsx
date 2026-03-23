import React, { useState } from 'react';
import { PageName } from '../types';

interface LeadCaptureFormProps {
  onNavigate?: (page: PageName) => void;
  variant?: 'full' | 'compact';
  heading?: string;
  subheading?: string;
}

export const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  onNavigate,
  variant = 'full',
  heading = 'Get Your Free Business Assessment',
  subheading = 'Tell us about your business and we\'ll identify where you\'re leaving money on the table.',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    employees: '',
    primaryChallenge: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (variant === 'full' && !formData.employees) newErrors.employees = 'Please select team size';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    // TODO: Replace with real API endpoint before launch
    const mailtoSubject = encodeURIComponent('Business Assessment Request');
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\nPhone: ${formData.phone}\nTeam Size: ${formData.employees}\nPrimary Challenge: ${formData.primaryChallenge}`
    );
    window.location.href = `mailto:michelle@creativesolutionspartners.com?subject=${mailtoSubject}&body=${mailtoBody}`;

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 24px' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>&#10003;</div>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, color: 'var(--text)', marginBottom: 12 }}>
          Thank you!
        </h3>
        <p style={{ fontSize: 16, color: 'var(--mid)', maxWidth: 400, margin: '0 auto' }}>
          We've received your assessment request. A CSP advisor will reach out within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {variant === 'full' && (
        <div style={{ marginBottom: 32, textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(28px,3vw,44px)', fontWeight: 300, color: 'var(--text)', marginBottom: 12 }}>
            {heading}
          </h2>
          <p style={{ fontSize: 16, color: 'var(--mid)', maxWidth: 520, margin: '0 auto' }}>
            {subheading}
          </p>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: variant === 'full' ? '1fr 1fr' : '1fr', gap: 16, marginBottom: 16 }}>
        <div className="f-group">
          <label htmlFor="lead-name">Full Name *</label>
          <input id="lead-name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Jane Smith" />
          {errors.name && <span style={{ color: '#ff6b6b', fontSize: 11, marginTop: 4, display: 'block' }}>{errors.name}</span>}
        </div>
        <div className="f-group">
          <label htmlFor="lead-email">Work Email *</label>
          <input id="lead-email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="jane@company.com" />
          {errors.email && <span style={{ color: '#ff6b6b', fontSize: 11, marginTop: 4, display: 'block' }}>{errors.email}</span>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: variant === 'full' ? '1fr 1fr' : '1fr', gap: 16, marginBottom: 16 }}>
        <div className="f-group">
          <label htmlFor="lead-company">Company Name *</label>
          <input id="lead-company" name="company" type="text" value={formData.company} onChange={handleChange} placeholder="Acme Inc." />
          {errors.company && <span style={{ color: '#ff6b6b', fontSize: 11, marginTop: 4, display: 'block' }}>{errors.company}</span>}
        </div>
        <div className="f-group">
          <label htmlFor="lead-phone">Phone</label>
          <input id="lead-phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="(555) 123-4567" />
        </div>
      </div>

      {variant === 'full' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div className="f-group">
              <label htmlFor="lead-employees">Team Size *</label>
              <select id="lead-employees" name="employees" value={formData.employees} onChange={handleChange}>
                <option value="">Select...</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="500+">500+ employees</option>
              </select>
              {errors.employees && <span style={{ color: '#ff6b6b', fontSize: 11, marginTop: 4, display: 'block' }}>{errors.employees}</span>}
            </div>
            <div className="f-group">
              <label htmlFor="lead-challenge">Primary Challenge</label>
              <select id="lead-challenge" name="primaryChallenge" value={formData.primaryChallenge} onChange={handleChange}>
                <option value="">Select...</option>
                <option value="healthcare-costs">Rising healthcare costs</option>
                <option value="employee-retention">Employee retention</option>
                <option value="payment-processing">Payment processing</option>
                <option value="commission-tracking">Commission tracking</option>
                <option value="digital-presence">Digital presence / website</option>
                <option value="financial-wellness">Financial wellness</option>
                <option value="multiple">Multiple challenges</option>
              </select>
            </div>
          </div>
        </>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn-gold"
        style={{ width: '100%', marginTop: 8, opacity: submitting ? 0.7 : 1, cursor: submitting ? 'wait' : 'pointer' }}
      >
        {submitting ? 'Submitting...' : 'Get My Free Assessment'}
      </button>
      <p style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'center', marginTop: 12 }}>
        No spam. No obligation. Your data stays private.
      </p>
    </form>
  );
};
