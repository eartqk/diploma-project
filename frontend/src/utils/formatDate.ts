import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

function formatDate(date: string, type: string = "Pp") {
  return format(parseISO(date), type , { locale: ru });
}

export default formatDate;
