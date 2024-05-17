import { Breadcamps } from "../components/Breadcumps";
import { Card } from "../components/Card";
import { Container } from "../components/Container";

export const Dashboard = () => {
  return (
    <Container>
      <Breadcamps paths={{'Home': '/','Dashboard': '/'}}/>
      <div className="flex gap-2 flex-wrap">

      </div>
    </Container>
  );
};
