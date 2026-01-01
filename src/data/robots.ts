export type RobotStatus = 'active' | 'idle' | 'charging' | 'maintenance' | 'offline';

export interface Robot {
  id: string;
  name: string;
  model: string;
  status: RobotStatus;
  battery: number;
  location: string;
  lastSeen: string;
  currentTask?: string;
  speed?: number;
  temperature?: number;
}

export interface Alert {
  id: string;
  robotId: string;
  robotName: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
}

export const robots: Robot[] = [
  {
    id: 'RB-001',
    name: 'Atlas Prime',
    model: 'Atlas X1',
    status: 'active',
    battery: 87,
    location: 'Warehouse A - Zone 3',
    lastSeen: '2 min ago',
    currentTask: 'Inventory Scan',
    speed: 1.2,
    temperature: 42,
  },
  {
    id: 'RB-002',
    name: 'Nexus Unit',
    model: 'Nexus S2',
    status: 'active',
    battery: 64,
    location: 'Warehouse B - Zone 1',
    lastSeen: '1 min ago',
    currentTask: 'Package Transport',
    speed: 0.8,
    temperature: 38,
  },
  {
    id: 'RB-003',
    name: 'Titan Bot',
    model: 'Titan M3',
    status: 'charging',
    battery: 23,
    location: 'Charging Bay 2',
    lastSeen: 'Now',
    temperature: 35,
  },
  {
    id: 'RB-004',
    name: 'Scout Alpha',
    model: 'Scout R1',
    status: 'idle',
    battery: 92,
    location: 'Warehouse A - Zone 1',
    lastSeen: '5 min ago',
    temperature: 36,
  },
  {
    id: 'RB-005',
    name: 'Hauler X',
    model: 'Hauler H2',
    status: 'maintenance',
    battery: 45,
    location: 'Maintenance Bay',
    lastSeen: '1 hour ago',
    temperature: 40,
  },
  {
    id: 'RB-006',
    name: 'Specter Unit',
    model: 'Specter V1',
    status: 'offline',
    battery: 0,
    location: 'Unknown',
    lastSeen: '3 hours ago',
  },
];

export const alerts: Alert[] = [
  {
    id: 'ALT-001',
    robotId: 'RB-006',
    robotName: 'Specter Unit',
    type: 'critical',
    message: 'Connection lost - Unit offline for 3 hours',
    timestamp: '3 hours ago',
  },
  {
    id: 'ALT-002',
    robotId: 'RB-003',
    robotName: 'Titan Bot',
    type: 'warning',
    message: 'Low battery - Currently charging (23%)',
    timestamp: '15 min ago',
  },
  {
    id: 'ALT-003',
    robotId: 'RB-005',
    robotName: 'Hauler X',
    type: 'warning',
    message: 'Scheduled maintenance in progress',
    timestamp: '1 hour ago',
  },
  {
    id: 'ALT-004',
    robotId: 'RB-002',
    robotName: 'Nexus Unit',
    type: 'info',
    message: 'Task completed - Package delivered to Zone 1',
    timestamp: '5 min ago',
  },
];

export const availableTasks: Task[] = [
  {
    id: 'TSK-001',
    name: 'Inventory Scan',
    description: 'Full warehouse inventory scanning',
    priority: 'medium',
  },
  {
    id: 'TSK-002',
    name: 'Package Transport',
    description: 'Transport packages between zones',
    priority: 'high',
  },
  {
    id: 'TSK-003',
    name: 'Security Patrol',
    description: 'Perimeter security check',
    priority: 'low',
  },
  {
    id: 'TSK-004',
    name: 'Floor Cleaning',
    description: 'Automated floor maintenance',
    priority: 'low',
  },
  {
    id: 'TSK-005',
    name: 'Quality Inspection',
    description: 'Product quality verification',
    priority: 'high',
  },
];
