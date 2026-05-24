import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatConsole from './components/ChatConsole';
import CodeExplorer from './components/CodeExplorer';
import WorkflowPlanner from './components/WorkflowPlanner';
import SystemMetrics from './components/SystemMetrics';
import SettingsPanel from './components/SettingsPanel';
import './App.css';

// Initial steps for the agentic workspace deployment simulation
const initialWorkflowSteps = [
  { id: 'step-1', title: 'Initialize Workspace & Inspections', description: 'Analyze directories, dependencies, and environment constraints.', status: 'pending' },
  { id: 'step-2', title: 'Self-Correct Configuration Files', description: 'Modify vite.config.js to support relative routing on Pages.', status: 'pending' },
  { id: 'step-3', title: 'Craft CI/CD GitHub Actions Pipeline', description: 'Create .github/workflows/deploy.yml build/release steps.', status: 'pending' },
  { id: 'step-4', title: 'Validate Production Compilations', description: 'Execute mock local build validations and syntactical testing.', status: 'pending' },
  { id: 'step-5', title: 'Establish Remote GitHub Repository', description: 'Call GitHub API to register rintuchowdory/Antigravity repo.', status: 'pending' },
  { id: 'step-6', title: 'Push Core Assets & Trigger Actions', description: 'Staging, committing and pushing branch main to GitHub.', status: 'pending' },
  { id: 'step-7', title: 'Monitor Delivery Subdomain Status', description: 'Track Actions build execution and confirm Pages subdomain is online.', status: 'pending' }
];

const initialLogs = [
  { type: 'info', text: 'Initializing Antigravity AI Agent Engine...', timestamp: '19:22:15' },
  { type: 'info', text: 'Target Workspace detected: /home/rintu-chowdory/Antigravity', timestamp: '19:22:16' },
  { type: 'info', text: 'Vite React scaffold identified. Repository status: No commits yet.', timestamp: '19:22:18' },
  { type: 'info', text: 'Antigravity Workspace loaded successfully. Status: IDLE.', timestamp: '19:22:20' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('workspace');
  const [agentStatus, setAgentStatus] = useState('IDLE');
  const [logs, setLogs] = useState(initialLogs);
  const [workflowSteps, setWorkflowSteps] = useState(initialWorkflowSteps);
  const [speed, setSpeed] = useState(800); // interval delay in ms
  const [simStep, setSimStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  // Workflow steps execution simulation logic
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setTimeout(() => {
      executeSimulationStep();
    }, speed);

    return () => clearTimeout(interval);
  }, [isSimulating, simStep, speed]);

  const startSimulation = (promptText = '') => {
    setIsSimulating(true);
    setSimStep(0);
    setAgentStatus('Running');
    
    // Add command starting log
    const startMsg = {
      type: 'command',
      text: `[AGENT EXECUTION TRIGGERED] Processing Prompt: "${promptText || 'Deploy full CI/CD pipeline'}"`,
      timestamp: new Date().toLocaleTimeString()
    };
    setLogs(prev => [...prev, startMsg]);
  };

  const resetSimulation = () => {
    setIsSimulating(false);
    setSimStep(0);
    setAgentStatus('IDLE');
    setLogs(initialLogs);
    setWorkflowSteps(initialWorkflowSteps.map(s => ({ ...s, status: 'pending' })));
  };

  const executeSimulationStep = () => {
    const time = new Date().toLocaleTimeString();
    
    // Define steps logic
    switch (simStep) {
      case 0:
        // Step 1 running
        setAgentStatus('Analyzing');
        updateStepStatus('step-1', 'running');
        addLog('info', 'Executing Step 1: Scanning repository trees...', time);
        addLog('info', 'Analyzing packages... Detected dependencies: React, ReactDOM.', time);
        addLog('success', 'Workspace analysis completed successfully.', time);
        updateStepStatus('step-1', 'done');
        setSimStep(1);
        break;

      case 1:
        // Step 2 running
        setAgentStatus('Writing');
        updateStepStatus('step-2', 'running');
        addLog('info', 'Executing Step 2: Checking config settings...', time);
        addLog('warning', 'Warning: Absolute asset routing config detected in vite.config.js. May break GitHub Pages routing.', time);
        addLog('info', 'Self-Correcting: Modifying /home/rintu-chowdory/Antigravity/vite.config.js...', time);
        addLog('success', 'Added relative base configuration: base: "./"', time);
        updateStepStatus('step-2', 'done');
        setSimStep(2);
        break;

      case 2:
        // Step 3 running
        setAgentStatus('Writing');
        updateStepStatus('step-3', 'running');
        addLog('info', 'Executing Step 3: Setting up CI/CD actions pipeline...', time);
        addLog('info', 'Writing file: /home/rintu-chowdory/Antigravity/.github/workflows/deploy.yml', time);
        addLog('info', 'Configuring build script: npm run build | Deploy path: dist/ | Branch: gh-pages', time);
        addLog('success', 'CI/CD pipeline workflow configured successfully.', time);
        updateStepStatus('step-3', 'done');
        setSimStep(3);
        break;

      case 3:
        // Step 4 running
        setAgentStatus('Running');
        updateStepStatus('step-4', 'running');
        addLog('info', 'Executing Step 4: Running local build validations...', time);
        addLog('info', '$ npm run build', time);
        addLog('info', 'vite v6.2.0 building for production...', time);
        addLog('info', '✓ 34 modules transformed.', time);
        addLog('info', 'dist/assets/index-D1q8uXo8.css   21.69 kB │ gzip:  4.12 kB', time);
        addLog('info', 'dist/assets/index-Cl4p829A.js   142.10 kB │ gzip: 46.21 kB', time);
        addLog('success', '✓ built in 1.42s. Production compilation SUCCESS.', time);
        updateStepStatus('step-4', 'done');
        setSimStep(4);
        break;

      case 4:
        // Step 5 running
        setAgentStatus('Running');
        updateStepStatus('step-5', 'running');
        addLog('info', 'Executing Step 5: Connecting to GitHub repository...', time);
        addLog('info', '$ gh repo create Antigravity --public --source=. --push', time);
        addLog('info', '✓ Created repository rintuchowdory/Antigravity on GitHub', time);
        addLog('success', 'GitHub repository initialized: https://github.com/rintuchowdory/Antigravity', time);
        updateStepStatus('step-5', 'done');
        setSimStep(5);
        break;

      case 5:
        // Step 6 running
        setAgentStatus('Running');
        updateStepStatus('step-6', 'running');
        addLog('info', 'Executing Step 6: Deploying local changes to Git...', time);
        addLog('info', '$ git init && git add . && git commit -m "feat: premium antigravity dashboard & workflows"', time);
        addLog('info', 'Staged 18 files. Committed changes on branch main.', time);
        addLog('info', '$ git push -u origin main', time);
        addLog('info', 'Enumerating objects: 24, done.', time);
        addLog('info', 'Writing objects: 100% (24/24), 220 KiB | 8.2 MiB/s, done.', time);
        addLog('success', 'Branch main pushed successfully. GitHub Actions Build Triggered.', time);
        updateStepStatus('step-6', 'done');
        setSimStep(6);
        break;

      case 6:
        // Step 7 running
        setAgentStatus('Running');
        updateStepStatus('step-7', 'running');
        addLog('info', 'Executing Step 7: Monitoring Actions Deployment...', time);
        addLog('info', 'GitHub Actions workflow "Deploy to GitHub Pages" started.', time);
        addLog('info', 'Runner [ubuntu-latest]: Checkout code... OK', time);
        addLog('info', 'Runner [ubuntu-latest]: Install and build dependencies... OK', time);
        addLog('info', 'Runner [ubuntu-latest]: Deployed to gh-pages branch... OK', time);
        addLog('success', 'Deployment complete. Static site successfully published.', time);
        addLog('success', '🚀 Live Subdomain: https://rintuchowdory.github.io/Antigravity/', time);
        updateStepStatus('step-7', 'done');
        setAgentStatus('Done');
        setIsSimulating(false);
        break;

      default:
        setIsSimulating(false);
        break;
    }
  };

  const updateStepStatus = (id, status) => {
    setWorkflowSteps(prev => prev.map(step => 
      step.id === id ? { ...step, status } : step
    ));
  };

  const addLog = (type, text, timestamp) => {
    setLogs(prev => [...prev, { type, text, timestamp }]);
  };

  // Render components according to active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'workspace':
        return (
          <ChatConsole 
            logs={logs}
            setLogs={setLogs}
            agentStatus={agentStatus}
            setAgentStatus={setAgentStatus}
            startSimulation={startSimulation}
            resetSimulation={resetSimulation}
            speed={speed}
            setSpeed={setSpeed}
          />
        );
      case 'explorer':
        return <CodeExplorer />;
      case 'workflow':
        return (
          <WorkflowPlanner 
            workflowSteps={workflowSteps}
            startSimulation={startSimulation}
            resetSimulation={resetSimulation}
            agentStatus={agentStatus}
          />
        );
      case 'metrics':
        return <SystemMetrics agentStatus={agentStatus} />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <div style={{ color: 'white', padding: '20px' }}>Tab not found.</div>;
    }
  };

  return (
    <div className="app-wrapper">
      {/* Sleek navigation Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        agentStatus={agentStatus}
      />

      {/* Main Dashboard Screen */}
      <main className="main-content">
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          borderBottom: '1px solid var(--border-light)',
          paddingBottom: '16px'
        }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'white', letterSpacing: '-0.5px' }}>
              {activeTab === 'workspace' && "Workspace Console"}
              {activeTab === 'explorer' && "Code Inspector"}
              {activeTab === 'workflow' && "Pipeline Architecture"}
              {activeTab === 'metrics' && "Resource Analyzer"}
              {activeTab === 'settings' && "LLM Configuration"}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '2px' }}>
              {activeTab === 'workspace' && "Interact with the Antigravity agent and track automated shell commands."}
              {activeTab === 'explorer' && "Review synthesized code revisions and side-by-side git diff trees."}
              {activeTab === 'workflow' && "Review continuous delivery states and runner deployment logs."}
              {activeTab === 'metrics' && "Track agent speed parameters, heap memory and hardware efficiency."}
              {activeTab === 'settings' && "Manage system presets, secure credentials and local vault variables."}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Workspace URI:</span>
            <span style={{ 
              fontSize: '0.8rem', 
              color: 'white', 
              background: 'rgba(255,255,255,0.03)', 
              padding: '6px 12px', 
              borderRadius: '6px',
              border: '1px solid var(--border-light)',
              fontFamily: 'var(--font-mono)'
            }}>
              /home/rintu-chowdory/Antigravity
            </span>
          </div>
        </header>

        <section style={{ height: 'calc(100vh - 120px)' }}>
          {renderTabContent()}
        </section>
      </main>
    </div>
  );
}
