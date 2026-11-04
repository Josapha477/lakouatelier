import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#25352D]/5 flex items-center justify-center text-[#D5A078]">
          <Compass className="w-8 h-8 stroke-[1.5]" />
        </div>

        <div>
          <span className="text-xs uppercase tracking-widest text-[#D5A078] font-semibold">
            Erreur 404
          </span>
          <h1 className="font-serif text-3xl font-medium text-[#25352D] mt-2">
            Page Introuvable
          </h1>
          <p className="text-sm text-[#292725]/75 mt-3 leading-relaxed">
            La pièce ou la section que vous recherchez n'existe pas ou a été déplacée au sein de notre atelier.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25352D] text-[#F4EFE5] text-xs uppercase tracking-widest font-medium rounded hover:bg-[#25352D]/90 transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à l'accueil</span>
          </Link>
          <Link
            to="/catalogue"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-[#25352D]/20 text-[#25352D] text-xs uppercase tracking-widest font-medium rounded hover:bg-white transition-colors"
          >
            <span>Voir le catalogue</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
