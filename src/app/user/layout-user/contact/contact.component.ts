import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { doanhNghiep_Data } from 'src/app/model/DoanhNghiep/doanhNghiep-Data.model';
import { lienHe_DTO } from 'src/app/model/LienHe/lienHe.model';
import { doanhNghiepService } from 'src/app/Sevices/DoanhNghiep/doanhNghiep.service';
import { LienHeService } from 'src/app/Sevices/LienHe/lienHe.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  token=localStorage.getItem('auth-user-token');
  user=localStorage.getItem('auth-user');
  form: any = {
    TenNguoiLH: null,
    Email:null,
    Phone:null,
    Content: null
  };
  validateEmail = true;
  errorMessage = ''; 
  data_DTO:lienHe_DTO[]=[];
  dl:lienHe_DTO={ Data:{maLienHe: 0,tenNguoiLienHe: this.form.TenNguoiLH ,dienThoai:this.form.Phone,email:this.form.Email,maDinhDanhDN: 1, tenDoanhNghiep:'',noiDungLH:this.form.Content, thoiGianGui: new Date ,thoiGianTraLoi: new Date ,trangThai:1}
  ,Page:{ pageIndex:1} };
  @Input() data_getDN: doanhNghiep_Data;
 
  constructor(
    private LHService:LienHeService,
    private toastr:ToastrService,
    private dNghiepService:doanhNghiepService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.getDN();
  }

  getDN(){
    if(this.user){
      this.dNghiepService.getByName(this.user).subscribe((res: any) => {
           this.data_getDN = res;
           //console.log('maDN',this.data_getDN);
          });    
    }
  }
  onSubmit(): void {
  this.dl={ Data:{maLienHe: 0,tenNguoiLienHe: this.form.TenNguoiLH ,dienThoai:this.form.Phone,email:this.form.Email,maDinhDanhDN: this.data_getDN.maDinhDanhDn, tenDoanhNghiep: this.data_getDN.tenToChuc,noiDungLH:this.form.Content, thoiGianGui: new Date ,thoiGianTraLoi: new Date ,trangThai:1}
  ,Page:{ pageIndex:1} };
//console.log(this.dl);
    this.LHService.Add_LH(this.dl).subscribe(
      (datas)=>{
        this.data_DTO.push(datas);
        this.toastr.success('Gửi thành công', 'Thành công ');    
        this.route.navigate(['/']);
      },   
    (err) => {
      console.log("errorMessage");
            this.errorMessage = err.error.message;
            this.toastr.warning('Gửi thất bại', 'Thất bại ');          
       }
    );


  }

}
