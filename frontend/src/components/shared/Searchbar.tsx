import styles from "@styles/components/shared/Searchbar.module.css";

import { SearchIcon } from "lucide-react";

interface SearchbarProps {
    placeHolder: string;
    onInputChange: (value: string) => void;
    onSearch: () => void;
}

export default function Searchbar({
    placeHolder, onInputChange, onSearch
}: SearchbarProps) {
    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch();
    };

    return (
        <form className={styles.searchbar} onSubmit={handleSearch}>
            <button type="submit" className={styles.button}>
                <SearchIcon size={20} />
            </button>
            <input
                id="search-input"
                type="text"
                placeholder={placeHolder}
                className={styles.input}
                onChange={(e) => onInputChange(e.target.value)}
            />
        </form>
    );
}
