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
import ReviewDetailPage from "./pages/ReviewDetailPage";
import { AuthRoutes } from "./components/routing/AuthRoute";
import EditReviewPage from "./pages/EditReviewPage";
import { Helmet, HelmetProvider } from "react-helmet-async";

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <Provider store={store}>
          <AuthProvider>
            <Helmet>
              <title>Book Review</title>
            </Helmet>

            <Header />
            <Routes>
              <Route path="/" element={<BookReviewListPage />} />

              <Route element={<AuthRoutes />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
              </Route>

              <Route element={<ProtectedRoute redirectHome />}>
                <Route path="/register-icon" element={<RegisterIconPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>

              <Route element={<ProtectedRoute />}>
                <Route path="/new" element={<NewReviewPage />} />
                <Route path="/detail/:id" element={<ReviewDetailPage />} />
                <Route path="/edit/:id" element={<EditReviewPage />} />
              </Route>
            </Routes>
          </AuthProvider>
        </Provider>
      </Router>
    </HelmetProvider>
  );
};

export default App;
