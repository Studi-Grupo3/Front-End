import { AppointmentCard } from "../components/appointment-manager/AppointmentCard"

export function AppointmentManager() {
    return (
        <>
        <AppointmentCard
            status="pending"
            subject="Matemática"
            topic="Funções Trigonométricas"
            professorName="Prof. Carlos Eduardo"
            professorTitle="Professor de Matemática"
            date="domingo, 9 de julho"
            time="14:00"
            duration="1h30min"
            location="Domicílio"
            confirmed={true}
        />
        </>
    )
}