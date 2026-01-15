import styles from "@styles/pages/Help.module.css";

import { useState } from "react";

import { FAQ_CATEGORIES } from "@/constants/faqs";

import Layout from "@/layouts/Layout";
import AccordionItem from "@/components/shared/Accordion";

export default function HelpPage() {
    const [openId, setOpenId] = useState<string | null>(null);

    const toggleAccordion = (categoryId: number, itemId: number) => {
        const id = `${categoryId}-${itemId}`;
        setOpenId(openId === id ? null : id);
    };

    return (
        <Layout>
            <div className={styles.container}>
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Preguntas Frecuentes</h2>
                    <div className={styles.faqWrapper}>
                        {FAQ_CATEGORIES.map((category, catIndex) => (
                            <div key={catIndex} className={styles.categorySection}>
                                <h3 className={styles.categoryTitle}>{category.title}</h3>
                                <div className={styles.categoryItems}>
                                    {category.items.map((faq, itemIndex) => (
                                        <AccordionItem
                                            key={itemIndex}
                                            title={faq.question}
                                            isOpen={openId === `${catIndex}-${itemIndex}`}
                                            onToggle={() => toggleAccordion(catIndex, itemIndex)}
                                        >
                                            <p>{faq.answer}</p>
                                        </AccordionItem>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </Layout>
    );
}
