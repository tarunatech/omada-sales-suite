import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FileDown, ImageDown } from 'lucide-react';

const orderItems = [
  { size: '600x600mm', category: 'Floor Tile', design: 'Classic Marble', qty: 120 },
  { size: '300x600mm', category: 'Wall Tile', design: 'Rustic Wood', qty: 80 },
  { size: '600x1200mm', category: 'Floor Tile', design: 'Onyx Pearl', qty: 60 },
  { size: '200x200mm', category: 'Accent Tile', design: 'Slate Dark', qty: 40 },
  { size: '800x800mm', category: 'Floor Tile', design: 'Modern Grey', qty: 90 },
];

const categorySummary = [
  { category: 'Floor Tile', totalQty: 270 },
  { category: 'Wall Tile', totalQty: 80 },
  { category: 'Accent Tile', totalQty: 40 },
];

const OrderExportPage = () => {
  const [supplier, setSupplier] = useState('Kajaria Ceramics Ltd.');
  const [party, setParty] = useState('OMADA Enterprises');
  const [city, setCity] = useState('Mumbai');
  const [state, setState] = useState('Maharashtra');
  const [referParty, setReferParty] = useState('');

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Order Export</h1>

      {/* Header Info */}
      <div className="form-section">
        <h3 className="form-section-title">Export Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label>Supplier Company</Label>
            <Input value={supplier} onChange={e => setSupplier(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Party Name</Label>
            <Input value={party} onChange={e => setParty(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>City</Label>
            <Input value={city} onChange={e => setCity(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>State</Label>
            <Input value={state} onChange={e => setState(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Refer Party</Label>
            <Input value={referParty} onChange={e => setReferParty(e.target.value)} placeholder="Optional" />
          </div>
        </div>
      </div>

      {/* Order Table */}
      <div className="enterprise-card">
        <h3 className="section-title">Order Items</h3>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Size</th>
                <th>Category</th>
                <th>Design Name</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{item.size}</td>
                  <td>{item.category}</td>
                  <td>{item.design}</td>
                  <td>{item.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Category Summary */}
      <div className="enterprise-card">
        <h3 className="section-title">Category-wise Summary</h3>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Total Quantity</th>
              </tr>
            </thead>
            <tbody>
              {categorySummary.map(s => (
                <tr key={s.category}>
                  <td className="font-medium">{s.category}</td>
                  <td>{s.totalQty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="flex gap-2">
        <Button size="sm"><FileDown className="w-3.5 h-3.5 mr-1.5" /> Export as PDF</Button>
        <Button size="sm" variant="outline"><ImageDown className="w-3.5 h-3.5 mr-1.5" /> Export as Image</Button>
      </div>
    </div>
  );
};

export default OrderExportPage;
