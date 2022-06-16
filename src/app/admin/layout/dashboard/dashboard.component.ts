import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CauHoi_DTO } from 'src/app/model/CauHoi/cau-hoi-DTO.model';
import { DoanhNghiep_DTO } from 'src/app/model/DoanhNghiep/doanhNghiep.model';
import { khaoSatMn_DTO } from 'src/app/model/KhaoSat_Mn/khaoSatMN-DTO.model';
import { User_DTO } from 'src/app/model/User/user-DTO.model';
import { CauHoiService } from 'src/app/Sevices/CauHoi/cau-hoi.service';
import { doanhNghiepService } from 'src/app/Sevices/DoanhNghiep/doanhNghiep.service';
import { KhaoSatService } from 'src/app/Sevices/KhaoSat/khaoSat.service';
import { UserService } from 'src/app/Sevices/User/user.service';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];


    @Input() bgClass: string;
    @Input() icon: string;
    @Input() count: number;
    @Input() label: string;
    @Input() data: number;
    @Output() event: EventEmitter<any> = new EventEmitter();

    cauHoi: CauHoi_DTO = { Data: { maCauHoi: 0, noiDung: ' ', goiYcauHoi: ' ', maLoaiCauHoi: 0, maNhomCauHoi: 0, trangThai: 0, nguoiThem: ' ', ngayThem: new Date, nguoiSua: ' ', ngaySua: new Date }
    , Page: { pageSize: 60, pageIndex: 1 }};
    totalQ:any;

    user:User_DTO={ Data:{id: 0,taiKhoan: ' ', matKhau:' ',trangThai:1, hoVaTen: ' ',soDienThoai:' ',email:' ',rol:2,ngayTao:new Date,nguoiTao:' ',nguoiSua:' ',ngaySua:new Date}
    ,Page:{pageSize:60, pageIndex:1} };
    totalUser:any;

    doanhNghiep:DoanhNghiep_DTO={ Data:{maDoanhNghiep: 0,maDinhDanhDn: 0,taiKhoan:' ',matKhau:' ',tenToChuc: ' ', diaChi:' ',tinhThanh:' ', dienThoai: ' ' ,email: ' ' ,website: ' ' ,nguoiDungDau: ' ' ,maNganh: 0 ,maLoaiHinh: 0,quyMo: ' ' ,tieuDe: ' ' ,moTa: ' ' ,trangThai:1, rol: 1 ,nguoiTao:' ',ngayTao:new Date,nguoiSua:' ',ngaySua:new Date}
    ,Page:{pageSize:10, pageIndex:1} };
    totalDN:any;

    khaoSat:khaoSatMn_DTO={ Data:{maKhaoSat: 0,maDoanhNghiep: 0,maDotKhaoSat:0, trangThai:0, ngayDanhGia:new Date,nguoiSua:' ',ngaySua:new Date}
    ,Page:{pageSize:60, pageIndex:1} };
    totalKS:any;

    constructor(
        private DoanhNghiepService:doanhNghiepService,
        private KhaoSatServices:KhaoSatService,
        private CauHoiService:CauHoiService,
        private UserService:UserService

    ) {
        this.sliders.push(
            {
                imagePath: './././assets/Admin/images/slider1.jpg',
                label: 'First slide label',
                text: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
            },
            {
                imagePath: './././assets/Admin/images/slider2.jpg',
                label: 'Second slide label',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            },
            {
                imagePath: './././assets/Admin/images/slider3.jpg',
                label: 'Third slide label',
                text: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
            }
        );

        this.alerts.push(
            {
                id: 1,
                type: 'success',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            },
            {
                id: 2,
                type: 'warning',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            }
        );
    }

    ngOnInit() {
        this.getDN();
        this.getQ();
        this.GetKS();
        this.getUser();
    }

    getDN(){   
        this.DoanhNghiepService.getallDN(this.doanhNghiep).subscribe((res:any)=>{                
          this.totalDN=res.totalRecord;        
        })
      }      
  GetKS(){   
    this.KhaoSatServices.getAllKS(this.khaoSat).subscribe((res:any)=>{     
      this.totalKS=res.totalRecord
      
    })
  }

  getQ(){
    
    this.CauHoiService.getall(this.cauHoi).subscribe((res:any)=>{
        this.totalQ=res.totalRecord
    })
  }
 getUser(){    

    this.UserService.getall(this.user).subscribe((res:any)=>{
        this.totalUser=res.totalRecord
    })
  }





    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

}
