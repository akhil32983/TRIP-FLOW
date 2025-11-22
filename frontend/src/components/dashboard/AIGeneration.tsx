import styles from "@styles/components/dashboard/AIGenerationSection.module.css";

import { useState } from "react";

import { generateItinerary } from "@/services/aiService";
import { useAIGenerationForm } from "@/hooks/useAIGenerationForm";

import { Sparkles, Send, Package, PackageOpen, Loader, AlertCircleIcon } from "lucide-react";
import FormGroup from "@components/form/FormGroup";
import Button from "@components/shared/Button";
import TagsSection from "@components/dashboard/TagsSection";

export default function AIGeneration() {
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [rateLimit, setRateLimit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { form, handleChange, handleInterestsChange, advancedFields } = useAIGenerationForm();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await generateItinerary(form);
        console.log(response);

        // Handle rate limit
        if (!response.aiUsage) {
            setRateLimit(true);
            setIsLoading(false);
            return;
        }

        setRateLimit(false);
        setIsLoading(false);
    };

    return (
        <section className={styles.aiGenerationSection}>
            <div className={styles.gptHeader}>
                <Sparkles size={24} className={styles.gptIcon} />
                <h2 className={styles.gptTitle}>Genera tu itinerario con IA</h2>
                <Button
                    style={["tool_bordered"]}
                    type="button"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    ariaLabel="Opciones avanzadas"
                >
                    {showAdvanced ? <PackageOpen size={20} /> : <Package size={20} />}
                </Button>
            </div>

            <form className={styles.gptForm} onSubmit={handleSubmit}>
                <div className={styles.promptSection}>
                    <FormGroup
                        field={{
                            type: "textarea",
                            disabled: isLoading || rateLimit,
                            name: "aiPrompt",
                            label: "Describe tu viaje ideal",
                            value: form.aiPrompt,
                            placeholder: "Por ejemplo: Quiero un viaje romántico de 3 días a París con visitas a la Torre Eiffel y el Louvre..."
                        }}
                        index={-1}
                        handleChange={handleChange}
                        fullWidth
                    />
                </div>

                {showAdvanced && (
                    <div className={styles.advancedOptions}>
                        <div className={styles.formGrid}>
                            {advancedFields.map((field) => (
                                <FormGroup
                                    key={field.name}
                                    field={field}
                                    handleChange={handleChange}
                                    fullWidth
                                />
                            ))}
                        </div>

                        <div className={styles.tagsContainer}>
                            <TagsSection
                                tags={form.interests}
                                onTagsChange={handleInterestsChange}
                                label="Intereses"
                                placeholder="Ej: Torre Eiffel, Louvre, Montmartre..."
                            />
                        </div>
                    </div>
                )}

                <div className={styles.gptFooter}>
                    {rateLimit
                        ? (
                            <span className={styles.rateLimitMessage}>
                                <AlertCircleIcon size={18} className={styles.rateLimitIcon} />
                                Has alcanzado el límite diario de generaciones.
                            </span>
                        )
                        : <span></span>
                    }
                    <Button
                        label={isLoading ? "Generando..." : "Generar"}
                        disabled={isLoading || rateLimit}
                        style={["primary"]}
                        type="submit"
                    >
                        {isLoading ? <Loader size={18} /> : <Send size={18} />}
                    </Button>
                </div>
            </form>
        </section>
    );
}