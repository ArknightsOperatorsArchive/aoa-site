export default interface AKOperator {
  uid: string;
  operatorName: string;
  operatorType: OperatorClass;
}

export type OperatorClass =
  | "Caster"
  | "Defender"
  | "Guard"
  | "Medic"
  | "Sniper"
  | "Specialist"
  | "Supporter"
  | "Vanguard";
