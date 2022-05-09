import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
 import { NhomCauHoiService } from 'src/app/Sevices/NhomCauHoi/nhom-cau-hoi.service';
import { NhomCauHoi_Data } from 'src/app/model/NhomCauHoi/nhom-cau-hoi-data.model';
import { NhomCauHoi_DTO } from 'src/app/model/NhomCauHoi/nhom-cau-hoi.model';

declare const $: any;
const datePipe = new DatePipe('en-US');

@Component({
  selector: 'app-nhom-cau-hoi',
  templateUrl: './nhom-cau-hoi.component.html',
  styleUrls: ['./nhom-cau-hoi.component.css']
})
export class NhomCauHoiComponent implements OnInit {

  ngayTao = datePipe.transform(Date.now(), 'yyyy-MM-dd');

  form = new FormGroup({
    tenBenhNhan: new FormControl(null, [Validators.required]),
    gioiTinh: new FormControl(true, [Validators.required]),
    namSinh: new FormControl(null, [Validators.required]),
    diaChi: new FormControl(null, [Validators.required]),
    soDt: new FormControl(null, [Validators.required]),
    ngheNghiep: new FormControl(null, [Validators.required]),
    ngayTao: new FormControl(this.ngayTao, [Validators.required]),
  });




 // users=["hieu","hieu","hieu","hieu","hieu","hieu"]
 pageSize=20;
 pageIndex=1;

  data_getone:NhomCauHoi_DTO;
  data:NhomCauHoi_Data[];
  data_DTO:NhomCauHoi_DTO[]=[];
  NCH_data:NhomCauHoi_Data={maNhomCauHoi: 1,tenNhomCauHoi: '', maTieuChiCha:0,trangThai:0, nguoiThem: 'string' ,ngayThem:new Date,nguoiSua:'string',ngaySua:new Date}
  dl:NhomCauHoi_DTO={ Data:{maNhomCauHoi: 0,tenNhomCauHoi: ' ', maTieuChiCha:0,trangThai:0, nguoiThem: ' ' ,ngayThem:new Date,nguoiSua:' ',ngaySua:new Date}
  ,Page:{pageSize:60, pageIndex:1} };


  advancedPagination: number;
  isDisabled: boolean;
  constructor(
   
    private NhomCauHoiService: NhomCauHoiService,
  ) {
    this.advancedPagination = 1;
    this.isDisabled = true;
   }

  ngOnInit(): void {
    this.GetAll();
  }
  setValue(benhNhan: any) {
    this.form.setValue({
      tenBenhNhan: benhNhan.tenBenhNhan,
      gioiTinh: benhNhan.gioiTinh,
      namSinh: datePipe.transform(benhNhan.namSinh, 'yyyy-MM-dd'),
      diaChi: benhNhan.diaChi,
      soDt: benhNhan.soDt,
      ngheNghiep: benhNhan.ngheNghiep,
      ngayTao: datePipe.transform(Date.now(), 'yyyy-MM-dd'),
    });
  }
  

  GetAll(){
    
    // return this.httpClient.get<Product[]>(baseURL + '/Getproducts').toPromise().then(res => <Product[]>res).then(data => {return data;});
    //return this.NhomCauHoiService.getall().toPromise().then(res => <NhomCauHoi[]>res).then(data => {return data;})
    this.NhomCauHoiService.getall(this.dl).subscribe((res:any)=>{
      this.data=res.data;
      console.log(this.data);
    })
  }


  Add():any{
    this.NhomCauHoiService.Add_NCH(this.dl).subscribe(datas=>{this.data_DTO.push(datas)})
    return this.GetAll();
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
    
    this.NhomCauHoiService.getOne(id,this.dl).subscribe((res:any)=>{
     
    this.data_getone=res;
    console.log(this.data_getone);
    })
  }

  // GetOne(id:number){
  //   this.NhomCauHoiService.getOne(id,this.dl) .subscribe((res:any)=>{this.data_getone=res.data})
  //   // .then((res) => <NhomCauHoi_DTO>res)
  //   // .then((data) => {
  //   //   this.data_getone = data;
  //   //   //this.setValue(data);
  //      console.log(this.data_getone);
  //   // });
  // }

  update(id:number,ten:string,tieuchicha:number,trangthai:number):any {
    this.dl={ Data:{maNhomCauHoi: id,tenNhomCauHoi:ten, maTieuChiCha:tieuchicha,trangThai:trangthai, nguoiThem: 'Hieu' ,ngayThem:new Date,nguoiSua:' ',ngaySua:new Date}
    ,Page:{pageSize:60, pageIndex:1} };
    this.NhomCauHoiService.Put_NCH(this.dl).subscribe   
      (data => {
        console.log(id);
        //this.data_DTO.push(data)     
        $('#Sua').modal('hide');
        this.GetAll();
      })//,
    //   (error) => {
    //  
    //     console.log(error);
    //   }
    // );
  }

  Put(){

  }
  delete_NCH(id:number){
    this.NhomCauHoiService.Delete_NCH(id,this.dl).subscribe(
      (data:any) => {
        console.log(id);
        //this.showSuccess('Xoá thông tin bệnh nhân thành công!');
        $('#Xoa').modal('hide');
        this.GetAll();
      },
      (error) => {
      //  this.showError('Xoá thông tin bệnh nhân không thành công!');
        console.log(error);
      }
    );
  }



  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
}
 

}
