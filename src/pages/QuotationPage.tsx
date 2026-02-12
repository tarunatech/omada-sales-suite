import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, FileDown, Share2, Save, Eye, Pencil, ImagePlus, X } from 'lucide-react';

interface QuotationItem {
  id: string;
  company: string;
  design: string;
  finish: string;
  qty: number;
  unitPrice: number;
  image: string | null;
}

interface Category {
  id: string;
  name: string;
  items: QuotationItem[];
}

const companies = ['Kajaria', 'Somany', 'Johnson', 'RAK', 'Nitco', 'Orient Bell'];
const designs = ['Classic Marble', 'Rustic Wood', 'Modern Grey', 'Travertine', 'Onyx Pearl', 'Slate Dark'];

const QuotationPage = () => {
  const [customerName, setCustomerName] = useState('');
  const [mobile, setMobile] = useState('');
  const [salesRef, setSalesRef] = useState('');
  const [notes, setNotes] = useState('');
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Main Flooring',
      items: [{ id: '1-1', company: 'Kajaria', design: 'Classic Marble', finish: '600x600mm', qty: 100, unitPrice: 85, image: null }],
    },
  ]);
  const [showPreview, setShowPreview] = useState(false);

  const addCategory = () => {
    const id = Date.now().toString();
    setCategories([...categories, { id, name: 'New Category', items: [] }]);
  };

  const addItem = (catId: string) => {
    setCategories(categories.map(c =>
      c.id === catId
        ? { ...c, items: [...c.items, { id: `${catId}-${Date.now()}`, company: '', design: '', finish: '', qty: 0, unitPrice: 0, image: null }] }
        : c
    ));
  };

  const updateItem = (catId: string, itemId: string, field: keyof QuotationItem, value: string | number | null) => {
    setCategories(categories.map(c =>
      c.id === catId
        ? { ...c, items: c.items.map(i => i.id === itemId ? { ...i, [field]: value } : i) }
        : c
    ));
  };

  const removeItem = (catId: string, itemId: string) => {
    setCategories(categories.map(c =>
      c.id === catId ? { ...c, items: c.items.filter(i => i.id !== itemId) } : c
    ));
  };

  const removeCategory = (catId: string) => {
    setCategories(categories.filter(c => c.id !== catId));
  };

  const grandTotal = categories.reduce((sum, c) => sum + c.items.reduce((s, i) => s + i.qty * i.unitPrice, 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Quotation Software</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)}>
            <Eye className="w-3.5 h-3.5 mr-1.5" /> {showPreview ? 'Hide Preview' : 'Preview'}
          </Button>
        </div>
      </div>

      <div className={`grid gap-6 ${showPreview ? 'lg:grid-cols-5' : ''}`}>
        {/* Form Section */}
        <div className={showPreview ? 'lg:col-span-3' : ''}>
          {/* Customer Details */}
          <div className="form-section">
            <h3 className="form-section-title">Customer Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Customer Name</Label>
                <Input value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="Enter customer name" />
              </div>
              <div className="space-y-1.5">
                <Label>Mobile</Label>
                <Input value={mobile} onChange={e => setMobile(e.target.value)} placeholder="Enter mobile number" />
              </div>
              <div className="space-y-1.5">
                <Label>Salesman Reference</Label>
                <Input value={salesRef} onChange={e => setSalesRef(e.target.value)} placeholder="Salesman name" />
              </div>
              <div className="space-y-1.5">
                <Label>Notes</Label>
                <Textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Additional notes" rows={2} />
              </div>
            </div>
          </div>

          {/* Categories */}
          {categories.map(cat => (
            <div key={cat.id} className="form-section">
              <div className="flex items-center justify-between mb-3">
                <Input
                  value={cat.name}
                  onChange={e => setCategories(categories.map(c => c.id === cat.id ? { ...c, name: e.target.value } : c))}
                  className="font-semibold text-sm uppercase tracking-wider border-0 bg-transparent p-0 h-auto focus-visible:ring-0 w-auto"
                />
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" onClick={() => addItem(cat.id)}>
                    <Plus className="w-3.5 h-3.5 mr-1" /> Item
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => removeCategory(cat.id)}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>

              {cat.items.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="data-table">
                    <thead>
                       <tr>
                        <th>Image</th>
                        <th>Company</th>
                        <th>Design</th>
                        <th>Finish / Size</th>
                        <th>Qty</th>
                        <th>Unit Price</th>
                        <th>Total</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cat.items.map(item => (
                        <tr key={item.id}>
                          <td>
                            {item.image ? (
                              <div className="relative w-12 h-12 group">
                                <img src={item.image} alt="Design" className="w-12 h-12 rounded object-cover border border-border" />
                                <button
                                  onClick={() => updateItem(cat.id, item.id, 'image', null)}
                                  className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X className="w-2.5 h-2.5" />
                                </button>
                              </div>
                            ) : (
                              <label className="w-12 h-12 rounded border border-dashed border-border flex items-center justify-center cursor-pointer hover:border-primary hover:bg-accent transition-colors">
                                <ImagePlus className="w-4 h-4 text-muted-foreground" />
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const url = URL.createObjectURL(file);
                                      updateItem(cat.id, item.id, 'image', url);
                                    }
                                  }}
                                />
                              </label>
                            )}
                          </td>
                          <td>
                            <Select value={item.company} onValueChange={v => updateItem(cat.id, item.id, 'company', v)}>
                              <SelectTrigger className="h-8 text-xs w-28"><SelectValue placeholder="Select" /></SelectTrigger>
                              <SelectContent>
                                {companies.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                              </SelectContent>
                            </Select>
                          </td>
                          <td>
                            <Select value={item.design} onValueChange={v => updateItem(cat.id, item.id, 'design', v)}>
                              <SelectTrigger className="h-8 text-xs w-32"><SelectValue placeholder="Select" /></SelectTrigger>
                              <SelectContent>
                                {designs.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                              </SelectContent>
                            </Select>
                          </td>
                          <td><Input className="h-8 text-xs w-24" value={item.finish} onChange={e => updateItem(cat.id, item.id, 'finish', e.target.value)} /></td>
                          <td><Input className="h-8 text-xs w-16" type="number" value={item.qty || ''} onChange={e => updateItem(cat.id, item.id, 'qty', +e.target.value)} /></td>
                          <td><Input className="h-8 text-xs w-20" type="number" value={item.unitPrice || ''} onChange={e => updateItem(cat.id, item.id, 'unitPrice', +e.target.value)} /></td>
                          <td className="font-medium text-xs">₹{(item.qty * item.unitPrice).toLocaleString()}</td>
                          <td>
                            <Button variant="ghost" size="sm" onClick={() => removeItem(cat.id, item.id)}>
                              <Trash2 className="w-3.5 h-3.5 text-muted-foreground" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="text-right mt-2 text-sm font-medium text-foreground">
                Category Total: ₹{cat.items.reduce((s, i) => s + i.qty * i.unitPrice, 0).toLocaleString()}
              </div>
            </div>
          ))}

          <Button variant="outline" onClick={addCategory} className="w-full">
            <Plus className="w-4 h-4 mr-2" /> Add Category
          </Button>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            <Button size="sm"><Save className="w-3.5 h-3.5 mr-1.5" /> Save</Button>
            <Button size="sm" variant="outline"><FileDown className="w-3.5 h-3.5 mr-1.5" /> Generate PDF</Button>
            <Button size="sm" variant="outline"><Share2 className="w-3.5 h-3.5 mr-1.5" /> Share via WhatsApp</Button>
            <Button size="sm" variant="outline"><Pencil className="w-3.5 h-3.5 mr-1.5" /> Edit</Button>
            <Button size="sm" variant="outline" className="text-destructive hover:text-destructive"><Trash2 className="w-3.5 h-3.5 mr-1.5" /> Delete</Button>
          </div>
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div className="lg:col-span-2">
            <div className="enterprise-card sticky top-0">
              <div className="text-center border-b pb-3 mb-3">
                <h3 className="font-bold text-base">OMADA</h3>
                <p className="text-[10px] text-muted-foreground">Quotation</p>
              </div>
              <div className="text-xs space-y-1 mb-4">
                <p><span className="text-muted-foreground">Customer:</span> {customerName || '—'}</p>
                <p><span className="text-muted-foreground">Mobile:</span> {mobile || '—'}</p>
                <p><span className="text-muted-foreground">Ref:</span> {salesRef || '—'}</p>
              </div>

              {categories.map(cat => (
                <div key={cat.id} className="mb-3">
                  <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1">{cat.name}</h4>
                  {cat.items.map(item => (
                    <div key={item.id} className="flex items-center gap-2 text-xs py-1 border-b border-dashed">
                      {item.image && <img src={item.image} alt="" className="w-6 h-6 rounded object-cover" />}
                      <span className="flex-1">{item.design || 'Item'} ({item.finish})</span>
                      <span>₹{(item.qty * item.unitPrice).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              ))}

              <div className="border-t pt-2 mt-3 flex justify-between text-sm font-bold">
                <span>Grand Total</span>
                <span>₹{grandTotal.toLocaleString()}</span>
              </div>

              <div className="mt-4 pt-3 border-t text-[10px] text-muted-foreground">
                <p className="font-medium">Bank Details</p>
                <p>Account: OMADA Enterprises</p>
                <p>Bank: HDFC Bank | A/C: XXXX1234</p>
                <p>IFSC: HDFC0001234</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotationPage;
