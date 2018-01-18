import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Http } from "@angular/http";
import { Router } from "@angular/router";

declare var $: any;

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public formModel: FormGroup

  constructor(
    private fb: FormBuilder,
    private http: Http,
    public router: Router
  ) {
    this.formModel = fb.group({
      UserID: ['', [Validators.required, Validators.pattern('^[A-z][0-9A-z]{3,9}$')]],
      PassWord: ['', Validators.required],
      Qx: ['', Validators.required],
      Times: ['', Validators.required]
    })
  }

  ngOnInit() {
    $('#datetimepicker').datetimepicker();
  }

  addAdmin(event){
    event.target.disabled = true;
    this.http.post(sessionStorage['http'] + '/Action/Admins/PostAdmin', this.formModel.value).subscribe( response => {
      if(response.json()){
        alert('添加成功');
        this.router.navigate(['/admin'])
      }
    }, error => {
      event.target.disabled = false;
      alert(error.json()['Message'])
    } )
  }

}
