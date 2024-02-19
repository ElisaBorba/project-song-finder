import React from 'react';
import Header from './Header';
import styles from './Layout.module.css';

function Layout() {
  return (
    <div className={ styles.layout }>
      <Header />
    </div>
  );
}

export default Layout;
