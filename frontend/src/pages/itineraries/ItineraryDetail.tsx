
import type { ExtendedItinerary as Itinerary } from "@/types/itinerary";

import AppLayout from "@/layouts/AppLayout";
import InnerTabHeader from "@components/dashboard/InnerTabHeader";
import ExtendedItinerary from "@components/dashboard/ExtendedItinerary";

export const FAKE_ITINERARY: Itinerary = {
    id: 1,
    icon: "🗼",
    title: "París: Ciudad de la Luz y el Amor",
    place: "París, Francia",
    people: 2,
    budget: 1450,
    date: "2025-08-15",
    status: "ACTIVE",
    countDays: 4,
    tags: ["romance", "arte", "gastronomía", "arquitectura", "moda"],
    days: [
        {
            day: 1,
            activities: [
                {
                    activity: "Visita a la Torre Eiffel",
                    details: "Ascenso a la Torre Eiffel, el símbolo más famoso de París. Incluye acceso al segundo piso y la cima.",
                    location: {
                        name: "Torre Eiffel",
                        address: "Champ de Mars, 5 Avenue Anatole France, 75007 París, Francia",
                        latitude: 48.8584,
                        longitude: 2.2945
                    },
                    time: "09:00",
                    duration: "2.5 horas"
                },
                {
                    activity: "Almuerzo en Café de Flore",
                    details: "Icónico café parisino frecuentado por escritores y artistas. Especialidad: croque-monsieur y café au lait.",
                    location: {
                        name: "Café de Flore",
                        address: "172 Boulevard Saint-Germain, 75006 París, Francia",
                        latitude: 48.8542,
                        longitude: 2.3320
                    },
                    time: "12:30",
                    duration: "1.5 horas"
                },
                {
                    activity: "Paseo por el Barrio Latino",
                    details: "Exploración del histórico Barrio Latino con sus calles empedradas y ambiente bohemio.",
                    location: {
                        name: "Barrio Latino",
                        address: "Quartier Latin, 75005 París, Francia",
                        latitude: 48.8499,
                        longitude: 2.3457
                    },
                    time: "15:00",
                    duration: "2 horas"
                }
            ]
        },
        {
            day: 2,
            activities: [
                {
                    activity: "Visita al Museo del Louvre",
                    details: "Tour por el museo más famoso del mundo. Incluye la Mona Lisa, Venus de Milo y arte egipcio.",
                    location: {
                        name: "Museo del Louvre",
                        address: "Rue de Rivoli, 75001 París, Francia",
                        latitude: 48.8606,
                        longitude: 2.3376
                    },
                    time: "08:00",
                    duration: "4 horas"
                },
                {
                    activity: "Almuerzo en Le Procope",
                    details: "El café más antiguo de París, frecuentado por Voltaire y Napoleón. Cocina francesa tradicional.",
                    location: {
                        name: "Le Procope",
                        address: "13 Rue de l'Ancienne Comédie, 75006 París, Francia",
                        latitude: 48.8532,
                        longitude: 2.3380
                    },
                    time: "13:00",
                    duration: "1 hora"
                },
                {
                    activity: "Paseo por los Campos Elíseos",
                    details: "La avenida más famosa de París, desde el Arco del Triunfo hasta la Plaza de la Concordia.",
                    location: {
                        name: "Campos Elíseos",
                        address: "Avenue des Champs-Élysées, 75008 París, Francia",
                        latitude: 48.8698,
                        longitude: 2.3078
                    },
                    time: "15:30",
                    duration: "2 horas"
                }
            ]
        },
        {
            day: 3,
            activities: [
                {
                    activity: "Visita a Notre-Dame",
                    details: "Catedral gótica emblemática de París. Subida a las torres para vistas panorámicas de la ciudad.",
                    location: {
                        name: "Catedral de Notre-Dame",
                        address: "6 Parvis Notre-Dame, 75004 París, Francia",
                        latitude: 48.8530,
                        longitude: 2.3499
                    },
                    time: "10:00",
                    duration: "1.5 horas"
                },
                {
                    activity: "Crucero por el Sena",
                    details: "Paseo romántico en barco por el río Sena viendo los monumentos desde el agua.",
                    location: {
                        name: "Puerto del Sena",
                        address: "Port de la Bourdonnais, 75007 París, Francia",
                        latitude: 48.8606,
                        longitude: 2.2978
                    },
                    time: "11:30",
                    duration: "1.5 horas"
                },
                {
                    activity: "Cena en Montmartre",
                    details: "Barrio bohemio con vista a la ciudad. Cena en restaurante típico con música en vivo.",
                    location: {
                        name: "La Consigne",
                        address: "12 Rue Norvins, 75018 París, Francia",
                        latitude: 48.8867,
                        longitude: 2.3407
                    },
                    time: "20:00",
                    duration: "2 horas"
                }
            ]
        },
        {
            day: 4,
            activities: [
                {
                    activity: "Visita al Palacio de Versalles",
                    details: "Excursión al opulento palacio real con sus jardines y la famosa Galería de los Espejos.",
                    location: {
                        name: "Palacio de Versalles",
                        address: "Place d'Armes, 78000 Versalles, Francia",
                        latitude: 48.8049,
                        longitude: 2.1204
                    },
                    time: "09:30",
                    duration: "4 horas"
                },
                {
                    activity: "Compras en Galeries Lafayette",
                    details: "Grandes almacenes parisinos con las mejores marcas de moda y productos gourmet.",
                    location: {
                        name: "Galeries Lafayette",
                        address: "40 Boulevard Haussmann, 75009 París, Francia",
                        latitude: 48.8738,
                        longitude: 2.3320
                    },
                    time: "15:00",
                    duration: "2 horas"
                },
                {
                    activity: "Aperitivo en rooftop",
                    details: "Cocktail de despedida con vista panorámica de París desde una terraza exclusiva.",
                    location: {
                        name: "Terrass'' Hotel",
                        address: "12-14 Rue Joseph de Maistre, 75018 París, Francia",
                        latitude: 48.8855,
                        longitude: 2.3398
                    },
                    time: "18:00",
                    duration: "1.5 horas"
                }
            ]
        }
    ]
};

export default function ItineraryDetailPage() {
    //const { id } = useParams<{ id: string }>();

    // Retrieve the itinerary details using the id by an API call through a service
    const itinerary = FAKE_ITINERARY;

    return (
        <AppLayout>
            <InnerTabHeader title={itinerary.place} backUrl="/itineraries" />
            <ExtendedItinerary itinerary={itinerary} />
        </AppLayout>
    );
}