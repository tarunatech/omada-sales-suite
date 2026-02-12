import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Sample data
const buildersData = [
  { id: 1, site: 'Sunrise Residency', person: 'Rajesh Patel', contact: '9876543210', architect: 'Studio Arc', interior: 'Design Pro', engineer: 'SK Associates', notes: 'Phase 2 in progress', status: 'Active' },
  { id: 2, site: 'Green Valley Phase 3', person: 'Amit Shah', contact: '9876543211', architect: 'Plan Works', interior: 'Interio Hub', engineer: 'RST Eng.', notes: 'Flooring selection pending', status: 'Pending' },
];

const architectsData = [
  { id: 1, firm: 'Studio Arc Design', person: 'Priya Mehta', contact: '9876543220', project: 'Luxury Villa Project', site: 'Bandra West, Mumbai', remarks: 'Premium materials required', status: 'Active' },
  { id: 2, firm: 'Plan Works Studio', person: 'Karan Desai', contact: '9876543221', project: 'Commercial Complex', site: 'Andheri East', remarks: 'Budget range discussed', status: 'In Progress' },
];

const contractorsData = [
  { id: 1, contractor: 'Prime Build Co.', person: 'Suresh Kumar', type: 'Residential', location: 'Thane', description: 'Tower A flooring', status: 'Active' },
  { id: 2, contractor: 'Metro Contractors', person: 'Vijay Sharma', type: 'Commercial', location: 'Navi Mumbai', description: 'Office space tiling', status: 'Completed' },
];

const statusClass = (s: string) => {
  if (s === 'Active') return 'status-badge-success';
  if (s === 'Pending' || s === 'In Progress') return 'status-badge-warning';
  if (s === 'Completed') return 'status-badge-info';
  return 'status-badge-neutral';
};

const SalesPage = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const isAdmin = user?.role === 'Admin';
  const isBuilders = user?.role === 'Builders Sales' || isAdmin;
  const isArchitects = user?.role === 'Architects / Interior Sales' || isAdmin;
  const isContractors = user?.role === 'Contractors / End-to-End' || isAdmin;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Sales Records</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="w-3.5 h-3.5 mr-1.5" /> New Record</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add Sales Record</DialogTitle></DialogHeader>
            <div className="space-y-3 pt-2">
              <div className="space-y-1.5"><Label>Site / Firm Name</Label><Input placeholder="Enter name" /></div>
              <div className="space-y-1.5"><Label>Contact Person</Label><Input placeholder="Authorized person" /></div>
              <div className="space-y-1.5"><Label>Contact Number</Label><Input placeholder="Phone number" /></div>
              <div className="space-y-1.5"><Label>Notes / Remarks</Label><Textarea placeholder="Additional details" rows={3} /></div>
              <Button className="w-full">Save Record</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters (Admin) */}
      {isAdmin && (
        <div className="flex gap-3 items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search records..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <Select value={deptFilter} onValueChange={setDeptFilter}>
            <SelectTrigger className="w-48"><SelectValue placeholder="Filter by dept" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="builders">Builders</SelectItem>
              <SelectItem value="architects">Architects</SelectItem>
              <SelectItem value="contractors">Contractors</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Builders Module */}
      {isBuilders && (deptFilter === 'all' || deptFilter === 'builders') && (
        <div className="enterprise-card">
          <h2 className="section-title">Builders Sales</h2>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Site Name</th>
                  <th>Authorized Person</th>
                  <th>Contact</th>
                  <th>Architect</th>
                  <th>Interior</th>
                  <th>Status</th>
                  {isAdmin && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {buildersData.map(r => (
                  <tr key={r.id}>
                    <td className="font-medium">{r.site}</td>
                    <td>{r.person}</td>
                    <td>{r.contact}</td>
                    <td>{r.architect}</td>
                    <td>{r.interior}</td>
                    <td><span className={statusClass(r.status)}>{r.status}</span></td>
                    {isAdmin && (
                      <td>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm"><Pencil className="w-3.5 h-3.5" /></Button>
                          <Button variant="ghost" size="sm"><Trash2 className="w-3.5 h-3.5 text-destructive" /></Button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Architects Module */}
      {isArchitects && (deptFilter === 'all' || deptFilter === 'architects') && (
        <div className="enterprise-card">
          <h2 className="section-title">Architects / Interior Sales</h2>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Firm Name</th>
                  <th>Authorized Person</th>
                  <th>Contact</th>
                  <th>Project</th>
                  <th>Site Details</th>
                  <th>Status</th>
                  {isAdmin && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {architectsData.map(r => (
                  <tr key={r.id}>
                    <td className="font-medium">{r.firm}</td>
                    <td>{r.person}</td>
                    <td>{r.contact}</td>
                    <td>{r.project}</td>
                    <td>{r.site}</td>
                    <td><span className={statusClass(r.status)}>{r.status}</span></td>
                    {isAdmin && (
                      <td>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm"><Pencil className="w-3.5 h-3.5" /></Button>
                          <Button variant="ghost" size="sm"><Trash2 className="w-3.5 h-3.5 text-destructive" /></Button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Contractors Module */}
      {isContractors && (deptFilter === 'all' || deptFilter === 'contractors') && (
        <div className="enterprise-card">
          <h2 className="section-title">Contractors / End-to-End</h2>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Contractor Name</th>
                  <th>Contact Person</th>
                  <th>Project Type</th>
                  <th>Location</th>
                  <th>Description</th>
                  <th>Status</th>
                  {isAdmin && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {contractorsData.map(r => (
                  <tr key={r.id}>
                    <td className="font-medium">{r.contractor}</td>
                    <td>{r.person}</td>
                    <td>{r.type}</td>
                    <td>{r.location}</td>
                    <td>{r.description}</td>
                    <td><span className={statusClass(r.status)}>{r.status}</span></td>
                    {isAdmin && (
                      <td>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm"><Pencil className="w-3.5 h-3.5" /></Button>
                          <Button variant="ghost" size="sm"><Trash2 className="w-3.5 h-3.5 text-destructive" /></Button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesPage;
