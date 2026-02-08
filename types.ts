
export interface Activity {
  id: string;
  title: string;
  time: string;
  value: string;
  status: string;
  type: 'production' | 'invoice' | 'maintenance';
  trend: 'up' | 'down' | 'stable';
}

export interface CreditMonth {
  month: string;
  produced: number;
  consumed: number;
}

export interface ClientSystem {
  id: string;
  name: string;
  status: 'active' | 'warning' | 'alert';
  power: string;
}
