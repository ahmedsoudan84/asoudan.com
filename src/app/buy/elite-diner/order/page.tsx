'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/restaurant/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/restaurant/card';
import { Input } from '@/components/restaurant/input';
import { Label } from '@/components/restaurant/label';
import { useCart } from '@/lib/restaurant/cart-store';

export default function OrderPage() {
  const { items, updateQuantity, removeItem, getTotal } = useCart();
  const [step, setStep] = useState<'cart' | 'details' | 'confirm'>('cart');
  const [details, setDetails] = useState({ name: '', email: '', phone: '', address: '', postcode: '', type: 'delivery' as 'delivery'|'takeaway' });
  
  const subtotal = getTotal();
  const deliveryFee = details.type === 'delivery' && subtotal < 50 ? 5.99 : 0;
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="container py-16 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">Browse our menu and add delicious dishes.</p>
        <Button asChild><Link href="/buy/elite-diner/menu">View Menu</Link></Button>
      </div>
    );
  }

  if (step === 'confirm') {
    return (
      <div className="container py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 text-3xl">✓</div>
        <h1 className="text-2xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-2">Thank you, {details.name}!</p>
        <p className="text-sm text-muted-foreground mb-8">Confirmation sent to {details.email}.</p>
        <Card className="mb-8">
          <CardContent className="p-6 text-left">
            {items.map(item => (
              <div key={item.id} className="flex justify-between py-1">
                <span>{item.quantity}x {item.name}</span>
                <span>{"£" + (item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t mt-2 pt-2 flex justify-between font-semibold">
              <span>Total</span>
              <span>{"£" + total.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
        <Button asChild><Link href="/buy/elite-diner">Back to Home</Link></Button>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex items-center gap-2 mb-8">
        {step !== 'cart' && <Button variant="ghost" size="icon" onClick={() => setStep('cart')}><ArrowLeft className="h-4 w-4" /></Button>}
        <h1 className="text-2xl font-bold">{step === 'cart' ? 'Your Order' : 'Checkout'}</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === 'cart' ? (
            <Card>
              <CardHeader><CardTitle>Order Items</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b last:border-0">
                    <div className="relative h-24 w-24 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-semibold">{item.name}</h3>
                        <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{"£" + item.price}</p>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus className="h-3 w-3" /></Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus className="h-3 w-3" /></Button>
                        <span className="ml-auto font-semibold">{"£" + (item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader><CardTitle>Delivery Details</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={e => { e.preventDefault(); setStep('confirm'); }} className="space-y-4">
                  <div className="flex gap-2 mb-4">
                    <Button type="button" variant={details.type === 'delivery' ? 'default' : 'outline'} onClick={() => setDetails({...details, type: 'delivery'})} className="flex-1"><MapPin className="mr-2 h-4 w-4" />Delivery</Button>
                    <Button type="button" variant={details.type === 'takeaway' ? 'default' : 'outline'} onClick={() => setDetails({...details, type: 'takeaway'})} className="flex-1"><ShoppingBag className="mr-2 h-4 w-4" />Takeaway</Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" value={details.name} onChange={e => setDetails({...details, name: e.target.value})} required />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={details.email} onChange={e => setDetails({...details, email: e.target.value})} required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" value={details.phone} onChange={e => setDetails({...details, phone: e.target.value})} required />
                    </div>
                    {details.type === 'delivery' && (
                      <>
                        <div className="md:col-span-2">
                          <Label htmlFor="address">Address</Label>
                          <Input id="address" value={details.address} onChange={e => setDetails({...details, address: e.target.value})} required />
                        </div>
                        <div>
                          <Label htmlFor="postcode">Postcode</Label>
                          <Input id="postcode" value={details.postcode} onChange={e => setDetails({...details, postcode: e.target.value})} required />
                        </div>
                      </>
                    )}
                  </div>
                  <Button type="submit" className="w-full">Place Order - {"£" + total.toFixed(2)}</Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
        <div>
          <Card className="sticky top-24">
            <CardHeader><CardTitle>Summary</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{"£" + subtotal.toFixed(2)}</span>
              </div>
              {details.type === 'delivery' && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span>{deliveryFee > 0 ? "£" + deliveryFee.toFixed(2) : 'FREE'}</span>
                </div>
              )}
              {details.type === 'delivery' && subtotal < 50 && <p className="text-xs text-muted-foreground">Free delivery on orders over £50</p>}
              <div className="border-t pt-4 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{"£" + total.toFixed(2)}</span>
              </div>
              {step === 'cart' && <Button className="w-full" onClick={() => setStep('details')}>Proceed to Checkout</Button>}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}