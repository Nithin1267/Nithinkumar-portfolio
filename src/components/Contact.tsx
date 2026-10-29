import { useState, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { Github, Linkedin, Mail, Phone, Send } from 'lucide-react'
import { profile } from '../data/profile'
import SectionHeading from './SectionHeading'

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim()
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim()
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim()
const isConfigured = Boolean(serviceId && templateId && publicKey)

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

function getEmailJsErrorMessage(error: unknown) {
  if (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'text' in error &&
    typeof error.status === 'number' &&
    typeof error.text === 'string'
  ) {
    return `EmailJS error ${error.status}: ${error.text}`
  }

  if (error instanceof Error) return error.message
  return 'EmailJS returned an unexpected error. Please try again or use one of the contact alternatives.'
}

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    if (formData.get('website')) {
      setStatus('error')
      setErrorMessage('We could not process this submission. Please try again or contact me directly.')
      return
    }

    if (!isConfigured || !serviceId || !templateId || !publicKey) {
      setStatus('error')
      setErrorMessage('The contact form is not configured. Please contact me using one of the alternatives below.')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.get('name'),
          reply_to: formData.get('email'),
          subject: formData.get('subject'),
          message: formData.get('message'),
          website: formData.get('website'),
        },
        { publicKey },
      )
      form.reset()
      setStatus('success')
    } catch (error) {
      console.error('EmailJS contact form submission failed:', error)
      setStatus('error')
      setErrorMessage(getEmailJsErrorMessage(error))
    }
  }

  const inputClass =
    'mt-2 min-h-12 w-full rounded-xl border border-line bg-bg/70 px-4 py-3 text-fg placeholder:text-muted focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/30'

  return (
    <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeading id="contact-title" title="Get in touch">
        Interested in working together or discussing a project? I’d be glad to hear from you.
      </SectionHeading>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-line bg-card p-5 backdrop-blur sm:p-8">
          {!isConfigured ? (
            <p role="status" className="rounded-xl border border-line bg-bg/70 p-4 text-muted">
              Contact form not configured. Add <code className="text-accent">VITE_EMAILJS_SERVICE_ID</code>,{' '}
              <code className="text-accent">VITE_EMAILJS_TEMPLATE_ID</code>, and{' '}
              <code className="text-accent">VITE_EMAILJS_PUBLIC_KEY</code> to your local <code className="text-accent">.env</code>{' '}
              file and Vercel environment settings to enable the form.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="contact-name" className="text-sm font-medium">Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  maxLength={100}
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="text-sm font-medium">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="contact-subject" className="text-sm font-medium">Subject</label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  maxLength={150}
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="text-sm font-medium">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  maxLength={5000}
                  required
                  className={`${inputClass} resize-y`}
                />
              </div>
              <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
                <label htmlFor="contact-website">Leave this field empty</label>
                <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet to-electric px-6 font-semibold text-white shadow-lg shadow-violet/20 transition hover:brightness-110 disabled:cursor-wait disabled:opacity-60"
              >
                <Send size={16} aria-hidden />
                {status === 'loading' ? 'Sending…' : 'Send Message'}
              </button>
              {status === 'success' && (
                <p role="status" className="text-sm text-accent" aria-live="polite">
                  Your message was sent successfully. Thank you for reaching out.
                </p>
              )}
              {status === 'error' && (
                <p role="alert" className="break-words text-sm text-red-500">
                  {errorMessage}
                </p>
              )}
            </form>
          )}
        </div>

        <aside className="rounded-2xl border border-line bg-card p-5 backdrop-blur sm:p-8">
          <h3 className="font-display text-xl font-semibold">Other ways to connect</h3>
          <p className="mt-2 leading-relaxed text-muted">Prefer another channel? You can reach me here.</p>
          <ul className="mt-6 space-y-3">
            <li>
              <a href={`mailto:${profile.email}`} className="inline-flex min-h-11 items-center gap-3 text-muted transition-colors hover:text-fg">
                <Mail size={18} aria-hidden /> {profile.email}
              </a>
            </li>
            <li>
              <a href="tel:+919010089138" className="inline-flex min-h-11 items-center gap-3 text-muted transition-colors hover:text-fg">
                <Phone size={18} aria-hidden /> +91 9010089138
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-3 text-muted transition-colors hover:text-fg">
                <Github size={18} aria-hidden /> GitHub<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-3 text-muted transition-colors hover:text-fg">
                <Linkedin size={18} aria-hidden /> LinkedIn<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  )
}
