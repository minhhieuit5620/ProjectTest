import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { doanhNghiep_Data } from 'src/app/model/DoanhNghiep/doanhNghiep-Data.model';
import { doanhNghiepService } from 'src/app/Sevices/DoanhNghiep/doanhNghiep.service';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {
  @Input() data_getDN: doanhNghiep_Data;
  constructor( private router: Router,private dNghiepService:doanhNghiepService) { }
  token=localStorage.getItem('auth-user-token');
  user=localStorage.getItem('auth-user');

  ngOnInit(): void {
    this.getDN();
  }
  getDN(){
    if(this.user){
      this.dNghiepService.getByName(this.user).subscribe((res: any) => {
           this.data_getDN = res;
           console.log(this.data_getDN.maDoanhNghiep);
          });    
    }
  }
  Logout(){
    localStorage.clear();
    window.location.reload(); 
    this.router.navigate(['/'])
  }

}
