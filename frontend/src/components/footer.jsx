import React from 'react';

// You can use react-icons or any other library for SVGs.
// For this example, we'll use simple inline SVGs.
const FacebookIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>;
const LinkedInIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>;
const GmailIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112v288c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zM325.4 236.6c-5.2-3.4-11.4-5.4-18.4-5.4s-13.2 2-18.4 5.4L256 257.3l-32.6-20.7c-5.2-3.4-11.4-5.4-18.4-5.4s-13.2 2-18.4 5.4L48 357.3V112c0-8.8 7.2-16 16-16h384c8.8 0 16 7.2 16 16v245.3L325.4 236.6zM48 392V364.7l148.6-96.5c15.2-9.8 33-15.2 51.4-15.2s36.2 5.3 51.4 15.2L464 364.7V392c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16z"/></svg>;


const Footer = () => {
  return (
    <footer className="bg-sky-950/40 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        {/* Top section with links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Column 1: Company */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="/home" className="text-base text-gray-400 hover:text-white">Home</a></li>
              <li><a href="/history" className="text-base text-gray-400 hover:text-white">History</a></li>
              <li><a href="/features" className="text-base text-gray-400 hover:text-white">Features</a></li>
            </ul>
          </div>
          
          {/* Column 2: Support */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="/contactus" className="text-base text-gray-400 hover:text-white">Contact Us</a></li>
              <li><a href="/faq" className="text-base text-gray-400 hover:text-white">FAQ</a></li>
              <li><a href="/documentation" className="text-base text-gray-400 hover:text-white">Docs</a></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="/privacy" className="text-base text-gray-400 hover:text-white">Privacy</a></li>
              <li><a href="/terms" className="text-base text-gray-400 hover:text-white">Terms</a></li>
            </ul>
          </div>
          
          {/* Column 4: Account */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Account</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="/login" className="text-base text-gray-400 hover:text-white">Login</a></li>
              <li><a href="/register" className="text-base text-gray-400 hover:text-white">Sign Up</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom section with social icons and copyright */}
        <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex space-x-6">
            <a href="mailto:your-email@gmail.com" className="text-gray-400 hover:text-white">
              <span className="sr-only">Gmail</span>
              <GmailIcon />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <span className="sr-only">Facebook</span>
              <FacebookIcon />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <span className="sr-only">LinkedIn</span>
              <LinkedInIcon />
            </a>
          </div>
          <p className="mt-4 sm:mt-0 text-base text-gray-400">&copy; {new Date().getFullYear()} Decentralized content analysis, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;