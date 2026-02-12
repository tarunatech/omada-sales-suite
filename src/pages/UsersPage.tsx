import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const usersData = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul@omada.com', role: 'Admin', dept: 'Management', status: 'Active', lastLogin: '2024-12-15' },
  { id: 2, name: 'Priya Patel', email: 'priya@omada.com', role: 'Builders Sales', dept: 'Sales', status: 'Active', lastLogin: '2024-12-14' },
  { id: 3, name: 'Amit Desai', email: 'amit@omada.com', role: 'Architects / Interior Sales', dept: 'Sales', status: 'Active', lastLogin: '2024-12-13' },
  { id: 4, name: 'Kiran Modi', email: 'kiran@omada.com', role: 'Contractors / End-to-End', dept: 'Sales', status: 'Inactive', lastLogin: '2024-11-30' },
  { id: 5, name: 'Neha Joshi', email: 'neha@omada.com', role: 'PMC', dept: 'PMC', status: 'Active', lastLogin: '2024-12-15' },
];

const UsersPage = () => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filtered = usersData.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Users &amp; Roles</h1>
        <Button size="sm"><Plus className="w-3.5 h-3.5 mr-1.5" /> Add User</Button>
      </div>

      <div className="flex gap-3 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search users..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-52"><SelectValue placeholder="Filter by role" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Builders Sales">Builders Sales</SelectItem>
            <SelectItem value="Architects / Interior Sales">Architects / Interior</SelectItem>
            <SelectItem value="Contractors / End-to-End">Contractors</SelectItem>
            <SelectItem value="PMC">PMC</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="enterprise-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Department</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id}>
                <td className="font-medium">{u.name}</td>
                <td>{u.email}</td>
                <td><span className="status-badge-info">{u.role}</span></td>
                <td>{u.dept}</td>
                <td><span className={u.status === 'Active' ? 'status-badge-success' : 'status-badge-neutral'}>{u.status}</span></td>
                <td>{u.lastLogin}</td>
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
    </div>
  );
};

export default UsersPage;
