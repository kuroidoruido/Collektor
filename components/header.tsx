import React from 'react';
import { LOGO } from '~/lib/logo.ts';

export function Header() {
  return (
    <nav className="header-nav">
      <div className="nav-wrapper">
        <a href="/" className="brand-logo">
          {LOGO}
        </a>
      </div>
    </nav>
  );
}
