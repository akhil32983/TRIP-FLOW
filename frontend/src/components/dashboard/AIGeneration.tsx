import styles from "@styles/components/dashboard/AIGenerationSection.module.css";
import FormGroup from "../form/FormGroup";
import Button from "../shared/Button";
import TagsSection from "./TagsSection";
import { Sparkles, Send, Package, PackageOpen } from "lucide-react";
import { useAIGenerationForm } from "@/hooks/useAIGenerationForm";
import { useState } from "react";
import { generateItinerary } from "@/services/aiService";

export default function AIGeneration() {
    const [showAdvanced, setShowAdvanced] = useState(false);
    const { form, handleChange, handleInterestsChange, advancedFields } = useAIGenerationForm();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await generateItinerary(form);
    };

    return (
        <section className={styles.aiGenerationSection}>
            <div className={styles.gptHeader}>
                <Sparkles size={24} className={styles.gptIcon} />
                <h2 className={styles.gptTitle}>Generador de Itinerarios con IA</h2>
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
                            name: "aiPrompt",
                            label: "Describe tu viaje ideal",
                            value: form.aiPrompt,
                            placeholder: "Por ejemplo: Quiero un viaje romántico de 3 días a París con visitas a la Torre Eiffel y el Louvre..."
                        }}
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
                    <Button
                        label="Generar"
                        style={["primary"]}
                        type="submit"
                    >
                        <Send size={18} />
                    </Button>
                </div>
            </form>
        </section>
    );
}