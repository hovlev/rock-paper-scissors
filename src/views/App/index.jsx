import React from 'react';
import styles from './index.css';
import Controls from '../Controls';

const App = () => (
  <section>
    <h1 className={styles.title}>Rock, paper, scissors</h1>
    <h2 className={styles.subtitle}>Choose your weapon</h2>
    <Controls />
  </section>
);

export default App;
