import { CanDeactivateFn } from "@angular/router";
import { HasUnsavedChanges } from "../_interface/HasUnsavedChanges";

export const unsavedChangesGuard: CanDeactivateFn<HasUnsavedChanges> =
  (component, currentRoute, currentState, nextState) => {
    console.log("Calling unsave guards");
    if (component.hasUnsavedChanges()) {
      console.log("Calling unsave guards if condition.....");
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  };