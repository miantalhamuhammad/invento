import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { PATHS } from "./path";
import { Product } from "../pages/products/product";
import { Catagory } from "../pages/catagory/catagory";
import NotFound from "../pages/NotFoundPage";
import { UnderDevelopmentPage } from "../pages/under-development";
import { useSelector } from "react-redux";
import LoginPage from "../pages/auth/login";
import RegisterPage from "../pages/auth/register";

const AppRoutes = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);

    return (
        <BrowserRouter>
            <Routes>
                {/*<Route*/}
                {/*    path={PATHS.dashboard}*/}
                {/*    element={isAuthenticated ? <Product /> : <Navigate to={PATHS.login} />}*/}
                {/*/>*/}
                <Route
                    path={PATHS.dashboard}
                    element={<Product />}
                />
                {/*<Route*/}
                {/*    path="/under-development"*/}
                {/*    element={isAuthenticated ? <UnderDevelopmentPage /> : <Navigate to={PATHS.login} />}*/}
                {/*/>*/}
                <Route
                    path="/under-development"
                    element={<UnderDevelopmentPage />}
                />

                {/* Catch-all Route */}
                <Route path={PATHS.no_page} element={<NotFound />} />
                <Route path={PATHS.catagory} element={<Catagory/>} />
                <Route path={PATHS.login} element={<LoginPage/>} />
                <Route path={PATHS.register} element={<RegisterPage/>} />
                <Route path={PATHS.home} element={isAuthenticated ? <Product /> : <Navigate to={PATHS.login} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;