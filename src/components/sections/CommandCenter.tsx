'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Bot } from 'lucide-react';
import { categories } from './data/categories';
import { renderAIMessage, renderUserMessage } from './components/MessageComponents';
import { AnimationPhase, ConversationMessage } from './types/commandCenter.types';

export default function CommandCenter() {
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>('initial');
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [quickOptions, setQuickOptions] = useState<string[]>([]);

  useEffect(() => {
    if (isInView) {
      setAnimationPhase('dropping');
      setTimeout(() => {
        setAnimationPhase('docking');
        setTimeout(() => {
          setAnimationPhase('final');
        }, 800);
      }, 1200);
    }
  }, [isInView]);

  useEffect(() => {
    if (!activeCategory) {
      setQuickOptions([]);
      return;
    }

    const category = categories.find(c => c.key === activeCategory);
    if (!category) return;

    const options: Record<string, string[]> = {
      procedural: ['View Success Rates', 'Patient Wait Times', 'Treatment Distribution', 'Staff Performance'],
      financial: ['Revenue Breakdown', 'Cost Analysis', 'Insurance Claims', 'Payment Trends'],
      operations: ['Staff Scheduling', 'Equipment Status', 'Resource Utilization', 'Efficiency Metrics'],
      patients: ['Satisfaction Scores', 'Appointment Analytics', 'Retention Rates', 'Feedback Analysis']
    };

    setQuickOptions(options[activeCategory] || []);
  }, [activeCategory]);

  const handleCategoryClick = useCallback((catKey: string) => {
    const category = categories.find(c => c.key === catKey);
    if (!category) return;

    setActiveCategory(catKey);

    const userMsg: ConversationMessage = {
      role: 'user',
      content: category.userPrompt
    };
    const aiMsg: ConversationMessage = {
      role: 'ai',
      data: {
        ...category.initialAIResponse
      }
    };

    setConversation([userMsg, aiMsg]);
  }, []);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    if (!activeCategory) return;
    const category = categories.find(c => c.key === activeCategory);
    if (!category) return;

    const refinedResponse = category.refinedAIResponses[suggestion];
    if (!refinedResponse) {
      const aiMsg: ConversationMessage = { 
        role: 'ai', 
        data: { 
          summary: "No further data for that suggestion.", 
          chartType: null,
          chartData: [] 
        } 
      };
      setConversation(prev => [...prev, aiMsg]);
      return;
    }

    const userMsg: ConversationMessage = { role: 'user', content: suggestion };
    const aiMsg: ConversationMessage = { role: 'ai', data: refinedResponse };
    setConversation(prev => [...prev, userMsg, aiMsg]);
  }, [activeCategory]);

  const robotVariants = {
    initial: { y: -80, opacity: 0, scale: 1 },
    dropping: { 
      y: -40, opacity: 1, scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 25, duration: 1 }
    },
    docking: {
      y: 0, opacity: 1, scale: 1,
      transition: { type: "spring", stiffness: 250, damping: 30, duration: 1.2 }
    },
    final: { y: 0, opacity: 1, scale: 1 }
  };

  const memoizedCategories = useMemo(() => categories, []);

  return (
    <div ref={sectionRef} className="relative w-full pt-[10.4vh] pb-8 bg-white overflow-hidden">
      <div className="w-full flex items-center justify-center text-center px-5 lg:px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={animationPhase === 'final' ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="hidden lg:block absolute inset-x-16 top-10 bottom-4 rounded-2xl border border-blue-100/50 bg-gradient-to-b from-white/50 to-blue-50/20 backdrop-blur-sm"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={animationPhase === 'final' ? { opacity: 0.1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,transparent,black)]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={animationPhase === 'final' ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-300/10 rounded-2xl"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-3 mt-2 mb-4 max-w-[90rem] mx-auto relative lg:px-2 lg:py-3">
          {/* Left Panel */}
          <div className="lg:col-span-5 space-y-6 lg:pr-2 w-full">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6 pt-12 relative w-full">
              {/* Robot and Chat Area */}
              <div className="flex items-start space-x-4 mb-6">
                {/* Robot */}
                <motion.div
                  variants={robotVariants}
                  initial="initial"
                  animate={animationPhase}
                  className="flex-shrink-0"
                >
                  <div className="relative">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={animationPhase === 'final' ? { opacity: 0.2 } : { opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full blur-xl animate-pulse"
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={animationPhase === 'final' ? { opacity: 0.1 } : { opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute -inset-8 bg-gradient-to-r from-blue-400 to-blue-300 rounded-full blur-2xl animate-pulse-slow"
                    />
                    <div className="relative p-4 bg-white rounded-full shadow-2xl">
                      <div className="relative z-10">
                        <Bot className="w-10 h-10 text-blue-600" />
                      </div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={animationPhase === 'final' ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 rounded-full border-2 border-blue-200 animate-spin-slow"
                      />
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={animationPhase === 'final' ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute -inset-2 rounded-full border border-blue-100 animate-reverse-spin"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Chat Messages Container */}
                <div className="flex flex-col space-y-3 mt-2 w-full">
                  {/* Robot's Welcome Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={animationPhase === 'final' ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ 
                      duration: 0.5,
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                      delay: 0.2
                    }}
                    className="max-w-[70%] ml-3"
                  >
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className="bg-gray-100 text-gray-800 px-4 py-2 rounded-2xl rounded-tl-none text-sm shadow-md relative overflow-hidden"
                    >
                      <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      />
                      {!conversation.length ? (
                        "Hi, what can I help you with today?"
                      ) : (
                        "Sure, I can help with that."
                      )}
                    </motion.div>
                  </motion.div>

                  {/* User's Message */}
                  {conversation[0]?.role === 'user' && conversation[0]?.content && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        duration: 0.4,
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                        delay: 0.1
                      }}
                      className="max-w-[70%] self-end"
                    >
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-2xl rounded-tr-none text-sm shadow-md relative overflow-hidden"
                      >
                        <motion.div
                          initial={{ x: "-100%" }}
                          animate={{ x: "100%" }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        />
                        {conversation[0].content}
                      </motion.div>
                    </motion.div>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Analytics</h3>
              <p className="text-sm text-gray-500 mb-4">
                Select a category to see tailored insights. Interact with suggestions to refine the analysis.
              </p>

              <div className="space-y-3">
                {memoizedCategories.map(c => (
                  <motion.div
                    key={c.key}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCategoryClick(c.key)}
                    className={`group relative p-4 rounded-xl cursor-pointer transition-all
                      ${activeCategory === c.key 
                        ? 'bg-blue-50/80 shadow-md' 
                        : 'bg-white/50 hover:bg-white/80 hover:shadow-md'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`
                        p-2 rounded-lg transition-colors
                        ${activeCategory === c.key 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-blue-50 text-blue-500 group-hover:bg-blue-100'
                        }`}
                      >
                        {c.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{c.label}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">Click to explore</p>
                      </div>
                    </div>
                    {activeCategory === c.key && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute inset-0 border-2 border-blue-500 rounded-xl pointer-events-none"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {quickOptions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Suggested Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  {quickOptions.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl text-left transition-colors"
                      onClick={() => handleSuggestionClick(option)}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-7 lg:pl-2 w-full">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6 pb-8 min-h-[600px] w-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">AI-Generated Insights</h3>
              <div className="space-y-6">
                {conversation.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex flex-col gap-6"
                  >
                    {msg.role === 'ai' && msg.data && renderAIMessage(msg.data, handleSuggestionClick)}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 