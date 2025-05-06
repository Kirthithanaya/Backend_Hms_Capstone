import { execSync } from "child_process";
import path from "path";

export const runBackup = () => {
  const backupPath = path.join("backups", `backup-${Date.now()}`);
  execSync(`mongodump --uri="${process.env.MONGODB_URL}" --out=${backupPath}`);
  return backupPath;
};
