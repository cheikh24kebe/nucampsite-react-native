import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default async function Home() {
  const { data: products } = await supabase.from('products').select('*').limit(3)

  const emojis: Record<string, string> = {
    'Whey': '💪', 'Caséine': '🌙', 'Vegan': '🌿',
    'Gainer': '🏋️', 'Créatine': '🔥'
  }

  const fmt = (p: number) => p.toLocaleString('fr-SN') + ' FCFA'

  return (
    <>
      <Navbar />
      <main>
        {/* HERO */}
        <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 1.25rem 3rem' }}>
          <div style={{ display: 'inline-block', background: 'rgba(200,245,66,0.1)', border: '1px solid rgba(200,245,66,0.3)', color: 'var(--accent)', borderRadius: '100px', padding: '0.3rem 1rem', fontSize: '0.75rem', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '1px' }}>
            🇸🇳 LIVRAISON AU SÉNÉGAL
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-2px', marginBottom: '1.25rem' }}>
            Construis ton<br /><span style={{ color: 'var(--accent)' }}>corps idéal</span><br />avec ForceSN
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '480px' }}>
            Protéines premium et compléments livrés chez vous à Dakar et partout au Sénégal.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href="/shop" style={{ background: 'var(--accent)', color: '#0a0a0a', borderRadius: '10px', padding: '0.85rem 2rem', fontWeight: 800, fontSize: '0.95rem', textDecoration: 'none' }}>
              Voir les produits →
            </Link>
            <Link href="/shop" style={{ background: 'transparent', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '10px', padding: '0.85rem 1.5rem', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none' }}>
              En savoir plus
            </Link>
          </div>
        </section>

        {/* STATS */}
        <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.25rem 3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {[['💪', '6+ produits', 'Protéines'], ['🚚', '24–48h', 'Livraison'], ['✅', 'Certifiée', 'Qualité'], ['💳', 'Wave / OM', 'Paiement']].map(([e, v, l]) => (
            <div key={l} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.4rem' }}>{e}</div>
              <div style={{ fontWeight: 800, color: 'var(--accent)' }}>{v}</div>
              <div style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>{l}</div>
            </div>
          ))}
        </section>

        {/* FEATURED PRODUCTS */}
        <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.25rem 4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontWeight: 800, fontSize: '1.5rem' }}>Produits phares</h2>
            <Link href="/shop" style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none' }}>Tout voir →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {products?.map(p => (
              <Link key={p.id} href={`/shop`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', transition: 'transform 0.2s', cursor: 'pointer' }}>
                  <div style={{ background: 'var(--surface)', padding: '2rem', textAlign: 'center', fontSize: '3rem', borderBottom: '1px solid var(--border)' }}>
                    {emojis[p.category] || '💊'}
                  </div>
                  <div style={{ padding: '1.25rem' }}>
                    <div style={{ fontSize: '0.68rem', color: 'var(--muted)', fontWeight: 700, letterSpacing: '1px', marginBottom: '0.25rem' }}>{p.category.toUpperCase()}</div>
                    <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{p.name}</h3>
                    <div style={{ color: 'var(--accent)', fontWeight: 800, fontSize: '1.1rem' }}>{fmt(p.price)}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* WHY US */}
        <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '4rem 1.25rem' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{ fontWeight: 800, fontSize: '1.5rem', marginBottom: '2rem', textAlign: 'center' }}>Pourquoi ForceSN ?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
              {[['🧪', 'Qualité testée', 'Tous nos produits sont rigoureusement testés et certifiés.'], ['🌍', 'Adapté au Sénégal', 'Formules adaptées au climat et aux sportifs sénégalais.'], ['📦', 'Livraison rapide', 'Express à Dakar en 24h et dans tout le Sénégal en 48h.']].map(([ic, ti, de]) => (
                <div key={ti} style={{ textAlign: 'center', padding: '1rem' }}>
                  <div style={{ fontSize: '2.25rem', marginBottom: '0.75rem' }}>{ic}</div>
                  <h3 style={{ fontWeight: 700, marginBottom: '0.6rem' }}>{ti}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.65 }}>{de}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ borderTop: '1px solid var(--border)', padding: '2rem 1.25rem', textAlign: 'center', color: 'var(--muted)', fontSize: '0.78rem' }}>
          © 2026 ForceSN · Compléments protéinés au Sénégal · Wave & Orange Money · Livraison nationale
        </footer>
      </main>
    </>
  )
}