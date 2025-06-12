import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import NavbarPanel from "../components/NavbarPanel";
import { api } from "../services/provider/api"; // Ajuste o caminho se necessário

const Scheduling = () => {
  const nav = useNavigate();

  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 2, 1));
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedProfessorId, setSelectedProfessorId] = useState(null);
  const [selectedClassModel, setSelectedClassModel] = useState(null);

  useEffect(() => {
    const professorId = localStorage.getItem("selectedProfessorId");
    setSelectedProfessorId(professorId);

    const classModel = localStorage.getItem("classModel");
    setSelectedClassModel(classModel);

    console.log("Professor selecionado:", professorId);
    console.log("Modelo de aula selecionado:", classModel);
  }, []);

  const handlePreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const days = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const startDay = monthStart.getDay();
  const endDay = 6 - monthEnd.getDay();

  const prevMonthDays =
    startDay > 0
      ? eachDayOfInterval({
          start: new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, monthStart.getDay() || 7),
          end: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0),
        }).slice(-startDay)
      : [];

  const nextMonthDays =
    endDay > 0
      ? eachDayOfInterval({
          start: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
          end: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, endDay),
        })
      : [];

  const allDays = [...prevMonthDays, ...calendarDays, ...nextMonthDays];

  const timeSlots = [
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time) => setSelectedTime(time);

  const handleSchedule = async () => {
    if (selectedDate && selectedTime && selectedProfessorId && selectedClassModel) {
      setLoading(true);
      try {
        const formattedDate = selectedDate.toISOString().split("T")[0];

        const appointmentDTO = {
          date: formattedDate,
          time: selectedTime,
          professorId: Number(selectedProfessorId),
          classModel: selectedClassModel,
        };

        const response = await api.post("/appointments", appointmentDTO);
        console.log("Agendamento realizado:", response.data);

        // Limpa os itens do localStorage após agendar
        localStorage.removeItem("selectedProfessorId");
        localStorage.removeItem("classModel");

        nav("/aluno/pagamento");
      } catch (error) {
        console.error("Erro ao agendar:", error);
        alert("Erro ao agendar aula. Tente novamente.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Por favor, selecione uma data, horário, professor e modelo de aula.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavbarPanel />

      <main className="flex-1 px-4 py-6 max-w-screen-xl mx-auto w-full">
        <div className="bg-white border border-gray-200 rounded-lg p-10 shadow-sm">
          <nav className="text-xs sm:text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
              <li>
                <button onClick={() => nav("/aluno/formulario")} className="hover:underline">
                  Detalhes
                </button>
              </li>
              <li>›</li>
              <li>
                <button onClick={() => nav("/aluno/modelo-aula")} className="hover:underline">
                  Modelo de Aula
                </button>
              </li>
              <li>›</li>
              <li>
                <button onClick={() => nav("/aluno/escolher-professor")} className="hover:underline">
                  Professor
                </button>
              </li>
              <li>›</li>
              <li className="text-blue-600 font-medium">Agendamento</li>
            </ol>
          </nav>

          <h1 className="text-2xl sm:text-3xl font-medium text-blue-600 text-center mb-8">
            Escolha uma data e horário
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <div>
              <h2 className="text-base text-gray-700 font-medium mb-4">Selecione uma data:</h2>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <button onClick={handlePreviousMonth} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                    <ChevronLeft className="h-4 w-4 text-gray-600" />
                  </button>

                  <h3 className="text-center font-medium text-gray-800 capitalize">
                    {format(currentMonth, "MMMM yyyy", { locale: ptBR })}
                  </h3>

                  <button onClick={handleNextMonth} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                    <ChevronRight className="h-4 w-4 text-gray-600" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center">
                  {days.map((day) => (
                    <div key={day} className="text-xs text-gray-500 uppercase pb-2">
                      {day}
                    </div>
                  ))}

                  {allDays.map((day, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleDateSelect(day)}
                      className={`h-8 w-8 flex items-center justify-center text-sm mx-auto rounded-full transition-colors
                        ${!isSameMonth(day, currentMonth) ? "text-gray-400" : "text-gray-800"}
                        ${
                          selectedDate && isSameDay(day, selectedDate)
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-100"
                        }
                      `}
                    >
                      {day.getDate()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <h2 className="text-base text-gray-700 font-medium mb-4">Selecione um horário:</h2>

              {!selectedDate ? (
                <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center h-64">
                  <p className="text-gray-500 text-center">Selecione uma data para ver os horários disponíveis</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className={`py-3 px-4 rounded-lg text-base font-medium text-center transition-colors
                        ${
                          selectedTime === time
                            ? "bg-blue-600 text-white"
                            : "bg-gray-50 text-gray-800 hover:bg-gray-100"
                        }
                      `}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              )}

              <button
                onClick={handleSchedule}
                disabled={!(selectedDate && selectedTime && selectedProfessorId && selectedClassModel) || loading}
                className={`mt-6 w-full py-4 text-lg font-medium rounded-lg transition-colors ${
                  selectedDate && selectedTime && !loading
                    ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {loading
                  ? "Agendando..."
                  : selectedDate && selectedTime
                  ? `Agendar aula para ${format(selectedDate, "dd/MM/yyyy")} às ${selectedTime}`
                  : "Selecione uma data e horário"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Scheduling;
