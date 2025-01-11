import { 
    ShoppingBagIcon, 
    CurrencyDollarIcon, 
    UserGroupIcon, 
    ChartBarIcon 
  } from '@heroicons/react/outline'
  
  function Dashboard() {
    return (
      <div>
        <h1 className="text-2xl font-serif mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Stats Cards */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <ShoppingBagIcon className="h-12 w-12 text-rosegold" />
              <div className="ml-4">
                <h3 className="text-gray-500">Ukupno Porudžbina</h3>
                <p className="text-2xl font-semibold">150</p>
              </div>
            </div>
          </div>
  
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <CurrencyDollarIcon className="h-12 w-12 text-rosegold" />
              <div className="ml-4">
                <h3 className="text-gray-500">Ukupna Zarada</h3>
                <p className="text-2xl font-semibold">45,000 RSD</p>
              </div>
            </div>
          </div>
  
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <UserGroupIcon className="h-12 w-12 text-rosegold" />
              <div className="ml-4">
                <h3 className="text-gray-500">Kupci</h3>
                <p className="text-2xl font-semibold">89</p>
              </div>
            </div>
          </div>
  
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <ChartBarIcon className="h-12 w-12 text-rosegold" />
              <div className="ml-4">
                <h3 className="text-gray-500">Proizvodi</h3>
                <p className="text-2xl font-semibold">24</p>
              </div>
            </div>
          </div>
        </div>
  
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-serif mb-4">Skorašnje Porudžbine</h2>
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-4">ID</th>
                <th className="pb-4">Kupac</th>
                <th className="pb-4">Proizvod</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Ukupno</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-4">#1234</td>
                <td>Marko Marković</td>
                <td>Čokoladna torta</td>
                <td>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                    Isporučeno
                  </span>
                </td>
                <td>2,500 RSD</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  
  export default Dashboard
  