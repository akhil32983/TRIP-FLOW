import styles from "@/styles/components/dashboard/TagsSection.module.css";

import { useTagsManager } from "@/hooks/useTagsManager";

import { Plus, Tag, X } from "lucide-react";

import Badge from "@/components/shared/Badge";
import Button from "@components/shared/Button";

interface TagsSectionProps {
    tags: string[];
    onTagsChange: (newTags: string[]) => void;
    label?: string;
    placeholder?: string;
}

export default function TagsSection({ tags, onTagsChange, label, placeholder }: TagsSectionProps) {
    const {
        newTag,
        setNewTag,
        handleAddTag,
        handleRemoveTag,
        handleTagKeyPress
    } = useTagsManager(tags, onTagsChange);

    return (
        <div className={styles.tagsSection}>
            <label className={styles.tagsLabel} htmlFor="newTagInput">
                {label || "Tags"}
            </label>

            <div className={styles.content}>
                <div className={styles.addTagContainer}>
                    <div className={styles.inputWrapper}>
                        <input
                            id="newTagInput"
                            name="newTagInput"
                            type="text"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            placeholder={placeholder || "romantic, adventure, food..."}
                            onKeyDown={handleTagKeyPress}
                        />
                        <div className={styles.inputIcon}>
                            <Tag size={18} />
                        </div>
                    </div>
                    <Button
                        onClick={handleAddTag}
                        style={["tool_bordered"]}
                        type="button"
                    ><Plus size={16} /></Button>
                </div>

                <div className={styles.tagsContainer}>
                    {tags.map((tag) => (
                        <Badge style="semi_thin" title={tag} key={tag} action={
                            <Button
                                style={["tool", "danger", "wrap"]}
                                onClick={() => handleRemoveTag(tag)}
                                type="button"
                            >
                                <X size={16} color="#FFFFFF"/>
                            </Button>
                        } />
                    ))}
                </div>
            </div>
        </div>
    );
}
