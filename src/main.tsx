import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.scss'

import './assets/background'

setTimeout(function () {
  let loader = document.getElementsByClassName("loader")[0] as HTMLElement;
  loader?.parentElement?.removeChild(loader);

  document
    .getElementsByTagName("canvas")[0]
    ?.style.setProperty("display", "block", "important");

  document
    .getElementById("root")
    ?.style.setProperty("display", "block", "important");
}, 3500);

createRoot(document.getElementById('root')!).render(<App />)
