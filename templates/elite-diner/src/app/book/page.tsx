'use client';
import { useState } from 'react';
import { Calendar, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function BookPage() {
  const [step, setStep] = useState<'form' | 'confirm'>('form');
  const [details, setDetails] = useState({ name: '', email: '', phone: '', date: '', time: '', guests: '2' });
  
  if (step === 'confirm') {
    return <div className="container py-16 text-center"><Check className="h-16 w-16 mx-auto mb-4 text-green-600" /><h1 className="text-2xl font-bold mb-4">Reservation Confirmed!</h1><p className="text-muted-foreground mb-2">Thank you, {details.name}!</p><p className="text-sm text-muted-foreground mb-8">{details.guests} guests on {details.date} at {details.time}</p><Button onClick={() => window.location.href = '/'}>Back to Home</Button></div>;
  }

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto text-center mb-8"><h1 className="text-4xl font-bold mb-4">Book a Table</h1><p className="text-muted-foreground">Reserve your special dining experience</p></div>
      <Card className="mb-8"><CardHeader><CardTitle>Online Booking</CardTitle><CardDescription>Book through Calendly for immediate confirmation</CardDescription></CardHeader><CardContent><div className="bg-muted/30 rounded-lg p-8 text-center"><Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" /><p className="text-muted-foreground mb-4">Calendly embed would appear here</p><Button variant="outline">Open Calendly</Button></div></CardContent></Card>
      <Card><CardHeader><CardTitle>Request Booking</CardTitle><CardDescription>Or submit a request and we'll confirm within 2 hours</CardDescription></CardHeader><CardContent><form onSubmit={e => { e.preventDefault(); setStep('confirm'); }} className="space-y-4">
        <div className="flex items-center gap-2 mb-4 p-3 bg-primary/10 rounded-lg"><Sparkles className="h-4 w-4 text-primary" /><span className="text-sm">AI Assistant helps with special requests</span></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label htmlFor="name">Name</Label><Input id="name" value={details.name} onChange={e => setDetails({...details, name: e.target.value})} required /></div>
          <div><Label htmlFor="email">Email</Label><Input id="email" type="email" value={details.email} onChange={e => setDetails({...details, email: e.target.value})} required /></div>
          <div><Label htmlFor="phone">Phone</Label><Input id="phone" type="tel" value={details.phone} onChange={e => setDetails({...details, phone: e.target.value})} required /></div>
          <div><Label htmlFor="guests">Guests</Label><Input id="guests" type="number" min="1" max="20" value={details.guests} onChange={e => setDetails({...details, guests: e.target.value})} /></div>
          <div><Label htmlFor="date">Date</Label><Input id="date" type="date" value={details.date} onChange={e => setDetails({...details, date: e.target.value})} min={new Date().toISOString().split('T')[0]} required /></div>
          <div><Label htmlFor="time">Time</Label><Input id="time" type="time" value={details.time} onChange={e => setDetails({...details, time: e.target.value})} required /></div>
        </div>
        <Button type="submit" className="w-full">Request Reservation</Button>
      </form></CardContent></Card>
    </div>
  );
}