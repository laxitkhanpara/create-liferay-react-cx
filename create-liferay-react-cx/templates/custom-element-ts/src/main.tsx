/**
 * Liferay React Client Extension - Web Component Entry Point
 */

import React from 'react';
import ReactDOM from 'react-dom';

// @shadow-y import { setupShadowRootStyles } from './util/setupShadowRootStyles';
import App from './App';

class WebComponent extends HTMLElement {
  // @shadow-y private _shadow: ShadowRoot;
  // @react-18 private _root: any = null;

  // @shadow-y constructor() {
  // @shadow-y   super();
  // @shadow-y   this._shadow = this.attachShadow({ mode: 'open' });
  // @shadow-y   setupShadowRootStyles(this._shadow);
  // @shadow-y }

  connectedCallback(): void {
    // @react-16 @shadow-n ReactDOM.render(<React.StrictMode><App /></React.StrictMode>, this);
    // @react-16 @shadow-y ReactDOM.render(<React.StrictMode><App /></React.StrictMode>, this._shadow);

    // @react-18 @shadow-n (this as any)._root = (ReactDOM as any).createRoot(this);
    // @react-18 @shadow-y (this as any)._root = (ReactDOM as any).createRoot(this._shadow);
    
    // @react-18 (this as any)._root.render(<React.StrictMode><App /></React.StrictMode>);
    
    // eslint-disable-next-line no-console
    console.log(`[__APP_NAME__] Mounted successfully.`);
  }

  disconnectedCallback(): void {
    // @react-16 @shadow-n ReactDOM.unmountComponentAtNode(this);
    // @react-16 @shadow-y ReactDOM.unmountComponentAtNode(this._shadow);
    // @react-18 (this as any)._root?.unmount();
  }
}

const ELEMENT_NAME = '__APP_NAME__';

if (customElements.get(ELEMENT_NAME)) {
  // eslint-disable-next-line no-console
  console.log(`Skipping registration for <${ELEMENT_NAME}> (already registered)`);
} else {
  customElements.define(ELEMENT_NAME, WebComponent);
}
