'use client';
import { useEffect } from 'react';

const AlertOnce = () => {
  useEffect(() => {
    const hasSeenAlert = localStorage.getItem('hasSeenAlert');

    if (!hasSeenAlert) {
      alert('Внимание, наше производство переезжает. Срок изготовления заказа увеличивается до 10 дней.');
      localStorage.setItem('hasSeenAlert', 'true');
    }
  }, []);

  return null;
};

export default AlertOnce;