import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { competitions } from '../lib/mockData';
import { Calendar, Trophy, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { Modal } from '../components/Modal';
import { AuthForm } from '../components/AuthForm';

export default function Competitions() {
  const [selectedComp, setSelectedComp] = useState<typeof competitions[0] | null>(null);

  return (
    <PageTransition>
      <div className="py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 tracking-tight">Тэмцээн & Хакатон</h1>
          <p className="text-muted text-lg max-w-2xl">Өөрийн ур чадвараа сорьж, шагналын эзэн болох шилдэг тэмцээн уралдаануудыг олж нээгээрэй.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {competitions.map((comp, i) => (
            <motion.div
              key={comp.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedComp(comp)}
              className="glass-panel rounded-3xl overflow-hidden group relative cursor-pointer"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={comp.image} 
                  alt={comp.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent opacity-80" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-xs font-semibold text-white">
                  {comp.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold group-hover:text-blue-400 transition-colors">{comp.title}</h3>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
                
                <div className="flex flex-col gap-3 text-sm text-muted">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span>Эцсийн хугацаа: {new Date(comp.deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-purple-400" />
                    <span>Шагнал: {comp.prize}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <Modal isOpen={!!selectedComp} onClose={() => setSelectedComp(null)} title="Тэмцээний мэдээлэл">
          {selectedComp && (
            <div className="space-y-6">
              <img src={selectedComp.image} alt={selectedComp.title} className="w-full h-48 object-cover rounded-xl" />
              <div>
                <h3 className="text-2xl font-bold mb-2">{selectedComp.title}</h3>
                <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-semibold mb-4">
                  {selectedComp.category}
                </span>
                <p className="text-muted leading-relaxed">{selectedComp.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                <div>
                  <p className="text-xs text-muted mb-1">Эцсийн хугацаа</p>
                  <p className="font-semibold text-sm">{new Date(selectedComp.deadline).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted mb-1">Шагнал</p>
                  <p className="font-semibold text-sm text-purple-400">{selectedComp.prize}</p>
                </div>
              </div>

              <AuthForm 
                type="competition"
                onSubmit={() => {
                  alert('Амжилттай бүртгүүллээ!');
                  setSelectedComp(null);
                }}
              />
            </div>
          )}
        </Modal>
      </div>
    </PageTransition>
  );
}
