import React, { ErrorInfo, PropsWithChildren} from "react"
import { ErrorMessage } from "../error-message/error-message"

export type ErrorBoundaryProps = {
    errorMessage?: string
}

class ErrorBoundary extends React.Component<PropsWithChildren<ErrorBoundaryProps>, any> {

    constructor(props: PropsWithChildren<ErrorBoundaryProps>) {
        super(props);
        this.state = { hasError: false }
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.log("ErrorBoundary#componentDidCatch error: %s, error info: %s", error, errorInfo);
        if(errorInfo.componentStack) {
            console.log("ErrorBoundary#componentDidCatch error component stack: %s", errorInfo.componentStack);
        }
    }

    getErrorMessage() {
        return this.props.errorMessage
    }

    render() {
        if (this.state.hasError) {
            return <ErrorMessage message={this.getErrorMessage()} />
        }

        return this.props.children
    }
}

export default ErrorBoundary