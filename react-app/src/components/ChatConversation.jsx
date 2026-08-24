import { useEffect, useRef, useState } from 'react';
import { useDashboard } from '../context/DashboardContext';

export default function ChatConversation({ thread = 'global-ai', title = 'Sohbet' }) {
  const { chats, sendMessage } = useDashboard();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const messages = chats[thread] || [
    { id: 'init', sender: thread.includes('ai') ? 'ai' : 'peer', text: `Merhaba! ${title} için buradayım. Sana nasıl yardımcı olabilirim?` }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(thread, input.trim());
    setInput('');
  };

  const suggestions = thread.includes('ai')
    ? [
        'Hangi mühendislik disiplini bana uygun?',
        'YKS deneme netlerimi nasıl artırırım?',
        'Staj başvurularında CV nasıl olmalı?',
        'Yazılım için hangi dille başlamalıyım?'
      ]
    : [
        'Merhaba, uygun bir zamanda konuşabilir miyiz?',
        'Ders notları ve sınavlar hakkında bilgi alabilir miyim?',
        'Proje takımınıza katılmak istiyorum!'
      ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '520px',
      maxHeight: '70vh',
      background: 'rgba(15, 23, 42, 0.75)',
      border: '1px solid rgba(6, 182, 212, 0.25)',
      borderRadius: 20,
      overflow: 'hidden'
    }}>
      <div style={{
        padding: '16px 20px',
        background: 'rgba(30, 41, 59, 0.6)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: thread.includes('ai') ? 'linear-gradient(135deg, #06b6d4, #10b981)' : 'rgba(6, 182, 212, 0.2)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 16
        }}>
          {thread.includes('ai') ? <i className="fa-solid fa-robot" /> : <i className="fa-solid fa-user" />}
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: 16, color: '#f8fafc', fontWeight: 700 }}>{title}</h3>
          <span style={{ fontSize: 12, color: '#10b981', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} /> Çevrimiçi & Hazır
          </span>
        </div>
      </div>

      <div style={{
        flex: 1,
        padding: 20,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }}>
        {messages.map((m) => {
          const isUser = m.sender === 'user';
          return (
            <div
              key={m.id}
              style={{
                alignSelf: isUser ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                display: 'flex',
                gap: 10,
                flexDirection: isUser ? 'row-reverse' : 'row'
              }}
            >
              <div style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: isUser ? '#2563eb' : thread.includes('ai') ? '#0891b2' : '#059669',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                flexShrink: 0
              }}>
                {isUser ? <i className="fa-solid fa-user" /> : thread.includes('ai') ? <i className="fa-solid fa-wand-magic-sparkles" /> : <i className="fa-solid fa-comment" />}
              </div>

              <div style={{
                background: isUser ? 'linear-gradient(135deg, #2563eb, #1d4ed8)' : 'rgba(30, 41, 59, 0.85)',
                color: '#f8fafc',
                padding: '12px 16px',
                borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                fontSize: 14,
                lineHeight: 1.5,
                border: isUser ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}>
                {m.text}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ padding: '8px 16px', background: 'rgba(15, 23, 42, 0.5)', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {suggestions.map((sug, i) => (
          <button
            key={i}
            onClick={() => sendMessage(thread, sug)}
            style={{
              background: 'rgba(6, 182, 212, 0.1)',
              border: '1px solid rgba(6, 182, 212, 0.25)',
              color: '#67e8f9',
              padding: '6px 12px',
              borderRadius: 20,
              fontSize: 12,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {sug}
          </button>
        ))}
      </div>

      <form onSubmit={handleSend} style={{
        padding: 16,
        background: 'rgba(30, 41, 59, 0.7)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        gap: 10
      }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Bir mesaj veya soru yaz..."
          style={{
            flex: 1,
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            borderRadius: 12,
            padding: '12px 16px',
            color: '#fff',
            fontSize: 14,
            outline: 'none'
          }}
        />
        <button
          type="submit"
          style={{
            background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
            border: 'none',
            color: '#fff',
            padding: '0 20px',
            borderRadius: 12,
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          <i className="fa-solid fa-paper-plane" />
        </button>
      </form>
    </div>
  );
}
