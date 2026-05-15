'use client'
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const router = useRouter()
  const [cart, setCart] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: ''
  })

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]')
    setCart(stored)
  }, [])

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const fmt = (p: number) => p.toLocaleString('fr-SN') + ' FCFA'

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone || !form.address) {
      alert('Veuillez remplir tous les champs.')
      return
    }
    setLoading(true)

    const { data: order, error } = await supabase.from('orders').insert({
      customer_name: form.name,
      customer_email: form.email,
      customer_phone: form.phone,
      customer_address: form.address,
      total,
      status: 'En attente'
    }).select().single()

    if (error || !order) {
      alert('Erreur lors de la commande. Réessayez.')
      setLoading(false)
      return
    }

    await supabase.from('order_items').insert(
      cart.map(i => ({
        order_id: order.id,
        product_id: i.id,
        quantity: i.qty,
        price: i.price
      }))
    )

    localStorage.removeItem('cart')
    setLoading(false)
    router.push('/success')
  }

  const input = (label: string, key: string, type = 'text', placeholder = '') => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--muted)' }}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[key as keyof typeof form]}
        onChange={e => setForm({ ...form, [key]: e.target.value })}
        style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '10px', padding: '0.75rem 1rem', color: 'white', fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none' }}
      />
    </div>
  )

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.25rem' }}>
        <h1 style={{ fontWeight: 800, fontSize: '1.75rem', marginBottom: '2rem' }}>Finaliser la commande</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* FORM */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>Vos informations</h2>
            {input('Nom complet', 'name', 'text', 'Mamadou Diallo')}
            {input('Email', 'email', 'email', 'mamadou@email.com')}
            {input('Téléphone', 'phone', 'tel', '+221 77 000 00 00')}
            {input('Adresse de livraison', 'address', 'text', 'Dakar, Sénégal')}
          </div>

          {/* ORDER SUMMARY */}
          <div>
            <h2 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1rem' }}>Résumé</h2>
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--muted)' }}>{item.name} × {item.qty}</span>
                  <span style={{ fontWeight: 700 }}>{fmt(item.price * item.qty)}</span>
                </div>
              ))}
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontWeight: 800 }}>
                <span>Total</span>
                <span style={{ color: '#c8f542' }}>{fmt(total)}</span>
              </div>
            </div>

            <button onClick={handleSubmit} disabled={loading} style={{ marginTop: '1rem', width: '100%', background: '#c8f542', color: '#0a0a0a', border: 'none', borderRadius: '10px', padding: '1rem', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', fontFamily: 'inherit', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Envoi en cours...' : 'Confirmer la commande →'}
            </button>
            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.75rem' }}>
              Paiement via Wave · Orange Money
            </p>
          </div>
        </div>
      </main>
    </>
  )
}