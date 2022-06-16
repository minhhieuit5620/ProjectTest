import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CTKS_DN_CH_LC } from 'src/app/model/KhaoSat_DN/CTKS_DN_CH_LC.model';
import { khaoSat_DN } from 'src/app/model/KhaoSat_DN/khaoSat_DN.model';
import { CT_KhaoSatMn } from 'src/app/model/KhaoSat_Mn/chiTietKhaoSat_MN.model';
import { khaoSatMn_DTO } from 'src/app/model/KhaoSat_Mn/khaoSatMN-DTO.model';
import { khaoSat_Data } from 'src/app/model/KhaoSat_Mn/khaoSat_Data.model';
import { KhaoSatService } from 'src/app/Sevices/KhaoSat/khaoSat.service';
import * as XLSX from 'xlsx';

declare const $: any;
const datePipe = new DatePipe('en-US');

@Component({
  selector: 'app-khao-sat',
  templateUrl: './khao-sat.component.html',
  styleUrls: ['./khao-sat.component.css']
})
export class KhaoSatComponent implements OnInit {

  data:khaoSat_Data[];

  data_CT:CT_KhaoSatMn[];
  //NCH_data:NhomCauHoi_Data={maNhomCauHoi: 1,tenNhomCauHoi: '', maTieuChiCha:0,trangThai:0, nguoiThem: 'string' ,ngayThem:new Date,nguoiSua:'string',ngaySua:new Date}
  dl:khaoSatMn_DTO={ Data:{maKhaoSat: 0,maDoanhNghiep: 0,maDotKhaoSat:0, trangThai:0, ngayDanhGia:new Date,nguoiSua:' ',ngaySua:new Date}
  ,Page:{pageSize:60, pageIndex:1} };
  ctks:CT_KhaoSatMn={maChiTietKhaoSat:0,maKhaoSat:0,maCauHoi:0,maLuaChon:0,thoiGianTraLoi:new Date(),giaTriNhap:' ',trangThai:1}
 
  //data khaosat
  data_KS:khaoSat_DN={maDoanhNghiep:0,maDinhDanhDn:0,taiKhoan:' ',matKhau:' ',tenToChuc:' ',diaChi:' ',tinhThanh:' ',dienThoai:' ',email:' ',website:' ',nguoiDungDau:' ',maNganh:1,maLoaiHinh:1,quyMo:' ',tieuDe:' ',moTa:' ',trangThai:0,rol:1,nguoiTao:' ',ngayTao:new Date(),ngaySua:new Date(),nguoiSua:' ',maKhaoSat:0,maDoanhNghiep_ks:0,ngayDanhGia:new Date(),ngaySua_ks:new Date(),maDotKhaoSat:1,trangThai_ks:1}
  KS_DN:khaoSat_DN[];

  //data CTKS_CH_LC
  CTKS_CH_LC:CTKS_DN_CH_LC[];
  
  

  advancedPagination: number;
  isDisabled: boolean;
  constructor(
    private KhaoSatServices: KhaoSatService,
  ) {
    this.advancedPagination = 1;
    this.isDisabled = true;
   }

  ngOnInit(): void {
    this. GetAll();
    this.getKhaoSat_DN();
  }

  GetAll(){
    
    // return this.httpClient.get<Product[]>(baseURL + '/Getproducts').toPromise().then(res => <Product[]>res).then(data => {return data;});
    //return this.NhomCauHoiService.getall().toPromise().then(res => <NhomCauHoi[]>res).then(data => {return data;})
    this.KhaoSatServices.getAllKS(this.dl).subscribe((res:any)=>{
      this.data=res.data;
     // console.log(this.data);
    })
  }

  getKhaoSat_DN(){
    this.KhaoSatServices.getKhaoSat_DN(this.data_KS).subscribe((res:any)=>{
      this.KS_DN=res.data;
      //console.log("khao sat",this.KS_DN);
    })
  }

  sl:number;
  getCTKS(id:number){
    this.KhaoSatServices.getCTKS_CH_LC(id).subscribe((res:any)=>{
      this.CTKS_CH_LC=res.data;
      this.sl=this.CTKS_CH_LC.length;
      console.log(this.CTKS_CH_LC);
    })
  }
  delete_KS(id:number){
    this.KhaoSatServices.deleteCTKS(id,this.ctks).subscribe(
      (data:any) => {
     
        //this.showSuccess('Xoá thông tin bệnh nhân thành công!');
      //  $('#Xoa').modal('hide');
     
      },
      (error) => {
      //  this.showError('Xoá thông tin bệnh nhân không thành công!');
        console.log(error);
      }
    );
    this.KhaoSatServices.deleteKhaoSat(id,this.dl).subscribe(
      (data:any) => {     
        //this.showSuccess('Xoá thông tin bệnh nhân thành công!');
      //  $('#Xoa').nativeElement.click();
        this.GetAll();
      },
      (error) => {
      //  this.showError('Xoá thông tin bệnh nhân không thành công!');
        console.log(error);
      }
    );
   
  
  }
 
  


   fileName = 'ExcelFile.xlsx';
  exportExcel():void{
   /* pass here the table id */
   let element = document.getElementById('excel-table');
   const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

   /* generate workbook and add the worksheet */
   const wb: XLSX.WorkBook = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

   /* save to file */  
   XLSX.writeFile(wb, this.fileName);

  }
}
