import { useState } from 'react'
import { 
  ChartBarIcon, 
  TrendingUpIcon, 
  UserGroupIcon, 
  ShoppingCartIcon 
} from '@heroicons/react/outline'

function AnalyticsManager() {
  const [timeFrame, setTimeFrame] = useState('month')

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-serif">Analitika</h1>
        <select 
          value={timeFrame}
          onChange={(e) => setTimeFrame(e.target.value)}
          className="border rounded-md px-3 py-2"
        >
          <option value="week">Nedelja</option>
          <option value="month">Mesec</option>
          <option value="year">Godina</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Ukupna Prodaja</p>
              <h3 className="text-2xl font-bold">145,000 RSD</h3>
              <p className="text-green-500 text-sm">+12.5% rast</p>
            </div>
            <ChartBarIcon className="h-12 w-12 text-rosegold" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Broj Porudžbina</p>
              <h3 className="text-2xl font-bold">48</h3>
              <p className="text-green-500 text-sm">+8.2% rast</p>
            </div>
            <ShoppingCartIcon className="h-12 w-12 text-rosegold" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Novi Kupci</p>
              <h3 className="text-2xl font-bold">15</h3>
              <p className="text-green-500 text-sm">+5.3% rast</p>
            </div>
            <UserGroupIcon className="h-12 w-12 text-rosegold" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Prosečna Porudžbina</p>
              <h3 className="text-2xl font-bold">3,020 RSD</h3>
              <p className="text-red-500 text-sm">-2.1% pad</p>
            </div>
            <TrendingUpIcon className="h-12 w-12 text-rosegold" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-serif mb-4">Najprodavaniji Proizvodi</h2>
          <div className="space-y-4">
            {['Čokoladna torta', 'Voćna torta', 'Cheesecake', 'Mafini'].map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <span>{product}</span>
                <span className="text-gray-500">{Math.floor(Math.random() * 50)} prodato</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-serif mb-4">Prodaja po Kategorijama</h2>
          <div className="space-y-4">
            {['Torte', 'Kolači', 'Mafini', 'Specijalni Deserti'].map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <span>{category}</span>
                <span className="text-gray-500">{Math.floor(Math.random() * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsManager
