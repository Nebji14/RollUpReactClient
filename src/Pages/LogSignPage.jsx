import AuthContainer from "../Components/Auth/AuthContainer";
import ParallaxPage from "../Components/ParallaxPage/ParallaxPage";

export default function HomePage() {
  return (
    <main>
      <ParallaxPage />
      <AuthContainer />
    </main>
  );
}
