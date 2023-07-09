import { useState } from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = (data) => {
    setSubmitted(true);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            {...register("name", {
              required: "Please write down your name."
            })}
            type="text"
            id="name"
          />
          {errors?.name?.message}
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            {...register("email", {
              required: "Please write down your email.",
              validate: {
                naver: (text) => text.includes("@naver.com")
              }
            })}
            type="email"
            id="email"
            placeholder="Only @naver.com"
          />
          {errors?.email?.message}
          {errors?.email?.type === "naver"
            ? "Only @naver emails allowed"
            : null}
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            {...register("password", {
              required: "Please write down your password.",
              minLength: {
                value: 10,
                message: "Password has to be more than 10 chars."
              }
            })}
            type="password"
            id="password"
            placeholder="Min 10 characters"
          />
          {errors?.password?.message}
        </div>
        <button>Log in</button>
      </form>
      {submitted ? "Thank you" : ""}
    </div>
  );
}
