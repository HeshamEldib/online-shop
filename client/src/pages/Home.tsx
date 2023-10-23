import { useSelector } from "react-redux";
import PopoverWrapper from "../components/PopoverWrapper";

function Home() {
  const show = useSelector((state: any) => state.handelPopover.show);

  return (
    <>
      <h1>Home</h1>
      {show && <PopoverWrapper />}
    </>
  );
}

export default Home;
