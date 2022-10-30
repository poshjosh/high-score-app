// Note: No actual translation here. However, we prepare our app for future i18n
export const useTranslation = () => {
    const t = (text: string, token: any = ""): string => {
        return text.replace("%s", "" + token)
    }
    return { t }
}