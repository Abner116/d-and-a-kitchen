import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

function ContactPage() {
  const [formspreeState, handleFormspreeSubmit] = useForm("mnnpbbdd");

  if (formspreeState.succeeded) {
    return (
      <div className="container mx-auto py-12">
        <div className="mx-auto max-w-4xl text-center">
          <div className="bg-green-50 border border-green-200 rounded-md p-6">
            <h3 className="text-green-800 font-medium">Message sent!</h3>
            <p className="text-green-700">
              Thank you for your message. We'll get back to you soon.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <h1 className="mb-2 text-3xl font-bold">Contact Us</h1>
          <p className="text-gray-600">
            Have a question or feedback? We'd love to hear from you.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-xl font-semibold">Get in Touch</h2>
            <p className="mb-6 text-gray-600">
              Fill out the form and our team will get back to you as soon as possible.
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <span className="text-blue-600">✉️</span>
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-sm text-gray-600">contact@recipebook.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <span className="text-blue-600">📞</span>
                </div>
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <span className="text-blue-600">📍</span>
                </div>
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-sm text-gray-600">
                    123 Recipe Street, Foodville, CA 94123
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-md p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Send us a message</h2>
            <p className="text-gray-600 mb-6">We'll get back to you as soon as possible.</p>

            <form onSubmit={handleFormspreeSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="block font-medium">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
                <ValidationError prefix="Name" field="name" errors={formspreeState.errors} />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
                <ValidationError prefix="Email" field="email" errors={formspreeState.errors} />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="block font-medium">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder="How can we help you?"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
                <ValidationError prefix="Subject" field="subject" errors={formspreeState.errors} />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us more about your inquiry..."
                  rows="4"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
                <ValidationError prefix="Message" field="message" errors={formspreeState.errors} />
              </div>

              <button
                type="submit"
                disabled={formspreeState.submitting}
                className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                {formspreeState.submitting ? "Sending..." : "Send Message"}
              </button>
              <ValidationError errors={formspreeState.errors} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;