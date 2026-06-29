import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { userDashboard } from '../lib/mockData';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Bookmark, Clock, Trophy, Settings } from 'lucide-react';

export default function Dashboard() {
  return (
    <PageTransition>
      <div className="py-8">
        <div className="flex justify-between items-end mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-3xl font-bold tracking-tight mb-2">Тавтай морил, {userDashboard.name.split(' ')[0]}</h1>
            <p className="text-muted">{userDashboard.university} • {userDashboard.major}</p>
          </motion.div>
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <Settings className="w-5 h-5 text-muted" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-6 rounded-2xl flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted">Суралцсан цаг</p>
              <p className="text-2xl font-bold">255ц</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-6 rounded-2xl flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Bookmark className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-muted">Хадгалсан</p>
              <p className="text-2xl font-bold">{userDashboard.savedItems}</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel p-6 rounded-2xl flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-muted">Амжилтууд</p>
              <p className="text-2xl font-bold">{userDashboard.achievements.length}</p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 glass-panel p-6 rounded-3xl"
          >
            <h3 className="text-xl font-bold mb-6">Идэвхийн тойм</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userDashboard.progress} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(20, 20, 20, 0.8)', borderColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="hours" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-panel p-6 rounded-3xl"
            >
              <h3 className="text-lg font-bold mb-4">Сүүлийн үйлдэл</h3>
              <div className="space-y-4">
                {userDashboard.recentActivity.map((activity, i) => (
                  <div key={activity.id} className="flex gap-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">{activity.text}</p>
                      <p className="text-xs text-muted mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-panel p-6 rounded-3xl bg-gradient-to-br from-blue-600/20 to-purple-600/20"
            >
              <h3 className="text-lg font-bold mb-2">Премиум Боломжууд</h3>
              <p className="text-sm text-muted mb-4">Өөрт тохирсон тэтгэлэг хайх болон сургалтын дэлгэрэнгүй аналитикийг нээгээрэй.</p>
              <button className="w-full py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-colors">
                Идэвхжүүлэх
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
