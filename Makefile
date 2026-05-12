.PHONY: install setup-dev start-all deploy-colony test-all build-prod

install:
	cd frontend/web && npm install
		cd frontend/mobile && npm install
			cd backend/api-gateway && npm install
				pip install -r backend/colony-agents/requirements.txt
					pip install -r backend/love-quality/requirements.txt
						pip install -r backend/consensus-engine/requirements.txt
							cd backend/aethel-grid && cargo build

							setup-dev:
								cp .env.example .env
									docker-compose -f infrastructure/docker/docker-compose.yml up -d redis postgres

									start-all:
										docker-compose -f infrastructure/docker/docker-compose.yml up -d

										deploy-colony:
											kubectl apply -f infrastructure/kubernetes/namespaces/
												kubectl apply -f infrastructure/kubernetes/deployments/
													kubectl apply -f infrastructure/kubernetes/services/

													test-all:
														cd frontend/web && npm test
															pytest backend/colony-agents/
																pytest backend/love-quality/
																	cd backend/aethel-grid && cargo test

																	build-prod:
																		cd frontend/web && npm run build
																			docker-compose -f infrastructure/docker/docker-compose.prod.yml build