import { Suspense } from "react";
import Header from "../components/Header";
import Message from "../components/Messsage";
import Team from "../components/Team";

const TeamPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <Team></Team>
        <Message />
      </Suspense>
    </div>
  );
};

export default TeamPage;
