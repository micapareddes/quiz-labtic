import { WatchedList } from "./watchedList.js";

export class DisciplinasWatchedList extends WatchedList {
    compareItems(a, b) {
        return b.disciplina_id.toString() === a.disciplina_id.toString()
    }
}