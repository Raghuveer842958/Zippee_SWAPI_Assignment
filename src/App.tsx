// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import { AuthProvider, useAuth } from "./hooks/AuthContext";
// // import { AuthProvider } from "./hooks/AuthContext";
// // import { useAuth } from "./hooks/useAuth";

// function ProtectedRoute({ children }: { children: JSX.Element }) {
//   const { user } = useAuth();
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }
//   return children;
// }

// function AppRoutes() {
//   const { login, logout, user, tokens } = useAuth();

//   return (
//     <>
//       <header className="flex justify-between items-center p-4 bg-gray-200">
//         <span className="font-bold text-xl">Star Wars Character App</span>
//         {user && (
//           <button
//             onClick={logout}
//             className="bg-red-600 text-white px-3 py-1 rounded"
//           >
//             Logout
//           </button>
//         )}
//       </header>

//       <Routes>
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           }
//         />
//         <Route path="/login" element={<Login onLogin={login} />} />
//       </Routes>

//       {user && (
//         <footer className="fixed bottom-2 right-2 bg-black text-white text-xs p-2 rounded">
//           <div>
//             <strong>Access Token:</strong> {tokens?.accessToken}
//           </div>
//           <div>
//             <strong>Refresh Token:</strong> {tokens?.refreshToken}
//           </div>
//         </footer>
//       )}
//     </>
//   );
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <AppRoutes />
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { AuthProvider, useAuth } from "./hooks/AuthContext";
import Header from "./components/Header";
// import Header from "./components/Header";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function PublicRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function AppRoutes() {
  const { login } = useAuth();

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login onLogin={login} />
            </PublicRoute>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
