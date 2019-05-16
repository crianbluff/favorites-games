import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {}

  onRegister(form) {
    this.authService.register(form.value)
      .subscribe(res => {
        console.log(res);
        this.router.navigateByUrl('games');
      });
  }

}
