import { Breadcamps } from "../components/Breadcumps";
import { Card } from "../components/Card";
import { Container } from "../components/Container";

export const Dashboard = () => {
  return (
    <Container>
      <Breadcamps paths={{ 'Home': '/', 'Dashboard': '/' }} />
      <h3 className="uppercase text-[14px] font-medium text-slate-600 mt-4 col-span-2">College Stats</h3>
      <div className="gap-24 flex-wrap grid grid-cols-12 grid-rows-12 h-screen col-span-12">
        <Card title={'Programs'} bgColor={'bg-blue-600'} icon={'carbon:course'} />
        <Card title={'Courses'} bgColor={'bg-green-600'} icon={'carbon:course'} />
        <Card title={'Departments'} bgColor={'bg-blue-600'} icon={'carbon:course'} />
        <Card title={'Batchs'} bgColor={'bg-blue-600'} icon={'carbon:course'} />
      </div>
    </Container>
  );
};
