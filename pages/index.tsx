import AnimatedLogo from "../components/AnimatedLogo";
import CoreContainer from "../containers/main/CoreContainer";

export default function Home() {
  return (
    <CoreContainer>
      <div className="flex-1 flex justify-center flex-col">
        <AnimatedLogo />
      </div>
    </CoreContainer>
  );
}
