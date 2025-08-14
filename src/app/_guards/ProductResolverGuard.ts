import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";

export const productResolver: ResolveFn<any> = (route, state) => {
  const http = inject(HttpClient);
  const productId = route.paramMap.get('id');
  return http.get(`/api/products/${productId}`); // returns Observable
};