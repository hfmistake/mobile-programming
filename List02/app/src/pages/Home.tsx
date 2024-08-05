import "./Home.css";
import {StudentForm} from "../components/StudentForm";

const Home: React.FC = () => {
  return (
      <div className={"container"}>
        <StudentForm/>
      </div>
  );
};

export default Home;
