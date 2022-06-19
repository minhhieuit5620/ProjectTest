import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { doanhNghiep_Data } from 'src/app/model/DoanhNghiep/doanhNghiep-Data.model';
import { DoanhNghiep_DTO } from 'src/app/model/DoanhNghiep/doanhNghiep.model';
import { doanhNghiepService } from 'src/app/Sevices/DoanhNghiep/doanhNghiep.service';


declare const $: any;
const datePipe = new DatePipe('en-US');



@Component({
  selector: 'app-company-mn',
  templateUrl: './company-mn.component.html',
  styleUrls: ['./company-mn.component.css']
})
export class CompanyMnComponent implements OnInit {

  form: any = {
    tmp: null,
   
};
  advancedPagination: number;
  isDisabled: boolean;
  constructor(
    private DoanhNghiepService:doanhNghiepService,
    private toastr:ToastrService,
  ) { }

  total:any;
  currentPage:number=1;

  dl:DoanhNghiep_DTO={ Data:{maDoanhNghiep: 0,maDinhDanhDn: 0,taiKhoan:' ',matKhau:' ',tenToChuc: ' ', diaChi:' ',tinhThanh:' ', dienThoai: ' ' ,email: ' ' ,website: ' ' ,nguoiKhaoSat: ' ' ,maNganh: 0 ,maLoaiHinh: 0,quyMo: ' ' ,tieuDe: ' ' ,moTa: ' ' ,trangThai:1, rol: 1 ,nguoiTao:' ',ngayTao:new Date,nguoiSua:' ',ngaySua:new Date}
  ,Page:{pageSize:10, pageIndex:1} };

  data_DN:doanhNghiep_Data[];
  @Input() data_getone:doanhNghiep_Data;

  ngOnInit(): void {
    this.getDN(1);
  }
  counter(i: number) {
    return new Array(i);
}

  getDN(a:number){
    this.dl={ Data:{maDoanhNghiep: 0,maDinhDanhDn: 0,taiKhoan:' ',matKhau:' ',tenToChuc: ' ', diaChi:' ',tinhThanh:' ', dienThoai: ' ' ,email: ' ' ,website: ' ' ,nguoiKhaoSat: ' ' ,maNganh: 0 ,maLoaiHinh: 0,quyMo: ' ' ,tieuDe: ' ' ,moTa: ' ' ,trangThai:1, rol: 1 ,nguoiTao:' ',ngayTao:new Date,nguoiSua:' ',ngaySua:new Date}
    ,Page:{pageSize:10, pageIndex:a} };
    this.DoanhNghiepService.getallDN(this.dl).subscribe((res:any)=>{
      this.data_DN=res.data;
      this.currentPage = a;
      this.total=res.pages;
      
    })
  }
  Search(a:number){
    this.dl={ Data:{maDoanhNghiep: 0,maDinhDanhDn: 0,taiKhoan:' ',matKhau:' ',tenToChuc: ' ', diaChi:' ',tinhThanh:' ', dienThoai: ' ' ,email: ' ' ,website: ' ' ,nguoiKhaoSat: ' ' ,maNganh: 0 ,maLoaiHinh: 0,quyMo: ' ' ,tieuDe: ' ' ,moTa: ' ' ,trangThai:1, rol: 1 ,nguoiTao:' ',ngayTao:new Date,nguoiSua:' ',ngaySua:new Date}
    ,Page:{pageSize:10, pageIndex:a} };
    this.DoanhNghiepService.searchDN(this.form.tmp,this.dl).subscribe((res:any)=>{
      this.data_DN=res.data;
      this.currentPage = a;
      this.total=res.pages;
      //console.log('DTO', this.total);
    })
  }
  getOne(id:number){    
    this.DoanhNghiepService.getOne(id).subscribe((res:any)=>{    
    this.data_getone=res;
    console.log(this.data_getone);
    })
  }
  update(id:number,tenToChuc:string,maSoThue:number,nguoiKhaoSat:string,diaChi:string,quyMo:string,SDT:string,email:string,website:string,maNganh:number,maLoaiHinh:number):any {
    var newdl={ Data:{maDoanhNghiep: id,maDinhDanhDn: maSoThue,taiKhoan:'',matKhau:'',tenToChuc: tenToChuc, diaChi:diaChi,tinhThanh:'', dienThoai: SDT ,email: email ,website: website ,nguoiKhaoSat: nguoiKhaoSat,maNganh: maNganh ,maLoaiHinh: maLoaiHinh,quyMo: quyMo ,tieuDe: ' ' ,moTa: ' ' ,trangThai:1, rol: 1 ,nguoiTao:' ',ngayTao:new Date,nguoiSua:' ',ngaySua:new Date}
    ,Page:{pageSize:60, pageIndex:1} };
    this.DoanhNghiepService.Put(newdl).subscribe   
      (data => {
        console.log(id);
        this.toastr.success("Sửa thành công");
        //this.data_DTO.push(data)     
      
        // this.getDN();
      })
  }



  delete_DN(id:number){
    this.DoanhNghiepService.Delete(id,this.dl).subscribe(
      (data:any) => {
        console.log(id);
        this.toastr.success("Xóa thành công");
       
        // this.getDN();
      },
      (error) => {
        this.toastr.warning("Xóa thất bại");
       
        console.log(error);
      }
    );
  }

  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
}
 


}
