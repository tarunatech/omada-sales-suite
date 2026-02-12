import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus, Pencil, Trash2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

const companiesData = [
  { id: 1, name: 'Kajaria Ceramics Ltd.', type: 'Tiles', contact: 'info@kajaria.com', status: 'Active' },
  { id: 2, name: 'Somany Ceramics', type: 'Tiles', contact: 'sales@somany.com', status: 'Active' },
  { id: 3, name: 'Johnson Tiles', type: 'Tiles', contact: 'info@johnson.com', status: 'Active' },
  { id: 4, name: 'RAK Ceramics', type: 'Tiles', contact: 'india@rakceramics.com', status: 'Inactive' },
];

const designsData = [
  { id: 1, name: 'Classic Marble', company: 'Kajaria', size: '600x600mm', price: 85 },
  { id: 2, name: 'Rustic Wood', company: 'Somany', size: '300x600mm', price: 72 },
  { id: 3, name: 'Modern Grey', company: 'Johnson', size: '800x800mm', price: 95 },
  { id: 4, name: 'Onyx Pearl', company: 'RAK', size: '600x1200mm', price: 120 },
];

const MasterDataPage = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Master Data</h1>

      <Tabs defaultValue="companies">
        <TabsList>
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="designs">Designs & Products</TabsTrigger>
        </TabsList>

        <TabsContent value="companies" className="mt-4">
          <div className="enterprise-card">
            <div className="flex items-center justify-between mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search companies..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <Button size="sm"><Plus className="w-3.5 h-3.5 mr-1.5" /> Add Company</Button>
            </div>
            <table className="data-table">
              <thead>
                <tr><th>Company Name</th><th>Type</th><th>Contact</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {companiesData.filter(c => c.name.toLowerCase().includes(search.toLowerCase())).map(c => (
                  <tr key={c.id}>
                    <td className="font-medium">{c.name}</td>
                    <td>{c.type}</td>
                    <td>{c.contact}</td>
                    <td><span className={c.status === 'Active' ? 'status-badge-success' : 'status-badge-neutral'}>{c.status}</span></td>
                    <td>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm"><Pencil className="w-3.5 h-3.5" /></Button>
                        <Button variant="ghost" size="sm"><Trash2 className="w-3.5 h-3.5 text-destructive" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="designs" className="mt-4">
          <div className="enterprise-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="section-title mb-0">Designs & Products</h3>
              <Button size="sm"><Plus className="w-3.5 h-3.5 mr-1.5" /> Add Design</Button>
            </div>
            <table className="data-table">
              <thead>
                <tr><th>Design Name</th><th>Company</th><th>Size</th><th>Price (₹)</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {designsData.map(d => (
                  <tr key={d.id}>
                    <td className="font-medium">{d.name}</td>
                    <td>{d.company}</td>
                    <td>{d.size}</td>
                    <td>₹{d.price}</td>
                    <td>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm"><Pencil className="w-3.5 h-3.5" /></Button>
                        <Button variant="ghost" size="sm"><Trash2 className="w-3.5 h-3.5 text-destructive" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MasterDataPage;
