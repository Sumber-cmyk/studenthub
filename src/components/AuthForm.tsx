import { useState } from 'react';

export function AuthForm({ onSubmit, type }: { onSubmit: () => void, type: 'competition' | 'club' | 'scholarship' }) {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mt-6">
      <h3 className="text-xl font-bold mb-4">
        {isSignUp ? 'Бүртгүүлэх' : 'Нэвтрэх'}
      </h3>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-4">
        {isSignUp && (
          <>
            <div>
              <label className="block text-sm text-muted mb-1">Овог, нэр</label>
              <input type="text" required className="w-full bg-black/20 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-blue-500" placeholder="Таны нэр" />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1">Төрсөн огноо (Он/Сар/Өдөр)</label>
              <input type="date" required className="w-full bg-black/20 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-blue-500 [color-scheme:dark]" />
            </div>
            <div>
              <label className="block text-sm text-muted mb-2">Хүйс</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="radio" name="gender" required className="accent-blue-500" />
                  <span>Эрэгтэй</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="gender" required className="accent-blue-500" />
                  <span>Эмэгтэй</span>
                </label>
              </div>
            </div>
          </>
        )}
        
        {!isSignUp && (
          <div>
            <label className="block text-sm text-muted mb-1">Имэйл эсвэл Хэрэглэгчийн нэр</label>
            <input type="text" required className="w-full bg-black/20 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-blue-500" placeholder="Имэйл/Нэр" />
          </div>
        )}

        <div>
          <label className="block text-sm text-muted mb-1">Нууц үг</label>
          <input type="password" required className="w-full bg-black/20 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-blue-500" placeholder="Нууц үг" />
        </div>

        <button type="submit" className="w-full py-3 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors mt-2">
          {isSignUp ? (type === 'competition' ? 'Тэмцээнд бүртгүүлэх' : type === 'club' ? 'Клубд нэгдэх' : 'Тэтгэлэгт бүртгүүлэх') : 'Нэвтрэх'}
        </button>

        <p className="text-center text-sm text-muted mt-4">
          {isSignUp ? 'Бүртгэлтэй юу?' : 'Бүртгэлгүй юу?'}
          <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="text-blue-400 hover:underline ml-2">
            {isSignUp ? 'Нэвтрэх' : 'Бүртгүүлэх'}
          </button>
        </p>
      </form>
    </div>
  );
}
