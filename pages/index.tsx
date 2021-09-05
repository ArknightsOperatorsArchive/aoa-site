import AnimatedLogo from "../components/AnimatedLogo";
import UnderlineLink from "../components/UnderlineLink";
import CoreContainer from "../containers/main/CoreContainer";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <CoreContainer>
      <div className="flex-1 flex justify-center flex-col">
        <AnimatedLogo />
      </div>
    </CoreContainer>
  );
}
