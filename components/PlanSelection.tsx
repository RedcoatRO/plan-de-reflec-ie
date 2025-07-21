
import React from 'react';
import { Plan } from '../types';
import { PLANS } from '../constants';

interface PlanSelectionProps {
  onSelectPlan: (plan: Plan) => void;
}

const PlanSelection: React.FC<PlanSelectionProps> = ({ onSelectPlan }) => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-6xl font-bold text-center text-slate-700 mb-4">Alege un plan de reflecție</h1>
      <p className="text-2xl text-center text-slate-500 mb-12">Fiecare plan este o nouă ușă spre a te cunoaște mai bine.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PLANS.map((plan) => (
          <button
            key={plan.id}
            onClick={() => onSelectPlan(plan)}
            className={`p-8 rounded-2xl shadow-lg text-left transform hover:-translate-y-2 transition-transform duration-300 ${plan.bgColor} ${plan.textColor} flex items-center justify-center`}
          >
            <div className="text-4xl font-bold">{plan.title}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlanSelection;
