import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Link as LinkIcon, Share2, Send } from 'lucide-react';
import { FOOTER_LINKS } from '@/constants/navigation';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-dark-800 border-t border-gray-150 dark:border-dark-750">
      {/* Top Links Panel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* Brand Info */}
        <div className="col-span-2 flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2 group focus:outline-none">
            <span className="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary-600 to-accent-600 flex items-center justify-center text-white font-black text-xl shadow-sm">
              E
            </span>
            <span className="text-lg font-extrabold tracking-tight text-gray-900 dark:text-white">
              Expertise<span className="text-primary-600 dark:text-primary-400">Connect</span>
            </span>
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
            Expertise Connect links verified tech experts with eager learners for 1-on-1 video mentoring sessions.
          </p>
          <div className="flex gap-4.5 items-center mt-2">
            <a href="#" className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"><Globe className="w-5 h-5" /></a>
            <a href="#" className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"><LinkIcon className="w-5 h-5" /></a>
            <a href="#" className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"><Share2 className="w-5 h-5" /></a>
          </div>
        </div>

        {/* Platform Column */}
        <div>
          <h4 className="text-xs font-semibold tracking-wider text-gray-450 dark:text-gray-405 uppercase mb-4">
            Platform
          </h4>
          <ul className="space-y-3">
            {FOOTER_LINKS.platform.map((link, idx) => (
              <li key={idx}>
                <Link to={link.href} className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources Column */}
        <div>
          <h4 className="text-xs font-semibold tracking-wider text-gray-450 dark:text-gray-405 uppercase mb-4">
            Resources
          </h4>
          <ul className="space-y-3">
            {FOOTER_LINKS.resources.map((link, idx) => (
              <li key={idx}>
                <a href={link.href} className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal Column */}
        <div>
          <h4 className="text-xs font-semibold tracking-wider text-gray-450 dark:text-gray-405 uppercase mb-4">
            Legal
          </h4>
          <ul className="space-y-3">
            {FOOTER_LINKS.legal.map((link, idx) => (
              <li key={idx}>
                <a href={link.href} className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Newsletter Panel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-100 dark:border-dark-750 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
            Subscribe to our newsletter
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Get technology insights, trends, and expert updates delivered weekly.
          </p>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="flex w-full max-w-sm">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-l-xl border border-gray-350 dark:border-dark-600 bg-gray-50 dark:bg-dark-900 px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-gray-900 dark:text-gray-100 placeholder-gray-400"
            required
          />
          <button
            type="submit"
            className="rounded-r-xl bg-primary-600 text-white hover:bg-primary-700 px-4 py-2.5 flex items-center justify-center shrink-0 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Copyright Bar */}
      <div className="bg-gray-50 dark:bg-dark-900 py-6 border-t border-gray-100 dark:border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-405 dark:text-gray-500">
          <span>&copy; {new Date().getFullYear()} Expertise Connect. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
