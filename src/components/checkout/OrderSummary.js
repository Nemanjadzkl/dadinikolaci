export default function OrderSummary({ items }) {
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0)
  const shipping = items.length > 0 ? 300 : 0
  const total = subtotal + shipping

  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      <h2 className="font-serif text-2xl mb-4">Pregled Porudžbine</h2>
      
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="flex justify-between">
            <span>{item.name} x {item.quantity}</span>
            <span>{item.price * item.quantity} RSD</span>
          </div>
        ))}
      </div>

      <div className="border-t mt-4 pt-4 space-y-2">
        <div className="flex justify-between">
          <span>Međuzbir:</span>
          <span>{subtotal} RSD</span>
        </div>
        <div className="flex justify-between">
          <span>Dostava:</span>
          <span>{shipping} RSD</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Ukupno:</span>
          <span>{total} RSD</span>
        </div>
      </div>
    </div>
  )
}
