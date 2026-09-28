import React, { useState } from 'react';
import { INSTITUTION_INFO } from '../data/initialData';
import { submitMessage } from '../lib/storage';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  ExternalLink,
  Navigation
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);

    setTimeout(() => {
      submitMessage(form);
      setLoading(false);
      setSubmitted(true);
      setForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }, 400);
  };

  const coordinates = INSTITUTION_INFO.coordinates;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`;
  const mapEmbedUrl = `https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}&hl=en&z=15&output=embed`;

  return (
    <section id="contact" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest font-semibold text-emerald-800 mb-2">
            Campus Communication & Location
          </div>
          <h2 className="font-crest text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
            Contact & Location Information
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-sm sm:text-base text-slate-600 font-sans">
            We welcome queries from guardians, prospective pupils, alumni, and educational patrons. Visit our campus or reach us through direct channels.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Address */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center font-bold mb-4">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Campus Address</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {INSTITUTION_INFO.fullAddress}
              </p>
              <p className="text-[11px] text-slate-400 mt-2 font-mono">
                Lat: {coordinates.lat}, Lng: {coordinates.lng}
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold mb-4">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Telephone & Helpline</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-mono">
                {INSTITUTION_INFO.phone}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed font-mono">
                {INSTITUTION_INFO.altPhone}
              </p>
              <p className="text-[11px] text-emerald-700 mt-2 font-medium">Principal & Admin Office</p>
            </div>
          </div>

          {/* Email */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-900 flex items-center justify-center font-bold mb-4">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Official Electronic Mail</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-mono">
                {INSTITUTION_INFO.email}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed font-mono">
                admission@laxmipursc.edu.bd
              </p>
              <p className="text-[11px] text-slate-400 mt-2">Response within 24-48 hours</p>
            </div>
          </div>

          {/* Office Hours */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-900 flex items-center justify-center font-bold mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Administrative Hours</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Saturday – Thursday:
              </p>
              <p className="text-xs font-semibold text-slate-800">8:30 AM – 4:00 PM</p>
              <p className="text-[11px] text-rose-600 mt-2 font-medium">Friday: Official Weekend</p>
            </div>
          </div>
        </div>

        {/* Two Columns: Interactive Google Map on Left, Contact Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Google Map */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-crest text-base font-bold text-slate-900">
                    Institutional Campus Map
                  </h4>
                  <p className="text-xs text-slate-500">
                    Gaibandha Sadar, Gaibandha, Bangladesh
                  </p>
                </div>

                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-blue-900 hover:bg-blue-950 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>
              </div>

              {/* Map Iframe with coordinates Latitude: 25.4305292, Longitude: 89.5146686 */}
              <div className="relative w-full h-80 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                <iframe
                  title="Laxmipur School and College Location Map"
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Geo-Coordinates: 25.4305292° N, 89.5146686° E</span>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-900 font-semibold hover:underline flex items-center gap-1"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h4 className="font-crest text-base font-bold text-slate-900 mb-1">
              Send an Official Inquiry
            </h4>
            <p className="text-xs text-slate-500 mb-6 font-sans">
              Submit your inquiry directly to our administrative desk. All messages are archived for prompt follow-up.
            </p>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2 animate-in fade-in">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h5 className="font-bold text-sm text-emerald-950">Message Sent Successfully!</h5>
                <p className="text-xs text-emerald-800">
                  Thank you for reaching out to Laxmipur School and College. Our administrative staff will review your message and reply via email or phone.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mohammad Ali"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+880 17XXXXXXXX"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Inquiry Subject *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Admission Inquiry, TC, Fees"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your questions or notes for the institution..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-blue-950 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? 'Sending Message...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
