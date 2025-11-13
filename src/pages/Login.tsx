// import React, { useState } from "react";

// interface LoginProps {
//   onLogin: (username: string, password: string) => boolean;
// }

// const Login: React.FC<LoginProps> = ({ onLogin }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!onLogin(username, password)) {
//       setError("Invalid username or password");
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-sm mx-auto mt-10 p-4 border rounded"
//     >
//       <h2 className="text-xl font-semibold mb-4">Login</h2>
//       {error && <p className="text-red-600">{error}</p>}
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         className="w-full mb-3 p-2 border rounded"
//         required
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="w-full mb-4 p-2 border rounded"
//         required
//       />
//       <button
//         type="submit"
//         className="w-full bg-blue-600 text-white py-2 rounded"
//       >
//         Login
//       </button>
//     </form>
//   );
// };

// export default Login;

// -----------------------------------------------------------------------

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface LoginProps {
  onLogin: (username: string, password: string) => boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(username, password);
    if (!success) {
      setError("Invalid username or password");
    } else {
      const redirectPath =
        (location.state && (location.state as any).from?.pathname) || "/";
      navigate(redirectPath, { replace: true });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-10 p-4 border rounded"
      noValidate
    >
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      {error && <p className="text-red-600">{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
