export type CustomerStatus = 'Active' | 'Service Due' | 'AMC Expiring'

export type Customer = {
  id: string
  name: string
  phone: string
  area: string
  roUnit: string
  lastService: string
  nextService: string
  technician: string
  amcStatus: string
  dueAmount: number
  status: CustomerStatus
}

export type ServiceTimelineEntry = {
  id: string
  date: string
  title: string
  technician: string
  notes: string
  amount: number
}

export const customers: Customer[] = [
  {
    id: 'CUS-1001',
    name: 'Amit Sharma',
    phone: '+91 98765 43210',
    area: 'Salt Lake',
    roUnit: 'Aquaguard RO Max',
    lastService: '18 May 2026',
    nextService: '18 Jun 2026',
    technician: 'Rahul',
    amcStatus: 'Active till Dec 2026',
    dueAmount: 0,
    status: 'Active',
  },
  {
    id: 'CUS-1002',
    name: 'Priya Singh',
    phone: '+91 91234 55678',
    area: 'New Town',
    roUnit: 'Kent Supreme',
    lastService: '02 Apr 2026',
    nextService: '04 Jun 2026',
    technician: 'Sourav',
    amcStatus: 'Active till Aug 2026',
    dueAmount: 450,
    status: 'Service Due',
  },
  {
    id: 'CUS-1003',
    name: 'Ramesh Gupta',
    phone: '+91 99887 77665',
    area: 'Dum Dum',
    roUnit: 'Pureit Copper+',
    lastService: '22 Mar 2026',
    nextService: '08 Jun 2026',
    technician: 'Bikash',
    amcStatus: 'Expires in 14 days',
    dueAmount: 1200,
    status: 'AMC Expiring',
  },
  {
    id: 'CUS-1004',
    name: 'Neha Verma',
    phone: '+91 90909 11880',
    area: 'Rajarhat',
    roUnit: 'Livpure Smart',
    lastService: '29 May 2026',
    nextService: '29 Jul 2026',
    technician: 'Rahul',
    amcStatus: 'Active till Jan 2027',
    dueAmount: 0,
    status: 'Active',
  },
  {
    id: 'CUS-1005',
    name: 'Sanjay Das',
    phone: '+91 93300 44551',
    area: 'Barasat',
    roUnit: 'AO Smith Z8',
    lastService: '14 Apr 2026',
    nextService: '03 Jun 2026',
    technician: 'Anirban',
    amcStatus: 'Active till Sep 2026',
    dueAmount: 650,
    status: 'Service Due',
  },
]

export const serviceTimelines: Record<string, ServiceTimelineEntry[]> = {
  'CUS-1001': [
    {
      id: 'SR-4101',
      date: '18 May 2026',
      title: 'Regular AMC service',
      technician: 'Rahul',
      notes: 'Filter cleaned, TDS checked, water flow normal.',
      amount: 0,
    },
    {
      id: 'SR-3908',
      date: '18 Apr 2026',
      title: 'Pre-filter replacement',
      technician: 'Rahul',
      notes: 'Pre-filter replaced during routine visit.',
      amount: 350,
    },
    {
      id: 'SR-3512',
      date: '12 Jan 2026',
      title: 'Membrane check',
      technician: 'Sourav',
      notes: 'Membrane condition good, no replacement needed.',
      amount: 0,
    },
  ],
  'CUS-1002': [
    {
      id: 'SR-4055',
      date: '02 Apr 2026',
      title: 'Leakage complaint',
      technician: 'Sourav',
      notes: 'Pipe connector tightened and leakage stopped.',
      amount: 450,
    },
    {
      id: 'SR-3660',
      date: '04 Feb 2026',
      title: 'Regular service',
      technician: 'Bikash',
      notes: 'Sediment filter cleaned and TDS checked.',
      amount: 0,
    },
  ],
  'CUS-1003': [
    {
      id: 'SR-3982',
      date: '22 Mar 2026',
      title: 'Low membrane life',
      technician: 'Bikash',
      notes: 'Membrane life reported low. Replacement suggested.',
      amount: 1200,
    },
    {
      id: 'SR-3420',
      date: '20 Jan 2026',
      title: 'Routine inspection',
      technician: 'Rahul',
      notes: 'Water taste and flow checked.',
      amount: 0,
    },
  ],
  'CUS-1004': [
    {
      id: 'SR-4210',
      date: '29 May 2026',
      title: 'Leakage fixed',
      technician: 'Rahul',
      notes: 'Pipe connector replaced and checked.',
      amount: 250,
    },
  ],
  'CUS-1005': [
    {
      id: 'SR-4012',
      date: '14 Apr 2026',
      title: 'No water flow',
      technician: 'Anirban',
      notes: 'Pump checked, pre-filter cleaning done.',
      amount: 650,
    },
    {
      id: 'SR-3722',
      date: '15 Feb 2026',
      title: 'Regular service',
      technician: 'Sourav',
      notes: 'General service completed.',
      amount: 0,
    },
  ],
}
