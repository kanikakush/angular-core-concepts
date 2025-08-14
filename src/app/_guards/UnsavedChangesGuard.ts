import { CanDeactivateFn } from "@angular/router";
import { HasUnsavedChanges } from "../_interface/HasUnsavedChanges";

export const unsavedChangesGuard: CanDeactivateFn<HasUnsavedChanges> =
  (component, currentRoute, currentState, nextState) => {
    if (component.hasUnsavedChanges()) {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  };