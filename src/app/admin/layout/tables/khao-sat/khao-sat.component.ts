import { Component, OnInit } from '@angular/core';
import { CT_KhaoSatMn } from 'src/app/model/KhaoSat_Mn/chiTietKhaoSat_MN.model';
import { khaoSatMn_DTO } from 'src/app/model/KhaoSat_Mn/khaoSatMN-DTO.model';
import { khaoSat_Data } from 'src/app/model/KhaoSat_Mn/khaoSat_Data.model';
import { KhaoSatService } from 'src/app/Sevices/KhaoSat/khaoSat.service';
import * as XLSX from 'xlsx';
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
  }

  GetAll(){
    
    // return this.httpClient.get<Product[]>(baseURL + '/Getproducts').toPromise().then(res => <Product[]>res).then(data => {return data;});
    //return this.NhomCauHoiService.getall().toPromise().then(res => <NhomCauHoi[]>res).then(data => {return data;})
    this.KhaoSatServices.getAllKS(this.dl).subscribe((res:any)=>{
      this.data=res.data;
      console.log(this.data);
    })
  }

  getCTKS(id:number){
    this.KhaoSatServices.getCTKS(id).subscribe((res:any)=>{
      this.data_CT=res.data;
      console.log(this.data_CT);
    })
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
