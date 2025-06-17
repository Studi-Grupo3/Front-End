import { api } from "./provider/api";

const handleSchedule = async ({ selectedDate, selectedTime, nav }) => {
    if (selectedDate && selectedTime) {
        try {
            const formattedDate = selectedDate.toISOString().split("T")[0];

            const professorId = localStorage.getItem("selectedProfessorId");
            const classModel = localStorage.getItem("classModel");

            if (!professorId || !classModel) {
                alert("Professor ou modelo de aula não selecionados.");
                return;
            }

            const appointmentDTO = {
                idStudent:      ,
                idTeacher: Number(professorId),
                dateTime: dateTime.toISOString(),
                lessonDuration: lessonDuration,
                location: location,
                totalValue: totalValue,
                status: "scheduled",
            };

            const response = await api.post("/appointments", appointmentDTO);
            console.log("Agendamento realizado:", response.data);

            // Limpa os dados do localStorage após agendar
            localStorage.removeItem("selectedProfessorId");
            localStorage.removeItem("classModel");

            nav("/aluno/pagamento");
        } catch (error) {
            console.error("Erro ao agendar:", error);
            alert("Erro ao agendar aula. Tente novamente.");
        }
    } else {
        alert("Selecione data e horário antes de agendar.");
    }
};

export default handleSchedule;
