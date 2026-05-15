import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import AddToCartButton from '@/components/AddToCartButton'

export default async function ShopPage() {
  const { data: products } = await supabase.from('products').select('*')

  const emojis: Record<string, string> = {
    'Whey': '💪', 'Caséine': '🌙', 'Vegan': '🌿',
    'Gainer': '🏋️', 'Créatine': '🔥'
  }

  const fmt = (p: number) => p.toLocaleString('fr-SN') + ' FCFA'

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.25rem' }}>
        <h1 style={{ fontWeight: 800, fontSize: '1.75rem', marginBottom: '0.35rem' }}>Boutique</h1>
        <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>Tous nos compléments protéinés</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {products?.map(p => (
            <div key={p.id} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden' }}>
              <div style={{ background: 'var(--surface)', padding: '2rem', textAlign: 'center', fontSize: '3rem', borderBottom: '1px solid var(--border)' }}>
                {emojis[p.category] || '💊'}
              </div>
              <div style={{ padding: '1.25rem' }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--muted)', fontWeight: 700, letterSpacing: '1px', marginBottom: '0.25rem' }}>{p.category.toUpperCase()}</div>
                <h3 style={{ fontWeight: 700, marginBottom: '0.4rem' }}>{p.name}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.82rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>{p.description}</p>
                <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem' }}>
                  {[p.flavor, p.weight].filter(Boolean).map((tag: string) => (
                    <span key={tag} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', padding: '0.2rem 0.5rem', fontSize: '0.7rem', color: 'var(--muted)' }}>{tag}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 800, fontSize: '1rem' }}>{fmt(p.price)}</span>
                  <AddToCartButton product={p} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}