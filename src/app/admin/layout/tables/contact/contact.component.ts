import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { lienHe_Data } from 'src/app/model/LienHe/lienHe-Data.model';
import { lienHe_DTO } from 'src/app/model/LienHe/lienHe.model';
import { LienHeService } from 'src/app/Sevices/LienHe/lienHe.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  form: any = {
    tmp: null,
   
};

  total:any;
  currentPage:number=1;

  data:lienHe_Data[];
  dl:lienHe_DTO={ Data:{maLienHe: 0,tenNguoiLienHe: " " ,dienThoai:' ',email:' ',maDinhDanhDN: 1, tenDoanhNghiep:'',noiDungLH:' ', thoiGianGui: new Date ,thoiGianTraLoi: new Date ,trangThai:1}
  ,Page:{ pageIndex:1} };
  @Input() data_get: lienHe_Data;

  constructor(
private ContactService:LienHeService,
private toastr:ToastrService,
  ) { }

  ngOnInit(): void {
    this.GetAll(1);
  }

  GetAll(a:number){    
   this.dl={ Data:{maLienHe: 0,tenNguoiLienHe: " " ,dienThoai:' ',email:' ',maDinhDanhDN: 1, tenDoanhNghiep:'',noiDungLH:' ', thoiGianGui: new Date ,thoiGianTraLoi: new Date ,trangThai:1}
  ,Page:{ pageIndex:a} };
    this.ContactService.getall(this.dl).subscribe((res:any)=>{
      this.data=res.data;
      this.currentPage = a;
      this.total=res.pages;
    })
  }
  Search(a:number){
    this.dl={ Data:{maLienHe: 0,tenNguoiLienHe: " " ,dienThoai:' ',email:' ',maDinhDanhDN: 1, tenDoanhNghiep:'',noiDungLH:' ', thoiGianGui: new Date ,thoiGianTraLoi: new Date ,trangThai:1}
  ,Page:{ pageIndex:a} };
    this.ContactService.searchLH(this.form.tmp,this.dl).subscribe((res:any)=>{
      this.data=res.data;
      this.currentPage = a;
      this.total=res.pages;
    })
  }

  getOne(id:number){
    
    this.ContactService.getOne(id).subscribe((res:any)=>{
     
    this.data_get=res;
  
    })
  }


  // update(id:number,ten:string,tieuchicha:number,trangthai:number):any {
  //   this.dl={ Data:{maNhomCauHoi: id,tenNhomCauHoi:ten, maTieuChiCha:tieuchicha,trangThai:trangthai, nguoiThem: 'Hieu' ,ngayThem:new Date,nguoiSua:' ',ngaySua:new Date}
  //   ,Page:{pageSize:60, pageIndex:1} };
  //   this.NhomCauHoiService.Put_NCH(this.dl).subscribe   
  //     (data => {
  //       console.log(id);
  //       this.toastr.success("S???a th??nh c??ng")  
  //       $('#Sua').modal('hide');
  //       // this.GetAll();
  //     })//,
    
  // }

  counter(i: number) {
    return new Array(i);
  }

  Put(){

  }
  delete_NCH(id:number){
    this.ContactService.Delete_LH(id,this.dl).subscribe(
      (data:any) => {
       
        //this.showSuccess('Xo?? th??ng tin b???nh nh??n th??nh c??ng!');
        this.toastr.success("X??a th??nh c??ng")
    
         this.GetAll(1);
      },
      (error) => {
        this.toastr.success("X??a th???t b???i")
      //  this.showError('Xo?? th??ng tin b???nh nh??n kh??ng th??nh c??ng!');
        console.log(error);
      }
    );
  }





}
