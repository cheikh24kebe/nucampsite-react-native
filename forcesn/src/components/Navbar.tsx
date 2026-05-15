'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const updateCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      const count = cart.reduce((s: number, i: any) => s + i.qty, 0)
      setCartCount(count)
    }
    updateCount()
    window.addEventListener('storage', updateCount)
    const interval = setInterval(updateCount, 500)
    return () => {
      window.removeEventListener('storage', updateCount)
      clearInterval(interval)
    }
  }, [])

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border)',
      padding: '0 1.25rem', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', height: '60px'
    }}>
      <Link href="/" style={{ fontSize: '1.2rem', fontWeight: 800, textDecoration: 'none', color: 'white' }}>
        FORCE<span style={{ color: '#c8f542' }}>SN</span>
      </Link>

      <div style={{ display: 'flex', gap: '0.25rem' }}>
        <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none', padding: '0.4rem 0.9rem', fontWeight: 700, fontSize: '0.85rem' }}>Accueil</Link>
        <Link href="/shop" style={{ color: 'var(--muted)', textDecoration: 'none', padding: '0.4rem 0.9rem', fontWeight: 700, fontSize: '0.85rem' }}>Boutique</Link>
      </div>

      <Link href="/cart" style={{
        background: '#c8f542', color: '#0a0a0a',
        border: 'none', borderRadius: '8px',
        padding: '0.4rem 0.9rem', fontWeight: 700,
        fontSize: '0.85rem', textDecoration: 'none',
        display: 'flex', alignItems: 'center', gap: '0.35rem'
      }}>
        🛒 {cartCount > 0 && (
          <span style={{ background: '#0a0a0a', color: '#c8f542', borderRadius: '50%', width: '18px', height: '18px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 800 }}>
            {cartCount}
          </span>
        )}
        Panier
      </Link>
    </nav>
  )
}