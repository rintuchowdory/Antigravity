import React from 'react';
import { 
  LayoutDashboard, 
  Terminal, 
  Code, 
  GitBranch, 
  Sliders, 
  Cpu,
  Brain,
  Activity
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, agentStatus }) {
  const menuItems = [
    { id: 'workspace', name: 'Agent Console', icon: Terminal },
    { id: 'explorer', name: 'Code & Diff Explorer', icon: Code },
    { id: 'workflow', name: 'Workflow Planner', icon: GitBranch },
    { id: 'metrics', name: 'System Metrics', icon: Cpu },
    { id: 'settings', name: 'LLM Settings', icon: Sliders },
  ];

  const getStatusColor = () => {
    switch (agentStatus) {
      case 'Running':
        return 'var(--secondary)';
      case 'Analyzing':
        return 'var(--warning)';
      case 'Writing':
        return 'var(--primary)';
      case 'Done':
        return 'var(--success)';
      default:
        return 'var(--text-muted)';
    }
  };

  return (
    <aside className="sidebar-panel">
      {/* Brand Header */}
      <div style={{
        padding: '24px 20px',
        borderBottom: '1px solid var(--border-light)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          borderRadius: '10px',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 15px var(--primary-glow)',
          animation: agentStatus !== 'IDLE' && agentStatus !== 'Done' ? 'pulseGlow 2s infinite ease-in-out' : 'none'
        }}>
          <Brain size={22} color="white" />
        </div>
        <div>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: '800',
            color: 'white',
            letterSpacing: '0.5px'
          }} className="shimmer-text">Antigravity AI</h2>
          <span style={{
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>Agent Workspace</span>
        </div>
      </div>

      {/* Agent Status Bar */}
      <div style={{
        padding: '16px 20px',
        background: 'rgba(255, 255, 255, 0.01)',
        borderBottom: '1px solid var(--border-light)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={14} color={getStatusColor()} />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
            Agent Status:
          </span>
        </div>
        <span style={{
          fontSize: '0.75rem',
          fontWeight: '700',
          color: getStatusColor(),
          padding: '2px 8px',
          background: `rgba(${agentStatus === 'Done' ? '16, 185, 129' : agentStatus === 'Running' || agentStatus === 'Writing' ? '99, 102, 241' : '245, 158, 11'}, 0.1)`,
          borderRadius: '100px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          border: `1px solid rgba(${agentStatus === 'Done' ? '16, 185, 129' : '99, 102, 241'}, 0.2)`
        }}>
          {agentStatus}
        </span>
      </div>

      {/* Menu Navigation */}
      <nav style={{ padding: '20px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '10px',
                border: 'none',
                background: isActive ? 'linear-gradient(90deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.05) 100%)' : 'transparent',
                color: isActive ? 'white' : 'var(--text-secondary)',
                fontWeight: isActive ? '600' : '400',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                borderLeft: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                textAlign: 'left',
                marginBottom: '4px'
              }}
              className="glowing-border-hover"
            >
              <Icon size={18} color={isActive ? 'var(--primary)' : 'var(--text-muted)'} />
              <span style={{ fontSize: '0.9rem' }}>{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div style={{
        padding: '20px',
        borderTop: '1px solid var(--border-light)',
        background: 'rgba(0, 0, 0, 0.2)',
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
      }}>
        <div>Version v3.5 (Flash Engine)</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--success)',
            boxShadow: '0 0 8px var(--success)'
          }}></div>
          <span>Secure local execution</span>
        </div>
      </div>
    </aside>
  );
}
