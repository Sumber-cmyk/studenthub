import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { pastExams } from '../lib/mockData';
import { FileText, Download, Building2, CalendarDays, Copy } from 'lucide-react';
import { useState } from 'react';
import { Modal } from '../components/Modal';

export default function PastExams() {
  const [filterUni, setFilterUni] = useState('Бүгд');
  const [selectedExam, setSelectedExam] = useState<typeof pastExams[0] | null>(null);

  const universities = ['Бүгд', ...new Set(pastExams.map(e => e.university))];
  const filtered = filterUni === 'Бүгд' ? pastExams : pastExams.filter(e => e.university === filterUni);

  return (
    <PageTransition>
      <div className="py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 tracking-tight">Хуучин Шалгалтын Архив</h1>
          <p className="text-muted text-lg max-w-xl mb-6">Удахгүй болох шалгалтандаа бэлдэхэд зориулагдсан өмнөх шалгалтын материалууд.</p>
          
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {universities.map(uni => (
              <button
                key={uni}
                onClick={() => setFilterUni(uni)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  filterUni === uni 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white/5 text-muted hover:bg-white/10 hover:text-white'
                }`}
              >
                {uni}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((exam, i) => (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedExam(exam)}
              className="glass-panel p-5 rounded-2xl group cursor-pointer hover:border-blue-500/30 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors">
                  <FileText className="w-6 h-6 text-purple-400" />
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    alert('Файл татаж байна...');
                  }}
                  className="p-2 text-muted hover:text-white hover:bg-white/10 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
              
              <h3 className="text-lg font-bold mb-2 group-hover:text-purple-400 transition-colors">{exam.course}</h3>
              
              <div className="space-y-2 text-sm text-muted">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  {exam.university}
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" />
                  {exam.year} {exam.semester} • {exam.type}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <Modal isOpen={!!selectedExam} onClose={() => setSelectedExam(null)} title={`${selectedExam?.course} Шалгалт`}>
          {selectedExam && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted text-sm flex items-center gap-2 mb-1">
                    <Building2 className="w-4 h-4"/> {selectedExam.university}
                  </p>
                  <p className="text-muted text-sm flex items-center gap-2">
                    <CalendarDays className="w-4 h-4"/> {selectedExam.year} {selectedExam.semester} • {selectedExam.type}
                  </p>
                </div>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(selectedExam.content || '');
                    alert('Хуулбарлалаа!');
                  }}
                  className="px-3 py-1.5 flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors"
                >
                  <Copy className="w-4 h-4"/> Хуулах
                </button>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 font-mono text-sm leading-loose whitespace-pre-wrap text-gray-300">
                {selectedExam.content}
              </div>
              
              <button 
                onClick={() => alert('PDF файл татаж байна...')}
                className="w-full py-3 flex items-center justify-center gap-2 rounded-full bg-purple-600 text-white font-bold hover:bg-purple-700 transition-colors"
              >
                <Download className="w-5 h-5"/>
                Бүтнээр нь PDF-ээр татах
              </button>
            </div>
          )}
        </Modal>
      </div>
    </PageTransition>
  );
}
