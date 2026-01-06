import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private baseUrl = 'http://localhost:8000';
  private apiKey = 'YOUR_FASTLY_API_KEY';

  constructor(private http: HttpClient) {
    return new Proxy(this, {
      get: (target, prop: string) => {
        // If the method exists, use it
        if (prop in target) {
          return (target as any)[prop];
        }

        // Otherwise treat it as a dynamic API call
        return (args: any = {}) => this.dynamicCall(prop, args);
      }
    });
  }

  private get headers() {
    return new HttpHeaders({
      'Fastly-Key': this.apiKey,
      'Accept': 'application/json'
    });
  }

  // -------------------------
  // Explicit API methods
  // -------------------------

  listServices() {
    return this.http.get(`${this.baseUrl}/service`, { headers: this.headers });
  }

  purgeUrl(url: string) {
    return this.http.post(`${this.baseUrl}/purge/${encodeURIComponent(url)}`, {}, { headers: this.headers });
  }

  getServiceDetails(serviceId: string) {
    return this.http.get(`${this.baseUrl}/service/${serviceId}`, { headers: this.headers });
  }
  getMapFiles() {
    return this.http.get(`${this.baseUrl}/mapfiles`, { headers: this.headers });
  }
  getMapfile(filename: string) {
    console.log('Fetching mapfile:', filename);
    return this.http.get(`${this.baseUrl}/mapfile/${filename}`, { headers: this.headers });
  }
  postMapfile(name:string,content:string) {
    var obj={name: name,description: "Mapfile upload",x_min:-180,y_min:-90,x_max:180,y_max:90};
    return this.http.post(`${this.baseUrl}/mapfile`, obj, { headers: this.headers });
  }
  putMapfile(id:number|null, name:string,content:string) {
    var obj={id:id,name: name,description: "Mapfile upload",x_min:-180,y_min:-90,x_max:180,y_max:90};
    return this.http.put(`${this.baseUrl}/mapfile`, obj, { headers: this.headers });
  }
  // -------------------------
  // Dynamic fallback
  // -------------------------

  private dynamicCall(functionName: string, args: any) {
    const endpoint = this.mapFunctionToEndpoint(functionName, args);

    if (!endpoint) {
      throw new Error(`Fastly API: No mapping found for function "${functionName}"`);
    }

    return this.http.request(endpoint.method, `${this.baseUrl}${endpoint.url}`, {
      headers: this.headers,
      body: endpoint.body || null
    });
  }

  // -------------------------
  // Function → Endpoint mapping
  // -------------------------

  private mapFunctionToEndpoint(fn: string, args: any) {
    const map: Record<string, any> = {
      listMapfiles: {
        method: 'GET',
        url: `/mapfiles`
      },
      saveMapfile: {
        method: 'POST',
        url: `/mapfile`
      },
      getMapfile: {
        method: 'GET',
        url: `/service/${args.filename}`
      }
    };

    return map[fn];
  }
}
