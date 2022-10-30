import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./app-routes"
import PageHeader from "../components/page-header/page-header";

const App = () => {
    return (
        <BrowserRouter>
            <PageHeader title={"High Score App"} />
            <AppRoutes />
        </BrowserRouter>
    )
}

export default App