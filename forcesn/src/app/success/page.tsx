import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function SuccessPage() {
  return (
    <>
      <Navbar />
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', textAlign: 'center', padding: '2rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
        <h1 style={{ fontWeight: 800, fontSize: '2rem', marginBottom: '0.75rem' }}>Commande confirmée!</h1>
        <p style={{ color: 'var(--muted)', marginBottom: '2rem', maxWidth: '400px', lineHeight: 1.7 }}>
          Merci pour votre commande! Vous recevrez une confirmation par email et nous vous livrerons dans 24-48h.
        </p>
        <Link href="/shop" style={{ background: '#c8f542', color: '#0a0a0a', borderRadius: '10px', padding: '0.85rem 2rem', fontWeight: 800, textDecoration: 'none' }}>
          Continuer les achats →
        </Link>
      </main>
    </>
  )
}
