const GOOGLE_DRIVE_API_ENDPOINT = "https://www.googleapis.com/drive/v3";
const GOOGLE_DRIVE_SCOPE = "https://www.googleapis.com/auth/drive.file";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  date: string;
}

export class GoogleDriveService {
  private accessToken: string;
  private appFolderId: string | null = null;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${GOOGLE_DRIVE_API_ENDPOINT}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch from Google Drive API");
    }

    return response.json();
  }

  async initializeAppFolder() {
    if (this.appFolderId) return this.appFolderId;

    // Procura pela pasta do app
    const response = await this.request(
      '/files?q=name="DailyTasksApp" and mimeType="application/vnd.google-apps.folder"'
    );

    if (response.files && response.files.length > 0) {
      this.appFolderId = response.files[0].id;
      return this.appFolderId;
    }

    // Cria a pasta se não existir
    const folder = await this.request("/files", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "DailyTasksApp",
        mimeType: "application/vnd.google-apps.folder",
      }),
    });

    this.appFolderId = folder.id;
    return this.appFolderId;
  }

  async saveTasks(tasks: Task[]) {
    const folderId = await this.initializeAppFolder();
    const date = new Date().toISOString().split("T")[0];
    const filename = `tasks_${date}.json`;

    // Procura por arquivo existente do dia
    const existingFile = await this.request(
      `/files?q=name="${filename}" and "${folderId}" in parents`
    );

    const content = JSON.stringify(tasks);
    const file = new Blob([content], { type: "application/json" });
    const metadata = {
      name: filename,
      parents: [folderId],
    };

    if (existingFile.files && existingFile.files.length > 0) {
      // Atualiza arquivo existente
      await this.request(`/files/${existingFile.files[0].id}`, {
        method: "PATCH",
        body: file,
      });
      return existingFile.files[0].id;
    }

    // Cria novo arquivo
    const form = new FormData();
    form.append(
      "metadata",
      new Blob([JSON.stringify(metadata)], { type: "application/json" })
    );
    form.append("file", file);

    const response = await this.request("/files", {
      method: "POST",
      body: form,
    });

    return response.id;
  }

  async getTodaysTasks(): Promise<Task[]> {
    const folderId = await this.initializeAppFolder();
    const date = new Date().toISOString().split("T")[0];
    const filename = `tasks_${date}.json`;

    const existingFile = await this.request(
      `/files?q=name="${filename}" and "${folderId}" in parents`
    );

    if (!existingFile.files || existingFile.files.length === 0) {
      return [];
    }

    const fileId = existingFile.files[0].id;
    const response = await this.request(`/files/${fileId}?alt=media`);
    return response as Task[];
  }
}

export const googleDriveScope = GOOGLE_DRIVE_SCOPE;
