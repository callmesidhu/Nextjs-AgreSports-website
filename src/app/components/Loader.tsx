import React, { useEffect, useState } from 'react';

const Loader: React.FC = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!showLoader) return null;

  return (
    <div style={styles.overlay}>
      <div className="lds-facebook">
        <div></div><div></div><div></div>
      </div>

      <style>{`
        .lds-facebook,
        .lds-facebook div {
          box-sizing: border-box;
        }
        .lds-facebook {
          display: inline-block;
          position: relative;
          width: 80px;
          height: 80px;
        }
        .lds-facebook div {
          display: inline-block;
          position: absolute;
          left: 8px;
          width: 16px;
          background: #610bc6;
          animation: lds-facebook .8s cubic-bezier(0, .1, .5, .1) infinite;
        }
        .lds-facebook div:nth-child(1) {
          left: 8px;
          animation-delay: 0s;
        }
        .lds-facebook div:nth-child(2) {
          left: 32px;
          animation-delay: 0.1s;
        }
        .lds-facebook div:nth-child(3) {
          left: 54px;
          animation-delay: 0.2s;
        }
        @keyframes lds-facebook {
          0% {
            top: 8px;
            height: 64px;
          }
          50%, 100% {
            top: 24px;
            height: 32px;
          }
        }
      `}</style>
    </div>
  );
};

const styles = {
  overlay: {
    backgroundColor: '#050505',
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
};

export default Loader;
