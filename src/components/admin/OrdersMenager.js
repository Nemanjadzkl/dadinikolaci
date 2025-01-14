import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

export default function OrdersManager() {
  const [orders, setOrders] = useState([])
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    const response = await fetch('/api/orders')
    const data = await response.json()
    setOrders(data.orders)
  }

  const updateOrderStatus = async (orderId, newStatus) => {
    const response = await fetch(`/api/orders/${orderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus })
    })

    if (response.ok) {
      fetchOrders()
      toast.success('Status porudžbine je ažuriran')
    }
  }

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus)

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Upravljanje porudžbinama</h1>
        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded-md p-2"
        >
          <option value="all">Sve porudžbine</option>
          <option value="Nova">Nove</option>
          <option value="U pripremi">U pripremi</option>
          <option value="Isporučeno">Isporučene</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID Porudžbine
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kupac
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Proizvodi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ukupno
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Akcije
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap">#{order.id}</td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                  <div className="text-sm text-gray-500">{order.email}</div>
                </td>
                <td className="px-6 py-4">
                  {order.items.map(item => (
                    <div key={item.id} className="text-sm text-gray-900">
                      {item.name} x {item.quantity}
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {order.total} RSD
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-sm rounded-full ${
                    order.status === 'Isporučeno' ? 'bg-green-100 text-green-800' :
                    order.status === 'U pripremi' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className="text-sm border rounded p-1"
                  >
                    <option value="Nova">Nova</option>
                    <option value="U pripremi">U pripremi</option>
                    <option value="Isporučeno">Isporučeno</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
