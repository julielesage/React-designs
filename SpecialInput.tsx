import React, { useEffect, useRef } from "react";
import { useFocus } from '../../utils/customHooks';
import { RewardType } from "../../store/initialStates/loyalty.initialState";

const SpecialInput: React.FC<ISPProps> = ({ tag, prop, newReward, setNewReward }) => {

  const ref = useRef();
  const [mounted, setMounted] = React.useState<boolean>(true);
  const focused = useFocus(ref, mounted);

  const onChange = (e: React.FormEvent) => {
    const { name, value } = e.target as HTMLTextAreaElement;
    let obj;
    if (name === "discount" || name === "position")
      obj = { ...newReward, [name]: Number(value) };
    else
      obj = { ...newReward, [name]: value };
    setNewReward(obj);
  };

  useEffect(() => {
    return (() => setMounted(false));
  }, []);

  return (
    <div className="relative">
      <div className={focused ? "absolute-tag orange" : "absolute-tag"}><p>{tag}</p></div>
      <input
        className="flex1 mb-30"
        name={prop}
        placeholder={newReward[prop]}
        ref={ref as any}
        onChange={onChange}
      />
    </div>
  );
};

interface ISPProps {
  tag: string,
  prop: string,
  newReward: RewardType,
  setNewReward: React.Dispatch<React.SetStateAction<RewardType>>,
}
export default SpecialInput;