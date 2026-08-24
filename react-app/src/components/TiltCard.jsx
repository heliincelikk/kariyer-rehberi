import { useRef } from 'react';

export default function TiltCard({ className = 'feature-card', children, onClick, style = {} }) {
  const node = useRef(null);

  const handleMouseMove = (event) => {
    const r = node.current?.getBoundingClientRect();
    if (!r) return;
    const x = event.clientX - r.left - r.width / 2;
    const y = event.clientY - r.top - r.height / 2;
    node.current.style.transform = `perspective(800px) rotateX(${-y / r.height * 10}deg) rotateY(${x / r.width * 10}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    if (node.current) {
      node.current.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
    }
  };

  return (
    <div
      ref={node}
      className={className + ' revealed'}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: 'transform 0.15s ease-out, border-color 0.3s ease, box-shadow 0.3s ease',
        ...style
      }}
    >
      {children}
    </div>
  );
}
