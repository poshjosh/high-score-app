import React, { FC, PropsWithChildren } from "react"

import styles from "./label.module.scss"

export type LabelProps = {
    name?: string,
    label: string,
}

export const Label: FC<PropsWithChildren<LabelProps>> = (
    { children, name, label}
) => {
    return <label className={styles.label} htmlFor={name}><span>{label}</span>{children}</label>
}
