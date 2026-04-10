import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4"><span className="text-primary">Elite</span> Diner</h3>
            <p className="text-sm text-muted-foreground">Premium dining in Mayfair, London.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Hours</h4>
            <p className="text-sm text-muted-foreground">Mon-Thu: 12pm-10pm</p>
            <p className="text-sm text-muted-foreground">Fri-Sat: 12pm-11pm</p>
            <p className="text-sm text-muted-foreground">Sun: 12pm-9pm</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-sm text-muted-foreground flex items-center gap-2"><MapPin className="h-4 w-4" />123 Mayfair St, London</p>
            <p className="text-sm text-muted-foreground flex items-center gap-2"><Phone className="h-4 w-4" />+44 20 7123 4567</p>
            <p className="text-sm text-muted-foreground flex items-center gap-2"><Mail className="h-4 w-4" />info@elitediner.co.uk</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Links</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/book" className="text-muted-foreground hover:text-primary">Reservations</Link>
              <Link href="/menu" className="text-muted-foreground hover:text-primary">Menu</Link>
              <Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Elite Diner. All rights reserved.
        </div>
      </div>
    </footer>
  );
}