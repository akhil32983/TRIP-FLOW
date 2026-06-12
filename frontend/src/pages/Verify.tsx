import styles from "@styles/components/form/Form.module.css";
import verifyStyles from "@styles/pages/Verify.module.css";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";

import { retrieveFromLocalStorage, removeFromLocalStorage } from "@/utils/localStorageUtils";
import { STORAGE_KEYS } from "@/constants/storageKeys";

import { useNotification } from "@/providers/notificationProvider";
import { useAuth } from "@/providers/authProvider";
import { resendCode } from "@/services/authService";

import Button from "@components/shared/Button";
import Logo from "@components/shared/Logo";
import Layout from "@/layouts/Layout";

export default function VerifyPage() {
    const { verify } = useAuth();
    const { notify } = useNotification();
    const navigate = useNavigate();
    const [code, setCode] = useState<string[]>(Array(6).fill(""));
    const [error, setError] = useState<string | null>(null);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const username = retrieveFromLocalStorage<string>(STORAGE_KEYS.VERIFICATION_USERNAME);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        if (value.length > 1) {
            value = value.slice(-1);
        }

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        setError(null);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").replace(/\D/g, '').slice(0, 6).split("");
        const newCode = [...code];
        pastedData.forEach((char, index) => {
            if (index < 6) newCode[index] = char;
        });
        setCode(newCode);
        if (pastedData.length < 6) {
            inputRefs.current[pastedData.length]?.focus();
        } else {
            inputRefs.current[5]?.focus();
        }
    };

    const handleResendCode = async () => {
        if (!username) return;
        const res = await resendCode(username);
        if (res.status === "SUCCESS") {
            notify("Code resent successfully", "success");
        } else {
            notify("Error resending code", "error");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const fullCode = code.join("");
        if (fullCode.length !== 6) {
            setError("The code must be 6 digits.");
            return;
        }
        if (!username) return;

        const res = await verify({ username, code: fullCode });
        if (res.success) {
            removeFromLocalStorage(STORAGE_KEYS.VERIFICATION_USERNAME);
            notify("Account verified successfully", "success");
            navigate("/dashboard");
        } else {
            if (res.errors?.error === "User is already verified") {
                navigate("/login");
            } else {
                setError("Invalid code.");
            }
        }
    };

    if (!username) {
        return (
            <Layout single>
                <div className={`${styles.container} ${styles.center}`}>
                    <Button style={["logo"]} to="/">
                        <Logo size="medium" />
                    </Button>
                    <div className={verifyStyles.verificationContainer}>
                        <h1 className={verifyStyles.title}>Verification Required</h1>
                        <p className={verifyStyles.description}>
                            User information to verify was not found.
                            Please register an account first.
                        </p>
                        <Button style={["primary"]} to="/signup" label="Sign up" />
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout single>
            <div className={`${styles.container} ${styles.center}`}>
                <Button style={["logo"]} to="/">
                    <Logo size="medium" />
                </Button>

                <div className={verifyStyles.verificationContainer}>
                    <div className={verifyStyles.header}>
                        <h1 className={verifyStyles.title}>Secure Verification</h1>
                        <p className={verifyStyles.description}>
                            We have sent a 6-digit code to your email. Enter the code to verify your account for <strong>{username}</strong>.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className={verifyStyles.form}>
                        <div className={verifyStyles.codeContainer} onPaste={handlePaste}>
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => { inputRefs.current[index] = el; }}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    className={verifyStyles.codeInput}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                />
                            ))}
                        </div>

                        {error && <div className={verifyStyles.error}>{error}</div>}

                        <Button
                            style={["primary", "big"]}
                            label="Verify Account"
                            type="submit"
                        />
                    </form>

                    <div className={styles.alternative}>
                        <div className={styles.alternativeText}>
                            Didn't receive the code?
                            <button className={verifyStyles.resendLink} type="button" onClick={handleResendCode}>
                                Resend code
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
