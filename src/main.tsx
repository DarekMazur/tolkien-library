import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Root from '@/Root.tsx';
import { BrowserRouter } from 'react-router';

const container = document.getElementById('root')!;
const root = createRoot(container);

async function enableMocking() {
  if (import.meta.env.VITE_NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('@/mocks/browser.ts');
  return worker.start();
}

enableMocking().then(() => {
  root.render(
    <StrictMode>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </StrictMode>,
  );
});
