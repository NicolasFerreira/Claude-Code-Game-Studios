"use client";

import { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { useGameSelector } from '@/hooks/useGameSelector';
import { ResourceType } from '@/types/game';

interface SellOption {
  resource: ResourceType;
  label: string;
  icon: string;
  price: number; // helium3 per unit
  minAmount: number;
}

const SELL_OPTIONS: SellOption[] = [
  { resource: 'ice', label: 'Ice', icon: '/assets/resources/ice.png', price: 0.5, minAmount: 10 },
  { resource: 'solarEnergy', label: 'Solar Energy', icon: '/assets/resources/solar-energy.png', price: 0.2, minAmount: 20 },
];

interface TradePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TradePanel({ isOpen, onClose }: TradePanelProps) {
  const { state, dispatch } = useGame();
  const [selling, setSelling] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(0);

  const resources = useGameSelector(s => s.resources);

  if (!isOpen) return null;

  const handleSell = (option: SellOption) => {
    const available = resources[option.resource as keyof typeof resources] || 0;
    const toSell = Math.floor(Math.min(amount, available));

    if (toSell < option.minAmount) return;

    // Track achievement: player has sold resources
    localStorage.setItem("ice_drill_has_sold", "true");

    const earned = toSell * option.price;
    dispatch({
      type: 'COLLECT_RESOURCE',
      payload: { resourceType: 'helium3', amount: earned }
    });
    dispatch({
      type: 'REMOVE_RESOURCE',
      payload: { resource: option.resource, amount: toSell }
    });

    setAmount(0);
    setSelling(null);
  };

  const handleOptionClick = (option: SellOption) => {
    setSelling(option.resource);
    setAmount(0); // Reset amount when switching options
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 200,
    }}>
      <div className="pixel-panel" style={{
        padding: '1.5rem',
        maxWidth: '400px',
        width: '90%',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}>
          <h2 style={{ color: '#e2e8f0', margin: 0, fontFamily: 'var(--font-pixel)', fontSize: '12px' }}>Trade Station</h2>
          <button
            onClick={onClose}
            className="pixel-btn"
            style={{
              padding: '4px 8px',
              fontSize: '12px',
            }}
          >
            ×
          </button>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
            Sell resources for <span style={{ color: '#a78bfa' }}>Helium-3</span>
          </p>
        </div>

        {SELL_OPTIONS.map((option) => {
          const available = resources[option.resource as keyof typeof resources] || 0;
          const canSell = available >= option.minAmount;

          return (
            <div
              key={option.resource}
              className="pixel-panel"
              onClick={() => handleOptionClick(option)}
              style={{
                padding: '1rem',
                marginBottom: '0.75rem',
                border: selling === option.resource ? '2px solid #22d3ee' : '2px solid #334155',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <img src={option.icon} alt={option.label} style={{ width: 24, height: 24, imageRendering: 'pixelated' }} />
                <span style={{ color: '#e2e8f0', flex: 1 }}>{option.label}</span>
                <span style={{ color: '#64748b', fontSize: '0.75rem' }}>
                  {Math.floor(available)} avail
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="range"
                  min={0}
                  max={Math.floor(available)}
                  step={option.minAmount}
                  value={selling === option.resource ? amount : 0}
                  onChange={(e) => {
                    setSelling(option.resource);
                    setAmount(Number(e.target.value));
                  }}
                  style={{ flex: 1 }}
                />
                <span style={{ color: '#22d3ee', minWidth: '60px', textAlign: 'right' }}>
                  {selling === option.resource ? amount : 0}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                <span style={{ color: '#64748b', fontSize: '0.75rem' }}>
                  Min: {option.minAmount} → {option.price} He-3 each
                </span>
                <button
                  onClick={() => handleSell(option)}
                  disabled={!canSell || amount < option.minAmount}
                  className="pixel-btn"
                  style={{
                    padding: '4px 12px',
                    fontSize: '10px',
                    background: canSell && amount >= option.minAmount ? '#22d3ee' : undefined,
                    color: canSell && amount >= option.minAmount ? '#0d0d1a' : undefined,
                  }}
                >
                  Sell
                </button>
              </div>
            </div>
          );
        })}

        <div className="pixel-panel" style={{
          marginTop: '1rem',
          padding: '0.75rem',
          border: '2px solid #a78bfa',
        }}>
          <span style={{ color: '#94a3b8' }}>Your Helium-3:</span>
          <span style={{ color: '#a78bfa', fontFamily: 'var(--font-pixel)', marginLeft: '8px' }}>
            {resources.helium3.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}