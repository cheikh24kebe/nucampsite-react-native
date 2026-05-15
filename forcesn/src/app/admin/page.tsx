'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const ADMIN_PASSWORD = 'forcesn2026'

export default function AdminPage() {
  const router = useRouter()
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [orders, setOrders] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [tab, setTab] = useState<'orders' | 'products'>('orders')

  const login = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthed(true)
      setError(false)
      loadData()
    } else {
      setError(true)
    }
  }

  const loadData = async () => {
    const { data: o } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
    const { data: p } = await supabase.from('products').select('*')
    setOrders(o || [])
    setProducts(p || [])
  }

  useEffect(() => { if (authed) loadData() }, [authed])

  const fmt = (p: number) => p.toLocaleString('fr-SN') + ' FCFA'

  const statusColor: Record<string, string> = {
    'En attente': '#facc15',
    'En cours': '#60a5fa',
    'Livré': '#4ade80',
  }

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('orders').update({ status }).eq('id', id)
    loadData()
  }

  if (!authed) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#0a0a0a', padding: '1rem' }}>
        <div style={{ background: '#161616', border: '1px solid #1e1e1e', borderRadius: '20px', padding: '2.5rem', width: '100%', maxWidth: '340px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔐</div>
            <h2 style={{ fontWeight: 800, color: 'white', fontSize: '1.25rem' }}>Accès Admin</h2>
            <p style={{ color: '#666', fontSize: '0.8rem', marginTop: '0.25rem' }}>Zone réservée — ForceSN</p>
          </div>
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(false) }}
            onKeyDown={e => e.key === 'Enter' && login()}
            style={{ background: '#0a0a0a', border: `1px solid ${error ? '#f87171' : '#1e1e1e'}`, borderRadius: '10px', padding: '0.75rem 1rem', color: 'white', fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none', width: '100%' }}
          />
          {error && <p style={{ color: '#f87171', fontSize: '0.78rem', marginTop: '-0.5rem' }}>Mot de passe incorrect.</p>}
          <button onClick={login} style={{ background: '#c8f542', color: '#0a0a0a', border: 'none', borderRadius: '10px', padding: '0.85rem', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', fontFamily: 'inherit' }}>
            Se connecter
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', color: 'white', fontFamily: 'inherit' }}>
      {/* ADMIN NAV */}
      <nav style={{ background: 'rgba(10,10,10,0.95)', borderBottom: '1px solid #1e1e1e', padding: '0 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px' }}>
        <div style={{ fontWeight: 800, fontSize: '1.2rem' }}>FORCE<span style={{ color: '#c8f542' }}>SN</span> <span style={{ color: '#666', fontSize: '0.8rem', fontWeight: 500 }}>Admin</span></div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => setTab('orders')} style={{ background: tab === 'orders' ? '#c8f542' : 'transparent', color: tab === 'orders' ? '#0a0a0a' : '#666', border: '1px solid #1e1e1e', borderRadius: '8px', padding: '0.4rem 0.9rem', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit' }}>
            Commandes
          </button>
          <button onClick={() => setTab('products')} style={{ background: tab === 'products' ? '#c8f542' : 'transparent', color: tab === 'products' ? '#0a0a0a' : '#666', border: '1px solid #1e1e1e', borderRadius: '8px', padding: '0.4rem 0.9rem', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit' }}>
            Produits
          </button>
          <button onClick={() => router.push('/')} style={{ background: 'transparent', color: '#666', border: '1px solid #1e1e1e', borderRadius: '8px', padding: '0.4rem 0.9rem', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit' }}>
            Voir le site →
          </button>
        </div>
        <button onClick={() => setAuthed(false)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.85rem' }}>
          Déconnexion
        </button>
      </nav>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.25rem' }}>

        {/* ORDERS TAB */}
        {tab === 'orders' && (
          <>
            <h1 style={{ fontWeight: 800, fontSize: '1.5rem', marginBottom: '1.5rem' }}>Commandes ({orders.length})</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {orders.length === 0 && <p style={{ color: '#666' }}>Aucune commande pour le moment.</p>}
              {orders.map(o => (
                <div key={o.id} style={{ background: '#161616', border: '1px solid #1e1e1e', borderRadius: '14px', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <div>
                      <div style={{ fontWeight: 800, marginBottom: '0.25rem' }}>{o.customer_name}</div>
                      <div style={{ color: '#666', fontSize: '0.82rem' }}>{o.customer_email} · {o.customer_phone}</div>
                      <div style={{ color: '#666', fontSize: '0.82rem' }}>{o.customer_address}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: '#c8f542', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>{fmt(o.total)}</div>
                      <select
                        value={o.status}
                        onChange={e => updateStatus(o.id, e.target.value)}
                        style={{ background: '#0a0a0a', border: '1px solid #1e1e1e', borderRadius: '8px', padding: '0.35rem 0.6rem', color: statusColor[o.status] || 'white', fontFamily: 'inherit', fontSize: '0.8rem', cursor: 'pointer' }}
                      >
                        <option value="En attente">En attente</option>
                        <option value="En cours">En cours</option>
                        <option value="Livré">Livré</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ color: '#666', fontSize: '0.75rem', marginTop: '0.75rem' }}>
                    {new Date(o.created_at).toLocaleDateString('fr-SN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* PRODUCTS TAB */}
        {tab === 'products' && (
          <>
            <h1 style={{ fontWeight: 800, fontSize: '1.5rem', marginBottom: '1.5rem' }}>Produits ({products.length})</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
              {products.map(p => (
                <div key={p.id} style={{ background: '#161616', border: '1px solid #1e1e1e', borderRadius: '14px', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <div>
                      <div style={{ fontWeight: 700, marginBottom: '0.2rem' }}>{p.name}</div>
                      <div style={{ color: '#666', fontSize: '0.78rem' }}>{p.category} · {p.weight}</div>
                    </div>
                    <div style={{ color: '#c8f542', fontWeight: 800 }}>{fmt(p.price)}</div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: p.stock < 25 ? '#f87171' : '#4ade80', fontSize: '0.82rem', fontWeight: 600 }}>
                      {p.stock < 25 ? '⚠️' : '✅'} Stock: {p.stock}
                    </span>
                  </div>
                  <div style={{ height: '4px', background: '#1e1e1e', borderRadius: '2px', marginTop: '0.75rem' }}>
                    <div style={{ height: '100%', width: `${Math.min((p.stock / 60) * 100, 100)}%`, background: p.stock < 25 ? '#f87171' : '#c8f542', borderRadius: '2px' }} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}