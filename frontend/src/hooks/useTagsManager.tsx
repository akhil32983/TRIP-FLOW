import { useState, useCallback } from "react";

/**
 * Custom hook for managing tags functionality
 * Handles adding, removing, and keyboard interactions for tags
 */
export function useTagsManager(
    tags: string[], 
    onTagsChange: (newTags: string[]) => void
) {
    const [newTag, setNewTag] = useState("");

    const handleAddTag = useCallback(() => {
        const trimmedTag = newTag.trim();
        if (trimmedTag && !tags.includes(trimmedTag)) {
            onTagsChange([...tags, trimmedTag]);
            setNewTag("");
        }
    }, [newTag, tags, onTagsChange]);

    const handleRemoveTag = useCallback((tagToRemove: string) => {
        onTagsChange(tags.filter(tag => tag !== tagToRemove));
    }, [tags, onTagsChange]);

    const handleTagKeyPress = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag();
        }
    }, [handleAddTag]);

    return {
        newTag,
        setNewTag,
        handleAddTag,
        handleRemoveTag,
        handleTagKeyPress
    };
}
