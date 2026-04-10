'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCart } from '@/lib/store/cart-store';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/order', label: 'Order' },
  { href: '/book', label: 'Book a Table' },
  { href: '/ai-tools', label: 'AI Tools' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const items = useCart(state => state.items);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-xl"><span className="text-primary">Elite</span> Diner</Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className={cn("text-sm font-medium hover:text-primary", pathname === link.href ? "text-primary" : "text-muted-foreground")}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/order" className="relative">
            <Button variant="ghost" size="icon"><ShoppingBag className="h-5 w-5" /></Button>
            {itemCount > 0 && <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">{itemCount}</span>}
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      {isOpen && <div className="border-t md:hidden"><nav className="container flex flex-col gap-4 py-4">{navLinks.map(link => <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className={cn("text-sm font-medium", pathname === link.href ? "text-primary" : "text-muted-foreground")}>{link.label}</Link>)}</nav></div>}
    </header>
  );
}