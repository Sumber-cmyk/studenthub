import { motion } from 'framer-motion';
import type React from 'react';
import { PageTransition } from '../components/PageTransition';
import { clubs } from '../lib/mockData';
import { Users, Zap, BookOpen, ChevronRight, CalendarDays } from 'lucide-react';
import { useState } from 'react';
import { Modal } from '../components/Modal';
import { AuthForm } from '../components/AuthForm';

const iconMap: Record<string, React.ElementType> = {
  Users, Zap, BookOpen
};

export default function Clubs() {
  const [selectedClub, setSelectedClub] = useState<typeof clubs[0] | null>(null);

  return (
    <PageTransition>
      <div className="py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl font-bold mb-4 tracking-tight">Оюутны Байгууллагууд</h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">Манлайлах ур чадвараа хөгжүүлж, үе тэнгийнхэнтэйгээ танилцан, нийгэмд эерэг нөлөөллийг бий болгоорой.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {clubs.map((club, i) => {
            const Icon = iconMap[club.icon] || Users;
            return (
              <motion.div
                key={club.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedClub(club)}
                className="glass-panel p-6 rounded-2xl flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-white/10 group-hover:border-blue-500/50 transition-colors">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg group-hover:text-blue-400 transition-colors">{club.name}</h3>
                    <div className="flex items-center gap-3 text-sm text-muted mt-1">
                      <span className="px-2 py-0.5 rounded bg-white/5">{club.university}</span>
                      <span>•</span>
                      <span>{club.members} Гишүүн</span>
                    </div>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <ChevronRight className="w-4 h-4 text-white" />
                </div>
              </motion.div>
            );
          })}
        </div>

        <Modal isOpen={!!selectedClub} onClose={() => setSelectedClub(null)} title="Клубын дэлгэрэнгүй">
          {selectedClub && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-white/10">
                  {(() => {
                    const Icon = iconMap[selectedClub.icon] || Users;
                    return <Icon className="w-8 h-8 text-blue-400" />;
                  })()}
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">{selectedClub.name}</h3>
                  <div className="flex items-center gap-3 text-muted text-sm">
                    <span className="px-3 py-1 rounded-full bg-white/5">{selectedClub.category}</span>
                    <span>{selectedClub.university}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <p className="text-gray-300 leading-relaxed">{selectedClub.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col justify-center items-center">
                  <Users className="w-5 h-5 text-purple-400 mb-2" />
                  <p className="text-2xl font-bold">{selectedClub.members}</p>
                  <p className="text-xs text-muted">Одоогийн гишүүд</p>
                </div>
                <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 flex flex-col justify-center items-center text-center">
                  <CalendarDays className="w-5 h-5 text-blue-400 mb-2" />
                  <p className="font-semibold text-sm">{selectedClub.nextMeeting}</p>
                  <p className="text-xs text-blue-400/80">Дараагийн уулзалт</p>
                </div>
              </div>

              <AuthForm 
                type="club"
                onSubmit={() => {
                  alert(`Та ${selectedClub.name}-д амжилттай нэгдлээ! Уулзалт дээр уулзацгаая.`);
                  setSelectedClub(null);
                }}
              />
            </div>
          )}
        </Modal>
      </div>
    </PageTransition>
  );
}
