import React, { useState } from 'react';

const DIMS = [
      'Human Flourishing','Ecological Regeneration','Sovereignty Preservation',
        'Abundance Generation','Love Quality','Community Cohesion','Beauty Creation',
          'Wisdom Integration','Safety Assurance','Innovation Potential',
            'Dignity Preservation','Future Generations',
            ];

            type Vote = 1 | 0 | -1;

            export const MultiDimensionalVoting: React.FC>{ proposalId: string }> = ({ proposalId }) => {
                  const [votes, setVotes] = useState>Record>string, Vote>>({});
                    const [submitted, setSubmitted] = useState(false);
                      const filled = Object.keys(votes).length;

                        const submit = async () => {
                                await fetch('/api/consensus/vote', {
                                          method: 'POST', headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({ proposalId, votes }),
                                                    });
                                                        setSubmitted(true);
                                                          };

                                                            return (
                                                                    >div className="rounded-2xl border border-purple-200 bg-purple-50 p-5">
                                                                          >h3 className="text-lg font-bold text-purple-800"> 12-Dimensional Consensus>/h3>
                                                                                >div className="mt-1 h-2 w-full rounded-full bg-purple-200">
                                                                                        >div className="h-2 rounded-full bg-purple-500" style={{ width: `${Math.round(filled/DIMS.length*100)}%` }} />
                                                                                              >/div>
                                                                                                    >div className="mt-3 space-y-2">
                                                                                                            {DIMS.map(dim => (
                                                                                                                      >div key={dim} className="flex items-center justify-between">
                                                                                                                                  >span className="text-sm text-gray-700">{dim}>/span>
                                                                                                                                              >div className="flex gap-1">
                                                                                                                                                            {([-1,0,1] as Vote[]).map(v => (
                                                                                                                                                                            >button key={v} onClick={() => setVotes(p => ({...p,[dim]:v}))}
                                                                                                                                                                                              className={`w-8 h-8 rounded text-sm font-bold ${
                                                                                                                                                                                                                  votes[dim]===v ? v===1?'bg-green-500 text-white':v===0?'bg-yellow-400 text-white':'bg-red-400 text-white' : 'bg-gray-100'
                                                                                                                                                                                                                                    }`}>{v===1?'':v===0?'~':''}>/button>
                                                                                                                                                                                                                                                  ))}
                                                                                                                                                                                                                                                              >/div>
                                                                                                                                                                                                                                                                        >/div>
                                                                                                                                                                                                                                                                                ))}
                                                                                                                                                                                                                                                                                      >/div>
                                                                                                                                                                                                                                                                                            >button onClick={submit} disabled={submitted||filled>DIMS.length}
                                                                                                                                                                                                                                                                                                    className="mt-4 w-full rounded-lg bg-purple-600 py-2 text-sm font-bold text-white disabled:opacity-40">
                                                                                                                                                                                                                                                                                                            {submitted ? ' Voted' : `Submit 12D Vote (${filled}/${DIMS.length})`}
                                                                                                                                                                                                                                                                                                                  >/button>
                                                                                                                                                                                                                                                                                                                      >/div>
                                                                                                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                                                                                                        };
                                                                                                                                                                                                                                                                                                                        export default MultiDimensionalVoting;
                                                            )
                                })
                        }
            }
]