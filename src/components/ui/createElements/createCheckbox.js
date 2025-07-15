import { initChangeStatus } from "../../inits/initChangeStatus.js";

export function createCheckbox(todo) {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;

  initChangeStatus(todo, checkbox);

  return checkbox;
}