import React from 'react';
import { Play, RotateCcw, CheckCircle2, Circle, AlertCircle } from 'lucide-react';

export default function WorkflowPlanner({ 
  workflowSteps, 
  startSimulation, 
  resetSimulation,
  agentStatus
}) {
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'done':
        return <CheckCircle2 size={16} color="var(--success)" />;
      case 'running':
        return (
          <div style={{
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            border: '2px solid var(--primary)',
            borderTopColor: 'transparent',
            animation: 'spin 1s linear infinite'
          }} />
        );
      default:
        return <Circle size={16} color="var(--text-muted)" />;
    }
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'done':
        return {
          background: 'rgba(16, 185, 129, 0.1)',
          color: 'var(--success)',
          border: '1px solid rgba(16, 185, 129, 0.2)'
        };
      case 'running':
        return {
          background: 'rgba(99, 102, 241, 0.1)',
          color: 'var(--primary)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          animation: 'pulseBorder 2s infinite'
        };
      default:
        return {
          background: 'rgba(255, 255, 255, 0.02)',
          color: 'var(--text-muted)',
          border: '1px solid var(--border-light)'
        };
    }
  };

  // Calculate percentage progress
  const completedSteps = workflowSteps.filter(s => s.status === 'done').length;
  const progressPercent = Math.round((completedSteps / workflowSteps.length) * 100);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', height: 'calc(100vh - 100px)' }}>
      
      {/* Left panel: Task pipeline stages */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
        
        {/* Header and simulation triggers */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px' }}>
          <div>
            <h3 style={{ color: 'white', fontSize: '1.2rem' }}>CI/CD Workflow Planner</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
              Track the step-by-step progress of the Antigravity Agentic Deployment.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            {agentStatus === 'IDLE' || agentStatus === 'Done' ? (
              <button 
                className="btn btn-primary" 
                onClick={() => startSimulation("Deploy full pipeline")}
                style={{ fontSize: '0.85rem', padding: '8px 16px' }}
              >
                <Play size={14} />
                Deploy pipeline
              </button>
            ) : (
              <button 
                className="btn btn-secondary" 
                disabled
                style={{ fontSize: '0.85rem', padding: '8px 16px', opacity: 0.7 }}
              >
                Agent running...
              </button>
            )}

            <button 
              className="btn btn-secondary" 
              onClick={resetSimulation}
              title="Reset tasks"
              style={{ padding: '8px' }}
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Overall Progress</span>
            <span style={{ color: 'white', fontWeight: '600' }}>{progressPercent}% Complete</span>
          </div>
          <div style={{ height: '8px', background: 'var(--bg-tertiary)', borderRadius: '100px', overflow: 'hidden' }}>
            <div style={{
              width: `${progressPercent}%`,
              height: '100%',
              background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
              transition: 'width 0.4s ease-out',
              boxShadow: '0 0 10px var(--primary-glow)'
            }} />
          </div>
        </div>

        {/* Step-by-Step Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {workflowSteps.map((step) => (
            <div 
              key={step.id} 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                background: step.status === 'running' ? 'rgba(99, 102, 241, 0.03)' : 'rgba(255, 255, 255, 0.01)',
                border: step.status === 'running' ? '1px solid rgba(99, 102, 241, 0.25)' : '1px solid var(--border-light)',
                borderRadius: '10px',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                {getStatusIcon(step.status)}
                <div>
                  <h4 style={{ 
                    fontSize: '0.9rem', 
                    color: step.status === 'done' ? 'var(--text-secondary)' : 'white',
                    textDecoration: step.status === 'done' ? 'line-through' : 'none'
                  }}>
                    {step.title}
                  </h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '2px' }}>
                    {step.description}
                  </p>
                </div>
              </div>

              <span style={{
                fontSize: '0.7rem',
                fontWeight: '700',
                padding: '3px 8px',
                borderRadius: '100px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                ...getStatusBadgeStyle(step.status)
              }}>
                {step.status}
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* Right panel: Static pipeline mapping visualization */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
        <h3 style={{ color: 'white', fontSize: '1.1rem' }}>CI/CD Pipeline Topology</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          Visual nodes representing the continuous delivery architecture deployed to your GitHub Actions.
        </p>

        {/* CSS simulated flow diagram */}
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '24px',
          background: 'rgba(0,0,0,0.15)',
          borderRadius: '12px',
          padding: '20px'
        }}>
          {/* Node 1: Code Trigger */}
          <div className="glass-card" style={{ 
            width: '180px', 
            textAlign: 'center',
            borderColor: progressPercent >= 16 ? 'var(--primary)' : 'var(--border-light)',
            boxShadow: progressPercent >= 16 ? '0 0 10px var(--primary-glow)' : 'none'
          }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>TRIGGER</span>
            <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'white', marginTop: '2px' }}>Git Push (Main)</div>
          </div>

          {/* Connect 1 */}
          <div style={{ 
            width: '2px', 
            height: '20px', 
            background: progressPercent >= 33 ? 'var(--primary)' : 'var(--border-light)',
            boxShadow: progressPercent >= 33 ? '0 0 8px var(--primary)' : 'none'
          }} />

          {/* Node 2: Runner */}
          <div className="glass-card" style={{ 
            width: '180px', 
            textAlign: 'center',
            borderColor: progressPercent >= 50 ? 'var(--secondary)' : 'var(--border-light)',
            boxShadow: progressPercent >= 50 ? '0 0 10px var(--secondary-glow)' : 'none'
          }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>RUNNER</span>
            <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'white', marginTop: '2px' }}>ubuntu-latest</div>
          </div>

          {/* Connect 2 */}
          <div style={{ 
            width: '2px', 
            height: '20px', 
            background: progressPercent >= 66 ? 'var(--secondary)' : 'var(--border-light)',
            boxShadow: progressPercent >= 66 ? '0 0 8px var(--secondary)' : 'none'
          }} />

          {/* Node 3: Build & Test */}
          <div className="glass-card" style={{ 
            width: '180px', 
            textAlign: 'center',
            borderColor: progressPercent >= 83 ? 'var(--primary)' : 'var(--border-light)',
            boxShadow: progressPercent >= 83 ? '0 0 10px var(--primary-glow)' : 'none'
          }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>JOB STATUS</span>
            <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'white', marginTop: '2px' }}>Vite Build Production</div>
          </div>

          {/* Connect 3 */}
          <div style={{ 
            width: '2px', 
            height: '20px', 
            background: progressPercent >= 100 ? 'var(--success)' : 'var(--border-light)',
            boxShadow: progressPercent >= 100 ? '0 0 8px var(--success)' : 'none'
          }} />

          {/* Node 4: Pages Deployment */}
          <div className="glass-card" style={{ 
            width: '180px', 
            textAlign: 'center',
            borderColor: progressPercent >= 100 ? 'var(--success)' : 'var(--border-light)',
            boxShadow: progressPercent >= 100 ? '0 0 15px var(--success-glow)' : 'none'
          }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>DEPLOY</span>
            <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--success)', marginTop: '2px' }}>GitHub Pages Live</div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
