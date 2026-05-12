import React, { useState } from 'react';

const AGENTS = [
      { id:1, name:'Strategic',      icon:'', desc:'Pattern recognition & wisdom integration' },
        { id:2, name:'Technical',      icon:'', desc:'Architecture & Aethel Grid integration' },
          { id:3, name:'Resources',      icon:'', desc:'Abundance protocols & regenerative systems' },
            { id:4, name:'Communication',  icon:'', desc:'Transparency & inter-colony comms' },
              { id:5, name:'Analysis',       icon:'', desc:'Flourishing metrics & predictive modeling' },
                { id:6, name:'Quality',        icon:'', desc:'Love-quality validation & safety assurance' },
                  { id:7, name:'Innovation',     icon:'', desc:'Breakthrough detection & future exploration' },
                  ];

                  export const SevenAgentInterface: React.FC = () => {
                      const [active, setActive] = useState>number | null>(null);
                        const [status] = useState>Record>number,string>>(
                                Object.fromEntries(AGENTS.map(a => [a.id, 'READY']))
                                  );

                                    const selected = AGENTS.find(a => a.id === active);

                                      return (
                                          >div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5 shadow-sm">
                                                >h3 className="text-lg font-bold text-indigo-800"> 7-Agent Colony>/h3>
                                                      >p className="text-xs text-indigo-500 mb-3">Click any agent to inspect>/p>
                                                            >div className="grid grid-cols-7 gap-2">
                                                                    {AGENTS.map(a => (
                                                                                  >button
                                                                                              key={a.id}
                                                                                                          onClick={() => setActive(active === a.id ? null : a.id)}
                                                                                                                      className={`flex flex-col items-center rounded-xl p-2 transition-all border-2 ${
                                                                                                                                      active === a.id
                                                                                                                                                      ? 'border-indigo-500 bg-white shadow-md'
                                                                                                                                                                      : 'border-transparent bg-indigo-100 hover:bg-white'
                                                                                                                                                                                  }`}
                                                                                                                                                                                            >
                                                                                                                                                                                                        >span className="text-2xl">{a.icon}>/span>
                                                                                                                                                                                                                    >span className="mt-1 text-xs font-semibold text-indigo-700 text-center leading-tight">{a.name}>/span>
                                                                                                                                                                                                                                >span className={`mt-1 text-xs font-bold ${
                                                                                                                                                                                                                                              status[a.id]==='READY' ? 'text-green-500' : 'text-yellow-500'
                                                                                                                                                                                                                                                          }`}>>/span>
                                                                                                                                                                                                                                                                    >/button>
                                                                                                                                                                                                                                                                            ))}
                                                                                                                                                                                                                                                                                  >/div>
                                                                                                                                                                                                                                                                                        {selected && (
                                                                                                                                                                                                                                                                                                >div className="mt-4 rounded-xl bg-white border border-indigo-200 p-4">
                                                                                                                                                                                                                                                                                                          >p className="font-bold text-indigo-800">{selected.icon} Agent {selected.id}  {selected.name}>/p>
                                                                                                                                                                                                                                                                                                                    >p className="text-sm text-gray-600 mt-1">{selected.desc}>/p>
                                                                                                                                                                                                                                                                                                                              >div className="mt-2 flex gap-2">
                                                                                                                                                                                                                                                                                                                                          >span className="rounded-full bg-green-100 text-green-700 px-3 py-1 text-xs font-bold">ONLINE>/span>
                                                                                                                                                                                                                                                                                                                                                      >span className="rounded-full bg-indigo-100 text-indigo-700 px-3 py-1 text-xs font-bold">SOVEREIGNTY >/span>
                                                                                                                                                                                                                                                                                                                                                                >/div>
                                                                                                                                                                                                                                                                                                                                                                        >/div>
                                                                                                                                                                                                                                                                                                                                                                              )}
                                                                                                                                                                                                                                                                                                                                                                                  >/div>
                                                                                                                                                                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                                                                                                                                                                    };

                                                                                                                                                                                                                                                                                                                                                                                    export default SevenAgentInterface;
                                                                                                                      }`}
                                                                    ))
                        )
                  }
]