import React from "react";
import { Select, CheckIcon } from "native-base";
import { useProvider } from "../../context";
import { Languages, stringToLanguague } from "../../languagues";
import { ILanguageJSON } from "../../languagues/interface";

export const SelectLanguages = () => {
    const { language, setLanguage, setJsonLanguague } = useProvider();

    const getLanguagueJson = (symbol: string): ILanguageJSON | null => {
        for (const lang of Languages) {
            if (lang.symbol === symbol) {
                return lang.json;
            }
        }
        return null;
    }

    const handleSelectLanguage = (itemValue: string) => {
        const lang = stringToLanguague(itemValue);
        if (lang == null) return;
        const json = getLanguagueJson(lang);
        if (json == null) return;
        setLanguage(lang);
        setJsonLanguague(json);
    };

    // Component
    return (
        <>
            <Select
                selectedValue={language}
                minWidth='60%'
                minHeight='40px'
                accessibilityLabel="Choose Language"
                placeholder="Languague"
                _selectedItem={{
                    bg: 'blue.300',
                    endIcon: <CheckIcon size='4' />
                }}
                mt={1}
                onValueChange={itemValue => handleSelectLanguage(itemValue)}
            >
                {
                    Languages.map(
                        (lang, idx) => (
                            <Select.Item
                                key={idx}
                                label={lang.symbol + lang.flag}
                                value={lang.symbol}
                            />)
                    )
                }
            </Select>
        </>
    )
};