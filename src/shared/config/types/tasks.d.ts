export type ITask = {
  title: string;
  description?: string;
};

export type ITaskCompletedLog = Record<IDateStringYMD, string[]>;
