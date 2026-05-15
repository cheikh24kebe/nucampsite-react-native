'use client'

export default function AddToCartButton({ product }: { product: any }) {
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existing = cart.find((i: any) => i.id === product.id)
    if (existing) {
      existing.qty += 1
    } else {
      cart.push({ ...product, qty: 1 })
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    alert(`${product.name} ajouté au panier! 🛒`)
  }

  return (
    <button onClick={addToCart} style={{
      background: '#c8f542',
      color: '#0a0a0a',
      border: 'none',
      borderRadius: '8px',
      padding: '0.5rem 1rem',
      fontWeight: 700,
      fontSize: '0.82rem',
      cursor: 'pointer',
      fontFamily: 'inherit',
      display: 'block'
    }}>
      + Panier
    </button>
  )
}