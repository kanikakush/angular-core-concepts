import { CanMatchFn } from "@angular/router";

export const featureToggleGuard: CanMatchFn = (route, segments) => {
  const featureFlags = { newDashboard: true }; // Could come from config
  return featureFlags['newDashboard']; // Only match if feature enabled
};