'use client';
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Check, Send } from 'lucide-react';
import { Button } from '@/components/restaurant/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/restaurant/card';
import { Input } from '@/components/restaurant/input';
import { Label } from '@/components/restaurant/label';
import { Textarea } from '@/components/restaurant/textarea';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  if (submitted) {
    return <div className="container py-16 text-center"><Check className="h-16 w-16 mx-auto mb-4 text-green-600" /><h1 className="text-2xl font-bold mb-4">Message Sent!</h1><p className="text-muted-foreground mb-8">We'll get back to you within 24 hours.</p><Button onClick={() => setSubmitted(false)}>Send Another</Button></div>;
  }

  return (
    <div className="container py-8">
      <div className="text-center mb-12"><h1 className="text-4xl font-bold mb-4">Contact Us</h1><p className="text-muted-foreground">We'd love to hear from you.</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-4">
          <Card><CardContent className="p-6"><div className="flex items-start gap-4"><MapPin className="h-5 w-5 text-primary mt-0.5" /><div><h3 className="font-semibold mb-1">Address</h3><p className="text-sm text-muted-foreground">123 Mayfair Street<br />London W1J 8AJ</p></div></div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="flex items-start gap-4"><Phone className="h-5 w-5 text-primary mt-0.5" /><div><h3 className="font-semibold mb-1">Phone</h3><p className="text-sm text-muted-foreground">+44 20 7123 4567</p></div></div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="flex items-start gap-4"><Mail className="h-5 w-5 text-primary mt-0.5" /><div><h3 className="font-semibold mb-1">Email</h3><p className="text-sm text-muted-foreground">info@elitediner.co.uk</p></div></div></CardContent></Card>
        </div>
        <div className="lg:col-span-2">
          <Card><CardHeader><CardTitle>Send a Message</CardTitle><CardDescription>We'll get back to you as soon as possible.</CardDescription></CardHeader><CardContent><form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label htmlFor="name">Name</Label><Input id="name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required /></div>
              <div><Label htmlFor="email">Email</Label><Input id="email" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required /></div>
            </div>
            <div><Label htmlFor="message">Message</Label><Textarea id="message" value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="How can we help?" className="min-h-[150px]" required /></div>
            <Button type="submit" className="w-full"><Send className="mr-2 h-4 w-4" />Send Message</Button>
          </form></CardContent></Card>
        </div>
      </div>
    </div>
  );
}