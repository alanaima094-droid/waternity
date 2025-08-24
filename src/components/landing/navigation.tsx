'use client';

import { useState } from 'react';
import { Droplets, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-waternity-primary to-waternity-accent rounded-lg flex items-center justify-center">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-waternity-neutral">
              Waternity
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="/"
              className="text-gray-700 hover:text-waternity-primary transition-colors font-medium"
            >
              Home
            </a>

            {/* Platform Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-gray-700 hover:text-waternity-primary transition-colors font-medium">
                Platform
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <a href="/dashboard" className="w-full">
                    Dashboard
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#how-it-works" className="w-full">
                    How It Works
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="/dashboard#explore" className="w-full">
                    Invest in Wells
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="/dashboard#investor" className="w-full">
                    Track Performance
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="/dashboard#audit" className="w-full">
                    Analytics & Audit
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Resources Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-gray-700 hover:text-waternity-primary transition-colors font-medium">
                Resources
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <a href="/docs" className="w-full">
                    Documentation
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="/api" className="w-full">
                    API Reference
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="/whitepaper" className="w-full">
                    Whitepaper
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="/support" className="w-full">
                    Support
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <a
              href="#about"
              className="text-gray-700 hover:text-waternity-primary transition-colors font-medium"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-waternity-primary transition-colors font-medium"
            >
              Contact
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" className="text-gray-700" asChild>
              <a href="/dashboard#user">Sign In</a>
            </Button>
            <Button className="bg-waternity-primary hover:bg-waternity-primary/90" asChild>
              <a href="/dashboard">Get Started</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col gap-4">
              <a
                href="/"
                className="text-gray-700 hover:text-waternity-primary transition-colors font-medium py-2"
              >
                Home
              </a>

              {/* Mobile Platform Section */}
              <div>
                <div className="text-gray-900 font-medium py-2">Platform</div>
                <div className="pl-4 flex flex-col gap-2">
                  <a
                    href="/dashboard"
                    className="text-gray-600 hover:text-waternity-primary transition-colors py-1"
                  >
                    Dashboard
                  </a>
                  <a
                    href="#how-it-works"
                    className="text-gray-600 hover:text-waternity-primary transition-colors py-1"
                  >
                    How It Works
                  </a>
                  <a
                    href="/dashboard#explore"
                    className="text-gray-600 hover:text-waternity-primary transition-colors py-1"
                  >
                    Invest in Wells
                  </a>
                  <a
                    href="/dashboard#investor"
                    className="text-gray-600 hover:text-waternity-primary transition-colors py-1"
                  >
                    Track Performance
                  </a>
                  <a
                    href="/dashboard#audit"
                    className="text-gray-600 hover:text-waternity-primary transition-colors py-1"
                  >
                    Analytics & Audit
                  </a>
                </div>
              </div>

              {/* Mobile Resources Section */}
              <div>
                <div className="text-gray-900 font-medium py-2">Resources</div>
                <div className="pl-4 flex flex-col gap-2">
                  <a
                    href="/docs"
                    className="text-gray-600 hover:text-waternity-primary transition-colors py-1"
                  >
                    Documentation
                  </a>
                  <a
                    href="/api"
                    className="text-gray-600 hover:text-waternity-primary transition-colors py-1"
                  >
                    API Reference
                  </a>
                  <a
                    href="/whitepaper"
                    className="text-gray-600 hover:text-waternity-primary transition-colors py-1"
                  >
                    Whitepaper
                  </a>
                  <a
                    href="/support"
                    className="text-gray-600 hover:text-waternity-primary transition-colors py-1"
                  >
                    Support
                  </a>
                </div>
              </div>

              <a
                href="#about"
                className="text-gray-700 hover:text-waternity-primary transition-colors font-medium py-2"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-waternity-primary transition-colors font-medium py-2"
              >
                Contact
              </a>

              {/* Mobile CTA */}
              <div className="flex flex-col gap-3 pt-4 border-t border-slate-200">
                <Button variant="ghost" className="text-gray-700 justify-start" asChild>
                  <a href="/dashboard#user">Sign In</a>
                </Button>
                <Button className="bg-waternity-primary hover:bg-waternity-primary/90 justify-start" asChild>
                  <a href="/dashboard">Get Started</a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
