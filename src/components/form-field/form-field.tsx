import React, { FC, PropsWithChildren } from "react"

import { ErrorMessage } from "../error-message/error-message"
import { Label } from "../label/label"

export type FormFieldProps = {
    name?: string,
    label: string,
    error?: string,
}

export const FormField: FC<PropsWithChildren<FormFieldProps>> = (
    { children, name, label, error }
) => {
    return (
        <>
            <Label name={name} label={label}>{children}</Label>
            {error && <ErrorMessage message={error} />}
        </>
    )
}
