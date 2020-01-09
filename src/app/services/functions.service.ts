import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(private http: HttpClient) {
  }


  public sendEmail(to, subject, content) {

    const url = `https://us-central1-pdss-9e4b0.cloudfunctions.net/sendMail`;
    const params: URLSearchParams = new URLSearchParams();
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    params.set('to', to);
    params.set('from', 'team@votingapp.com');
    params.set('subject', subject);
    params.set('content', content);
    const params2 = {
      to, from: 'team@votingapp.com', subject, content
    };
    const options = {
      headers,
    };


    return this.http.post(url, params2, options).subscribe(data => console.log(data), error => console.error(error));

  }
}
