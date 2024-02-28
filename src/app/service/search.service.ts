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