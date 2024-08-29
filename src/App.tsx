import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/routing/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import RegisterIconPage from "./pages/RegisterIconPage";
import BookReviewListPage from "./pages/Home";
import Header from "./components/Header";
import ProfilePage from "./pages/ProfilePage";
import NewReviewPage from "./pages/NewReviewPage";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<BookReviewListPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/register-icon" element={<RegisterIconPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/new" element={<NewReviewPage />}/>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </Provider>
  );
};

export default App;
