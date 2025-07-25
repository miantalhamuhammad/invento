import { Provider } from "react-redux";
import store from "./redux/store";
import AppRoutes from "./routes/routes";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
