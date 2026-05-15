'use client'
import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]')
    setCart(stored)
  }, [])

  const removeItem = (id: string) => {
    const updated = cart.filter(i => i.id !== id)
    setCart(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
  }

  const updateQty = (id: string, qty: number) => {
    if (qty < 1) return
    const updated = cart.map(i => i.id === id ? { ...i, qty } : i)
    setCart(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
  }

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const fmt = (p: number) => p.toLocaleString('fr-SN') + ' FCFA'

  const emojis: Record<string, string> = {
    'Whey': '💪', 'Caséine': '🌙', 'Vegan': '🌿',
    'Gainer': '🏋️', 'Créatine': '🔥'
  }

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.25rem' }}>
        <h1 style={{ fontWeight: 800, fontSize: '1.75rem', marginBottom: '2rem' }}>Mon Panier 🛒</h1>

        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--muted)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
            <p style={{ marginBottom: '1.5rem' }}>Votre panier est vide.</p>
            <Link href="/shop" style={{ background: '#c8f542', color: '#0a0a0a', borderRadius: '10px', padding: '0.85rem 2rem', fontWeight: 800, textDecoration: 'none' }}>
              Voir les produits →
            </Link>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {cart.map(item => (
                <div key={item.id} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ fontSize: '2.5rem' }}>{emojis[item.category] || '💊'}</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{item.name}</h3>
                    <div style={{ color: '#c8f542', fontWeight: 800 }}>{fmt(item.price)}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'white', borderRadius: '6px', width: '32px', height: '32px', cursor: 'pointer', fontSize: '1rem' }}>−</button>
                    <span style={{ fontWeight: 700, minWidth: '24px', textAlign: 'center' }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'white', borderRadius: '6px', width: '32px', height: '32px', cursor: 'pointer', fontSize: '1rem' }}>+</button>
                  </div>
                  <div style={{ fontWeight: 800, minWidth: '120px', textAlign: 'right' }}>{fmt(item.price * item.qty)}</div>
                  <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
                </div>
              ))}
            </div>

            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                <span>Total</span>
                <span style={{ color: '#c8f542' }}>{fmt(total)}</span>
              </div>
              <Link href="/checkout" style={{ display: 'block', background: '#c8f542', color: '#0a0a0a', borderRadius: '10px', padding: '1rem', fontWeight: 800, fontSize: '1rem', textDecoration: 'none', textAlign: 'center' }}>
                Passer commande →
              </Link>
              <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.75rem' }}>
                Paiement via Wave · Orange Money · Carte bancaire
              </p>
            </div>
          </>
        )}
      </main>
    </>
  )
}