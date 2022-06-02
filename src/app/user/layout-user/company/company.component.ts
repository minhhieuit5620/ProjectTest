import { Component, OnInit } from '@angular/core';
import { doanhNghiep_Data } from 'src/app/model/DoanhNghiep/doanhNghiep-Data.model';
import { DoanhNghiep_DTO } from 'src/app/model/DoanhNghiep/doanhNghiep.model';
import { doanhNghiepService } from 'src/app/Sevices/DoanhNghiep/doanhNghiep.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  constructor(
    private DoanhNghiepService:doanhNghiepService
  ) { }

  
  dl:DoanhNghiep_DTO={ Data:{maDoanhNghiep: 0,maDinhDanhDN: 0,taiKhoan:' ',matKhau:' ',tenToChuc: ' ', diaChi:' ',tinhThanh:' ', dienThoai: ' ' ,email: ' ' ,website: ' ' ,nguoiDungDau: ' ' ,maNganh: 0 ,maLoaiHinh: 0,quyMo: ' ' ,tieuDe: ' ' ,moTa: ' ' ,trangThai:1, rol: 1 ,nguoiTao:' ',ngayTao:new Date,nguoiSua:' ',ngaySua:new Date}
  ,Page:{pageSize:10, pageIndex:1} };
  data_DN:doanhNghiep_Data[];

  ngOnInit(): void {
    this.getDN();
  }

  getDN(){
    this.DoanhNghiepService.getallDN(this.dl).subscribe((res:any)=>{
      this.data_DN=res.data;
      console.log('DN',this.data_DN);
    })
  }
}
