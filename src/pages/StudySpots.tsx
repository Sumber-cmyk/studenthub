import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { studySpots } from '../lib/mockData';
import { Wifi, VolumeX, Plug, Coffee, MapPin, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState } from 'react';
import { Modal } from '../components/Modal';

function RatingBar({ label, value, icon: Icon, colorClass }: { label: string, value: number, icon: any, colorClass: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2 text-muted">
        <Icon className="w-4 h-4" />
        <span>{label}</span>
      </div>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <div 
            key={star} 
            className={cn(
              "w-2 h-2 rounded-full",
              star <= value ? colorClass : "bg-white/10"
            )} 
          />
        ))}
      </div>
    </div>
  );
}

export default function StudySpots() {
  const [selectedSpot, setSelectedSpot] = useState<typeof studySpots[0] | null>(null);

  return (
    <PageTransition>
      <div className="py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold mb-4 tracking-tight">Шилдэг Суралцах Орчин</h1>
          <p className="text-muted text-lg max-w-2xl">Оюутнуудын үнэлсэнээр таны дараагийн хичээл хийхэд хамгийн тохиромжтой орчинг олоорой.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {studySpots.map((spot, i) => (
            <motion.div
              key={spot.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedSpot(spot)}
              className="glass-panel rounded-3xl overflow-hidden flex flex-col sm:flex-row group cursor-pointer hover:border-white/20 transition-all"
            >
              <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden">
                <img 
                  src={spot.image} 
                  alt={spot.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2">
                    <MapPin className="w-3 h-3"/> Газрын зураг
                  </span>
                </div>
              </div>
              <div className="p-6 sm:w-3/5 flex flex-col justify-center">
                <h3 className="text-xl font-bold mb-1 group-hover:text-emerald-400 transition-colors">{spot.name}</h3>
                <div className="flex items-center gap-1 text-muted text-sm mb-6">
                  <MapPin className="w-4 h-4" />
                  {spot.location}
                </div>
                
                <div className="space-y-3">
                  <RatingBar label="Wi-Fi" value={spot.wifi} icon={Wifi} colorClass="bg-blue-400" />
                  <RatingBar label="Чимээгүй байдал" value={spot.quietness} icon={VolumeX} colorClass="bg-purple-400" />
                  <RatingBar label="Цахилгаан залгуур" value={spot.power} icon={Plug} colorClass="bg-emerald-400" />
                  <RatingBar label="Кофе/Хөнгөн зууш" value={spot.coffee} icon={Coffee} colorClass="bg-orange-400" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <Modal isOpen={!!selectedSpot} onClose={() => setSelectedSpot(null)} title="Байршил">
          {selectedSpot && (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold">{selectedSpot.name}</h3>
                  <p className="text-muted mt-1 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {selectedSpot.location}
                  </p>
                </div>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${selectedSpot.mapQuery}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center border border-white/10"
                >
                  <ExternalLink className="w-5 h-5 text-emerald-400" />
                </a>
              </div>

              <div className="w-full h-80 rounded-2xl overflow-hidden bg-white/5 border border-white/10 relative">
                <iframe
                  title="Google Maps"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  src={`https://maps.google.com/maps?q=${selectedSpot.mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  className="absolute inset-0"
                />
              </div>
            </div>
          )}
        </Modal>
      </div>
    </PageTransition>
  );
}
