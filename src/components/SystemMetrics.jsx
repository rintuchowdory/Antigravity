import React, { useState, useEffect } from 'react';
import { Cpu, HardDrive, Zap, CheckCircle2, TrendingUp } from 'lucide-react';

export default function SystemMetrics({ agentStatus }) {
  const [cpu, setCpu] = useState(12);
  const [memory, setMemory] = useState(124);
  const [speed, setSpeed] = useState(85);
  const [history, setHistory] = useState([12, 18, 15, 25, 30, 20, 28, 35, 24, 30]);

  // Simulate real-time metric fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      if (agentStatus !== 'IDLE' && agentStatus !== 'Done') {
        // Active processing fluctuations
        const nextCpu = Math.min(95, Math.max(45, Math.round(cpu + (Math.random() * 20 - 10))));
        const nextMem = Math.min(512, Math.max(180, Math.round(memory + (Math.random() * 30 - 10))));
        const nextSpeed = Math.min(120, Math.max(70, Math.round(speed + (Math.random() * 15 - 7))));
        
        setCpu(nextCpu);
        setMemory(nextMem);
        setSpeed(nextSpeed);
        setHistory(prev => [...prev.slice(1), nextCpu]);
      } else {
        // IDLE status fluctuations (lower usage)
        const nextCpu = Math.min(15, Math.max(2, Math.round(cpu + (Math.random() * 4 - 2))));
        const nextMem = Math.min(130, Math.max(110, Math.round(memory + (Math.random() * 2 - 1))));
        const nextSpeed = 0;
        
        setCpu(nextCpu);
        setMemory(nextMem);
        setSpeed(nextSpeed);
        setHistory(prev => [...prev.slice(1), nextCpu]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [cpu, memory, speed, agentStatus]);

  // Custom circular progress component
  const MetricRing = ({ value, max, color, label, icon: Icon }) => {
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (value / max) * circumference;

    return (
      <div className="glass-card" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        gap: '12px',
        position: 'relative'
      }}>
        <div style={{ position: 'relative', width: '90px', height: '90px' }}>
          <svg width="90" height="90" viewBox="0 0 90 90">
            <circle cx="45" cy="45" r={radius} className="metric-circle-bg" />
            <circle 
              cx="45" 
              cy="45" 
              r={radius} 
              className="metric-circle-value" 
              stroke={color}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{
                boxShadow: `0 0 10px ${color}`
              }}
            />
          </svg>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '90px',
            height: '90px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }}>
            <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'white' }}>{value}</span>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: '600' }}>{label}</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Icon size={14} color={color} />
          <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
            {label === '%' ? 'CPU Core Load' : label === 'MB' ? 'Memory Heap' : 'Throughput'}
          </span>
        </div>
      </div>
    );
  };

  // Convert history array to SVG polyline coordinates
  const getPolylinePoints = () => {
    const width = 350;
    const height = 100;
    const pointsCount = history.length;
    return history.map((val, index) => {
      const x = (index / (pointsCount - 1)) * width;
      const y = height - (val / 100) * height;
      return `${x},${y}`;
    }).join(' ');
  };

  return (
    <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', gap: '24px', height: 'calc(100vh - 100px)' }}>
      
      {/* Top gauges Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <MetricRing value={cpu} max={100} color="var(--primary)" label="%" icon={Cpu} />
        <MetricRing value={memory} max={512} color="var(--secondary)" label="MB" icon={HardDrive} />
        <MetricRing value={speed} max={120} color="var(--accent)" label="T/s" icon={Zap} />
        <MetricRing value={98.4} max={100} color="var(--success)" label="%" icon={CheckCircle2} />
      </div>

      {/* Bottom section: Realtime chart and statistics */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px', overflow: 'hidden' }}>
        
        {/* Animated Real-time Line Graph */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <h3 style={{ color: 'white', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={16} color="var(--primary)" />
              Agent Computational Load
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '2px' }}>
              Live rendering of agent CPU thread saturation over time.
            </p>
          </div>

          <div style={{
            flex: 1,
            background: '#04060c',
            borderRadius: '12px',
            border: '1px solid var(--border-light)',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            {/* SVG Chart */}
            <svg width="100%" height="100%" viewBox="0 0 350 100" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
              {/* Chart Grid Lines */}
              <line x1="0" y1="25" x2="350" y2="25" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
              <line x1="0" y1="50" x2="350" y2="50" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
              <line x1="0" y1="75" x2="350" y2="75" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />

              {/* Chart line */}
              <polyline
                fill="none"
                stroke="url(#chart-grad)"
                strokeWidth="2.5"
                points={getPolylinePoints()}
                style={{
                  transition: 'all 0.3s ease'
                }}
              />

              {/* Gradient for line */}
              <defs>
                <linearGradient id="chart-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--primary)" />
                  <stop offset="50%" stopColor="var(--secondary)" />
                  <stop offset="100%" stopColor="var(--accent)" />
                </linearGradient>
              </defs>
            </svg>
            
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '15px',
              fontSize: '0.75rem',
              color: 'var(--primary)',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--primary)',
                animation: 'pulseGlow 1.5s infinite'
              }} />
              <span>LIVE CORE FEED</span>
            </div>
          </div>
        </div>

        {/* Global Statistics */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ color: 'white', fontSize: '1.1rem' }}>Agent Performance Analytics</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, justifyContent: 'space-around' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '10px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Total Code Additions</span>
              <span style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--success)' }}>+482 lines</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '10px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Files Modified</span>
              <span style={{ fontSize: '1.1rem', fontWeight: '700', color: 'white' }}>14 files</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '10px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Syntactic Bugs Patched</span>
              <span style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--primary)' }}>3 unresolved</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>CI/CD Builds Executed</span>
              <span style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--secondary)' }}>8 runs</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
