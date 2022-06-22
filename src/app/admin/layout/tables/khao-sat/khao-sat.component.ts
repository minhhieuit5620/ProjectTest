import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { dotKhaoSat_Data } from 'src/app/model/DotKhaoSat/dotKhaoSat-Data.model';
import { dotKhaoSat_DTO } from 'src/app/model/DotKhaoSat/dotKhaoSat.model';
import { CTKS_DN_CH_LC } from 'src/app/model/KhaoSat_DN/CTKS_DN_CH_LC.model';
import { khaoSat_DN } from 'src/app/model/KhaoSat_DN/khaoSat_DN.model';
import { CT_KhaoSatMn } from 'src/app/model/KhaoSat_Mn/chiTietKhaoSat_MN.model';
import { khaoSatMn_DTO } from 'src/app/model/KhaoSat_Mn/khaoSatMN-DTO.model';
import { khaoSat_Data } from 'src/app/model/KhaoSat_Mn/khaoSat_Data.model';
import { DotKhaoSatService } from 'src/app/Sevices/DotKhaoSat/dotKhaoSat.service';
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
  data_KS:khaoSat_DN={maDoanhNghiep:0,maDinhDanhDn:0,taiKhoan:' ',matKhau:' ',tenToChuc:' ',diaChi:' ',tinhThanh:' ',dienThoai:' ',email:' ',website:' ',nguoiKhaoSat:' ',maNganh:1,maLoaiHinh:1,quyMo:' ',tieuDe:' ',moTa:' ',trangThai:0,rol:1,nguoiTao:' ',ngayTao:new Date(),ngaySua:new Date(),nguoiSua:' ',
  maKhaoSat:0,maDoanhNghiep_ks:0,ngayDanhGia:new Date(),ngaySua_ks:new Date(),maDotKhaoSat:1,trangThai_ks:1
  ,maDotKhaoSat_dks:0,tenDotKhaoSat_dks:' ',moTa_dks:' ',ngayBatDau:new Date(),ngayKetThuc:new Date,fileBaoCaoKetQua:' ',ngaytao_dks:new Date,maNguoitao:1,maNguoiSua:1,ngaySua_dks:new Date,fileKeHoach:' ',fileQuyetDinh:' ',trangThai_dks:1
}
  KS_DN:khaoSat_DN[];

  //data CTKS_CH_LC
  @Input() CTKS_CH_LC:CTKS_DN_CH_LC[];
  
  //dotKhaoSat
  dks: dotKhaoSat_DTO = {Data: { maDotKhaoSat: 0,  tenDotKhaoSat: ' ', moTa: ' ', ngayBatDau:new Date,ngayKetThuc:new Date, trangThai: 1,fileBaoCaoKetQua:' ', maNguoitao: 0, ngaytao: new Date, maNguoiSua: 0, ngaySua: new Date ,fileQuyetDinh:' ',fileKeHoach:' '}
  , Page: {  pageIndex: 1 }};
  data_DKS:dotKhaoSat_Data[];

  advancedPagination: number;
  isDisabled: boolean;
  constructor(
    private dotKhaoSatServices: DotKhaoSatService,
    private KhaoSatServices: KhaoSatService,
    private toastr:ToastrService,
  ) {
    this.advancedPagination = 1;
    this.isDisabled = true;
   }

  ngOnInit(): void {
    this. GetAll();
    this.getKhaoSat_DN();
    this.GetAllDot();
  }

  GetAllDot(){    
   
    this.dotKhaoSatServices.getall(this.dks).subscribe((res:any)=>{
      this.data_DKS=res.data;    
    })
  }

  selectedLoai: string = '';  
  selectChangeHandler (event: any) {
    //update the ui
    this.selectedLoai = event.target.value;
  }


  GetAll(){
    this.KhaoSatServices.getAllKS(this.dl).subscribe((res:any)=>{
      this.data=res.data;
    })
  }

  getKhaoSat_DN(){
    this.KhaoSatServices.getKhaoSat_DN(this.data_KS).subscribe((res:any)=>{
      this.KS_DN=res.data;     
    })
  }

  sl:number;
  getCTKS(id:number){
    this.KhaoSatServices.getCTKS_CH_LC(id).subscribe((res:any)=>{
      this.CTKS_CH_LC=res.data;
      this.sl=this.CTKS_CH_LC.length;
      
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
      this.toastr.success("Xóa thành công")
     // $('#Xoa').modal('hide');
        this.GetAll();
      },
      (error) => {
        this.toastr.warning("Xóa thất bại")
       // $('#Xoa').modal('hide');
        console.log(error);
      }
    );
   
  
  }
 
  


   fileName = 'KhaoSatKHCN.xlsx';
  exportExcel():void{
    const title = 'Kết quả khảo sát doanh nghiệp'+this.KS_DN[0].tenToChuc;
   /* pass here the table id */
   let element = document.getElementById('excel-table');
   const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);


   const titleRow : XLSX.WorkSheet=([title]);
   
   /* generate workbook and add the worksheet */
  
   const wb: XLSX.WorkBook = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
   /* save to file */  
   XLSX.writeFile(wb, this.KS_DN[0].tenToChuc+this.fileName);
   this.toastr.success("Xuất file thành công")

  }
}
