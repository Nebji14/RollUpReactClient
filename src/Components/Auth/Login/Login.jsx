import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";

export default function Login({ hidden, onShowRegister }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  // Schéma Yup
  const schema = yup.object().shape({
    pseudo: yup
      .string()
      .required("Le pseudo/e-mail est obligatoire")
      .min(5, "Le pseudo doit contenir au moins 5 caractères"),
    password: yup
      .string()
      .required("Le mot de passe est obligatoire")
      .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      pseudo: "",
      password: "",
    },
  });

  async function submit(values) {
    // console.log(values);
    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json",
        },
      });
      const responseFromBackend = await response.json();
      console.log(responseFromBackend);

      if (response.ok) {
        toast.success("Bien connecté");
        login(responseFromBackend.user);

        navigate("/Home");
        reset(defaultValues);
      } else {
        toast.error(responseFromBackend.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className={`absolute w-full top-0 h-full flex flex-col justify-center transition-all duration-700 ease-in-out px-10 ${
        hidden
          ? "opacity-0 -translate-y-full z-[1]"
          : "opacity-100 translate-y-0 z-[2]"
      }`}
    >
      <form onSubmit={handleSubmit(submit)}>
        <h1 className="font-cinzel text-[2em] font-bold cursor-default flex justify-center my-[40px] text-[#f3cc7a]">
          Connexion
        </h1>

        {/* PSEUDO */}
        <label className="font-montserrat font-bold text-[#fbf9f4] block my-[10px]">
          Pseudo/E-mail
        </label>
        <input
          type="text"
          placeholder="Saisissez votre pseudo/e-mail..."
          {...register("pseudo", "e-mail")}
          className="w-full h-12 bg-[#e9e4da] shadow-[0_5px_5px_rgba(0,0,0,0.5)] mb-3 px-3 rounded-full font-montserrat text-base text-[#111827] placeholder-[#111827] outline-none"
        />
        {errors.pseudo && (
          <p className="text-red-600 font-semibold text-sm">
            {errors.pseudo.message}
          </p>
        )}

        {/* PASSWORD */}
        <label className="font-montserrat font-bold text-[#fbf9f4] block my-[10px]">
          Mot de passe
        </label>
        <input
          type="password"
          placeholder="Saisissez votre mot de passe..."
          {...register("password")}
          className="w-full h-12 bg-[#e9e4da] shadow-[0_5px_5px_rgba(0,0,0,0.5)] mb-3 px-3 rounded-full font-montserrat text-base text-[#111827] placeholder-[#111827] outline-none"
        />
        {errors.password && (
          <p className="text-red-600 font-semibold text-sm">
            {errors.password.message}
          </p>
        )}
        {/* FORGOT PASSWORD */}
        <NavLink to={"/ForgotPass"}>
          <p className="text-sm text-[#F2EEE8] font-montserrat font-semibold text-left cursor-pointer hover:text-[#f3cc7a] transition mb-4">
            Mot de passe oublié ?
          </p>
        </NavLink>

        {/* BUTTONS */}
        <button
          type="submit"
          className="w-[120px] h-12 bg-[#e9e4da] text-[#3e3a4d] font-bold text-base rounded-full shadow-[0_5px_5px_rgba(0,0,0,0.5)] mx-auto my-[20px] block hover:text-[#6c5ebf] transition"
        >
          Connexion
        </button>

        <button
          type="button"
          onClick={onShowRegister}
          className="w-[120px] h-12 bg-[#e9e4da] text-[#3e3a4d] font-bold text-base rounded-full shadow-[0_5px_5px_rgba(0,0,0,0.5)] mx-auto my-[10px] block hover:text-[#6c5ebf] transition"
        >
          S'inscrire
        </button>
      </form>
    </div>
  );
}
