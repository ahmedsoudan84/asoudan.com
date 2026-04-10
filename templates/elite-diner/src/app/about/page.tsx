import Image from 'next/image';
import { Award, Users, Leaf } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="container py-8">
      <section className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-12">
        <Image src="https://images.unsplash.com/photo-1414235077428-3388b55614dd?w=1920&h=600&fit=crop" alt="Restaurant interior" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 to-background" />
        <div className="absolute bottom-8 left-8"><h1 className="text-4xl font-bold">Our Story</h1></div>
      </section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        <div><h2 className="text-2xl font-bold mb-4">A Passion for Excellence</h2><p className="text-muted-foreground mb-4">Founded in 2015, Elite Diner was born from a simple mission: to create a dining experience that celebrates the art of food. Our founder, Chef Marcus Chen, spent over a decade perfecting his craft in Michelin-starred kitchens across Paris, Tokyo, and New York.</p><p className="text-muted-foreground">Today, we continue to push the boundaries of fine dining while honoring traditional techniques. Every dish tells a story, every ingredient has a purpose.</p></div>
        <div className="relative h-64 md:h-80 rounded-xl overflow-hidden"><Image src="https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&h=600&fit=crop" alt="Chef preparing food" fill className="object-cover" /></div>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card><CardContent className="p-6 text-center"><Award className="h-12 w-12 mx-auto mb-4 text-primary" /><h3 className="font-semibold mb-2">Award-Winning</h3><p className="text-sm text-muted-foreground">Recognized by The Good Food Guide.</p></CardContent></Card>
        <Card><CardContent className="p-6 text-center"><Users className="h-12 w-12 mx-auto mb-4 text-primary" /><h3 className="font-semibold mb-2">Family Values</h3><p className="text-sm text-muted-foreground">Many team members since day one.</p></CardContent></Card>
        <Card><CardContent className="p-6 text-center"><Leaf className="h-12 w-12 mx-auto mb-4 text-primary" /><h3 className="font-semibold mb-2">Sustainable</h3><p className="text-sm text-muted-foreground">Local farms, sustainable producers.</p></CardContent></Card>
      </section>
    </div>
  );
}