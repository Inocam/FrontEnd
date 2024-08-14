import Header from "../components/Header";
import Message from "../components/Messsage";
import Team from "../components/Team";

const TeamPage = () => {
  return (
    <div style={{ position: "relative" }}>
      <Header />
      <Team></Team>
      <Message />
    </div>
  );
};

export default TeamPage;
