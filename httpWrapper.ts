/**
 * Source: "John Bentley's \OneDrive - DPIE\Documents\Sda\Code\Typescript\BfsLibrary\"
 * Warning: Don't edit outside of that location.
 * Author: John Bentley
 */
import AbortController from 'abort-controller'

import * as Http from './http.js'
export { DatabaseResponse } from './http.js'

export async function postData(data: object, url: string, headers?: Record<string, string>): Promise<Http.DatabaseResponse> {
  const abortController = new AbortController();
  let timeoutId: NodeJS.Timeout;

  // Default headers
  const defaultHeaders = { 'Content-Type': 'application/json' };

  // Merge default headers with provided headers
  const mergedHeaders = { ...defaultHeaders, ...headers };

  const promise = new Promise<Http.DatabaseResponse>((resolve, reject) => {
    Http.sendRequest(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: mergedHeaders,
      signal: abortController.signal,
    }).then((response: Http.DatabaseResponse) => {
      // console.log('Response from database: ', response);
      console.log('Response from database OK');
      timeoutId && clearTimeout(timeoutId);
      resolve(response);
    }, reject);
  });

  const timeoutPromise = new Promise<Http.DatabaseResponse>((resolve) => {
    timeoutId = setTimeout(() => {
      console.log('Database timed out, returning 200');
      abortController.abort();
      const abortPacket: Http.DatabaseResponse = { body: "Aborted", statusCode: 400 };
      resolve(abortPacket);
    }, 24000);
  });

  return await Promise.race([promise, timeoutPromise]);
}
