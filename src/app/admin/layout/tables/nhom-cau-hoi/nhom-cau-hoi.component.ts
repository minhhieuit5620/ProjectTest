import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
 import { NhomCauHoiService } from 'src/app/Sevices/NhomCauHoi/nhom-cau-hoi.service';
import { NhomCauHoi_Data } from 'src/app/model/NhomCauHoi/nhom-cau-hoi-data.model';
import { NhomCauHoi_DTO } from 'src/app/model/NhomCauHoi/nhom-cau-hoi.model';
import { ToastrService } from 'ngx-toastr';

declare const $: any;
const datePipe = new DatePipe('en-US');

@Component({
  selector: 'app-nhom-cau-hoi',
  templateUrl: './nhom-cau-hoi.component.html',
  styleUrls: ['./nhom-cau-hoi.component.css']
})
export class NhomCauHoiComponent implements OnInit {

  @Input() data_getone:NhomCauHoi_Data;
  ngayTao = datePipe.transform(Date.now(), 'yyyy-MM-dd'); 

  form: any = {
    tmp: null,
   
};

total:any;
currentPage:number=1;


  data:NhomCauHoi_Data[];
  data_DTO:NhomCauHoi_DTO[]=[];
  DTO:NhomCauHoi_DTO;
  NCH_data:NhomCauHoi_Data={maNhomCauHoi: 1,tenNhomCauHoi: '', maTieuChiCha:0,trangThai:0, nguoiThem: 'string' ,ngayThem:new Date,nguoiSua:'string',ngaySua:new Date}
  dl:NhomCauHoi_DTO={ Data:{maNhomCauHoi: 0,tenNhomCauHoi: ' ', maTieuChiCha:0,trangThai:0, nguoiThem: ' ' ,ngayThem:new Date,nguoiSua:' ',ngaySua:new Date}
  ,Page:{pageSize:60, pageIndex:1} };

  
  advancedPagination: number;
  isDisabled: boolean;
  constructor(   
    private NhomCauHoiService: NhomCauHoiService,
    private toastr:ToastrService,
  ) {
    this.advancedPagination = 1;
    this.isDisabled = true;
   }

  ngOnInit(): void {
    this.GetAll(1);
  }

  

  GetAll(a:number){    
    this.dl={ Data:{maNhomCauHoi: 0,tenNhomCauHoi: ' ', maTieuChiCha:0,trangThai:0, nguoiThem: ' ' ,ngayThem:new Date,nguoiSua:' ',ngaySua:new Date}
    ,Page:{pageSize:60, pageIndex:a} };
    this.NhomCauHoiService.getall(this.dl).subscribe((res:any)=>{
      this.data=res.data;
      this.currentPage = a;
      this.total=res.pages;
     // console.log('DTO', this.total);
    })
  }
  Search(a:number){
    this.dl={ Data:{maNhomCauHoi: 0,tenNhomCauHoi: ' ', maTieuChiCha:0,trangThai:0, nguoiThem: ' ' ,ngayThem:new Date,nguoiSua:' ',ngaySua:new Date}
    ,Page:{pageSize:60, pageIndex:a} };
    this.NhomCauHoiService.searchNCH(this.form.tmp,this.dl).subscribe((res:any)=>{
      this.data=res.data;
      this.currentPage = a;
      this.total=res.pages;
      //console.log('DTO', this.total);
    })
  }

  Add():any{
    this.NhomCauHoiService.Add_NCH(this.dl).subscribe(datas=>{this.data_DTO.push(datas)})
    this.toastr.success("Thêm thành công")
    this.GetAll(1);
   // return this.GetAll();
  }
//vẫn dùng được
  // GetOne(id:number){
  //   this.NhomCauHoiService.getOne(id,this.dl).toPromise()
  //   .then((res) => <NhomCauHoi_DTO>res)
  //   .then((data) => {
  //     this.data_getone = data;
  //     //this.setValue(data);
  //     console.log(this.data_getone);
  //   });
  // }
  getOne(id:number){
    
    this.NhomCauHoiService.getOne(id).subscribe((res:any)=>{
     
    this.data_getone=res;
    //console.log(this.data_getone);
    })
  }


  update(id:number,ten:string,tieuchicha:number,trangthai:number):any {
    this.dl={ Data:{maNhomCauHoi: id,tenNhomCauHoi:ten, maTieuChiCha:tieuchicha,trangThai:trangthai, nguoiThem: 'Hieu' ,ngayThem:new Date,nguoiSua:' ',ngaySua:new Date}
    ,Page:{pageSize:60, pageIndex:1} };
    this.NhomCauHoiService.Put_NCH(this.dl).subscribe   
      (data => {
        console.log(id);
        this.toastr.success("Sửa thành công")  
        this.GetAll(1);       
      })//,
    
  }

  counter(i: number) {
    return new Array(i);
}

  Put(){

  }
  delete_NCH(id:number){
    this.NhomCauHoiService.Delete_NCH(id,this.dl).subscribe(
      (data:any) => {
        console.log(id);
        this.toastr.success("Xóa thành công")
        this.GetAll(1);
      },
      (error) => {
        this.toastr.success("Xóa thất bại")  
        console.log(error);
      }
    );
  }



  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
}
 

}
