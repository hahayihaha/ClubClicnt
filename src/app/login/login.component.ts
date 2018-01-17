import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Http } from "@angular/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formModel: FormGroup

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public http: Http
  ) {
    this.formModel = fb.group({
      userid: ['', Validators.required],
      pass: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  signIn(event){
    event.target.disabled = true;
    this.http.get(sessionStorage['http'] + '/manage/Login/Login?userid='+this.formModel.get('userid').value+'&pass=' + this.formModel.get('pass').value).subscribe( response => {
      if(response.json()){
        this.router.navigate(['/admin']);
        localStorage.setItem('ID', response.json());
        localStorage.setItem('UserID', this.formModel.get('userid').value);
      }
    }, error => {
      event.target.disabled = false;
      alert(error.json()['Message']);
    } )
  }

}
