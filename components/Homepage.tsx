
import React from 'react';
import { Page } from '../types';

interface HomepageProps {
  onStart: () => void;
}

const Homepage: React.FC<HomepageProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-8 bg-gradient-to-br from-rose-100 to-sky-100">
      <div className="max-w-2xl">
        <h1 className="text-8xl font-bold text-rose-500 mb-4" style={{ fontFamily: "'Gaegu', cursive" }}>
          Eu Sunt
        </h1>
        <p className="text-3xl text-slate-600 mb-2">
          Jurnalul Meu de Gânduri
        </p>
        <p className="text-xl text-slate-500 mb-8 max-w-lg mx-auto">
          Un loc magic unde gândurile tale prind viață și te ajută să te descoperi. Ești pregătit pentru aventură?
        </p>
        <button
          onClick={onStart}
          className="bg-rose-500 text-white text-3xl font-bold py-4 px-10 rounded-full shadow-lg hover:bg-rose-600 transform hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Începe Aventura!
        </button>
      </div>
       <div className="absolute bottom-4 right-4 text-slate-400 text-lg">Creat cu dragoste și un strop de magie ✨</div>
    </div>
  );
};

export default Homepage;
