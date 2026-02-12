import { TrendingUp, FileText, Clock, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const kpis = [
  { label: 'Total Quotations', value: '1,247', icon: FileText, change: '+12%' },
  { label: 'Confirmed Orders', value: '834', icon: TrendingUp, change: '+8%' },
  { label: 'Pending Enquiries', value: '156', icon: Clock, change: '-3%' },
  { label: 'Active Sales Users', value: '24', icon: Users, change: '+2' },
];

const recentQuotations = [
  { id: 'QT-2024-001', customer: 'Sunrise Developers', amount: '₹4,52,000', date: '2024-12-15', status: 'Confirmed' },
  { id: 'QT-2024-002', customer: 'Green Valley Homes', amount: '₹2,18,500', date: '2024-12-14', status: 'Pending' },
  { id: 'QT-2024-003', customer: 'Metro Builders Ltd.', amount: '₹8,75,000', date: '2024-12-13', status: 'Confirmed' },
  { id: 'QT-2024-004', customer: 'Skyline Architects', amount: '₹1,65,300', date: '2024-12-12', status: 'Draft' },
  { id: 'QT-2024-005', customer: 'Urban Contractors', amount: '₹3,92,000', date: '2024-12-11', status: 'Pending' },
];

const recentEnquiries = [
  { id: 'ENQ-001', party: 'Ravi Constructions', department: 'Builders', contact: '9876543210', date: '2024-12-15', status: 'New' },
  { id: 'ENQ-002', party: 'Design Studio Arc', department: 'Architects', contact: '9876543211', date: '2024-12-14', status: 'Contacted' },
  { id: 'ENQ-003', party: 'Prime Contractors', department: 'Contractors', contact: '9876543212', date: '2024-12-13', status: 'In Progress' },
  { id: 'ENQ-004', party: 'Laxmi Developers', department: 'Builders', contact: '9876543213', date: '2024-12-12', status: 'New' },
];

const statusClass = (s: string) => {
  if (s === 'Confirmed' || s === 'Contacted') return 'status-badge-success';
  if (s === 'Pending' || s === 'In Progress') return 'status-badge-warning';
  if (s === 'New') return 'status-badge-info';
  return 'status-badge-neutral';
};

const DashboardPage = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(kpi => (
          <div key={kpi.label} className="kpi-card">
            <div className="flex items-center justify-between">
              <span className="kpi-label">{kpi.label}</span>
              <kpi.icon className="w-4 h-4 text-muted-foreground" />
            </div>
            <span className="kpi-value">{kpi.value}</span>
            <span className="text-xs text-muted-foreground">{kpi.change} from last month</span>
          </div>
        ))}
      </div>

      {/* Recent Quotations */}
      <div className="enterprise-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title mb-0">Recent Quotations</h2>
          <Input placeholder="Search quotations..." className="w-60" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Quotation ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentQuotations
                .filter(q => q.customer.toLowerCase().includes(search.toLowerCase()) || q.id.toLowerCase().includes(search.toLowerCase()))
                .map(q => (
                  <tr key={q.id}>
                    <td className="font-medium">{q.id}</td>
                    <td>{q.customer}</td>
                    <td>{q.amount}</td>
                    <td>{q.date}</td>
                    <td><span className={statusClass(q.status)}>{q.status}</span></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
          <span>Showing {recentQuotations.length} entries</span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>

      {/* Recent Enquiries */}
      <div className="enterprise-card">
        <h2 className="section-title">Recent Sales Enquiries</h2>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Party Name</th>
                <th>Department</th>
                <th>Contact</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentEnquiries.map(e => (
                <tr key={e.id}>
                  <td className="font-medium">{e.id}</td>
                  <td>{e.party}</td>
                  <td>{e.department}</td>
                  <td>{e.contact}</td>
                  <td>{e.date}</td>
                  <td><span className={statusClass(e.status)}>{e.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
