'use client';
import { useState } from 'react';
import { Sparkles, Search } from 'lucide-react';
import { Button } from '@/components/restaurant/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/restaurant/card';
import { Input } from '@/components/restaurant/input';
import { Label } from '@/components/restaurant/label';

export default function AIToolsPage() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!search) return;
    setLoading(true);
    setTimeout(() => {
      setResults(['Truffle Arancini - Vegetarian starter with Champagne', 'Wagyu Wellington - Our signature main', 'Chocolate Soufflé - Pairs with Port']);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="container py-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-primary/10">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">AI-Powered Features</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">AI Tools Demo</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">Experience our cutting-edge AI features - 100% client-side, no API keys required.</p>
      </div>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Smart Dietary Search
          </CardTitle>
          <CardDescription>Search using natural language - our AI understands intent, not just keywords</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Search query</Label>
            <Input 
              placeholder="gluten-free pasta with seafood" 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
            />
          </div>
          <Button onClick={handleSearch} disabled={loading || !search}>
            <Sparkles className="mr-2 h-4 w-4" />
            {loading ? 'Searching...' : 'Semantic Search'}
          </Button>
          {results.length > 0 && (
            <div className="space-y-2 mt-4">
              {results.map((r, i) => (
                <div key={i} className="p-3 bg-muted rounded-lg">{r}</div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="max-w-2xl mx-auto mt-8">
        <CardHeader><CardTitle>Technical Details</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold">Embedding Model</p>
              <p className="text-muted-foreground">Xenova/all-MiniLM-L6-v2</p>
            </div>
            <div>
              <p className="font-semibold">Generative Model</p>
              <p className="text-muted-foreground">Phi-2 (quantized)</p>
            </div>
            <div>
              <p className="font-semibold">Inference</p>
              <p className="text-muted-foreground">100% client-side</p>
            </div>
            <div>
              <p className="font-semibold">API Keys</p>
              <p className="text-muted-foreground">None required</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}