'use client';

import { Droplets, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="bg-waternity-neutral text-white" aria-label="Footer">
      {/* CTA Section */}
      <section
        className="py-20 bg-gradient-to-r from-waternity-primary to-waternity-accent"
        aria-label="Final call to action"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join the revolution in transparent water access and sustainable
            investment
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-waternity-primary hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-lg"
              asChild
            >
              <a href="/dashboard">Start Investing</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-waternity-primary transition-all duration-300"
              asChild
            >
              <a href="#how-it-works">Learn More</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer Content */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-waternity-primary to-waternity-accent rounded-lg flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">Waternity</h3>
              </div>
              <p className="text-gray-300 text-sm mb-6">
                Transparent water sales on Hedera blockchain for sustainable
                impact and investor returns.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://twitter.com/waternity"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/company/waternity"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/waternity"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="mailto:hello@waternity.com"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Platform */}
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="/dashboard" className="hover:text-white transition-colors">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="/dashboard#explore" className="hover:text-white transition-colors">
                    Invest in Wells
                  </a>
                </li>
                <li>
                  <a href="/dashboard#investor" className="hover:text-white transition-colors">
                    Track Performance
                  </a>
                </li>
                <li>
                  <a href="/dashboard#audit" className="hover:text-white transition-colors">
                    Analytics
                  </a>
                </li>
                <li>
                  <a href="/dashboard#audit" className="hover:text-white transition-colors">
                    Audit Trail
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#team" className="hover:text-white transition-colors">
                    Our Team
                  </a>
                </li>
                <li>
                  <a href="/careers" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/press" className="hover:text-white transition-colors">
                    Press Kit
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="/docs" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="/api" className="hover:text-white transition-colors">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="/support" className="hover:text-white transition-colors">
                    Support Center
                  </a>
                </li>
                <li>
                  <a href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/whitepaper" className="hover:text-white transition-colors">
                    Whitepaper
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-400">
                <p>
                  &copy; 2025 Waternity. All rights reserved. Built on Hedera.
                </p>
              </div>
              <div className="flex gap-6 text-sm text-gray-400">
                <a href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a href="/cookies" className="hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
