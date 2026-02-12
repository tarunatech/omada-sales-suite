import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import omadaLogo from '@/assets/omada-logo.png';
import {
  LayoutDashboard,
  FileText,
  PackageOpen,
  BarChart3,
  Database,
  Users,
  LogOut,
  Bell,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const menuItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['Admin'] },
  { label: 'Quotation Software', path: '/quotation', icon: FileText, roles: ['Admin'] },
  { label: 'Order Export', path: '/order-export', icon: PackageOpen, roles: ['Admin'] },
  { label: 'Sales Records', path: '/sales', icon: BarChart3, roles: ['Admin', 'Builders Sales', 'Architects / Interior Sales', 'Contractors / End-to-End', 'PMC'] },
  { label: 'Master Data', path: '/master-data', icon: Database, roles: ['Admin'] },
  { label: 'Users & Roles', path: '/users', icon: Users, roles: ['Admin'] },
];

const AppLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const filteredMenu = menuItems.filter(item => user && item.roles.includes(user.role));
  const currentPage = filteredMenu.find(m => location.pathname.startsWith(m.path))?.label || 'Dashboard';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Bar */}
      <header className="h-14 bg-card border-b border-border flex items-center justify-between px-4 shrink-0 z-10">
        <div className="flex items-center gap-3">
          <img src={omadaLogo} alt="OMADA" className="h-7" />
          <span className="text-xs text-muted-foreground hidden sm:inline">|</span>
          <span className="text-sm font-medium hidden sm:inline">{currentPage}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground mr-2">
            <Shield className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Role-Based Access Enabled</span>
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5 text-sm">
                <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:inline">{user?.name}</span>
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="text-xs text-muted-foreground" disabled>{user?.role}</DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="w-3.5 h-3.5 mr-2" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`${collapsed ? 'w-14' : 'w-56'} bg-card border-r border-border flex flex-col shrink-0 transition-all duration-200`}>
          <nav className="flex-1 py-2">
            {filteredMenu.map(item => {
              const active = location.pathname.startsWith(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${
                    active
                      ? 'border-l-2 border-primary bg-accent text-accent-foreground font-medium'
                      : 'border-l-2 border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  }`}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>

          <div className="border-t border-border p-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              {!collapsed && <span>Logout</span>}
            </button>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="w-full flex items-center justify-center mt-1 py-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
