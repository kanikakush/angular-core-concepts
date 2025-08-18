import { HttpHeaders, HttpResponseBase } from '@angular/common/http';

export interface CustomHttpResponse extends HttpResponseBase {
  error: any;            // The error body returned from backend (could be object, string, Blob)
  headers: HttpHeaders;  // Response headers
  status: number;        // HTTP status code (e.g., 404, 500, 401)
  statusText: string;    // Status text (e.g., "Not Found", "Unauthorized")
  url: string | null;          // The URL that was called
  name: string;          // Always "HttpErrorResponse"
  message: string;       // Error message string
  ok: boolean;           // Always false for errors
}
