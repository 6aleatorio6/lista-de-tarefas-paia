import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useTaskStoreOld } from "../hooks/store/useTaskStoreOld";
import { useCompletedTaskLogStore } from "../hooks/store/useCompletedTaskLogStore";
import { IDateStringYMD } from "../utils/todayFormatted";
import { useTaskStore } from "../hooks/store/useTaskStore";

export default function MigrateData() {
  const [isInMigration, setIsInMigration] = useState<boolean>();

  const tasks = useTaskStoreOld();

  useEffect(() => {
    if (!tasks?.tasks?.length && !isInMigration) {
      setIsInMigration(false);
      return;
    }

    const migrate = async () => {
      setIsInMigration(true);

      const taskIndexMap = {} as Record<string, number>;
      tasks.tasks.forEach((task, index) => {
        taskIndexMap[task.title] = index;
      });

      useTaskStore.setState({ tasks: tasks.tasks }, true);

      useCompletedTaskLogStore.setState((state) => {
        const newState = { ...state };

        Object.entries(tasks.completionLog).forEach(([date, titles]) => {
          const indices = (titles as string[])
            .map((title) => taskIndexMap[title])
            .filter((index) => index !== undefined);

          if (indices.length > 0) {
            newState[date as IDateStringYMD] = indices;
          }
        });

        return newState;
      }, true);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      useTaskStoreOld.setState({} as any, true);

      setIsInMigration(false);
    };

    migrate();
  }, [tasks?.tasks?.length]);

  if (isInMigration === undefined) {
    return <div>Checking data...</div>;
  }

  if (isInMigration) {
    return <div>Migrating data...</div>;
  }

  return <Outlet />;
}
