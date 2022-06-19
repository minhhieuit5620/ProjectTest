import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CauHoi_Data } from 'src/app/model/CauHoi/cau-hoi-data.model';
import { CauHoi_DTO } from 'src/app/model/CauHoi/cau-hoi-DTO.model';
import { CauHoi } from 'src/app/model/CauHoi_DapAnDTO/cau-hoi.model';
import { CauHoi_DapAnDTO } from 'src/app/model/CauHoi_DapAnDTO/cauhoi-dapan-DTO.model';
import { LuaChon_Data } from 'src/app/model/LuaChon/lua-chon-data.model';
import { LuaChon_DTO } from 'src/app/model/LuaChon/lua-chon-DTO.model';
import { NhomCauHoi_Data } from 'src/app/model/NhomCauHoi/nhom-cau-hoi-data.model';
import { NhomCauHoi_DTO } from 'src/app/model/NhomCauHoi/nhom-cau-hoi.model';
import { CauHoiService } from 'src/app/Sevices/CauHoi/cau-hoi.service';
import { LuaChonService } from 'src/app/Sevices/LuaChon/lua-chon.service';
import { NhomCauHoiService } from 'src/app/Sevices/NhomCauHoi/nhom-cau-hoi.service';


declare const $: any;
const datePipe = new DatePipe('en-US');


@Component({
  selector: 'app-q-and-a',
  templateUrl: './q-and-a.component.html',
  styleUrls: ['./q-and-a.component.css']
})
export class QAndAComponent implements OnInit {


  constructor(
    private CauHoiService:CauHoiService,
    private NhomCauHoiService: NhomCauHoiService,
    private LChon:LuaChonService,
    private toastr:ToastrService,
  ) {
  
   }

// data Nhóm câu hỏi
dataNCH:NhomCauHoi_Data[];
dlNCH:NhomCauHoi_DTO={ Data:{maNhomCauHoi: 0,tenNhomCauHoi: ' ', maTieuChiCha:0,trangThai:0, nguoiThem: ' ' ,ngayThem:new Date,nguoiSua:' ',ngaySua:new Date}
,Page:{pageSize:60, pageIndex:1} };




//Data Câu hỏi lựa chọn
  dl: CauHoi_DTO = {
    Data: { maCauHoi: 0, noiDung: ' ', goiYcauHoi: ' ', maLoaiCauHoi: 0, maNhomCauHoi: 0, trangThai: 0, nguoiThem: ' ', ngayThem: new Date, nguoiSua: ' ', ngaySua: new Date }
    , Page: { pageSize: 60, pageIndex: 1 }
  };

  dlAdd:CauHoi_DapAnDTO={
    CauHoi:{maCauHoi:0,noiDung:"",goiYcauHoi:"",maLoaiCauHoi:1,maNhomCauHoi:1,trangThai:1,nguoiThem:"Hiếu",nguoiSua:" ",ngayThem:new Date,ngaySua:new Date},
    LuaChon:[]
  }
  //CauHois:CauHoi={maCauHoi:0,noiDung:"",goiYcauHoi:"",maLoaiCauHoi:1,maNhomCauHoi:1,trangThai:1,nguoiThem:"Hiếu",nguoiSua:" ",ngayThem:new Date,ngaySua:new Date}

  form: any = {
    tmp: null,   
};

  lc:any[]=[];
  lc2:any[]=[];

  total:any;
  currentPage:number=1;

  data_Q:CauHoi_Data[];
   @Input() data_getone:CauHoi_Data;
   data_Answer: LuaChon_Data[];


   data_Lc:LuaChon_DTO={Data:{maLuaChon:0,maCauHoi:0,noiDung:" ",trangThai:0},
  Page:{pageSize:20,pageIndex:1}}

  ngOnInit(): void {
    this.getQ(1);
    this.GetAllNCH();
  }

  getQ(a:number){
    this.dl = {
      Data: { maCauHoi: 0, noiDung: ' ', goiYcauHoi: ' ', maLoaiCauHoi: 0, maNhomCauHoi: 0, trangThai: 0, nguoiThem: ' ', ngayThem: new Date, nguoiSua: ' ', ngaySua: new Date }
      , Page: { pageSize: 60, pageIndex:a }
    };
    this.CauHoiService.getall(this.dl).subscribe((res:any)=>{
      this.data_Q=res.data;
      this.currentPage = a;
      this.total=res.pages;
    })
  }
  counter(i: number) {
    return new Array(i);
  }
  getOne(id:number){    
    this.CauHoiService.getOne(id).subscribe((res:any)=>{     
    this.data_getone=res;    
    console.log(this.data_getone);
    })
    this.CauHoiService.getAnswers(id).subscribe((res: any) => {
      this.data_Answer = res.data;
      console.log(this.data_Answer);
    })
  }
  Search(a:number){
    this.dl = {
      Data: { maCauHoi: 0, noiDung: ' ', goiYcauHoi: ' ', maLoaiCauHoi: 0, maNhomCauHoi: 0, trangThai: 0, nguoiThem: ' ', ngayThem: new Date, nguoiSua: ' ', ngaySua: new Date }
      , Page: { pageSize: 60, pageIndex:a }
    };
    this.CauHoiService.searchCH(this.form.tmp,this.dl).subscribe((res:any)=>{
      this.data_Q=res.data;
      this.currentPage = a;
      this.total=res.pages;
     
    })
  }

  GetAllNCH(){    
    this.NhomCauHoiService.getall(this.dlNCH).subscribe((res:any)=>{
      this.dataNCH=res.data;
     // console.log(this.dataNCH);
    })
  }
  Add(){
    for(let i=0;i<this.lc.length;i++){
      const dapAn:any={};
      dapAn.maCauHoi=0;
      dapAn.noiDung=this.lc[i];
      dapAn.trangThai=1;
      this.lc2.push(dapAn);
    }
   this.dlAdd.LuaChon=this.lc2;
   this.CauHoiService.Post_CH_DA(this.dlAdd);
   this.getQ(1);
   this.toastr.success("Thêm thành công")
  // return this.getQ();
  }

  selectedLoai: string = '';  
  selectChangeHandler (event: any) {
    //update the ui
    this.selectedLoai = event.target.value;
  }


  Delete(id:number){
    this.CauHoiService.Delete_CH(id,this.dl).subscribe(
      (data:any) => {
        console.log(id);
        //this.showSuccess('Xoá thông tin bệnh nhân thành công!');
        // $('#Xoa').modal('hide');
        // this.getQ();
      },
      (error) => {
      //  this.showError('Xoá thông tin bệnh nhân không thành công!');
        console.log(error);
      }
    );
    this.LChon.DeleteByMCH(id,this.data_Lc).subscribe(
      (data:any) => {
        console.log(id);
        this.toastr.success("Xóa thành công")
        this.getQ(1);
      //  this.getQ();
      },
      (error) => {
        this.toastr.warning("Xóa thấy bại")
      //  this.showError('Xoá thông tin bệnh nhân không thành công!');
        console.log(error);
      }
    );
  }
  // getDapAn(id: number) {

  //   this.CauHoiService.getAnswers(id).subscribe((res: any) => {
  //     this.data_Answer = res.data;
  //   })
  // }
}
