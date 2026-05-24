import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Send, Terminal, Cpu, CheckCircle } from 'lucide-react';

export default function ChatConsole({ 
  logs, 
  setLogs, 
  agentStatus, 
  setAgentStatus, 
  startSimulation,
  resetSimulation,
  runStep,
  speed,
  setSpeed
}) {
  const [inputVal, setInputVal] = useState('');
  const terminalEndRef = useRef(null);

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    // Add user message to console
    const userMsg = {
      type: 'user',
      text: `> ${inputVal}`,
      timestamp: new Date().toLocaleTimeString()
    };

    setLogs(prev => [...prev, userMsg]);
    setInputVal('');

    // Trigger simulation representing agent response
    setAgentStatus('Running');
    startSimulation(inputVal);
  };

  const getLogColor = (type) => {
    switch (type) {
      case 'user': return 'white';
      case 'command': return '#a855f7'; // Purple command
      case 'success': return '#10b981'; // Green success
      case 'error': return '#ef4444'; // Red error
      case 'info': return '#38bdf8'; // Sky blue info
      default: return '#94a3b8'; // Grey text
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateRows: '1fr auto', gap: '20px', height: 'calc(100vh - 100px)' }}>
      {/* Top Workspace Section: Split into Chat/Settings and Terminal */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '24px', overflow: 'hidden' }}>
        
        {/* Left Column: Interactive Prompter */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%', overflowY: 'auto' }} className="glass-panel" p="20px">
          <div style={{ padding: '20px', borderBottom: '1px solid var(--border-light)' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Cpu size={20} color="var(--primary)" />
              Prompt Antigravity AI
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
              Task the AI to autonomously build projects, debug codebases, or coordinate CI/CD workflows.
            </p>
          </div>

          <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="glass-card" style={{ background: 'rgba(99, 102, 241, 0.05)', borderColor: 'rgba(99, 102, 241, 0.2)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase' }}>Sample Request</span>
                <p style={{ fontSize: '0.85rem', color: 'white', marginTop: '6px', cursor: 'pointer' }} onClick={() => setInputVal("Deploy a multi-stage CI/CD pipeline to build the Vite App and publish it to gh-pages with a custom domain.")}>
                  "Deploy a multi-stage CI/CD pipeline to build the Vite App and publish it to gh-pages with a custom domain."
                </p>
              </div>

              <div className="glass-card" style={{ background: 'rgba(168, 85, 247, 0.05)', borderColor: 'rgba(168, 85, 247, 0.2)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--secondary)', textTransform: 'uppercase' }}>Sample Request</span>
                <p style={{ fontSize: '0.85rem', color: 'white', marginTop: '6px', cursor: 'pointer' }} onClick={() => setInputVal("Fix the routing layout inside my React Application, optimize state updates, and make the UI ultra premium.")}>
                  "Fix the routing layout inside my React Application, optimize state updates, and make the UI ultra premium."
                </p>
              </div>
            </div>

            {/* Prompt Input Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask Antigravity to do something..."
                className="form-control"
                style={{ flex: 1, borderRadius: '10px' }}
                disabled={agentStatus !== 'IDLE' && agentStatus !== 'Done'}
              />
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '48px', height: '48px', padding: '0', borderRadius: '10px' }}
                disabled={agentStatus !== 'IDLE' && agentStatus !== 'Done'}
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Live Terminal Output Log */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }} className="glass-panel">
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '1rem', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Terminal size={16} color="var(--primary)" />
              Agent Console Logs
            </h3>
            
            {/* Speed / Control Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Delay:</span>
                <select 
                  value={speed} 
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-light)',
                    color: 'white',
                    fontSize: '0.75rem',
                    borderRadius: '4px',
                    padding: '2px 4px',
                    outline: 'none'
                  }}
                >
                  <option value={1500}>1.5s</option>
                  <option value={800}>0.8s</option>
                  <option value={300}>0.3s</option>
                  <option value={100}>Turbo</option>
                </select>
              </div>

              <button 
                onClick={resetSimulation}
                title="Reset simulation logs"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  display: 'flex'
                }}
              >
                <RotateCcw size={14} className="hover:text-white" />
              </button>
            </div>
          </div>

          {/* Terminal Console Screen */}
          <div style={{
            flex: 1,
            background: '#04060c',
            padding: '20px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            {logs.map((log, index) => (
              <div key={index} style={{ 
                color: getLogColor(log.type), 
                display: 'flex', 
                flexDirection: 'column',
                lineHeight: '1.6'
              }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', minWidth: '60px', userSelect: 'none' }}>
                    [{log.timestamp || 'SYSTEM'}]
                  </span>
                  <span style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', flex: 1 }}>
                    {log.text}
                  </span>
                </div>
              </div>
            ))}
            
            {/* Loading / Cursor flashing */}
            {(agentStatus === 'Running' || agentStatus === 'Analyzing' || agentStatus === 'Writing') && (
              <div style={{ display: 'flex', gap: '8px', paddingLeft: '68px', alignItems: 'center' }}>
                <div style={{ 
                  width: '8px', 
                  height: '14px', 
                  background: 'var(--primary)', 
                  animation: 'pulseGlow 1s infinite ease-in-out' 
                }}></div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontStyle: 'italic' }}>
                  Antigravity agent executing step...
                </span>
              </div>
            )}
            
            <div ref={terminalEndRef} />
          </div>
        </div>

      </div>

      {/* Quick Status / Quick Actions Bar at bottom */}
      <div className="glass-panel" style={{
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(255, 255, 255, 0.01)'
      }}>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Active Workspace</span>
            <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'white', marginTop: '2px' }}>/home/rintu-chowdory/Antigravity</div>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Git Remote Branch</span>
            <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--secondary)', marginTop: '2px' }}>origin/main</div>
          </div>
        </div>

        {agentStatus === 'Done' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--success)' }}>
            <CheckCircle size={18} />
            <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>Deploy Complete! Site live on gh-pages.</span>
          </div>
        )}
      </div>
    </div>
  );
}
