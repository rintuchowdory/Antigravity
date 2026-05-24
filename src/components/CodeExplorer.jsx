import React, { useState } from 'react';
import { File, Folder, FolderOpen, RefreshCw, Layers } from 'lucide-react';

// Pre-defined mock files with original / modified code contents representing the Antigravity fixes.
const mockFiles = {
  'vite.config.js': {
    name: 'vite.config.js',
    path: 'vite.config.js',
    language: 'javascript',
    original: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})`,
    modified: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
})`,
    diff: [
      { type: 'normal', text: "import { defineConfig } from 'vite'" },
      { type: 'normal', text: "import react from '@vitejs/plugin-react'" },
      { type: 'normal', text: "" },
      { type: 'normal', text: "// https://vite.dev/config/" },
      { type: 'normal', text: "export default defineConfig({" },
      { type: 'normal', text: "  plugins: [react()]," },
      { type: 'removed', text: "- })" },
      { type: 'added', text: "+   base: \"./\"," },
      { type: 'added', text: "+ })" }
    ]
  },
  'deploy.yml': {
    name: 'deploy.yml',
    path: '.github/workflows/deploy.yml',
    language: 'yaml',
    original: `# Workflow missing or misconfigured`,
    modified: `name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: write

jobs:
  build-and-deploy:
    concurrency: ci-\${{ github.ref }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Install and Build
        run: |
          npm install
          npm run build

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist
          branch: gh-pages`,
    diff: [
      { type: 'added', text: "+ name: Deploy to GitHub Pages" },
      { type: 'added', text: "+" },
      { type: 'added', text: "+ on:" },
      { type: 'added', text: "+   push:" },
      { type: 'added', text: "+     branches:" },
      { type: 'added', text: "+       - main" },
      { type: 'added', text: "+" },
      { type: 'added', text: "+ permissions:" },
      { type: 'added', text: "+   contents: write" },
      { type: 'added', text: "+" },
      { type: 'added', text: "+ jobs:" },
      { type: 'added', text: "+   build-and-deploy:" },
      { type: 'added', text: "+     concurrency: ci-\${{ github.ref }}" },
      { type: 'added', text: "+     runs-on: ubuntu-latest" },
      { type: 'added', text: "+     steps:" },
      { type: 'added', text: "+       - name: Checkout" },
      { type: 'added', text: "+         uses: actions/checkout@v4" },
      { type: 'added', text: "+" },
      { type: 'added', text: "+       - name: Install and Build" },
      { type: 'added', text: "+         run: |" },
      { type: 'added', text: "+           npm install" },
      { type: 'added', text: "+           npm run build" },
      { type: 'added', text: "+" },
      { type: 'added', text: "+       - name: Deploy" },
      { type: 'added', text: "+         uses: JamesIves/github-pages-deploy-action@v4" },
      { type: 'added', text: "+         with:" },
      { type: 'added', text: "+           folder: dist" },
      { type: 'added', text: "+           branch: gh-pages" }
    ]
  },
  'index.css': {
    name: 'index.css',
    path: 'src/index.css',
    language: 'css',
    original: `body {
  margin: 0;
  background: white;
  color: black;
}`,
    modified: `:root {
  --bg-primary: #070913;
  --primary: #6366f1;
  --secondary: #a855f7;
  --text-primary: #f8fafc;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}`,
    diff: [
      { type: 'added', text: "+ :root {" },
      { type: 'added', text: "+   --bg-primary: #070913;" },
      { type: 'added', text: "+   --primary: #6366f1;" },
      { type: 'added', text: "+   --secondary: #a855f7;" },
      { type: 'added', text: "+   --text-primary: #f8fafc;" },
      { type: 'added', text: "+ }" },
      { type: 'added', text: "+" },
      { type: 'normal', text: "body {" },
      { type: 'removed', text: "-   margin: 0;" },
      { type: 'removed', text: "-   background: white;" },
      { type: 'removed', text: "-   color: black;" },
      { type: 'added', text: "+   background-color: var(--bg-primary);" },
      { type: 'added', text: "+   color: var(--text-primary);" },
      { type: 'normal', text: "}" }
    ]
  }
};

export default function CodeExplorer() {
  const [selectedFile, setSelectedFile] = useState('vite.config.js');
  const [showDiff, setShowDiff] = useState(true);
  const [expandedFolders, setExpandedFolders] = useState({
    root: true,
    github: true,
    src: true,
  });

  const toggleFolder = (folder) => {
    setExpandedFolders(prev => ({ ...prev, [folder]: !prev[folder] }));
  };

  const fileData = mockFiles[selectedFile] || mockFiles['vite.config.js'];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '24px', height: 'calc(100vh - 100px)' }}>
      
      {/* File Explorer Tree Panel */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <h4 style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '10px' }}>
          <Layers size={16} color="var(--primary)" />
          Workspace Repo
        </h4>
        
        {/* Directory Structure */}
        <div style={{ fontSize: '0.85rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', userSelect: 'none' }}>
          {/* Root Directory */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: '600' }} onClick={() => toggleFolder('root')}>
            {expandedFolders.root ? <FolderOpen size={16} color="var(--secondary)" /> : <Folder size={16} color="var(--secondary)" />}
            <span>Antigravity</span>
          </div>

          {expandedFolders.root && (
            <div style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              
              {/* .github folder */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }} onClick={() => toggleFolder('github')}>
                {expandedFolders.github ? <FolderOpen size={14} color="var(--primary)" /> : <Folder size={14} color="var(--primary)" />}
                <span style={{ color: 'var(--text-secondary)' }}>.github / workflows</span>
              </div>
              
              {expandedFolders.github && (
                <div style={{ paddingLeft: '16px' }}>
                  <div 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '6px', 
                      cursor: 'pointer',
                      color: selectedFile === 'deploy.yml' ? 'white' : 'var(--text-muted)',
                      fontWeight: selectedFile === 'deploy.yml' ? '600' : '400',
                      padding: '4px 6px',
                      background: selectedFile === 'deploy.yml' ? 'rgba(255, 255, 255, 0.03)' : 'transparent',
                      borderRadius: '4px'
                    }}
                    onClick={() => setSelectedFile('deploy.yml')}
                  >
                    <File size={12} color={selectedFile === 'deploy.yml' ? 'var(--primary)' : 'var(--text-muted)'} />
                    <span>deploy.yml</span>
                  </div>
                </div>
              )}

              {/* src folder */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }} onClick={() => toggleFolder('src')}>
                {expandedFolders.src ? <FolderOpen size={14} color="var(--primary)" /> : <Folder size={14} color="var(--primary)" />}
                <span style={{ color: 'var(--text-secondary)' }}>src</span>
              </div>

              {expandedFolders.src && (
                <div style={{ paddingLeft: '16px' }}>
                  <div 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '6px', 
                      cursor: 'pointer',
                      color: selectedFile === 'index.css' ? 'white' : 'var(--text-muted)',
                      fontWeight: selectedFile === 'index.css' ? '600' : '400',
                      padding: '4px 6px',
                      background: selectedFile === 'index.css' ? 'rgba(255, 255, 255, 0.03)' : 'transparent',
                      borderRadius: '4px'
                    }}
                    onClick={() => setSelectedFile('index.css')}
                  >
                    <File size={12} color={selectedFile === 'index.css' ? 'var(--primary)' : 'var(--text-muted)'} />
                    <span>index.css</span>
                  </div>
                </div>
              )}

              {/* vite.config.js */}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  cursor: 'pointer',
                  color: selectedFile === 'vite.config.js' ? 'white' : 'var(--text-muted)',
                  fontWeight: selectedFile === 'vite.config.js' ? '600' : '400',
                  padding: '4px 6px',
                  background: selectedFile === 'vite.config.js' ? 'rgba(255, 255, 255, 0.03)' : 'transparent',
                  borderRadius: '4px'
                }}
                onClick={() => setSelectedFile('vite.config.js')}
              >
                <File size={12} color={selectedFile === 'vite.config.js' ? 'var(--primary)' : 'var(--text-muted)'} />
                <span>vite.config.js</span>
              </div>

            </div>
          )}
        </div>
      </div>

      {/* Code Editor Panel / Diff Panel */}
      <div className="glass-panel" style={{ display: 'grid', gridTemplateRows: 'auto 1fr', overflow: 'hidden' }}>
        
        {/* Editor Toolbar */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(0,0,0,0.1)'
        }}>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>File Path</span>
            <span style={{ fontSize: '0.9rem', color: 'white', fontWeight: '600' }}>{fileData.path}</span>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              className={`btn ${!showDiff ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '6px 12px', fontSize: '0.8rem', borderRadius: '6px' }}
              onClick={() => setShowDiff(false)}
            >
              Current State
            </button>
            <button 
              className={`btn ${showDiff ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '6px 12px', fontSize: '0.8rem', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}
              onClick={() => setShowDiff(true)}
            >
              <RefreshCw size={12} />
              AI Code Changes
            </button>
          </div>
        </div>

        {/* Code Board */}
        <div style={{
          background: '#04060c',
          padding: '24px',
          overflowY: 'auto',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.85rem',
          lineHeight: '1.6'
        }}>
          {showDiff ? (
            /* Side-by-Side Diff or highlighted patch diff */
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ color: 'var(--text-muted)', borderBottom: '1px dashed rgba(255,255,255,0.05)', paddingBottom: '8px', marginBottom: '8px', fontSize: '0.75rem' }}>
                Showing Antigravity auto-remedy diff:
              </div>
              {fileData.diff.map((line, idx) => {
                let bg = 'transparent';
                let col = 'var(--text-secondary)';
                if (line.type === 'added') {
                  bg = 'rgba(16, 185, 129, 0.08)';
                  col = '#10b981';
                } else if (line.type === 'removed') {
                  bg = 'rgba(239, 68, 68, 0.08)';
                  col = '#ef4444';
                }
                return (
                  <div key={idx} style={{ 
                    background: bg, 
                    color: col, 
                    padding: '2px 8px', 
                    borderRadius: '4px',
                    whiteSpace: 'pre',
                    borderLeft: line.type === 'added' ? '3px solid #10b981' : line.type === 'removed' ? '3px solid #ef4444' : '3px solid transparent'
                  }}>
                    {line.text}
                  </div>
                );
              })}
            </div>
          ) : (
            /* Current File Content */
            <div>
              {fileData.modified.split('\n').map((line, idx) => (
                <div key={idx} style={{ display: 'flex' }}>
                  <span style={{ width: '30px', color: 'var(--text-muted)', userSelect: 'none', display: 'inline-block' }}>
                    {idx + 1}
                  </span>
                  <span style={{ color: 'var(--text-primary)', whiteSpace: 'pre' }}>
                    {line}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
