import GoalHeader from "../components/GoalHeader";

import Goal from "../components/Goal";
import Loading from "../components/Loading";
import { useFetch } from "../Hooks/useFetch";
import Empty from "../components/Empty";
import ErrorFetch from "../components/ErrorFetch";


const Allgoals = () => {
  const url = "https://goal-api-g1vz.onrender.com/api/goals" 
  
  const {data:{goals: Goals}, isError, isLoading} = useFetch(url)

if (!isLoading && isError) {
  return <ErrorFetch/>
}

if (!isLoading && Goals.length < 1) {
  return <Empty/>
}
  
  return (
    <div className="container pb-3">
      <GoalHeader heading="All Goals" />
    {isLoading && <Loading/>}
      <div>
        <div>
          {Goals &&
            Goals.map((g) => {
              return <Goal key={g._id} {...g} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Allgoals;
