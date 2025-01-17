import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import './App.css'
function App() {
  return <RouterProvider router={router} />;
}

export default App;

//Test Login
// import LoginForm from './components/LoginForm';

// function App() {
//   const handleSubmit = (userData) => {
//     console.log("Dados enviados:", userData);
//   };

//   return (
//     <div>
//       <h1>Bem-vindo ao sistema</h1>
//       <LoginForm onSubmitForm={handleSubmit} />
//     </div>
//   );
// }

// export default App;