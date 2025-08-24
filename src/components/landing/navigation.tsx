'use client';

import { useState } from 'react';
import Link from 'next/link';
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
            <Link
              href="/"
              className="text-gray-700 hover:text-waternity-primary transition-colors font-medium"
            >
              Home
            </Link>

            {/* Platform Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-gray-700 hover:text-waternity-primary transition-colors font-medium">
                Platform
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/dashboard" className="w-full">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="#how-it-works" className="w-full">
                    How It Works
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/dashboard#explore" className="w-full">
                    Invest in Wells
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/dashboard#investor" className="w-full">
                    Track Performance
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/dashboard#audit" className="w-full">
                    Analytics & Audit
                  </Link>
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
                  <Link href="/docs" className="w-full">
                    Documentation
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/api" className="w-full">
                    API Reference
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/whitepaper" className="w-full">
                    Whitepaper
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/support" className="w-full">
                    Support
                  </Link>
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
            <Button
              className="bg-waternity-primary hover:bg-waternity-primary/90"
              asChild
            >
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
              <Link
                href="/"
                className="text-gray-700 hover:text-waternity-primary transition-colors font-medium py-2"
              >
                Home
              </Link>

              {/* Mobile Platform Section */}
              <div>
                <div className="text-gray-900 font-medium py-2">Platform</div>
                <div className="pl-4 flex flex-col gap-2">
                  <Link
                    href="/dashboard"
                    className="text-gray-600 hover:text-waternity-primary transition-colors py-1"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="#how-it-works"
                    className="text-gray-600 hover:text-waternity-primary transition-colors py-1"
                  >
                    How It Works
                  </Link>
                  <Link
                    href="/dashboard#explore"
                    className="text-gray-600 hover:text-waternity-primary transition-colors py-1"
                  >
                    Invest in Wells
                  </Link>
                  <Link
                    href="/dashboard#investor"
                    className="text-gray-600 hover:text-waternity-primary transition-colors py-1"
                  >
                    Track Performance
                  </Link>
                  <Link
                    href="/dashboard#audit"
                    className="text-gray-600 hover:text-waternity-primary transition-colors py-1"
                  >
                    Analytics & Audit
                  </Link>
                </div>
              </div>

              {/* Mobile Resources Section */}
              <div>
                <div className="text-gray-900 font-medium py-2">Resources</div>
                <div className="pl-4 flex flex-col gap-2">
                  <Link
                    href="/docs"
                    className="text-gray-600 hover:text-waternity-primary transition-colors py-1"
                  >
                    Documentation
                  </Link>
                  <Link
                    href="/api"
                    className="text-gray-600 hover:text-waternity-primary transition-colors py-1"
                  >
                    API Reference
                  </Link>
                  <Link
                    href="/whitepaper"
                    className="text-gray-600 hover:text-waternity-primary transition-colors py-1"
                  >
                    Whitepaper
                  </Link>
                  <Link
                    href="/support"
                    className="text-gray-600 hover:text-waternity-primary transition-colors py-1"
                  >
                    Support
                  </Link>
                </div>
              </div>

              <Link
                href="#about"
                className="text-gray-700 hover:text-waternity-primary transition-colors font-medium py-2"
              >
                About
              </Link>
              <Link
                href="#contact"
                className="text-gray-700 hover:text-waternity-primary transition-colors font-medium py-2"
              >
                Contact
              </Link>

              {/* Mobile CTA */}
              <div className="flex flex-col gap-3 pt-4 border-t border-slate-200">
                <Button
                  variant="ghost"
                  className="text-gray-700 justify-start"
                  asChild
                >
                  <Link href="/dashboard#user">Sign In</Link>
                </Button>
                <Button
                  className="bg-waternity-primary hover:bg-waternity-primary/90 justify-start"
                  asChild
                >
                  <Link href="/dashboard">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
