import styles from "./page-header.module.scss"

export type PageHeaderProps = {
    title: string
}

export const PageHeader = ({ title }: PageHeaderProps) => {
    return <header className={styles.pageHeader}>{title}</header>
}

export default PageHeader
