import React, { useState } from 'react';
import { Clock, Calendar, User } from 'lucide-react';
import NavbarPanel from '../components/NavbarPanel';

const requests = [
	{
		id: 1,
		disciplina: 'Matemática - Cálculo I',
		professor: 'Maria Santos',
		tipo: 'Cancelamento',
		status: 'Pendente',
		dataOriginal: '12/05/2023',
		horaOriginal: '14:00',
		motivo: 'Problema de saúde',
		dataSolicitacao: '10/05/2023',
	},
	{
		id: 2,
		disciplina: 'Física - Mecânica',
		professor: 'João Oliveira',
		tipo: 'Reagendamento',
		status: 'Pendente',
		dataOriginal: '15/05/2023',
		horaOriginal: '16:30',
		novaData: '17/05/2023',
		novaHora: '16:30',
		motivo: 'Compromisso acadêmico',
		dataSolicitacao: '13/05/2023',
	},
	// ...adicione mais itens conforme necessário...
];

const ITEMS_PER_PAGE = 5;

const Tag = ({ children, color }) => (
	<span className={`text-xs font-semibold px-2 py-0.5 rounded ${color}`}>
		{children}
	</span>
);

const TeacherRequests = () => {
	const [currentPage, setCurrentPage] = useState(1);

	const totalPages = Math.ceil(requests.length / ITEMS_PER_PAGE);
	const paginatedRequests = requests.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);

	return (
		<div className="bg-[#f9fafb] min-h-screen flex flex-col">
			<div className="top-0 left-0 w-full z-50">
				<NavbarPanel />
			</div>
			<div className="flex-1 flex justify-center items-start pt-4 pb-4">
                <div className="w-full max-w-5xl">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
                        {/* Título e tabs */}
                        <div className="px-6 pt-6 pb-3">
                            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                                Solicitações de Alteração
                            </h1>
                            <div className="flex space-x-3 mb-3">
                                <button className="px-4 py-1 bg-white text-gray-800 border-b-4 border-yellow-400 font-semibold rounded-t text-base">
                                    Pendentes
                                </button>
                                <button className="px-4 py-1 bg-gray-100 text-gray-600 rounded-t text-base">
                                    Histórico
                                </button>
                            </div>
                        </div>
                        {/* Conteúdo */}
                        <div className="px-4 pb-3">
							<h2 className="text-sm font-bold text-gray-800 mb-1 mt-1">
								Solicitações Pendentes
							</h2>
							<p className="text-xs text-gray-500 mb-2">
								Solicitações de cancelamento ou reagendamento que aguardam resposta.
							</p>
							{paginatedRequests.map((req) => (
								<div
									key={req.id}
									className="bg-white border border-gray-200 rounded-lg mb-2 p-2 pt-1 pb-1 shadow-none"
								>
									<div className="flex flex-col md:flex-row md:justify-between md:items-center mb-1 gap-1">
										<div>
											<h3 className="font-semibold text-gray-900 text-xs">
												{req.disciplina}
											</h3>
											<div className="flex items-center text-[11px] text-gray-700 mt-0.5">
												<User className="w-3 h-3 mr-1" />
												{req.professor}
											</div>
										</div>
										<div className="flex space-x-1 mt-1 md:mt-0">
											<Tag color="bg-yellow-100 text-yellow-800">
												{req.status}
											</Tag>
											<Tag color="bg-gray-200 text-gray-800">
												{req.tipo}
											</Tag>
										</div>
									</div>
									<div className="flex flex-col md:flex-row md:gap-4">
										<div className="flex-1">
											<div className="flex items-center text-[11px] text-gray-700 mb-0.5">
												<Calendar className="w-3 h-3 mr-1" />
												{req.dataOriginal}
											</div>
											<div className="flex items-center text-[11px] text-gray-700 mb-1">
												<Clock className="w-3 h-3 mr-1" />
												{req.horaOriginal}
											</div>
											<div className="mb-1">
												<span className="block text-[11px] text-gray-700 font-medium">
													Motivo:
												</span>
												<span className="text-[11px] text-gray-700">
													{req.motivo}
												</span>
											</div>
										</div>
										{req.tipo === 'Reagendamento' && (
											<div className="flex-1 mt-1 md:mt-0">
												<span className="block text-[11px] text-gray-700 font-medium mb-0.5">
													Nova data/horário:
												</span>
												<div className="flex items-center text-[11px] text-gray-700 mb-0.5">
													<Calendar className="w-3 h-3 mr-1" />
													{req.novaData}
												</div>
												<div className="flex items-center text-[11px] text-gray-700">
													<Clock className="w-3 h-3 mr-1" />
													{req.novaHora}
												</div>
											</div>
										)}
									</div>
									<div className="flex flex-col md:flex-row md:justify-between md:items-center mt-1">
										<p className="text-[10px] text-gray-400">
											Solicitada em {req.dataSolicitacao}
										</p>
										<div className="flex justify-end mt-1 md:mt-0">
											<button className="text-[11px] text-gray-700 border border-gray-300 rounded px-2 py-0.5 hover:bg-gray-100 transition">
												Detalhes
											</button>
										</div>
									</div>
								</div>
							))}
							{/* Paginação */}
							<div className="flex justify-end items-center gap-1 mt-3 pb-1 bg-white">
								<button
									className="px-2 py-0.5 rounded border text-xs disabled:opacity-50"
									onClick={() => setCurrentPage(1)}
									disabled={currentPage === 1}
								>
									«
								</button>
								<button
									className="px-2 py-0.5 rounded border text-xs disabled:opacity-50"
									onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
									disabled={currentPage === 1}
								>
									‹
								</button>
								<span className="px-1 text-xs text-gray-700">
									Página {currentPage} de {totalPages}
								</span>
								<button
									className="px-2 py-0.5 rounded border text-xs disabled:opacity-50"
									onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
									disabled={currentPage === totalPages}
								>
									›
								</button>
								<button
									className="px-2 py-0.5 rounded border text-xs disabled:opacity-50"
									onClick={() => setCurrentPage(totalPages)}
									disabled={currentPage === totalPages}
								>
									»
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TeacherRequests;
