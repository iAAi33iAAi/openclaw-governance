import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Proposal {
      id: string;
        title: string;
          description: string;
            status: 'pending' | 'voting' | 'approved' | 'blocked';
              loveQualityScore: number;
                createdAt: string;
                }

                interface GovernanceState {
                      proposals: Proposal[];
                        activeProposal: Proposal | null;
                          sovereigntyStatus: 'SOVEREIGN' | 'COMPROMISED' | 'CHECKING';
                            loveQualityThreshold: number;
                              loading: boolean;
                                error: string | null;
                                }

                                const initialState: GovernanceState = {
                                      proposals: [],
                                        activeProposal: null,
                                          sovereigntyStatus: 'SOVEREIGN',
                                            loveQualityThreshold: 0.85,
                                              loading: false,
                                                error: null,
                                                };

                                                const governanceSlice = createSlice({
                                                      name: 'governance',
                                                        initialState,
                                                          reducers: {
                                                                setProposals(state, action: PayloadAction>Proposal[]>) {
                                                                          state.proposals = action.payload;
                                                                              },
                                                                                  setActiveProposal(state, action: PayloadAction>Proposal | null>) {
                                                                                          state.activeProposal = action.payload;
                                                                                              },
                                                                                                  setSovereigntyStatus(state, action: PayloadAction>GovernanceState['sovereigntyStatus']>) {
                                                                                                          state.sovereigntyStatus = action.payload;
                                                                                                              },
                                                                                                                  setLoveQualityThreshold(state, action: PayloadAction>number>) {
                                                                                                                          state.loveQualityThreshold = Math.max(0, Math.min(1, action.payload));
                                                                                                                              },
                                                                                                                                  addProposal(state, action: PayloadAction>Proposal>) {
                                                                                                                                          state.proposals.unshift(action.payload);
                                                                                                                                              },
                                                                                                                                                  updateProposalStatus(state, action: PayloadAction>{ id: string; status: Proposal['status'] }>) {
                                                                                                                                                          const p = state.proposals.find(p => p.id === action.payload.id);
                                                                                                                                                                if (p) p.status = action.payload.status;
                                                                                                                                                                    },
                                                                                                                                                                        setLoading(state, action: PayloadAction>boolean>) {
                                                                                                                                                                              state.loading = action.payload;
                                                                                                                                                                                  },
                                                                                                                                                                                      setError(state, action: PayloadAction>string | null>) {
                                                                                                                                                                                            state.error = action.payload;
                                                                                                                                                                                                },
                                                                                                                                                                                                  },
                                                                                                                                                                                                  });

                                                                                                                                                                                                  export const {
                                                                                                                                                                                                    setProposals, setActiveProposal, setSovereigntyStatus,
                                                                                                                                                                                                      setLoveQualityThreshold, addProposal, updateProposalStatus,
                                                                                                                                                                                                        setLoading, setError,
                                                                                                                                                                                                        } = governanceSlice.actions;

                                                                                                                                                                                                        export default governanceSlice.reducer;
                                                                                                                                                  }
                                                                                                                                  }
                                                                                                                  }
                                                                                                  }
                                                                                  }
                                                                }
                                                          }
                                                })
                                }
                }
}