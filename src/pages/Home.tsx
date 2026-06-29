import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Trophy, Users, Wifi } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import { cn } from '../lib/utils';

export default function Home() {
  return (
    <PageTransition>
      <div className="flex flex-col items-center text-center pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-blue-300 mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
          Монгол оюутнуудад зориулсан шилдэг платформ
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 max-w-4xl"
        >
          Оюутны амьдралаа дараагийн түвшинд гаргах <br className="hidden md:block" />
          <span className="text-gradient">StudentHub MN</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-muted max-w-2xl mb-12"
        >
          Монгол дахь тэмцээн, тэтгэлэг, хуучин шалгалт, клуб, суралцах орчны нэгдсэн төв. Шилдэгт зориулан бүтээв.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link to="/competitions" className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-white px-8 font-medium text-black transition-all hover:bg-gray-200">
            <span>Боломжуудтай танилцах</span>
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link to="/dashboard" className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 font-medium text-white backdrop-blur-md transition-all hover:bg-white/10">
            Хянах самбар руу орох
          </Link>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-12 border-t border-white/10">
        {[
          { icon: Trophy, title: 'Тэмцээнүүд', desc: 'Хакатон & олимпиад хайх', link: '/competitions', color: 'text-blue-400' },
          { icon: BookOpen, title: 'Тэтгэлэг', desc: 'Боловсролын санхүүжилтээ олох', link: '/scholarships', color: 'text-purple-400' },
          { icon: Users, title: 'Клубүүд', desc: 'Оюутны байгууллагад нэгдэх', link: '/clubs', color: 'text-pink-400' },
          { icon: Wifi, title: 'Суралцах орчин', desc: 'Wi-Fi-тай, чимээгүй орчин олох', link: '/study-spots', color: 'text-emerald-400' },
        ].map((feature, i) => (
          <Link key={i} to={feature.link}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-panel p-6 rounded-2xl h-full flex flex-col items-start gap-4 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] group"
            >
              <div className={cn("p-3 rounded-xl bg-white/5 border border-white/10", feature.color)}>
                <feature.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1 group-hover:text-white transition-colors">{feature.title}</h3>
                <p className="text-muted text-sm">{feature.desc}</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
      <div className="py-12 mb-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Монгол оюутнуудын сонголт</h2>
          <p className="text-muted text-lg">StudentHub оюутны амьдралыг хэрхэн өөрчилж буйг хараарай.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { quote: "Би энэ платформоор дамжуулан мөрөөдлийн тэтгэлгээ олсон. Хайлтын систем нь үнэхээр нарийвчлалтай.", author: "Ананд М.", role: "Компьютерийн Ухаан, МУИС" },
            { quote: "Суралцах орчны хэсэг нь шалгалтын үеэр намайг аварсан. Caffe Bene салбарыг үнэхээр санал болгож байна!", author: "Сарнай Б.", role: "Санхүү, СЭЗИС" },
            { quote: "StudentHub-аар дамжуулан Google Developer Club-д нэгдсэнээр надад гайхалтай танилын хүрээгээ тэлэх боломж олдсон.", author: "Тэмүүлэн Э.", role: "Програм хангамжийн Инженерчлэл, ШУТИС" },
          ].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-panel p-6 rounded-2xl flex flex-col justify-between group"
            >
              <p className="text-gray-300 italic mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-[1px]">
                  <div className="w-full h-full rounded-full bg-[#101010] flex items-center justify-center">
                    <span className="font-bold text-sm text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                      {t.author.charAt(0)}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white group-hover:text-blue-400 transition-colors">{t.author}</h4>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
