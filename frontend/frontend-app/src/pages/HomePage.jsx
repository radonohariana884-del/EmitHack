import { motion } from "framer-motion";
import { Activity, AlertTriangle, Clock, MapPin } from "lucide-react";

const stats = [
  { title: "Trafic en temps réel", value: "98%", icon: Activity },
  { title: "Signalements actifs", value: "24", icon: AlertTriangle },
  { title: "Itinéraires disponibles", value: "3", icon: MapPin },
  { title: "Gain de temps", value: "15 min", icon: Clock },
];

export default function HomePage({ onStart }) {
  return (
    <div className="home-page flex min-h-screen items-start justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-6 py-12 text-slate-100">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-5xl rounded-[32px] border border-white/10 bg-slate-950/80 p-10 shadow-[0_40px_120px_-45px_rgba(56,189,248,0.55)] backdrop-blur-xl"
      >
        <div className="flex flex-col gap-12">
          <section className="hero-section text-center">
            <div className="inline-flex items-center justify-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 shadow-sm">
              <span className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
              Assistant de trafic intelligent
            </div>
            <h1 className="mt-8 text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              Assistant de trafic intelligent
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
              L'intelligence artificielle au service de la mobilité urbaine à Madagascar, avec itinéraires optimisés et signalements en temps réel.
            </p>
            <button
              onClick={onStart}
              className="mt-10 inline-flex items-center justify-center rounded-full bg-cyan-400 px-14 py-4 text-base font-semibold text-slate-950 transition duration-200 hover:-translate-y-0.5 hover:bg-cyan-300 focus:outline-none"
            >
              Commencer
            </button>
          </section>

          <section className="hero-stats grid gap-4 sm:grid-cols-2">
            {stats.map((stat) => (
              <motion.div
                key={stat.title}
                whileHover={{ y: -4 }}
                className="stat-card rounded-[28px] border border-white/10 bg-slate-900/80 p-6 shadow-[0_24px_60px_-35px_rgba(56,189,248,0.35)]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan-300/15 text-cyan-200">
                    <stat.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <div className="text-sm uppercase tracking-[0.24em] text-slate-400">{stat.title}</div>
                    <div className="mt-3 text-3xl font-semibold text-white">{stat.value}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </section>
        </div>
      </motion.div>
    </div>
  );
}
