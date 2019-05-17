import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  public isSuccess;

  constructor(public http: HttpClient) { }

  register(phoneNumber, firstname, lastName, dob, gender, email){
    let header  = new HttpHeaders();
    header=header.set('Content-Type', 'application/json');
    let options = { headers: header };
    let data = {
      "phoneNumber": phoneNumber,
      "firstName": firstname,
      "lastName": lastName,
      "dob": dob,
      "gender": gender,
      "email": email
    };
    console.log("res");
    return this.http.post('http://localhost:54459/api/User', JSON.stringify(data),options);
  }
}
