import React from 'react';
import { useToast } from '../context/ToastContext';
import { X, CheckCircle2, Info } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      role="region"
      aria-label="Notifications"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        maxWidth: '380px',
        width: 'calc(100% - 48px)',
        pointerEvents: 'none'
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            backgroundColor: 'var(--btn-primary)',
            color: 'var(--btn-text)',
            padding: '12px 16px',
            borderRadius: 'var(--radius-xs)',
            fontSize: 'var(--text-sm)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            animation: 'fadeInUp 0.2s ease-out'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#D4AF37' }}>
              <Info size={16} />
            </span>
            <p style={{ margin: 0, color: '#F0EEE8', fontSize: '13.5px', lineHeight: 1.4 }}>
              {toast.message}
            </p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            aria-label="Dismiss notification"
            style={{
              color: '#A39E96',
              display: 'flex',
              alignItems: 'center',
              padding: '2px',
              transition: 'color 150ms'
            }}
          >
            <X size={15} />
          </button>
        </div>
      ))}
    </div>
  );
};
