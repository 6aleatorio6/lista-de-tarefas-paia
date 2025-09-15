import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  QueryConstraint,
} from "firebase/firestore";
import { db } from "./firebase";
import { ITask, ITaskCompletedLog } from "./types/tasks";
import { IDateStringYMD } from "../utils/todayFormatted";

// Tipos estendidos para o Firebase
export interface ITaskDocument extends ITask {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Tipos para filtros
export interface ITaskFilters {
  title?: string;
  orderBy?: "createdAt" | "title";
  orderDirection?: "asc" | "desc";
  limitCount?: number;
}

export interface ICompletedLogFilters {
  dateFrom?: IDateStringYMD;
  dateTo?: IDateStringYMD;
  taskTitle?: string;
  orderBy?: "date";
  orderDirection?: "asc" | "desc";
  limitCount?: number;
}

// Tipo para documento de log completado
interface ITaskCompletedLogDocument {
  date: IDateStringYMD;
  taskTitles: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

class TaskRepository {
  private tasksCollection = "tasks";
  private completedLogsCollection = "task_completed_logs";

  // ===== MÉTODOS PRIVADOS UTILITÁRIOS =====

  private createTimestamps() {
    const now = Timestamp.now();
    return { createdAt: now, updatedAt: now };
  }

  private createUpdateTimestamp() {
    return { updatedAt: Timestamp.now() };
  }

  private async validateTaskExists(title: string): Promise<ITaskDocument> {
    const [existing] = await this.findTasks({ title });

    if (!existing) {
      throw new Error("Task não encontrada");
    }

    return existing;
  }

  // ===== OPERAÇÕES DE TASKS =====

  async createTask(task: ITask): Promise<string> {
    const taskData = {
      ...task,
      ...this.createTimestamps(),
    };

    // Usa o título como ID do documento
    const docRef = doc(db, this.tasksCollection, task.title);
    await setDoc(docRef, taskData);
    return task.title;
  }

  async findTasks(filters: ITaskFilters = {}): Promise<ITaskDocument[]> {
    const constraints: QueryConstraint[] = [];

    // Filtro por título (busca parcial)
    if (filters.title) {
      constraints.push(where("title", "==", filters.title));
    }

    // Ordenação
    const orderByField = filters.orderBy || "createdAt";
    const orderDirection = filters.orderDirection || "desc";
    constraints.push(orderBy(orderByField, orderDirection));

    if (filters.limitCount) constraints.push(limit(filters.limitCount));

    const q = query(collection(db, this.tasksCollection), ...constraints);
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => doc.data()) as ITaskDocument[];
  }

  async updateTask(title: string, updates: Partial<ITask>): Promise<void> {
    // Verifica se a task existe e pertence ao usuário
    await this.validateTaskExists(title);

    const docRef = doc(db, this.tasksCollection, title);
    await updateDoc(docRef, {
      ...updates,
      ...this.createUpdateTimestamp(),
    });
  }

  async deleteTask(title: string): Promise<void> {
    // Verifica se a task existe e pertence ao usuário
    await this.validateTaskExists(title);

    const docRef = doc(db, this.tasksCollection, title);
    await deleteDoc(docRef);
  }

  // ===== OPERAÇÕES DE LOGS DE CONCLUSÃO =====

  async removeTaskFromLogs(taskTitle: string) {
    // Busca todos os logs que contêm esta task
    const q = query(
      collection(db, this.completedLogsCollection),
      where("taskTitles", "array-contains", taskTitle)
    );

    const allLogs = await getDocs(q);

    allLogs.forEach((logDoc) => {
      const logData = logDoc.data() as ITaskCompletedLogDocument;
      const updatedTitles = logData.taskTitles.filter(
        (title) => title !== taskTitle
      );

      // Atualiza o log removendo a task
      updateDoc(logDoc.ref, {
        taskTitles: updatedTitles,
        ...this.createUpdateTimestamp(),
      });
    });
  }

  async markTaskCompleted(taskTitle: string, date: IDateStringYMD) {
    // Busca se já existe um log para esta data
    const q = query(
      collection(db, this.completedLogsCollection),
      where("date", "==", date)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // Cria um novo log usando a data como ID do documento
      const docRef = doc(db, this.completedLogsCollection, date);
      await setDoc(docRef, {
        date,
        taskTitles: [taskTitle],
        ...this.createTimestamps(),
      });
    } else {
      // Atualiza o log existente
      const logDoc = querySnapshot.docs[0];
      const logData = logDoc.data();

      if (!logData.taskTitles.includes(taskTitle)) {
        await updateDoc(logDoc.ref, {
          taskTitles: [...logData.taskTitles, taskTitle],
          ...this.createUpdateTimestamp(),
        });
      }
    }
  }

  async getCompletedLog(filters: ICompletedLogFilters = {}) {
    const constraints: QueryConstraint[] = [];

    // Filtro por data (intervalo)
    if (filters.dateFrom) {
      constraints.push(where("date", ">=", filters.dateFrom));
    }
    if (filters.dateTo) {
      constraints.push(where("date", "<=", filters.dateTo));
    }

    // Filtro por task específica
    if (filters.taskTitle) {
      constraints.push(
        where("taskTitles", "array-contains", filters.taskTitle)
      );
    }

    // Ordenação
    const orderByField = filters.orderBy || "date";
    const orderDirection = filters.orderDirection || "desc";
    constraints.push(orderBy(orderByField, orderDirection));

    // Limite
    if (filters.limitCount) {
      constraints.push(limit(filters.limitCount));
    }

    const q = query(
      collection(db, this.completedLogsCollection),
      ...constraints
    );
    const querySnapshot = await getDocs(q);
    const completedLog: ITaskCompletedLog = {};

    querySnapshot.docs.forEach((doc) => {
      const data = doc.data() as ITaskCompletedLogDocument;
      completedLog[data.date] = data.taskTitles;
    });

    return completedLog;
  }
}

export const taskRepository = new TaskRepository();
