import React, { FC, PropsWithChildren } from "react"

import { Alert } from "../alert/alert"
import { Label } from "../label/label"

export type FormFieldProps = {
    name?: string
    label: string
    error?: string
    errorStyleClassNames?: string
}

export const FormField: FC<PropsWithChildren<FormFieldProps>> = (
    { children, name, label, error, errorStyleClassNames }
) => {
    return (
        <>
            <Label name={name} label={label}>{children}</Label>
            {error && <Alert styleClassNames={errorStyleClassNames} message={error} isError={true} />}
        </>
    )
}
