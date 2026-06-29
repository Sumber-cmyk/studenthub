import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { scholarships } from '../lib/mockData';
import { Search, GraduationCap, Banknote, Calendar, BookOpen, PenTool, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { Modal } from '../components/Modal';
import { AuthForm } from '../components/AuthForm';

export default function Scholarships() {
  const [search, setSearch] = useState('');
  const [selectedScholarship, setSelectedScholarship] = useState<typeof scholarships[0] | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'essays' | 'stories' | 'apply'>('info');

  const filtered = scholarships.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.provider.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageTransition>
      <div className="py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h1 className="text-4xl font-bold mb-4 tracking-tight">Тэтгэлгүүд</h1>
            <p className="text-muted text-lg max-w-xl">Монгол оюутнуудад зориулсан санхүүгийн тусламж, тэтгэлгийн мэдээллийг эндээс аваарай.</p>
          </div>
          
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input 
              type="text" 
              placeholder="Тэтгэлэг хайх..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-10 pr-4 text-white placeholder:text-muted focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.01 }}
              onClick={() => setSelectedScholarship(s)}
              className="glass-panel p-6 rounded-2xl group flex flex-col justify-between cursor-pointer hover:border-white/20 transition-all"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{s.name}</h3>
                  <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                    <GraduationCap className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
                <p className="text-muted text-sm mb-4">{s.provider}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {s.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300 border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t border-white/10 flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 text-emerald-400 font-medium">
                  <Banknote className="w-4 h-4" />
                  {s.amount}
                </div>
                <div className="flex items-center gap-2 text-muted">
                  <Calendar className="w-4 h-4" />
                  {new Date(s.deadline).toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted">
              Дараах хайлтад тохирох тэтгэлэг олдсонгүй: "{search}"
            </div>
          )}
        </div>

        <Modal isOpen={!!selectedScholarship} onClose={() => setSelectedScholarship(null)} title="Тэтгэлгийн дэлгэрэнгүй">
          {selectedScholarship && (
            <div className="space-y-6">
              <div className="flex overflow-x-auto gap-2 pb-2 border-b border-white/10 scrollbar-hide">
                <button onClick={() => setActiveTab('info')} className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-colors ${activeTab === 'info' ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-white/5 text-muted hover:text-white'}`}>Мэдээлэл</button>
                <button onClick={() => setActiveTab('essays')} className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-colors ${activeTab === 'essays' ? 'bg-purple-500/20 text-purple-400' : 'hover:bg-white/5 text-muted hover:text-white'}`}>Тэнцсэн Эссе</button>
                <button onClick={() => setActiveTab('stories')} className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-colors ${activeTab === 'stories' ? 'bg-emerald-500/20 text-emerald-400' : 'hover:bg-white/5 text-muted hover:text-white'}`}>Оюутны Түүх</button>
                <button onClick={() => setActiveTab('apply')} className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-colors ${activeTab === 'apply' ? 'bg-white text-black' : 'hover:bg-white/5 text-muted hover:text-white'}`}>Өргөдөл</button>
              </div>

              {activeTab === 'info' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{selectedScholarship.name}</h3>
                    <p className="text-muted mb-4">{selectedScholarship.provider}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedScholarship.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300 border border-white/10">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10">
                      {selectedScholarship.description}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                      <p className="text-xs text-emerald-400/80 mb-1 flex items-center gap-1"><Banknote className="w-3 h-3"/> Санхүүжилт</p>
                      <p className="font-semibold text-emerald-400">{selectedScholarship.amount}</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <p className="text-xs text-muted mb-1 flex items-center gap-1"><Calendar className="w-3 h-3"/> Эцсийн хугацаа</p>
                      <p className="font-semibold text-sm">{new Date(selectedScholarship.deadline).toLocaleDateString()}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'essays' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <h4 className="font-bold flex items-center gap-2 mb-2"><BookOpen className="w-4 h-4 text-purple-400" /> "Ирээдүйг бүтээгч" - Б.Билгүүн</h4>
                    <p className="text-sm text-gray-400 italic mb-3">2024 оны тэтгэлэгт тэнцсэн эссе</p>
                    <p className="text-sm text-gray-300 leading-relaxed line-clamp-4">
                      Ахлах сургуульд байхдаа би технологийн салбарт хэзээ нэгэн цагт хувь нэмрээ оруулна гэж мөрөөддөг байлаа. Гэвч хүсэл тэмүүллээс гадна тууштай хөдөлмөр шаардлагатай гэдгийг оюутан болсон эхний жилээ л ойлгосон. Энэхүү тэтгэлэг нь зөвхөн санхүүгийн дэмжлэг бус, миний алсын харааг баталгаажуулах итгэл байх болно...
                    </p>
                    <button className="text-purple-400 text-sm mt-2 hover:underline">Цааш унших</button>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <h4 className="font-bold flex items-center gap-2 mb-2"><BookOpen className="w-4 h-4 text-purple-400" /> "Нийгэмд үзүүлэх нөлөө" - А.Ану</h4>
                    <p className="text-sm text-gray-400 italic mb-3">2023 оны тэтгэлэгт тэнцсэн эссе</p>
                    <p className="text-sm text-gray-300 leading-relaxed line-clamp-4">
                      Бидний нийгэмд тулгарч буй олон асуудлыг залуу үе бид л шийдвэрлэх ёстой. Миний сонгосон мэргэжил үүнд хэрхэн туслах вэ гэвэл...
                    </p>
                    <button className="text-purple-400 text-sm mt-2 hover:underline">Цааш унших</button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'stories' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5">
                    <h4 className="font-bold flex items-center gap-2 mb-2"><MessageCircle className="w-4 h-4 text-emerald-400" /> "Оюутны эхний жил: Хэрхэн амьдрах вэ?"</h4>
                    <p className="text-sm text-emerald-400/80 mb-3">Нийтэлсэн: Т.Уянга, 3-р курс</p>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Би анх их сургуульд ороод цагаа хэрхэн зөв төлөвлөхөө огт мэддэггүй байлаа. Өглөө 8-аас орой 6 хүртэл хичээлтэй, дундуур нь номын санд суух шаардлагатай. Гэхдээ би нэг нууцыг олж нээсэн нь Notion ашиглах байв...
                    </p>
                    <button className="text-emerald-400 text-sm mt-2 hover:underline">Цааш унших</button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'apply' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5">
                    <h4 className="font-bold flex items-center gap-2 mb-3"><PenTool className="w-4 h-4 text-blue-400" /> Өөрийн эссег бичих</h4>
                    <p className="text-sm text-gray-300 mb-4">
                      Та энэхүү тэтгэлэгт хүсэлт гаргахын тулд эхлээд системд нэвтэрч эсвэл бүртгүүлсэн байх шаардлагатай.
                    </p>
                    <AuthForm 
                      type="scholarship"
                      onSubmit={() => {
                        alert('Амжилттай бүртгүүллээ! Одоо та эссегээ бичих боломжтой.');
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </Modal>
      </div>
    </PageTransition>
  );
}
