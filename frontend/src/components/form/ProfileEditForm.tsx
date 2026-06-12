import styles from "@styles/components/form/ProfileEditForm.module.css";

import { useState } from "react";
import { useNavigate } from "react-router";

import type { UpdateProfileRequest } from "@/types/user";
import type { Field } from "@/types/form";

import { useAuth } from "@/providers/authProvider";
import { useNotification } from "@/providers/notificationProvider";

import { uploadAvatar } from "@/services/userService";

import { MapPinIcon, UserIcon } from "lucide-react";

import Button from "@components/shared/Button";
import FormGroup from "@components/form/FormGroup";
import AvatarUploader from "@components/form/AvatarUploader";
import DeleteAccountButton from "@components/buttons/DeleteAccountButton";

const ICON_SIZE = 20;

export default function ProfileEditForm() {
    const { user, updateProfile } = useAuth();
    const { notify } = useNotification();
    const navigate = useNavigate();

    const [values, setValues] = useState<UpdateProfileRequest>({
        name: user?.name,
        description: user?.description,
        location: user?.location
    });

    const fields: Field[] = [
        {
            name: "name", label: "Name",
            type: "text", value: values.name,
            icon: <UserIcon size={ICON_SIZE} />
        },
        {
            name: "location", label: "Location",
            type: "text", value: values.location,
            icon: <MapPinIcon size={ICON_SIZE} />
        },
        {
            name: "description", label: "About Me",
            type: "textarea", value: values.description,
        }
    ];

    const [preview, setPreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    if (!user) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await updateProfile(values);
            notify("Profile updated successfully", "success", {
                title: "Success",
                duration: 3000
            });
            navigate("/profile");
        } catch (error) {
            notify("Error updating profile", "error", {
                title: "Error",
                duration: 4000
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileSelect = (file: File) => {
        uploadAvatar(user.username, file);
        setPreview(URL.createObjectURL(file));
    };

    const handleChange = (e: React.ChangeEvent<any>) => {
        setValues(p => ({ ...p, [e.target.name]: e.target.value }));
    };

    return (
        <div className={styles.container}>
            <AvatarUploader
                username={user.username}
                preview={preview}
                onFileSelect={handleFileSelect}
            />


            <form className={styles.form} onSubmit={handleSubmit}>
            <h3>Personal Information</h3>
                <div className={styles.group}>
                    {fields.map((field) => (
                        <FormGroup
                            key={field.name}
                            field={field}
                            handleChange={handleChange}
                            fullWidth
                        />
                    ))}
                </div>

                <div className={styles.actions}>
                    <DeleteAccountButton />
                    <Button
                        style={["primary"]}
                        label={isLoading ? "Saving..." : "Save"}
                        type="submit"
                        disabled={isLoading}
                    />
                </div>
            </form>
        </div>
    );
}
