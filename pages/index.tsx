import AnimatedLogo from "../components/AnimatedLogo";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className="w-screen flex flex-col min-h-screen p-0 justify-center">
        <div className="flex flex-row">
          <div className="bg-black text-white pl-6 pr-12 pt-6 pb-12 ml-10 max-w-md">
            <h1
              className="text-4xl leading-snug font-bold"
              style={{
                fontFamily: "Montserrat",
              }}
            >{`Arknights: \n Operators \n Archives`}</h1>
          </div>
        </div>
        <div className="flex-1 flex justify-center w-full">
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
          <div className="flex-1 justify-center flex flex-col">
            <AnimatedLogo />
            <div className="mt-2 p-4 flex flex-col items-center justify-center text-center">
              <h2 className="text-3xl">Arknights: Operator Archives</h2>
              <h4 className="text-xl mt-1">Coming Soon!!!</h4>
            </div>
          </div>
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
        <div
          className="self-center justify-self-flex-end w-full bg-black text-white p-4 text-center"
          style={{
            fontFamily: "Montserrat",
          }}
        >
          This is a fan-initiated project and all rights belongs to Yostar Inc
          and HYPERGRYPH
        </div>
      </div>
    </div>
  );
}
