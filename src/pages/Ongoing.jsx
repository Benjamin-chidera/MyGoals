import Goal from "../components/Goal";
import GoalHeader from "../components/GoalHeader";
import Loading from "../components/Loading";
import { useFetch } from "../Hooks/useFetch";
import Empty from "../components/Empty";
import ErrorFetch from "../components/ErrorFetch";
import Goals from "../data/goals";
const Ongoing = () => {
  // const ongoingGoals = Goals.filter((g) => g.progress < 100);
  const url = "https://goal-api-g1vz.onrender.com/api/goals" 

  const {data:{goals: Goals}, isError, isLoading} = useFetch(url)

  const ongoingGoals = isLoading || isError ? null : Goals.filter((g) => g.progress < 100)

  
  if (!isLoading && isError) {
    return <ErrorFetch/>
  }
  
  if (!isLoading && ongoingGoals.length < 1) {
    return <Empty/>
  }

  return (
    <div className="container mt-2">
      <GoalHeader heading="Ongoing" />
      {isLoading && <Loading/>}
      <div>
        {Goals &&
          ongoingGoals.map((g) => {
            return <Goal key={g._id} {...g} />;
          })}
      </div>
    </div>
  );
};

export default Ongoing;
