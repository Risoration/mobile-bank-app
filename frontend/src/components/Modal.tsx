import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect } from 'react';
import { useTheme } from '../../context/themeContext.tsx';

// Animation variants
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -20 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: -20 },
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const { darkMode } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const isDark = darkMode === true;
  const backdropColor = isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.3)';
  const textColor = isDark ? '#f9fafb' : '#111827';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='modal-backdrop'
          onClick={onClose}
          variants={backdropVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            background: backdropColor,
            display: 'flex',
            alignItems: 'center', // centers vertically
            justifyContent: 'center', // centers horizontally
            zIndex: 1000,
          }}
        >
          <motion.div
            className='modal-content'
            onClick={(e) => e.stopPropagation()}
            variants={modalVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            transition={{ duration: 0.3 }}
            style={{
              borderRadius: '12px',
              padding: '24px',
              width: '400px', // fixed width for login/register
              maxWidth: '90vw',
              color: textColor,
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
