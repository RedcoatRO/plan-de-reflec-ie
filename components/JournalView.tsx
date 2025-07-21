
import React, { useState } from 'react';
import { Plan, JournalEntry, ThoughtPair } from '../types';
import { getBadgeForEntry } from '../services/geminiService';
import Spinner from './Spinner';
import { BADGES, MIN_AFFIRMATIONS, MAX_AFFIRMATIONS } from '../constants';

interface JournalViewProps {
  plan: Plan;
  onSaveEntry: (entry: JournalEntry) => void;
  onBack: () => void;
}

const JournalView: React.FC<JournalViewProps> = ({ plan, onSaveEntry, onBack }) => {
  // --- STATE MANAGEMENT ---
  // The component flow is now 4 sequential steps.
  // Step 1: Add all affirmations.
  // Step 2: Add a justification for each affirmation, one by one.
  // Step 3: Answer the first reflection question for each thought, one by one.
  // Step 4: Answer the second reflection question for each thought, one by one.
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  
  // State for Step 1
  const [affirmations, setAffirmations] = useState<string[]>([]);
  const [currentAffirmation, setCurrentAffirmation] = useState('');
  
  // State for sequential steps (2, 3, 4)
  const [justifications, setJustifications] = useState<string[]>([]);
  const [selectedConnectors, setSelectedConnectors] = useState<string[]>([]);
  const [reflectionAnswers1, setReflectionAnswers1] = useState<string[]>([]);
  const [reflectionAnswers2, setReflectionAnswers2] = useState<string[]>([]);
  
  // Index and current input for all sequential steps
  const [subStepIndex, setSubStepIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // --- STEP 1: Affirmations ---
  const handleAddAffirmation = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentAffirmation.trim() && affirmations.length < MAX_AFFIRMATIONS) {
      setAffirmations([...affirmations, currentAffirmation.trim()]);
      setCurrentAffirmation('');
      setError('');
    }
  };

  const handleStartSequentialSteps = () => {
    if (affirmations.length < MIN_AFFIRMATIONS) {
        setError(`Te rog adaugă cel puțin ${MIN_AFFIRMATIONS} gânduri pentru a continua.`);
        return;
    }
    // Initialize state for Step 2
    setJustifications(new Array(affirmations.length).fill(''));
    if (plan.connectors && plan.connectors.length > 0) {
      setSelectedConnectors(new Array(affirmations.length).fill(plan.connectors[0]));
    }
    setSubStepIndex(0);
    setCurrentInput('');
    setStep(2);
    setError('');
  };
  
  // --- SEQUENTIAL STEPS LOGIC (Steps 2, 3, 4) ---
  const handleNextSubStep = () => {
    if (!currentInput.trim()) {
        setError('Te rog completează ideea pentru a continua.');
        return;
    }
    setError('');

    // Save the current input to the correct state array based on the current step
    if (step === 2) {
      const newJustifications = [...justifications];
      newJustifications[subStepIndex] = currentInput.trim();
      setJustifications(newJustifications);
    } else if (step === 3) {
      const newReflections1 = [...reflectionAnswers1];
      newReflections1[subStepIndex] = currentInput.trim();
      setReflectionAnswers1(newReflections1);
    } else if (step === 4) {
      const newReflections2 = [...reflectionAnswers2];
      newReflections2[subStepIndex] = currentInput.trim();
      setReflectionAnswers2(newReflections2);
    }
    
    const isLastSubStep = subStepIndex === affirmations.length - 1;

    if (isLastSubStep) {
      // If it's the last sub-step, advance to the next major step or submit
      if (step === 2) {
        setStep(3);
        setSubStepIndex(0); // Reset for step 3
        setReflectionAnswers1(new Array(affirmations.length).fill('')); // Init state for step 3
      } else if (step === 3) {
        setStep(4);
        setSubStepIndex(0); // Reset for step 4
        setReflectionAnswers2(new Array(affirmations.length).fill('')); // Init state for step 4
      } else if (step === 4) {
        // This was the final input, submit the form.
        // We pass the final answer directly because state update is async.
        handleSubmit(currentInput.trim());
        return; // Exit to avoid clearing input
      }
    } else {
      // Move to the next item in the current step
      setSubStepIndex(subStepIndex + 1);
    }
    setCurrentInput(''); // Clear input for the next item
  }
  
  // --- SUBMISSION ---
  const handleSubmit = async (finalReflection2: string) => {
    setIsLoading(true);
    setError('');

    // Construct the final `thoughtPairs` array with all collected data
    const thoughtPairs: ThoughtPair[] = affirmations.map((aff, index) => {
      // The final reflection answer is passed directly, others are from state
      const reflection2 = (index === subStepIndex) ? finalReflection2 : reflectionAnswers2[index];
      return {
        part1: aff,
        connector: selectedConnectors[index] || null,
        part2: justifications[index],
        reflection1: reflectionAnswers1[index],
        reflection2: reflection2,
      };
    });

    try {
      const badgeName = await getBadgeForEntry(plan.badge);
      
      const newEntry: JournalEntry = {
        id: new Date().toISOString(),
        planTitle: plan.title,
        prompt1: plan.prompt1,
        prompt2: plan.prompt2,
        thoughtPairs: thoughtPairs,
        badgeName: badgeName,
        timestamp: new Date().toLocaleDateString('ro-RO'),
      };

      onSaveEntry(newEntry);
    } catch (err) {
      setError('A apărut o eroare la salvarea jurnalului. Te rog încearcă din nou.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // --- NAVIGATION ---
  const handleBack = () => {
    setError('');
    // Complex back navigation logic
    if (subStepIndex > 0) {
      // If we are in a sequential step, just go back one sub-step
      const prevIndex = subStepIndex - 1;
      setSubStepIndex(prevIndex);
      // Repopulate the input with the previous answer
      if (step === 2) setCurrentInput(justifications[prevIndex]);
      else if (step === 3) setCurrentInput(reflectionAnswers1[prevIndex]);
      else if (step === 4) setCurrentInput(reflectionAnswers2[prevIndex]);
    } else {
      // We are at the beginning of a step, go to the previous major step
      if (step === 4) {
        setStep(3);
        setSubStepIndex(affirmations.length - 1); // Go to last sub-step of previous major step
        setCurrentInput(reflectionAnswers1[affirmations.length - 1]);
      } else if (step === 3) {
        setStep(2);
        setSubStepIndex(affirmations.length - 1);
        setCurrentInput(justifications[affirmations.length - 1]);
      } else if (step === 2) {
        setStep(1);
      } else {
        onBack();
      }
    }
  };
  
  // --- RENDER FUNCTIONS ---
  const badgeInfo = BADGES[plan.badge];
  const affirmationsCount = affirmations.length;
  const canContinueFromStep1 = affirmationsCount >= MIN_AFFIRMATIONS;
  const atMaxAffirmations = affirmationsCount >= MAX_AFFIRMATIONS;

  const renderStep1 = () => (
    <div className="space-y-6">
        <div>
            <label className="text-3xl text-slate-600 block mb-2">{plan.prompt1}</label>
            <form onSubmit={handleAddAffirmation} className="flex gap-4">
                <input
                  type="text"
                  value={currentAffirmation}
                  onChange={(e) => setCurrentAffirmation(e.target.value)}
                  className="flex-grow p-4 text-2xl border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-400 transition disabled:bg-slate-100"
                  placeholder={atMaxAffirmations ? "Ai atins numărul maxim de gânduri" : "Scrie aici gândul tău..."}
                  disabled={atMaxAffirmations}
                />
                <button type="submit" className="bg-purple-500 text-white font-bold text-2xl px-6 rounded-lg hover:bg-purple-600 transition disabled:bg-purple-300" disabled={atMaxAffirmations}>Adaugă</button>
            </form>
        </div>
        {affirmationsCount > 0 && (
            <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-slate-600">Gândurile tale ({affirmationsCount}/{MAX_AFFIRMATIONS}):</h3>
                <ul className="list-disc list-inside bg-slate-50 p-4 rounded-lg max-h-48 overflow-y-auto">
                    {affirmations.map((aff, index) => <li key={index} className="text-xl text-slate-700">{aff}</li>)}
                </ul>
            </div>
        )}
        {error && <p className="text-red-500 text-center text-xl">{error}</p>}
        <div className="text-center pt-4">
            <button 
              onClick={handleStartSequentialSteps} 
              disabled={!canContinueFromStep1}
              className={`w-full md:w-auto text-3xl font-bold py-4 px-12 rounded-full shadow-lg transition-all duration-300 ${plan.textColor} ${plan.bgColor} ${!canContinueFromStep1 ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-105 transform hover:scale-105'}`}
            >
               Continuă
            </button>
            {!canContinueFromStep1 && (
                <p className="text-slate-500 mt-3 text-lg">Mai adaugă {MIN_AFFIRMATIONS - affirmationsCount} gânduri pentru a continua.</p>
            )}
        </div>
    </div>
  );

  // A generic renderer for all sequential steps (2, 3, 4)
  const renderSequentialStep = () => {
    let title = '';
    let prompt = '';
    let mainThought = '';
    let inputPlaceholder = '';
    
    const currentAffirmationText = affirmations[subStepIndex];
    const hasConnectors = plan.connectors && plan.connectors.length > 0;
    
    // Configure text based on current step
    if (step === 2) {
      title = `Justificare (${subStepIndex + 1}/${affirmations.length})`;
      mainThought = `${plan.prompt1} "${currentAffirmationText}"`;
      prompt = hasConnectors ? '...' : plan.prompt2;
      inputPlaceholder = 'Completează ideea...';
    } else { // Steps 3 & 4
        const completedThought = hasConnectors 
            ? `${plan.prompt1} "${currentAffirmationText}" ${selectedConnectors[subStepIndex]} ${justifications[subStepIndex]}.`
            : `${plan.prompt1} "${currentAffirmationText}". ${plan.prompt2} "${justifications[subStepIndex]}".`;

        mainThought = completedThought;

        if (step === 3) {
            title = `Reflecție 1 (${subStepIndex + 1}/${affirmations.length})`;
            prompt = 'Tot timpul ești așa sau doar uneori?';
            inputPlaceholder = 'Scrie aici reflecția ta...';
        } else { // Step 4
            title = `Reflecție 2 (${subStepIndex + 1}/${affirmations.length})`;
            prompt = 'Cum te simți când nu ești așa?';
            inputPlaceholder = 'Scrie aici cum te simți...';
        }
    }

    const isLastStep = step === 4 && subStepIndex === affirmations.length - 1;
    const buttonText = isLastStep ? 'Salvează Jurnalul' : 'Următorul';

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-700 text-center">{title}</h2>
            
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <p className="text-xl text-slate-700 text-center">
                    <span className="font-semibold">{mainThought}</span>
                </p>
            </div>
            
            <div>
                <label className="text-2xl text-slate-600 block mb-2">{prompt}</label>
                {step === 2 && hasConnectors && (
                    <select
                        value={selectedConnectors[subStepIndex]}
                        onChange={(e) => {
                            const newConnectors = [...selectedConnectors];
                            newConnectors[subStepIndex] = e.target.value;
                            setSelectedConnectors(newConnectors);
                        }}
                        className="mb-4 text-2xl font-bold text-purple-600 bg-white border-2 border-purple-200 rounded-lg p-1 focus:ring-2 focus:ring-purple-400 transition"
                    >
                        {plan.connectors!.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                )}
                <textarea
                    rows={step === 2 ? 2 : 4}
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    className="w-full p-4 text-xl border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-400 transition"
                    placeholder={inputPlaceholder}
                    disabled={isLoading}
                />
            </div>
            
            {error && <p className="text-red-500 text-center text-xl">{error}</p>}

            <div className="text-center pt-4">
                <button 
                  onClick={handleNextSubStep}
                  disabled={isLoading} 
                  className={`w-full md:w-auto text-3xl font-bold py-4 px-12 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${isLoading ? 'bg-slate-400 cursor-not-allowed' : `${plan.textColor} ${plan.bgColor} hover:brightness-105 transform hover:scale-105`}`}>
                  {isLoading && isLastStep ? (
                    <><Spinner /><span>Se salvează...</span></>
                  ) : (
                    <span>{buttonText}</span>
                  )}
                </button>
            </div>
        </div>
    );
  };


  return (
    <div className={`min-h-screen p-8 flex flex-col items-center justify-center transition-colors duration-500 ${plan.bgColor}`}>
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-2xl relative">
        <button onClick={handleBack} className="absolute top-6 left-6 text-slate-500 hover:text-slate-800 text-2xl z-10">
          &larr; Înapoi
        </button>
        <h1 className={`text-6xl font-bold text-center mb-8 ${plan.textColor}`}>{plan.title}</h1>
        
        {step === 1 ? renderStep1() : renderSequentialStep()}
        
        <div className="mt-8 text-center text-xl text-slate-500">
            <p>După ce salvezi, vei primi o insignă: <span className={`${badgeInfo.textColor} font-bold`}>{badgeInfo.icon} {badgeInfo.name}</span></p>
        </div>
      </div>
    </div>
  );
};

export default JournalView;
