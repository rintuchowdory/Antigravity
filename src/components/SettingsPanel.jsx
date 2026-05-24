import React, { useState, useEffect } from 'react';
import { Save, ShieldAlert, Key, Eye, EyeOff } from 'lucide-react';

export default function SettingsPanel() {
  const [model, setModel] = useState('gemini-3.5-flash');
  const [autonomy, setAutonomy] = useState('semi-autonomous');
  const [prompt, setPrompt] = useState('You are Antigravity, a powerful agentic AI coding assistant designed by Google Deepmind...');
  const [githubToken, setGithubToken] = useState('');
  const [geminiKey, setGeminiKey] = useState('');
  
  const [showGithub, setShowGithub] = useState(false);
  const [showGemini, setShowGemini] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedModel = localStorage.getItem('antigravity_model');
    const savedAutonomy = localStorage.getItem('antigravity_autonomy');
    const savedPrompt = localStorage.getItem('antigravity_prompt');
    const savedGit = localStorage.getItem('antigravity_git');
    const savedGem = localStorage.getItem('antigravity_gemini');

    if (savedModel) setModel(savedModel);
    if (savedAutonomy) setAutonomy(savedAutonomy);
    if (savedPrompt) setPrompt(savedPrompt);
    if (savedGit) setGithubToken(savedGit);
    if (savedGem) setGeminiKey(savedGem);
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('antigravity_model', model);
    localStorage.setItem('antigravity_autonomy', autonomy);
    localStorage.setItem('antigravity_prompt', prompt);
    localStorage.setItem('antigravity_git', githubToken);
    localStorage.setItem('antigravity_gemini', geminiKey);
    
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', height: 'calc(100vh - 100px)' }}>
      
      {/* Left panel: Core configuration form */}
      <form onSubmit={handleSave} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px' }}>
          <div>
            <h3 style={{ color: 'white', fontSize: '1.2rem' }}>LLM & Agent Settings</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
              Configure your underlying intelligence engine, prompt presets, and system capabilities.
            </p>
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px' }}>
            <Save size={14} />
            Save Config
          </button>
        </div>

        {saveSuccess && (
          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            color: 'var(--success)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '0.85rem',
            fontWeight: '600'
          }}>
            Configuration successfully stored in LocalStorage!
          </div>
        )}

        {/* Model select */}
        <div className="form-group">
          <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'white' }}>Intelligence Model Engine</label>
          <select 
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="form-control"
          >
            <option value="gemini-3.5-flash">Gemini 3.5 Flash (Default)</option>
            <option value="gemini-1.5-pro">Gemini 1.5 Pro (Extra reasoning)</option>
            <option value="claude-3.5-sonnet">Claude 3.5 Sonnet</option>
            <option value="gpt-4o">GPT-4o (OpenAI)</option>
          </select>
        </div>

        {/* Autonomy Level */}
        <div className="form-group">
          <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'white' }}>Agent Autonomy Threshold</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginTop: '4px' }}>
            <button 
              type="button"
              className={`btn ${autonomy === 'copilot' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setAutonomy('copilot')}
              style={{ fontSize: '0.8rem', padding: '10px' }}
            >
              Copilot (Manual approvals)
            </button>
            <button 
              type="button"
              className={`btn ${autonomy === 'semi-autonomous' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setAutonomy('semi-autonomous')}
              style={{ fontSize: '0.8rem', padding: '10px' }}
            >
              Semi-Autonomous
            </button>
            <button 
              type="button"
              className={`btn ${autonomy === 'autonomous' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setAutonomy('autonomous')}
              style={{ fontSize: '0.8rem', padding: '10px' }}
            >
              Fully Autonomous
            </button>
          </div>
        </div>

        {/* System Prompt Customization */}
        <div className="form-group">
          <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'white' }}>System Persona Prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="form-control"
            rows="5"
            style={{ resize: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}
          />
        </div>
      </form>

      {/* Right panel: Security & API Credential Storage */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
        <h3 style={{ color: 'white', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Key size={16} color="var(--primary)" />
          API Credential Vault
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          To unlock real automated deployment and code creation, supply your platform API credentials below.
        </p>

        {/* GitHub Token */}
        <div className="form-group" style={{ position: 'relative' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>GitHub Personal Access Token</label>
          <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
            <input 
              type={showGithub ? "text" : "password"}
              value={githubToken}
              onChange={(e) => setGithubToken(e.target.value)}
              placeholder="gho_************************************"
              className="form-control"
              style={{ flex: 1 }}
            />
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => setShowGithub(!showGithub)}
              style={{ width: '45px', padding: '0' }}
            >
              {showGithub ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Gemini API Key */}
        <div className="form-group" style={{ position: 'relative' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Gemini API Access Key</label>
          <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
            <input 
              type={showGemini ? "text" : "password"}
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              placeholder="AIzaSy**********************************"
              className="form-control"
              style={{ flex: 1 }}
            />
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => setShowGemini(!showGemini)}
              style={{ width: '45px', padding: '0' }}
            >
              {showGemini ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Security Alert Badge */}
        <div className="glass-card" style={{ 
          marginTop: 'auto', 
          background: 'rgba(245, 158, 11, 0.03)', 
          borderColor: 'rgba(245, 158, 11, 0.2)',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start'
        }}>
          <ShieldAlert size={20} color="var(--warning)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h4 style={{ fontSize: '0.85rem', color: 'white', fontWeight: '600' }}>Local Security Guarantee</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
              Your API credentials are saved exclusively within your browser's local sandbox (`localStorage`). They are never transferred, recorded, or uploaded to any third-party external server.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
