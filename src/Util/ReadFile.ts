import * as fs from "fs"

export function ReadFile(path: string): string {
    return fs.readFileSync(path, "utf8");
}

export default ReadFile;