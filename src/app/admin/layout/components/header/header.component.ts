import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { User_Data } from 'src/app/model/User/user-data.model';
import { UserService } from 'src/app/Sevices/User/user.service';



@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @Input() data_getDN: User_Data;
    public pushRightClass: string;

    constructor(public router: Router, private userService:UserService) {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });
    } 
    tokenAdmin=localStorage.getItem('auth-admin-token');
    admin=localStorage.getItem('auth-admin');
    ngOnInit() {
        this.pushRightClass = 'push-right';
        this.getAdmin();
    }

    getAdmin(){
        if(this.admin){
          this.userService.getByName(this.admin).subscribe((res: any) => {
               this.data_getDN = res;
              // console.log(this.data_getDN.hoVaTen);
              });    
        }
      }


    //  
    //   constructor( private router: Router,private dNghiepService:doanhNghiepService) { }
    //   token=localStorage.getItem('auth-user-token');
    //   user=localStorage.getItem('auth-user');



    isToggled() {
        const dom: Element | null = document.querySelector('body');
        if (!dom) {
            return null
        } else
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('auth-admin');
        this.router.navigate(['/admin/Login']);
    }

}
