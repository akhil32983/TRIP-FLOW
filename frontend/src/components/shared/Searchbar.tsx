import styles from "@styles/components/shared/Searchbar.module.css";

import { SearchIcon } from "lucide-react";

interface SearchbarProps {
    placeHolder: string;
    onSearch: (query: string) => void;
}

export default function Searchbar({ placeHolder, onSearch }: SearchbarProps) {
    // Handle form submission
    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const input = event.currentTarget.querySelector("input");

        if (input) onSearch(input.value);
    };

    return (
        <form className={styles.searchbar} onSubmit={handleSearch}>
            <input
                id="search-input"
                type="text"
                placeholder={placeHolder}
                className={styles.input}
            />
            <button type="submit" className={styles.button}>
                <SearchIcon size={20} />
            </button>
        </form>
    );
}
