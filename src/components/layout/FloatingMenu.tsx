'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { 
  Home, 
  Settings, 
  Users, 
  Building, 
  Phone, 
  Info,
  Plus,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const FloatingMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const itemsRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { icon: Home, href: '/', label: 'Home' },
    { icon: Settings, href: '/services', label: 'Services' },
    { icon: Building, href: '/industries', label: 'Industries' },
    { icon: Users, href: '/customers', label: 'Customers' },
    { icon: Info, href: '/about', label: 'About' },
    { icon: Phone, href: '/contact', label: 'Contact' },
  ];

  useEffect(() => {
    if (itemsRef.current) {
      const items = itemsRef.current.querySelectorAll('.menu-item');
      
      if (isOpen) {
        gsap.fromTo(items, 
          {
            scale: 0,
            opacity: 0,
            y: 20
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: "back.out(1.7)"
          }
        );
      }
    }
  }, [isOpen]);

  return (
    <div className="fixed bottom-8 right-8 z-[90]">
      {isOpen && (
        <div 
          ref={itemsRef}
          className="absolute bottom-20 right-0 flex flex-col-reverse items-end space-y-reverse space-y-4"
        >
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="menu-item group flex items-center space-x-3 bg-white border border-zinc-100 rounded-full py-3 px-6 shadow-xl hover:bg-zinc-900 hover:text-white transition-all duration-300"
            >
              <item.icon className="h-4 w-4" />
              <span className="font-bold text-xs uppercase tracking-widest whitespace-nowrap">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      )}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-full shadow-2xl transition-all duration-300 group p-0",
          isOpen ? "bg-zinc-900 text-white hover:bg-black" : "bg-white text-zinc-900 hover:bg-zinc-50 border border-zinc-100"
        )}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Plus className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
};

export default FloatingMenu;
