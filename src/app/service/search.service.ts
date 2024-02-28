import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class SearchService {
    constructor(private http: HttpClient) { }

    getUserData() {
        const token = "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";
        const headers = new HttpHeaders({
            "Accept": "application/vnd.github+json",
            "Authorization": `Bearer ${token}`,
            "X-GitHub-Api-Version": "2022-11-28"
        })
        const options = {
            headers
        }
        return this.http.get<any>(`https://api.github.com/users?per_page=50`, options);
    }

searchUsers(query: string): Observable<any> {
    const token = "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";
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28"
    });

    let params = new HttpParams();
    params = params.append('q', query);
    const options = {
      headers: headers,
      params: params
    };

    return this.http.get<any>('https://api.github.com/search/users?per_page=50', options);
  }

}