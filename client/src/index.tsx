import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';

// string array for picks

const root = createRoot(document.getElementById('main')!);
root.render(<App/>);

// Handle Pick
