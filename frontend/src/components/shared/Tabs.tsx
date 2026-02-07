import styles from "@styles/components/shared/Tabs.module.css";

export interface TabItem<T extends string = string> {
    id: T;
    label: string;
}

interface TabsProps<T extends string> {
    tabs: TabItem<T>[];
    activeTab: T;
    onChange: (id: T) => void;
    className?: string;
}

export default function Tabs<T extends string>({ 
    tabs, 
    activeTab, 
    onChange, 
    className = "" 
}: TabsProps<T>) {
    return (
        <div className={`${styles.tabsWrapper} ${className}`}>
            <div className={styles.tabs} role="tablist">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        role="tab"
                        aria-selected={activeTab === tab.id}
                        aria-controls={`panel-${tab.id}`}
                        className={activeTab === tab.id ? styles.activeTab : styles.tab}
                        onClick={() => onChange(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
