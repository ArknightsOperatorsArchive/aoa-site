import UnderlineLink from "../../components/UnderlineLink";
import styles from "../../styles/Home.module.css";
import AboutProjectModal from "./AboutProjectModal";
import CreditsModal from "./CreditsDialog";
import OperatorsModal from "./OperatorClassDialog";

const CoreContainer: React.FC = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className="w-screen flex flex-col min-h-screen p-0 justify-center">
        <div className="flex flex-row">
          <div className="bg-black text-white pl-6 pr-12 pt-6 pb-14 ml-10 max-w-xs">
            <h1
              className="text-4xl leading-snug font-bold"
              style={{
                fontFamily: "Montserrat",
              }}
            >{`Arknights: \n Operators \n Archives`}</h1>
          </div>
          <div className="ml-2 flex flex-col justify-end px-2">
            <AboutProjectModal />
            <OperatorsModal />
            <CreditsModal />
          </div>
        </div>
        <div className="flex-1 flex justify-cente p-2">
          <h1
            className="text-8xl font-black italic text-center uppercase"
            style={{
              fontFamily: "DDin-Bold",
              writingMode: "vertical-lr",
              textOrientation: "sideways",
            }}
          >
            Operator
          </h1>
          <div className="flex-1 justify-center flex flex-col">{children}</div>
          <div className="flex text-8xl font-black italic text-center uppercase">
            <h1
              style={{
                fontFamily: "DDin-Bold",
                writingMode: "vertical-rl",
                textOrientation: "sideways",
              }}
            >
              Archives
            </h1>
          </div>
        </div>
        <div className="self-center justify-self-flex-end w-full bg-black text-white p-4 text-center">
          This is a fan-initiated project and all rights belongs to Yostar Inc
          and HYPERGRYPH
        </div>
      </div>
    </div>
  );
};

export default CoreContainer;
