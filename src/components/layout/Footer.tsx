'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Facebook, Clock, Shield, Truck, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-zinc-100">
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">DR</span>
              </div>
              <div>
                <span className="font-bold text-xl text-zinc-900 tracking-tight">DattaRaj</span>
                <span className="text-zinc-400 ml-1 font-medium italic block text-xs uppercase tracking-widest">Silver Ornaments</span>
              </div>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              Where tradition meets silver elegance. Handcrafted by master artisans with generations of expertise. Since 1980.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" className="w-10 h-10 flex items-center justify-center bg-zinc-50 border border-zinc-100 text-zinc-900 hover:bg-zinc-900 hover:text-white rounded-full transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="https://facebook.com" className="w-10 h-10 flex items-center justify-center bg-zinc-50 border border-zinc-100 text-zinc-900 hover:bg-zinc-900 hover:text-white rounded-full transition-all duration-300">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="font-bold text-zinc-900 uppercase tracking-widest text-[10px]">Quick Links</h4>
            <nav className="flex flex-col space-y-4">
              {[
                { name: 'Home', href: '/' },
                { name: 'Products', href: '/products' },
                { name: 'Our Story', href: '/about' },
                { name: 'Contact Us', href: '/contact' },
              ].map((link) => (
                <Link key={link.name} href={link.href} className="text-zinc-500 hover:text-zinc-900 text-sm transition-colors w-fit">
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Craftsmanship Highlights */}
          <div className="space-y-8">
            <h4 className="font-bold text-zinc-900 uppercase tracking-widest text-[10px]">Heritage Archives</h4>
            <nav className="flex flex-col space-y-4">
              {[
                'Sterling Silver Masterpieces',
                'Traditional Temple Series',
                'Bespoke Handcrafted Designs',
                'Antique Silver Finish',
                'The Royal Kada Collection',
                'Signature Murti Idols',
              ].map((item) => (
                <Link key={item} href="/products" className="text-zinc-500 hover:text-zinc-900 text-sm transition-colors w-fit">
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-8">
            <h4 className="font-bold text-zinc-900 uppercase tracking-widest text-[10px]">Contact Us</h4>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 text-zinc-500 group cursor-pointer hover:text-zinc-900 transition-colors">
                <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-zinc-100 transition-colors">
                   <MessageCircle size={16} className="text-zinc-900" />
                </div>
                <span className="text-sm font-medium">+91 93256 14230</span>
              </div>
              <div className="flex items-center space-x-4 text-zinc-500 group cursor-pointer hover:text-zinc-900 transition-colors">
                <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-zinc-100 transition-colors">
                   <Mail size={16} className="text-zinc-900" />
                </div>
                <span className="text-sm font-medium">balajimali2000@gmail.com</span>
              </div>
              <div className="flex items-start space-x-4 text-zinc-500">
                <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center shrink-0">
                   <MapPin size={16} className="text-zinc-900" />
                </div>
                <span className="text-sm leading-relaxed font-medium">
                  Mahavir Nagar, Hupri, Kolhapur,<br/>Maharashtra, India
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-100 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center text-zinc-400 text-[10px] uppercase font-bold tracking-[0.2em] gap-6">
          <p>© {currentYear} DattaRaj Silver. Crafted by Artisans.</p>
          <div className="flex space-x-8">
            <Link href="/privacy" className="hover:text-zinc-900 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-zinc-900 transition-colors">Terms</Link>
            <Link href="/returns" className="hover:text-zinc-900 transition-colors">Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
