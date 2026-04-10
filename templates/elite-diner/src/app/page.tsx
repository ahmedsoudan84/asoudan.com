import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Calendar, ShoppingBag, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { menuItems } from '@/lib/data/menu';

const featured = menuItems.slice(0, 6);

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop" alt="Restaurant" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="container relative z-10 text-center py-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-primary/10 backdrop-blur">
            <Sparkles className="h-4 w-4 text-primary" /><span className="text-sm font-medium">AI-Powered Dining</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Fine Dining<br /><span className="text-primary">Redefined</span></h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">Experience culinary excellence in Mayfair. Our AI helps you discover your perfect meal.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-base"><Link href="/book"><Calendar className="mr-2 h-5 w-5" />Book a Table</Link></Button>
            <Button asChild size="lg" variant="outline" className="text-base"><Link href="/order"><ShoppingBag className="mr-2 h-5 w-5" />Order Delivery</Link></Button>
          </div>
        </div>
      </section>

      {/* AI Search */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">AI Menu Recommender</h2>
            <p className="text-muted-foreground">Tell us what you're craving — our AI finds your perfect dish</p>
          </div>
          <div className="max-w-2xl mx-auto flex gap-2">
            <input type="text" placeholder='e.g., "vegetarian under £20 for date night"' className="flex-1 h-12 px-4 rounded-lg border bg-background" />
            <Button size="lg" className="h-12"><Sparkles className="mr-2 h-4 w-4" />Get Recommendations</Button>
          </div>
          <div className="flex flex-wrap gap-2 justify-center mt-4 text-sm text-muted-foreground">
            <span>Try:</span>
            <Link href="/menu?search=spicy" className="hover:text-primary underline">spicy</Link>
            <Link href="/menu?search=vegetarian" className="hover:text-primary underline">vegetarian</Link>
            <Link href="/menu?search=gluten-free" className="hover:text-primary underline">gluten-free</Link>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div><h2 className="text-3xl font-bold mb-2">Featured Dishes</h2><p className="text-muted-foreground">Hand-picked favourites</p></div>
            <Button asChild variant="ghost"><Link href="/menu">View All <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map(dish => (
              <Card key={dish.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="relative h-48 overflow-hidden"><Image src={dish.image} alt={dish.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" /></div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2"><h3 className="font-semibold">{dish.name}</h3><span className="font-bold text-primary">£{dish.price}</span></div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{dish.description}</p>
                  <div className="flex flex-wrap gap-1">{dish.dietaryTags.slice(0,3).map(tag => <span key={tag} className="px-2 py-0.5 text-xs rounded-full bg-muted">{tag}</span>)}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Elite Diner</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center"><div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl mb-4">1</div><h3 className="font-semibold mb-2">AI-Powered</h3><p className="text-sm text-muted-foreground">Smart recommendations for every taste</p></div>
            <div className="text-center"><div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl mb-4">2</div><h3 className="font-semibold mb-2">Premium Ingredients</h3><p className="text-sm text-muted-foreground">A5 wagyu, wild seafood, and more</p></div>
            <div className="text-center"><div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl mb-4">3</div><h3 className="font-semibold mb-2">Seamless Experience</h3><p className="text-sm text-muted-foreground">Book, order, and enjoy effortlessly</p></div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">What Guests Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{name:"Sarah M.",text:"The AI recommender suggested the perfect dish for our anniversary!",rating:5},{name:"James L.",text:"Best fine dining in Mayfair. The wagyu was sublime.",rating:5},{name:"Emma K.",text:"Love the AI chatbot - found gluten-free options instantly.",rating:5}].map((t,i) => (
              <Card key={i}><CardContent className="p-6"><div className="flex gap-1 mb-4">{[...Array(t.rating)].map((_,i) => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}</div><p className="text-muted-foreground mb-4">"{t.text}"</p><p className="font-semibold">{t.name}</p></CardContent></Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for an Unforgettable Experience?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">Book your table and let our AI help you discover your perfect meal.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-primary"><Link href="/book">Reserve a Table</Link></Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"><Link href="/menu">View Menu</Link></Button>
          </div>
        </div>
      </section>
    </div>
  );
}