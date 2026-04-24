import React, { useState } from 'react';
import './CreativeCareForm.css';

type CreativeCareVariant = 'cta' | 'consultation';
type FieldType = 'text' | 'email' | 'tel' | 'select' | 'chips' | 'textarea';
type SubmissionStatus = { type: 'success' | 'error'; message: string } | null;

interface CreativeCareField {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  autocomplete?: string;
  placeholder?: string;
  options?: string[];
}

interface CreativeCareFormConfig {
  eyebrow: string;
  heading: React.ReactNode;
  body: string;
  fields: CreativeCareField[];
  buttonText: string;
  meta: string;
}

interface CreativeCareFormProps {
  variant?: CreativeCareVariant;
  sourcePage?: string;
  endpoint?: string;
  className?: string;
  footer?: React.ReactNode;
  onSuccess?: () => void;
}

const FORM_CONFIGS: Record<CreativeCareVariant, CreativeCareFormConfig> = {
  cta: {
    eyebrow: 'Creative Care Intake',
    heading: <>Start the <em>conversation</em></>,
    body: 'Tell us a bit about your team and what kind of support would make healthcare decisions feel clearer, calmer, and more cost-conscious.',
    fields: [
      { name: 'full_name', label: 'Full Name', type: 'text', required: true, autocomplete: 'name', placeholder: 'Your name' },
      { name: 'company', label: 'Company', type: 'text', required: true, autocomplete: 'organization', placeholder: 'Your company' },
      { name: 'work_email', label: 'Work Email', type: 'email', required: true, autocomplete: 'email', placeholder: 'name@company.com' },
      { name: 'team_size', label: 'Team Size', type: 'select', required: true, options: ['1-10', '11-25', '26-50', '51-100', '100+'] },
      { name: 'priority', label: 'What do you need most?', type: 'chips', required: true, options: ['Lower healthcare costs', 'Better employee support', 'Coverage strategy review', 'Benefits education'] },
      { name: 'notes', label: 'Anything we should know?', type: 'textarea', placeholder: 'Optional context for your request.' },
    ],
    buttonText: 'Request A Call',
    meta: 'A Creative Care partner will review your request and follow up with next steps.',
  },
  consultation: {
    eyebrow: 'Creative Care Consultation',
    heading: <>Build a plan that feels <em>clearer</em></>,
    body: 'Share a little more about your team, timeline, and current benefits challenges so we can start the right conversation.',
    fields: [
      { name: 'full_name', label: 'Full Name', type: 'text', required: true, autocomplete: 'name', placeholder: 'Your name' },
      { name: 'title', label: 'Role / Title', type: 'text', required: true, autocomplete: 'organization-title', placeholder: 'Founder, HR lead, Operations...' },
      { name: 'company', label: 'Company', type: 'text', required: true, autocomplete: 'organization', placeholder: 'Your company' },
      { name: 'work_email', label: 'Work Email', type: 'email', required: true, autocomplete: 'email', placeholder: 'name@company.com' },
      { name: 'phone', label: 'Phone', type: 'tel', autocomplete: 'tel', placeholder: '(555) 555-5555' },
      { name: 'team_size', label: 'Team Size', type: 'select', required: true, options: ['1-10', '11-25', '26-50', '51-100', '100-250', '250+'] },
      { name: 'timeline', label: 'Timeline', type: 'select', required: true, options: ['Immediately', 'Within 30 days', 'This quarter', 'Just exploring'] },
      { name: 'challenge', label: 'Current Challenge', type: 'chips', required: true, options: ['Rising benefits costs', 'Low employee engagement', 'Confusing coverage options', 'Need a strategic advisor'] },
      { name: 'goals', label: 'What outcome are you after?', type: 'textarea', required: true, placeholder: 'Share the problem you want Creative Care to help solve.' },
    ],
    buttonText: 'Schedule Consultation',
    meta: 'Your answers help us prepare a more useful first conversation.',
  },
};

function collectValues(form: HTMLFormElement) {
  const formData = new FormData(form);
  const values: Record<string, FormDataEntryValue> = {};

  formData.forEach((value, key) => {
    values[key] = value;
  });

  return values;
}

function renderField(field: CreativeCareField) {
  const requiredMark = field.required ? <span className="csp-creative-care__required"> *</span> : null;

  if (field.type === 'select') {
    return (
      <div className="csp-creative-care__field" key={field.name}>
        <label className="csp-creative-care__label" htmlFor={field.name}>{field.label}{requiredMark}</label>
        <select className="csp-creative-care__select" id={field.name} name={field.name} required={field.required}>
          <option value="">Select one</option>
          {field.options?.map((option) => (
            <option value={option} key={option}>{option}</option>
          ))}
        </select>
      </div>
    );
  }

  if (field.type === 'textarea') {
    return (
      <div className="csp-creative-care__field" key={field.name}>
        <label className="csp-creative-care__label" htmlFor={field.name}>{field.label}{requiredMark}</label>
        <textarea
          className="csp-creative-care__textarea"
          id={field.name}
          name={field.name}
          required={field.required}
          placeholder={field.placeholder}
        />
      </div>
    );
  }

  if (field.type === 'chips') {
    return (
      <fieldset className="csp-creative-care__field" key={field.name}>
        <legend className="csp-creative-care__label">{field.label}{requiredMark}</legend>
        <div className="csp-creative-care__chips">
          {field.options?.map((option, index) => {
            const id = `${field.name}-${index}`;
            return (
              <label className="csp-creative-care__chip" htmlFor={id} key={option}>
                <input type="radio" id={id} name={field.name} value={option} required={field.required} />
                <span>{option}</span>
              </label>
            );
          })}
        </div>
      </fieldset>
    );
  }

  return (
    <div className="csp-creative-care__field" key={field.name}>
      <label className="csp-creative-care__label" htmlFor={field.name}>{field.label}{requiredMark}</label>
      <input
        className="csp-creative-care__input"
        id={field.name}
        name={field.name}
        type={field.type}
        required={field.required}
        autoComplete={field.autocomplete}
        placeholder={field.placeholder}
      />
    </div>
  );
}

export const CreativeCareForm: React.FC<CreativeCareFormProps> = ({
  variant = 'cta',
  sourcePage = 'creative-care',
  endpoint = '/api/submissions',
  className = '',
  footer,
  onSuccess,
}) => {
  const [status, setStatus] = useState<SubmissionStatus>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const config = FORM_CONFIGS[variant];
  const topFields = config.fields.filter((field) => !['chips', 'textarea'].includes(field.type));
  const bottomFields = config.fields.filter((field) => ['chips', 'textarea'].includes(field.type));

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus(null);

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const values = collectValues(form);

    if (values.website) {
      setStatus({ type: 'success', message: 'Thanks for reaching out. A Creative Care partner will follow up shortly.' });
      form.reset();
      onSuccess?.();
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setStatus({ type: 'success', message: 'Thanks for reaching out. A Creative Care partner will follow up shortly.' });
      form.reset();
      onSuccess?.();
    } catch {
      setStatus({
        type: 'error',
        message: 'Something went wrong while sending your request. Please try again or email michelle@creativesolutionspartners.com.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className={`csp-creative-care csp-creative-care--${variant} ${className}`.trim()}>
      <div className="csp-creative-care__panel">
        <div className="csp-creative-care__content">
          <p className="csp-creative-care__eyebrow">{config.eyebrow}</p>
          <h2 className="csp-creative-care__title">{config.heading}</h2>
          <p className="csp-creative-care__body">{config.body}</p>
          <form className="csp-creative-care__form" noValidate onSubmit={handleSubmit}>
            <div className="csp-creative-care__grid csp-creative-care__grid--two">
              {topFields.map(renderField)}
            </div>
            <div className="csp-creative-care__grid" style={{ marginTop: 18 }}>
              {bottomFields.map(renderField)}
              <div className="csp-creative-care__field csp-creative-care__field--hidden" aria-hidden="true">
                <label htmlFor={`${variant}-website`}>Website</label>
                <input id={`${variant}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              <input type="hidden" name="source_page" value={sourcePage} />
              <input type="hidden" name="form_variant" value={variant === 'consultation' ? 'consultation' : 'quick'} />
              <label className="csp-creative-care__consent">
                <input type="checkbox" name="consent" value="yes" required />
                <span>I agree to be contacted by Creative Solutions Partners about this request.<span className="csp-creative-care__required"> *</span></span>
              </label>
            </div>
            <div className="csp-creative-care__actions">
              <p className="csp-creative-care__meta">{config.meta}</p>
              <button className="csp-creative-care__button" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : config.buttonText}
              </button>
            </div>
            {footer}
            {status && (
              <div className={`csp-creative-care__status csp-creative-care__status--${status.type}`}>
                {status.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
