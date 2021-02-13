import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  loginForm: FormGroup;
  result = {
    name: '',
    password: ''
  }

  ngOnInit(): void {
    this.loginForm = this.loginService.buildForm();
    this._isConnect();
  }

  connect() {
    this.result.name = this.loginForm.get('name').value;
    this.result.password = this.loginForm.get('password').value;

    console.log(this.result.name)

    if ( this.result.name === 'floadmin') {
      if (this.result.password === 'bijoux') {
        sessionStorage.setItem('CONNECT', JSON.stringify(this.result));
        this.router.navigate(['editor/productForm']);
      } else {
        alert('mdp faux')
      }
    } else {
      alert('nom faux')
    }
  }

  private _isConnect() {
    let connect = JSON.parse(sessionStorage.getItem('CONNECT'));
    if (connect) {
      if ( connect.name = 'floadmin') {
        if (connect.password = 'bijoux') {
          this.router.navigate(['editor/productForm']);
        } 
      } 
    }
    
  }
  

}
